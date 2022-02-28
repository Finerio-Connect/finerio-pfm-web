import ICategory from "./ICategory";

export interface ICategoriesRes {
  data: ICategory[];
  nextCursor: number | null;
}
