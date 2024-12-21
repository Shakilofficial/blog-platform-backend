// Type for error sources
export type TErrorSources = {
  path: string | number;
  message: string;
}[];

// Type for error response
export type TErrorResponse = {
  statusCode: number;
  message: string;
  errorSources: TErrorSources;
};
