import { DbRequest, updateOptions } from './dto';

const basicColumns = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

const convertMapKeyToIndex = (key: string) => {
  if (key.length === 1) {
    return basicColumns.indexOf(key);
  } else {
    // length === 2

    const splittedString = key.split('');
    return (basicColumns.indexOf(splittedString[0]) + 1) * 26 + basicColumns.indexOf(splittedString[1]);
  }
};

const pushToDbRequestObject = (
  dbRequestObject: DbRequest,
  objectToBePushed: { [key: string]: string },
  updateOption: updateOptions,
): void => {
  if (updateOption === 'updateExisting' && objectToBePushed.hasOwnProperty('ID') && objectToBePushed.ID) {
    dbRequestObject.updates.push(objectToBePushed);
  } else {
    dbRequestObject.inserts.push(objectToBePushed);
  }
};

const imitateDbRequest = (dbRequestObject: DbRequest) => {
  return new Promise(resolve =>
    resolve({
      status: 1,
      message: 'Data successfully imported into the db',
    }),
  );
};

export { convertMapKeyToIndex, pushToDbRequestObject, imitateDbRequest };
