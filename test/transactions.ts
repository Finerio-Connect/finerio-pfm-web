import { assert, expect } from "chai";
import { FinerioConnectSDK, TRANSACTION_TYPE } from "../src/index";
import { Transaction } from "../src/models";

describe("Transactions", () => {
  const fcs = new FinerioConnectSDK(TRANSACTION_TYPE);
  const { Transactions } = fcs.connect("905e0065-a797-4139-81ae-66d671a284b7");
  it("Should be Exist", () => {
    return expect(Transactions).to.exist;
  });
  const accountId = 2230303;
  describe("#List", () => {
    it("Should be Error", () => {
      return Transactions?.list(0).catch((error) => {
        expect(error).to.be.an("array");
        expect(error.length).to.be.greaterThan(0);
      });
    });
    it("Should be Success", () => {
      return Transactions?.list(accountId).then((response) => {
        expect(response).to.be.an("array");
        expect(response.length).to.be.greaterThan(0);
      });
    });
  });
  let newTransaction: Transaction;

  describe("#Create", () => {
    it("Should be Success", () => {
      let transaction = new Transaction({
        accountId,
        date: new Date().getTime() / 1000,
        charge: true,
        description: "Mocha Test",
        amount: 1111,
        categoryId: 79,
      });
      return Transactions?.create(transaction).then((response) => {
        newTransaction = response;
        return expect(response).to.exist;
      });
    });
  });

  describe("#Get", () => {
    it("Should be Error", () => {
      return Transactions?.get().catch((error) => {
        expect(error).to.be.an("array");
        expect(error.length).to.be.greaterThan(0);
      });
    });
    it("Should be Success", () => {
      return Transactions?.get(newTransaction.id).then((response) => {
        return expect(response).to.exist;
      });
    });
  });

  describe("#Update", () => {
    it("Should be Error", () => {
      return Transactions?.update().catch((error) => {
        expect(error).to.be.an("array");
        expect(error.length).to.be.greaterThan(0);
      });
    });
    it("Should be Success", () => {
      newTransaction.charge = false;
      return Transactions?.update(newTransaction.id, newTransaction).then(
        (response) => {
          expect(response).to.exist;
          expect(response.charge).to.be.false;
        }
      );
    });
  });

  describe("#Delete", () => {
    it("Should be Error", () => {
      return Transactions?.delete().catch((error) => {
        expect(error).to.be.an("array");
        expect(error.length).to.be.greaterThan(0);
      });
    });
    it("Should be Success", () => {
      return Transactions?.delete(newTransaction.id).then(() => {
        return Transactions?.get(newTransaction.id).catch((errors) => {
          expect(errors).to.be.an("array");
          expect(errors.length).to.be.greaterThan(0);
          expect(errors).to.deep.include({
            code: "transaction.notFound",
            detail: "The transaction ID you requested was not found.",
            title: "Transaction not found.",
          });
        });
      });
    });
  });
});
