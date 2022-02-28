import ICategory from "../../interfaces/category/ICategory";
import Category from "./Category";

export default class ParentCategory extends Category {
  public subcategories: Category[];

  constructor(
    {
      id,
      name,
      color,
      parentCategoryId,
      userId,
      dateCreated,
      lastUpdated,
    }: ICategory,
    subcategories: Category[] = []
  ) {
    super({
      id,
      name,
      color,
      parentCategoryId,
      userId,
      dateCreated,
      lastUpdated,
    });
    this.subcategories = subcategories;
  }
}
