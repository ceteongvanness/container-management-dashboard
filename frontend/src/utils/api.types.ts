// frontend/src/utils/api.types.ts
export interface ApiResponse<T> {
    data: T;
    status: number;
    message?: string;
  }
  
  export interface ApiError {
    message: string;
    status: number;
    errors?: string[];
  }