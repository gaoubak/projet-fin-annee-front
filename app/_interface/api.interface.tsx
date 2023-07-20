export interface ApiStatus {
  data: {
    framework: string;
    version: string;
    services: {
      database: string;
    };
  };
}

export interface ApiRequestFormat {
  data: {
    attributes: Record<string, unknown>;
    /* relationships?: Record<string, any>; */
  };
}

export interface ApiCollectionResource {
  data: Array<ApiSingleResource>;
}

export interface ApiSingleResource {
  data: {
    id: number;
    type: string;
    attributes: Record<string, unknown>;
    /* relationships?: Record<string, any> | []; */
  };
}

export interface ApiResponseError {
  errors: {
    status: number;
    title: string;
    message: string;
    details?: {
      file: string;
      line: number;
    };
  };
}

export interface UploadFileRequest {
  data: {
    attributes: {
      url: string;
    };
  };
}

export interface UploadFileFormDataRequest {
  file: File;
  type: string;
}
