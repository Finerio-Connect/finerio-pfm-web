import axios, { AxiosError, AxiosRequestHeaders, AxiosResponse } from "axios";
import Error from "../error";
import {
  ACCOUNT_TYPE,
  SERVER_URL,
  CATEGORY_TYPE,
  FINANCIAL_ENTITY_TYPE,
  TRANSACTION_TYPE,
  BUDGET_TYPE,
} from "../constants";
import { IErrorResponse } from "../interfaces";
import Categories from "../categories/Categories";
import Budgets from "../budgets";
import Accounts from "../accounts";
import FinancialEntities from "../financialEntities";
import Transactions from "../transactions/Transactions";

interface IClassesDictionary {
  Accounts?: Accounts;
  Categories?: Categories;
  FinancialEntities?: FinancialEntities;
  Transactions?: Transactions;
  Budgets?: Budgets;
}

const getIncludedClasses = (includes?: string[] | string): string[] => {
  if (includes) {
    if (Array.isArray(includes)) {
      return includes;
    }
    if (typeof includes === "string") {
      return [includes];
    }
  }
  return [];
};
export default class FinerioConnectSDK {
  private _includedClasses: string[];
  private _apiKey: string;
  private _serverUrl: string;
  private _headers: AxiosRequestHeaders;
  constructor(includes?: string[] | string) {
    this._includedClasses = getIncludedClasses(includes);
    this._apiKey = "";
    this._serverUrl = SERVER_URL;
    this._headers = {};
  }

  public connect(apiKey: string): IClassesDictionary {
    this._apiKey = apiKey;
    this._headers = { ...this._headers, "Api-Key": apiKey };
    if (this._includedClasses.length) {
      return this._includedClasses.reduce((acc, current) => {
        switch (current) {
          case ACCOUNT_TYPE:
            return { ...acc, Accounts: new Accounts(this) };
          case CATEGORY_TYPE:
            return { ...acc, Categories: new Categories(this) };
          case BUDGET_TYPE:
            return { ...acc, Categories: new Budgets(this) };
          case FINANCIAL_ENTITY_TYPE:
            return { ...acc, FinancialEntities: new FinancialEntities(this) };
          case TRANSACTION_TYPE:
            return { ...acc, Transactions: new Transactions(this) };
          default:
            return acc;
        }
      }, {});
    }
    return {
      Accounts: new Accounts(this),
      Categories: new Categories(this),
      FinancialEntities: new FinancialEntities(this),
      Transactions: new Transactions(this),
      Budgets: new Budgets(this),
    };
  }

  get apiKey(): string {
    return this._apiKey;
  }

  get serverUrl(): string {
    return this._serverUrl;
  }

  public doGet(uri: string, success: (response: any) => any): Promise<any> {
    const url = `${this._serverUrl}${uri}`;
    return new Promise<any>((resolve, reject) => {
      axios
        .get(url, { headers: this._headers })
        .then((response) => resolve(success(response.data)))
        .catch((error) => this.processErrors(error, reject));
    });
  }

  public doPost(
    uri: string,
    body: any,
    success: (response: any) => any
  ): Promise<any> {
    const url = `${this._serverUrl}${uri}`;
    return new Promise<any>((resolve, reject) => {
      axios
        .post(url, body, {
          headers: this._headers,
        })
        .then((response) => resolve(success(response.data)))
        .catch((error) => this.processErrors(error, reject));
    });
  }

  public doPut(
    uri: string,
    body: any,
    success: (response: any) => any
  ): Promise<any> {
    const url = `${this._serverUrl}${uri}`;
    return new Promise<any>((resolve, reject) => {
      axios
        .put(url, body, { headers: this._headers })
        .then((response) => resolve(success(response.data)))
        .catch((error) => this.processErrors(error, reject));
    });
  }

  public doDelete(uri: string, success: (response: any) => any): Promise<any> {
    const url = `${this._serverUrl}${uri}`;
    return new Promise<any>((resolve, reject) => {
      axios
        .delete(url, { headers: this._headers })
        .then((response) => resolve(success(response.data)))
        .catch((error) => this.processErrors(error, reject));
    });
  }

  private processErrors(
    error: AxiosError,
    reject: { (reason?: any): void; (arg0: AxiosError<any, any>): void }
  ) {
    if (
      error.response &&
      error.response.data &&
      error.response.status !== 500
    ) {
      reject(this.createErrorBadRequest(error.response?.data));
    } else if (error.response && error.response.status) {
      reject(this.createErrorResObject(error));
    } else {
      reject(this.createErrorObject(error));
    }
  }

  private createErrorBadRequest(errors: IErrorResponse) {
    const errorsList: Error[] = [];

    errors.errors.forEach((error) => {
      errorsList.push(new Error(error.code, error.title, error.detail));
    });

    return errorsList;
  }

  private createErrorResObject(axiosError: AxiosError) {
    const { response: error } = axiosError;
    return new Error(
      `${error!.status}`,
      error!.statusText!,
      error!.status === 404 ? "The item you requested was not found" : ""
    );
  }

  private createErrorObject(error: AxiosError) {
    return new Error(`${error.code}`, "", "");
  }
}
