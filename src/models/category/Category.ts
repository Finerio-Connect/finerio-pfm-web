import ICategory from "../../interfaces/category/ICategory";

export default class Category implements ICategory {
  public id: number;
  public name: string;
  public color: string;
  public parentCategoryId: number | null;
  public userId: number | null;
  public dateCreated: number | null;
  public lastUpdated: number | null;

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
    this.id = id;
    this.name = name;
    this.color = color;
    this.parentCategoryId = parentCategoryId;
    this.userId = userId;
    this.dateCreated = dateCreated;
    this.lastUpdated = lastUpdated;
  }
}
