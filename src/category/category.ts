import FinerioConnectSDK from "../finerioConnectSDK";
import CategoryModel from "../models/Category";

export default class Category {
  path: string = "b07db4dc65bda086ae37ffeb8e03a126b18ffa6f";

  constructor(public fcSdk: FinerioConnectSDK) {}

  getById(id: number): Promise<ICategory> {
    const uri = `/${this.path}/${id}`;

    return this.fcSdk.doGet(uri, this.processGetByIdResponse);
  }

  processGetByIdResponse(response: ICategory): ICategory {
    return new CategoryModel(response);
  }
}
