import ITransaction from "../interfaces/ITransaction";
import PlainObject from "../types/PlainObject";

export default class Transaction implements ITransaction {
  private _id: number;
  private _date: Date;
  private _charge: boolean;
  private _description: string;
  private _amount: number;
  private _categoryId: number;
  private _accountId: string;
  private _dateCreated: Date | null;
  private _lastUpdated: Date | null;
  constructor({
    id,
    accountId,
    amount,
    categoryId,
    charge,
    date,
    dateCreated,
    description,
    lastUpdated,
  }: ITransaction) {
    this._id = id;
    this._accountId = accountId;
    this._amount = amount;
    this._charge = charge;
    this._date = new Date(date);
    this._description = description;
    this._categoryId = categoryId;
    this._dateCreated = dateCreated ? new Date(dateCreated) : null;
    this._lastUpdated = lastUpdated ? new Date(lastUpdated) : null;
  }

  public get id(): number {
    return this._id;
  }

  public get charge(): boolean {
    return this._charge;
  }

  public set charge(value: boolean) {
    this._charge = value;
  }

  public get date(): Date {
    return this._date;
  }

  public set date(value: Date) {
    this._date = value;
  }

  public get dateCreated(): Date | null {
    return this._dateCreated;
  }
  
  public get description(): string {
    return this._description;
  }

  public get amount(): number {
    return this._amount;
  }

  public get categoryId(): number {
    return this._categoryId;
  }

  public get accountId(): string {
    return this._accountId;
  }

  public get lastUpdated(): Date | null {
    return this._lastUpdated;
  }

  public get plainObject(): PlainObject {
    return {
      id: this._id,
      accountId: this._accountId,
      amount: this._amount,
      categoryId: this._categoryId,
      charge: this._charge,
      date: this._date.getTime(),
      dateCreated: this._dateCreated && this._dateCreated.getTime(),
      description: this._description,
      lastUpdated: this._lastUpdated && this._lastUpdated.getTime(),
    };
  }
}
