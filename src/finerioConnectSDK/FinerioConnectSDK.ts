import axios, { AxiosError, AxiosRequestHeaders } from "axios";

import Error from "../error";
import {
  ACCOUNT_TYPE,
  CATEGORY_TYPE,
  FINANCIAL_ENTITY_TYPE,
  TRANSACTION_TYPE,
  BUDGET_TYPE,
  INSIGHTS_TYPE,
  USERS_TYPE,
  SERVER_URL_SAND,
  SERVER_URL_PROD,
} from "../constants";
import { IErrorResponse } from "../interfaces";
import Categories from "../categories/Categories";
import Budgets from "../budgets/Budgets";
import Accounts from "../accounts";
import FinancialEntities from "../financialEntities";
import Transactions from "../transactions/Transactions";
import Insights from "../insights/Insights";
import Users from "../users/Users";

interface IClassesDictionary {
  Accounts?: Accounts;
  Categories?: Categories;
  FinancialEntities?: FinancialEntities;
  Transactions?: Transactions;
  Budgets?: Budgets;
  Insights?: Insights;
  Users?: Users;
}

interface IConnectParams {
  includes?: string | string[];
  sandbox?: boolean;
}

export default class FinerioConnectSDK {
  private _includedClasses: string[];
  private _apiKey: string;
  private _serverUrl: string;
  private _sandbox: boolean;
  private _headers: AxiosRequestHeaders;
  constructor(arg?: IConnectParams | string[] | string) {
    this._includedClasses = [];
    this._sandbox = false;
    this._apiKey = "";
    if (arg) {
      if (Array.isArray(arg) || typeof arg === "string") {
        this._includedClasses = this.getIncludedClasses(arg);
      } else if (typeof arg === "object") {
        if (arg.includes) {
          this._includedClasses = this.getIncludedClasses(arg.includes);
        }
        if (arg.sandbox) {
          this._sandbox = arg.sandbox;
        }
      }
    }
    if (this._sandbox) this._serverUrl = SERVER_URL_SAND;
    else this._serverUrl = SERVER_URL_PROD;
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
            return { ...acc, Budgets: new Budgets(this) };
          case FINANCIAL_ENTITY_TYPE:
            return { ...acc, FinancialEntities: new FinancialEntities(this) };
          case TRANSACTION_TYPE:
            return { ...acc, Transactions: new Transactions(this) };
          case INSIGHTS_TYPE:
            return { ...acc, Insights: new Insights(this) };
          case USERS_TYPE:
            return { ...acc, Users: new Users(this) };
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
      Insights: new Insights(this),
      Users: new Users(this),
    };
  }

  private getIncludedClasses = (
    arg?: string[] | string | IConnectParams
  ): string[] => {
    if (arg) {
      if (Array.isArray(arg)) {
        return arg;
      }
      if (typeof arg === "string") {
        return [arg];
      }
    }
    return [];
  };

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
