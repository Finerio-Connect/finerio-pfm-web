# Finerio PFM Web SDK

This SDK lets you connect to [Finerio PFM API](https://pfm-api-docs.finerioconnect.com/) in an easier way.

## Table of contents

- [Installation](#installation)
- [Setup](#setup)
- [Usage](#usage)
  - [Users](#users)
  - [FinancialEntities](#financial-entities)
  - [Accounts](#accounts)
  - [Categories](#categories)
  - [Transactions](#transactions)
  - [Budgets](#budgets)
  - [Insights](#insights)

## Installation

NPM:

```
npm install finerio-pfm-web
```

## Setup

```javascript
import { FinerioConnectSDK } from "finerio-pfm-web";
import {
  ACCOUNT_TYPE,
  CATEGORY_TYPE,
  FINANCIAL_ENTITY_TYPE,
  TRANSACTION_TYPE,
  BUDGET_TYPE,
  INSIGHTS_TYPE,
  USERS_TYPE,
} from "finerio-pfm-web";

const fcPfm = new FinerioConnectSDK([TYPES]);
const {
  Accounts,
  Categories,
  FinancialEntities,
  Transactions,
  Budgets,
  Insights,
  Users,
} = fcPfm.connect(API_KEY);
```

If TYPES is not setted all the instances will be returned otherwise only instances of TYPES setted will be returned.

## Usage

Finerio PFM Web uses **Promises** to fetch responses from the API.

### Users

### Financial Entities

### Accounts

### Categories

### Transactions

### Budgets

### Insights
