# Finerio PFM Web SDK

This SDK lets you connect to [Finerio PFM API](https://pfm-api-docs.finerioconnect.com/) in an easier way.

## Table of contents

- [Installation](#installation)
- [Setup](#setup)
- [Usage](#usage)
  - [Users](#users)
    - [List Users](#list-users)
    - [Get User](#get-user)
    - [Create User](#create-user)
    - [Update User](#update-user)
    - [Delete User](#delete-user)
  - [FinancialEntities](#financial-entities)
  - [Accounts](#accounts)
  - [Categories](#categories)
  - [Transactions](#transactions)
  - [Budgets](#budgets)
    - [List Budgets](#list-budgets)
    - [Get Budget](#get-budget)
    - [Create Budget](#create-budget)
    - [Update Budget](#update-budget)
    - [Delete Budget](#delete-budget)
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

const fcPfm = new FinerioConnectSDK([
  ACCOUNT_TYPE,
  CATEGORY_TYPE,
  FINANCIAL_ENTITY_TYPE,
  TRANSACTION_TYPE,
  BUDGET_TYPE,
  INSIGHTS_TYPE,
  USERS_TYPE,
]);

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

If constructor has no parameters all the SDK instances will be returned otherwise only instances of parameters setted will be returned.

## Usage

Finerio PFM Web uses **Promises** to fetch responses from the API.

### Users

A user is the representation of your users' application.

### List Users

Fetches a list of users of a client, sorted by ID in descending order.

```javascript
Users.list([cursor])
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

If a cursor is specified, the list starts with the item that has that ID.

Output:

```console
[
  User {
    _id: 1115160,
    _name: 'Rossie18@gmail.com',
    _dateCreated: 1645069610495
  },
  User {
    _id: 1115155,
    _name: 'Salvador.Nitzsche67@gmail.com',
    _dateCreated: 1644967736923
  },
  ...
]

```

### Get User

Given a valid user ID, fetches the information of a user.

```javascript
const userId = 1115162;
Users.get(userId)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

Output:

```console
User {
  _id: 1115162,
  _name: 'Henri47@hotmail.com',
  _dateCreated: 1645206810630
}

```

### Create User

Creates a user. You have to import the User Payload Model to create a new one.

```javascript
import { User } from "finerio-pfm-web";

...
const user = new User("test@finerioconnect.com");

Users.create(user)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

Output:

```console
User {
  _id: 2230329,
  _name: 'test@finerioconnect.com',
  _dateCreated: 1647297242399
}

```

### Update User

Given a valid user id updates a user. You have to import the User Payload Model to update it.

```javascript
import { User } from "finerio-pfm-web";

...

const user = new User("testupd@finerioconnect.com");
const userId = 2230329;

Users.update(userId, user)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

Output:

```console
User {
  _id: 2230329,
  _name: 'testupd@finerioconnect.com',
  _dateCreated: 1647297242399
}

```

### Delete User

Given a valid user id deletes a user.

```javascript
const userId = 2230329;
Users.delete(userId)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

Output:

```console
204

```

If the user was deleted code 204 will be returned.

### Financial Entities

### Accounts

### Categories

### Transactions

### Budgets

A budget is the representation of your users' budget plan.

### List Budgets

Fetches a list of budgets per user, sorted by ID in descending order.

```javascript
const userId = 1115162;

Budgets.list(userId)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

If a cursor is specified, the list starts with the item that has that ID.

Output:

```console
[
  Budget {
    _id: 1486872,
    _categoryId: 3,
    _name: 'Streaming services',
    _amount: 1500,
    _warningPercentage: 0.6,
    _spent: 0,
    _leftToSpend: 1500,
    _status: 'ok',
    _dateCreated: 1646257102160,
    _lastUpdated: 1646257642253
  },
  Budget {
    _id: 1486874,
    _categoryId: 87,
    _name: 'Sports',
    _amount: 178.17999267578125,
    _warningPercentage: 0.7,
    _spent: 0,
    _leftToSpend: 178.17999267578125,
    _status: 'ok',
    _dateCreated: 1646259181915,
    _lastUpdated: 1646259181915
  },
  ...
]

```

### Get Budget

Given a valid budget ID, fetches the information of a budget.

```javascript
const budgetId = 1486874;
Budgets.get(budgetId)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

Output:

```console
Budget {
  _id: 1486874,
  _categoryId: 87,
  _name: 'Sports',
  _amount: 178.17999267578125,
  _warningPercentage: 0.7,
  _spent: 0,
  _leftToSpend: 178.17999267578125,
  _status: 'ok',
  _dateCreated: 1646259181915,
  _lastUpdated: 1646259181915
}

```

### Create Budget

Creates a budget. You have to import the Budget Payload Model to create a new one.

```javascript
import { Budget } from "finerio-pfm-web";

...
const name = "Budget Test";
const amount = 5000;
const warningPercentage = 0.5;
const categoryId = 15;
const userId = 1115162;

const newBudget = new Budget(
  name,
  amount,
  warningPercentage,
  categoryId,
  userId
);

Budgets.create(newBudget)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

Output:

```console
Budget {
  _id: 1858596,
  _categoryId: 15,
  _name: 'Budget Test',
  _amount: 5000,
  _warningPercentage: 0.5,
  _spent: 0,
  _leftToSpend: 5000,
  _status: 'ok',
  _dateCreated: 1647299628041,
  _lastUpdated: 1647299628041
}

```

### Update Budget

Given a valid budget id updates a budget. You have to import the User Payload Model to update it.

```javascript
import { Budget } from "finerio-pfm-web";

...

const name = "Budget";
const amount = 5000;
const warningPercentage = 0.5;
const categoryId = 16;

const budget = new Budget(name, amount, warningPercentage [, categoryId]);
const budgetId = 1858596;

Budgets.update(budgetId, budget)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

categoryId is optional, set only if you want to change the budget's category.

Output:

```console
Budget {
  _id: 1858596,
  _categoryId: 16,
  _name: 'Budget',
  _amount: 5000,
  _warningPercentage: 0.5,
  _spent: 0,
  _leftToSpend: 5000,
  _status: 'ok',
  _dateCreated: 1647299628041,
  _lastUpdated: 1647299628041
}

```

### Delete Budget

Given a valid budget id deletes budget.

```javascript
const budgetId = 1858596;
Budgets.delete(budgetId)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

Output:

```console
204

```

If the budget was deleted code 204 will be returned.

### Insights
