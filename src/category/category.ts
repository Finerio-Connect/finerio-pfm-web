import FinerioConnectSDK from "../finerioConnectSDK";
import { ICategory, ICategoriesRes } from "../interfaces";
import { Category as CategoryModel, ParentCategory } from "../models";
import CategoryObject from "./categoryObject";

export default class Category {
  path: string = "/b07db4dc65bda086ae37ffeb8e03a126b18ffa6f";

  constructor(public fcSdk: FinerioConnectSDK) {}

  get(id: number): Promise<ICategory> {
    const uri = `${this.path}/${id}`;

    return this.fcSdk.doGet(uri, this.processGetResponse);
  }

  private processGetResponse(response: ICategory): CategoryModel {
    return new CategoryModel(response);
  }

  update(id: number, updateObject: CategoryObject): Promise<ICategory> {
    const uri = `${this.path}/${id}`;

    return this.fcSdk.doPut(uri, updateObject, this.processUpdateResponse);
  }

  private processUpdateResponse(response: ICategory): CategoryModel {
    return new CategoryModel(response);
  }

  create(createCategory: CategoryObject): Promise<ICategory> {
    const uri = `${this.path}`;

    return this.fcSdk.doPost(uri, createCategory, this.processCreateResponse);
  }

  private processCreateResponse(response: ICategory): CategoryModel {
    return new CategoryModel(response);
  }

  delete(id: number): Promise<ICategory> {
    const uri = `${this.path}/${id}`;

    return this.fcSdk.doDelete(uri, this.processDeleteResponse);
  }

  private processDeleteResponse(status: string): number {
    return status === "" ? 204 : 500;
  }

  list(userId?: number, cursor: number = 1): Promise<ICategory> {
    const uri = `${this.path}${
      userId ? `?userId=${userId}&cursor=${cursor}` : ""
    }`;
    return this.fcSdk.doGet(uri, this.processlistResponse);
  }

  private processlistResponse(response: ICategoriesRes): CategoryModel[] {
    let categories: CategoryModel[] = [];
    if (response.data)
      categories = response.data.reverse().map((cat) => new CategoryModel(cat));

    return categories;
  }

  listWithSubcategories(
    userId?: number,
    cursor: number = 1
  ): Promise<ICategory> {
    const uri = `${this.path}${
      userId ? `?userId=${userId}&cursor=${cursor}` : ""
    }`;
    return this.fcSdk.doGet(uri, this.processListWithSubcategoriesResponse);
  }

  private processListWithSubcategoriesResponse(
    response: ICategoriesRes
  ): ParentCategory[] {
    let categories: ParentCategory[] = [];
    if (response.data) {
      const catsOrd = response.data.reverse();
      categories = catsOrd
        .filter((cat) => !cat.parentCategoryId)
        .map((cat) => new ParentCategory(cat));

      categories.forEach((parcat) => {
        parcat.subcategories = catsOrd
          .filter((rescat) => rescat.parentCategoryId === parcat.id)
          .map((cat) => new CategoryModel(cat));
      });
    }
    return categories;
  }
}
