export default class CategoryObject {
  constructor(
    public name: string,
    public color: string,
    public parentCategoryId: number | null,
    public userId?: number
  ) {}
}
