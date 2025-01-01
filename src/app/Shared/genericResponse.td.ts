export type IGenericResponse<T> = {
  meta: {
    page?: number | null;
    limit?: number | null;
    total?: number | null;
  };
  data?: T | null;
};
