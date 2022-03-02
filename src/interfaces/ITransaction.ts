export default interface ITransaction {
  id: number;
  accountId: string;
  date: number | Date;
  charge: boolean;
  description: string;
  amount: number;
  categoryId: number;
  dateCreated?: number | Date | null;
  lastUpdated?: number | Date | null;
}
