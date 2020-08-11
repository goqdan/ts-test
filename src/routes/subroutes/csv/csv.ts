import { Router, NextFunction } from 'express';
import * as fs from 'fs';
import { parseStream } from 'fast-csv';
import { UploadDtoReq, UploadDtoRes, StoreDtoReq, StoreDtoRes, DbRequest, ImitateDbRes } from './dto';
import upload from './middlewares/upload';
import { joiValidateStore } from './middlewares/joi';
import * as csvUtil from './utils';

const csv = Router();

csv.post('/upload', upload.single('file'), (req: UploadDtoReq, res: UploadDtoRes) => {
  const fileName = req.file.filename.slice(0, -4);
  res.json({ fileName });
});

csv.post('/store', joiValidateStore, (req: StoreDtoReq, res: StoreDtoRes, next: NextFunction) => {
  const { body } = req;
  const uploadDir = './uploads';
  const filePath = `${uploadDir}/${body.fileName}.csv`;
  const dbRequestObject: DbRequest = {
    table: body.dbEntity,
    updates: [],
    inserts: [],
  };
  const dbStatementObject = {};
  for (const key of Object.keys(body.mappingRules)) {
    dbStatementObject[body.mappingRules[key]] = csvUtil.convertMapKeyToIndex(key);
  }
  try {
    if (fs.existsSync(filePath)) {
      const stream = fs.createReadStream(filePath);
      parseStream(stream)
        .on('error', error => console.error(error))
        .on('data', row => {
          const objectToBePushed = {};
          for (const key of Object.keys(dbStatementObject)) {
            const val = dbStatementObject[key];
            objectToBePushed[key] = row[val] ? row[val].trim() : null;
          }
          csvUtil.pushToDbRequestObject(dbRequestObject, objectToBePushed, body.updateOptions);
        })
        .on('end', (rowCount: number) => {
          console.log(`Parsed ${rowCount} rows`);
          console.log(dbRequestObject);
          csvUtil.imitateDbRequest(dbRequestObject).then((response: ImitateDbRes) => {
            res.json({ result: response.message });
          });
        });
    } else {
      res.json({ result: 'File was not found' });
    }
  } catch (err) {
    next(err);
  }
});

export default csv;
