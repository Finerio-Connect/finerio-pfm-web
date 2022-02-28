export default class Category implements ICategory {
  public id: number;
  public name: string;
  public color: string;
  public parentCategoryId: number;
  public userId: number;
  public dateCreated: number;
  public lastUpdated: number;

  constructor({
    id,
    name,
    color,
    parentCategoryId,
    userId,
    dateCreated,
    lastUpdated,
  }: ICategory) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.parentCategoryId = parentCategoryId;
    this.userId = userId;
    this.dateCreated = dateCreated;
    this.lastUpdated = lastUpdated;
  }
}
