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

### Insights
