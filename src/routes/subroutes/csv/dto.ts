import { Request, Response } from 'express';

export interface UploadDtoReq extends Request {
  file: any;
}

export interface UploadDtoRes extends Response {
  fileName: string;
}

type tableAlias = 'user' | 'contact' | 'order';

export type updateOptions = 'ignoreExisting' | 'updateExisting';

export interface StoreDtoReq extends Request {
  body: {
    fileName: string;
    mappingRules: { [key: string]: string };
    updateOptions: updateOptions;
    dbEntity: tableAlias;
  };
}

export interface StoreDtoRes extends Response {
  result: string;
}

export interface ImitateDbRes {
  status: number;
  message: string;
}

export interface DbRequest {
  table: tableAlias;
  updates: object[];
  inserts: object[];
}
