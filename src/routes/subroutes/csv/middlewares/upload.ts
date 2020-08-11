import * as multer from 'multer';
import * as path from 'path';
import { UploadDtoReq } from '../dto';

const storage = multer.diskStorage({
  destination: (req: UploadDtoReq, file: Express.Multer.File, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req: UploadDtoReq, file: Express.Multer.File, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploader = multer({
  storage,
  fileFilter: (req: UploadDtoReq, file: Express.Multer.File, cb) => {
    const ext: string = path.extname(file.originalname);
    if (ext !== '.csv') {
      return cb(new Error('Only csv is allowed'));
    }
    cb(null, true);
  },
});

export default uploader;
