import axios, { AxiosError, AxiosRequestHeaders, AxiosResponse } from "axios";
import Error from "../error";
import { SERVER_URL, CATEGORY_TYPE, TRANSACTION_TYPE } from "../constants";
import { IErrorResponse } from "../interfaces";
import Category from "../category/category";

export default class FinerioConnectSDK {
  private _includedClasses: string[];
  private _apiKey: string;
  private _serverUrl: string;
  private _headers: AxiosRequestHeaders;
  constructor(includes?: string[]) {
    this._includedClasses = includes || [];
    this._apiKey = "";
    this._serverUrl = SERVER_URL;
    this._headers = {};
  }

  public connect(apiKey: string) {
    this._apiKey = apiKey;
    this._headers = { ...this._headers, "Api-Key": apiKey };
    if (this._includedClasses.length) {
      return this._includedClasses.reduce((acc, current) => {
        switch (current) {
          case CATEGORY_TYPE:
            return { ...acc, Categories: new Category(this) };
          case TRANSACTION_TYPE:
          default:
            return acc;
        }
      }, {});
    }
    return {
      Categories: new Category(this),
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
        .post(url, body, { headers: this._headers })
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
    if (error.response && error.response.data)
      reject(this.createErrorBadRequest(error.response?.data));
    else if (error.response && error.response.status)
      reject(this.createErrorResObject(error));
    else reject(this.createErrorObject(error));
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
