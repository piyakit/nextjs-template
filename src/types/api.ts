export type ApiResponse<T> = {
  data: T;
  message?: string;
  status: number;
};

export type ApiError = {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
};
