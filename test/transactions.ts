import { assert, expect } from "chai";
import { FinerioConnectSDK } from "../src/index";

describe("Transactions", () => {
  const fcs = new FinerioConnectSDK();
  const { Transactions } = fcs.connect("905e0065-a797-4139-81ae-66d671a284b7");

  describe("#List", () => {
    it("Should be Error", () => {
      return Transactions?.list(0).catch((error) => {
        return expect(error).to.be.an("array").to.have.lengthOf(1);
      });
    });
  });
});
