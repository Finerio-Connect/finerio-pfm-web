import { expect } from "chai";
import {
  FinerioConnectSDK,
  ACCOUNT_TYPE,
  CATEGORY_TYPE,
  FINANCIAL_ENTITY_TYPE,
  TRANSACTION_TYPE,
  BUDGET_TYPE,
  INSIGHTS_TYPE,
  USERS_TYPE,
} from "../src/index";

describe("Instances", () => {
  const fcs = new FinerioConnectSDK({
    includes: [
      ACCOUNT_TYPE,
      CATEGORY_TYPE,
      FINANCIAL_ENTITY_TYPE,
      TRANSACTION_TYPE,
      BUDGET_TYPE,
      INSIGHTS_TYPE,
      USERS_TYPE,
    ],
    sandbox: true,
  });
  const {
    Accounts,
    Categories,
    FinancialEntities,
    Transactions,
    Budgets,
    Insights,
    Users,
  } = fcs.connect(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBmbSIsInBhc3N3b3JkIjoicGZtIiwiaWF0IjoxNjQ4MDcwMDM2LCJleHAiOjE2NDgwOTg4MzZ9.rnHot_-Ddt9PN28u2H5wYh0X0IilwGss--P6xiFlYqU"
  );
  it("Should be Exist", () => {
    return expect(Accounts).to.exist;
  });
  it("Should be Exist", () => {
    return expect(Categories).to.exist;
  });
  it("Should be Exist", () => {
    return expect(FinancialEntities).to.exist;
  });
  it("Should be Exist", () => {
    return expect(Transactions).to.exist;
  });
  it("Should be Exist", () => {
    return expect(Budgets).to.exist;
  });
  it("Should be Exist", () => {
    return expect(Insights).to.exist;
  });
  it("Should be Exist", () => {
    return expect(Users).to.exist;
  });
});
