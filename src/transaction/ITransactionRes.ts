import { ITransaction } from "../interfaces";

export default interface ITransactionRes {
  data: ITransaction[];
  nextCursor: number | null;
}
