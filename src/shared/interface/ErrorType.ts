export interface ErrorResponse {
  response?: {
    status: number;
  };
}

export interface RootError {
  error: Error;
  meta: Meta;
}

export interface Error {
  status: string;
  originalStatus: number;
  data: string;
  error: string;
}

export interface Meta {
  request: Request;
  response: Response;
}

export interface Request {}

export interface Response {}
