import CategoryObject from "./categoryObject";
import FinerioConnectSDK from "../finerioConnectSDK";
import CategoryModel from "../models/Category";
import ICategory from "../interfaces/category/ICategory";
import { ICategoriesRes } from "../interfaces/category/ICategoriesRes";

export default class Category {
  path: string = "/b07db4dc65bda086ae37ffeb8e03a126b18ffa6f";

  constructor(public fcSdk: FinerioConnectSDK) {}

  get(id: number): Promise<ICategory> {
    const uri = `${this.path}/${id}`;

    return this.fcSdk.doGet(uri, this.processGetResponse);
  }

  processGetResponse(response: ICategory): CategoryModel {
    return new CategoryModel(response);
  }

  update(id: number, updateObject: CategoryObject): Promise<ICategory> {
    const uri = `${this.path}/${id}`;

    return this.fcSdk.doPut(uri, updateObject, this.processUpdateResponse);
  }

  processUpdateResponse(response: ICategory): CategoryModel {
    return new CategoryModel(response);
  }

  create(createCategory: CategoryObject): Promise<ICategory> {
    const uri = `${this.path}`;

    return this.fcSdk.doPost(uri, createCategory, this.processCreateResponse);
  }

  processCreateResponse(response: ICategory): CategoryModel {
    return new CategoryModel(response);
  }

  delete(id: number): Promise<ICategory> {
    const uri = `${this.path}/${id}`;

    return this.fcSdk.doDelete(uri, this.processDeleteResponse);
  }

  processDeleteResponse(status: string): number {
    return status === "" ? 204 : 500;
  }

  getAll(userId?: number, cursor: number = 1): Promise<ICategory> {
    const uri = `${this.path}${
      userId ? `?userId=${userId}&cursor=${cursor}` : ""
    }`;
    return this.fcSdk.doGet(uri, this.processGetAllResponse);
  }

  processGetAllResponse(response: ICategoriesRes): CategoryModel[] {
    const categories: CategoryModel[] = [];
    if (response.data)
      response.data.forEach((cat) => categories.push(new CategoryModel(cat)));

    return categories;
  }
}
