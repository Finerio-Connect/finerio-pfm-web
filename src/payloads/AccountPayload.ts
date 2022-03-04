import { PlainObject } from "../types";

export default class AccountPayload {
  constructor(
    private _nature: string,
    private _name: string,
    private _number: string,
    private _balance: number,
    private _chargeable: boolean
  ) {}

  public get nature(): string {
    return this._nature;
  }

  public set nature(value: string) {
    this._nature = value;
  }

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }

  public get number(): string {
    return this._number;
  }

  public set number(value: string) {
    this._number = value;
  }

  public get balance(): number {
    return this._balance;
  }

  public set balance(value: number) {
    this._balance = value;
  }

  public get chargeable(): boolean {
    return this._chargeable;
  }

  public set chargeable(value: boolean) {
    this._chargeable = value;
  }

  public get plainObject(): PlainObject {
    return {
      nature: this._nature,
      name: this._name,
      number: this._number,
      balance: this._balance,
      chargeable: this._chargeable,
    };
  }
}
