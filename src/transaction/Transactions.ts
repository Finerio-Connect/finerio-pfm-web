import FinerioConnectSDK from "../finerioConnectSDK";
import { ITransaction } from "../interfaces";
import { Transaction } from "../models";

import IListOptions from "./IListOptions";
import ITransactionRes from "./ITransactionRes";

export default class Transactions {
  private path: string = "/cc6ba13e82dbaf4505ae7324c0c151aa53622329";

  constructor(public fcSdk: FinerioConnectSDK) {}

  private processResponse(response: ITransaction): Transaction {
    return new Transaction(response);
  }

  private processDeleteResponse(status: string): number {
    return status === "" ? 204 : 500;
  }

  private processListResponseBuild(
    accountId: number
  ): (response: ITransactionRes) => Transaction[] {
    return (response: ITransactionRes): Transaction[] => {
      if (!response.data) {
        return [];
      }
      return response.data.map(
        (transaction) => new Transaction({ ...transaction, accountId })
      );
    };
  }

  /*  */

  get(id?: number): Promise<ITransaction> {
    return this.fcSdk.doGet(`${this.path}/${id}`, this.processResponse);
  }

  update(id?: number, updateObject?: Transaction): Promise<Transaction> {
    return this.fcSdk.doPut(
      `${this.path}/${id}`,
      updateObject ? updateObject.plainObject : {},
      this.processResponse
    );
  }

  create(transactionToCreate: Transaction): Promise<Transaction> {
    return this.fcSdk.doPost(
      this.path,
      transactionToCreate.plainObject,
      this.processResponse
    );
  }

  delete(id?: number): Promise<ITransaction> {
    return this.fcSdk.doDelete(
      `${this.path}/${id}`,
      this.processDeleteResponse
    );
  }

  list(accountId: number, listOptions?: IListOptions): Promise<Transaction[]> {
    const uri = `${this.path}?accountId=${accountId}`;
    if (!listOptions) {
      return this.fcSdk.doGet(uri, this.processListResponseBuild(accountId));
    }
    const { minAmount, maxAmount, dateFrom, dateTo, cursor } = listOptions;
    const newUri = `${uri}${minAmount ? `&minAmount=${minAmount}` : ""}${
      maxAmount ? `&maxAmount=${maxAmount}` : ""
    }${dateFrom ? `&dateFrom=${dateFrom}` : ""}${
      dateTo ? `&dateTo=${dateTo}` : ""
    }${cursor ? `&cursor=${cursor}` : ""}`;
    return this.fcSdk.doGet(newUri, this.processListResponseBuild(accountId));
  }
}
