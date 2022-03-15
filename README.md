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
    - [List Financial Entities](#list-financial-entities)
    - [Get Financial Entity](#get-financial-entity)
    - [Create Financial Entity](#create-financial-entity)
    - [Update Financial Entity](#update-financial-entity)
    - [Delete Financial Entity](#delete-financial-entity)
  - [Accounts](#accounts)
    - [List Accounts](#list-accounts)
    - [Get Account](#get-account)
    - [Create Account](#create-account)
    - [Update Account](#update-account)
    - [Delete Account](#delete-account)
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
  CATEGORY_TYPE,
  FINANCIAL_ENTITY_TYPE,
  TRANSACTION_TYPE,
} from "finerio-pfm-web";

//The constructor can receive an array of types or a single type, depending on which SDK instances you want to use. If constructor has no parameters all the SDK instances will be returned.
const fcPfm = new FinerioConnectSDK([
  CATEGORY_TYPE,
  FINANCIAL_ENTITY_TYPE,
  TRANSACTION_TYPE,
]);

//Call the connect method passing the api key as a parameter to obtain an object with the previously established instances.
const { Categories, FinancialEntities, Transactions } = fcPfm.connect(API_KEY);
```

The following constant types can be used:
| Instance Types | Instance returned when you connect |
| --------------------- | ---------------------------------- |
| ACCOUNT_TYPE | `Accounts` |
| CATEGORY_TYPE | `Categories` |
| FINANCIAL_ENTITY_TYPE | `FinancialEntities` |
| TRANSACTION_TYPE | `Transactions` |
| BUDGET_TYPE | `Budgets` |
| INSIGHTS_TYPE | `Insights` |
| USERS_TYPE | `Users` |

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

Financial entities represents the financial institutions where your customers keep their money, or something else that helps you modelling the way you manage the accounts of your users.

### List Financial Entities

Fetches a list of financial entities per client, sorted by ID in descending order.

```javascript
FinancialEntities.list([cursor])
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

If a cursor is specified, the list starts with the item that has that ID.

Output:

```console
[
  FinancialEntity {
    id: 1486880,
    dateCreated: 1646262369752,
    lastUpdated: 1646262804911,
    name: "Testk",
    code: "3"
  },
  FinancialEntity {
    id: 1486877,
    dateCreated: 1646259197099,
    lastUpdated: 1646259197099,
    name: "Kunde, Mueller and Brekke",
    code: "UQAUPLY1"
  }
  ...
]

```

### Get Financial Entity

Given a valid financial entity ID, fetches the information of a financial entity.

```javascript
FinancialEntities.get(financialEntityId)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

Output:

```console
FinancialEntity {
  id: 1486880,
  dateCreated: 1646262369752,
  lastUpdated: 1646262804911,
  name: "Testk",
  code: "3"
}

```

### Create Financial Entity

Creates an financial entity. Every client has its own financial entities. Every financial entity code is unique per client. You have to import the Financial Entity Payload Model to create a new one.

```javascript
import { FinancialEntity } from "finerio-pfm-web";

...

const financialEntity = new FinancialEntity(
        "Test National Bank",
        "TEST-NB"
      );

FinancialEntities.create(financialEntity)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

Output:

```console
FinancialEntity {
  id: 1486880,
  dateCreated: 1646262369752,
  lastUpdated: 1646262804911,
  name: "Test National Bank",
  code: "TEST-NB"
}

```

### Update Financial Entity

Given a valid financial entity id updates a financial entity. The new name should not be previously registered. You have to import the Financial Entity Payload Model to update it.

```javascript
import { FinancialEntity } from "finerio-pfm-web";

...

const financialEntity = new FinancialEntity("Test National Bank",
        "TEST-NB-2");

FinancialEntities.update(financialEntityId, financialEntity)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

Output:

```console
FinancialEntity {
  id: 1486880,
  dateCreated: 1646262369752,
  lastUpdated: 1646262904911,
  name: "Test National Bank 2",
  code: "TEST-NB 2"
}

```

### Delete Financial Entity

Deletes a financial entity. All accounts related to this financial entity remain active.

```javascript
FinancialEntities.delete(financialEntityId)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

Output:

```console
204

```

If the financial entity was deleted code 204 will be returned.

### Accounts

An account is the representation of your users' bank accounts.

### List Accounts

Fetches a list of accounts per user, sorted by ID in descending order.

```javascript
Accounts.list(userId, [cursor])
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

The ID of the user that owns the accounts is required. If a cursor is specified, the list starts with the item that has that ID.

Output:

```console
[
  Account {
    id: 2230303,
    dateCreated: 1646243107260,
    lastUpdated: 1646243107260,
    nature: "Mortgage",
    name: "nas",
    number: "1234126312341234",
    balance: 100,
    chargeable: false
  },
  Account {
    id: 1486887,
    dateCreated: 1645212332784,
    lastUpdated: 1645212433106,
    nature: "Investment",
    name: "Investment Account",
    number: "0277",
    balance: 251.03,
    chargeable: false
  }
  ...
]

```

### Get Account

Given a valid account ID, fetches the information of an account.

```javascript
Accounts.get(accountId)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

Output:

```console
Account {
  id: 2230303,
  dateCreated: 1646243107260,
  lastUpdated: 1646243107260,
  nature: "Mortgage",
  name: "nas",
  number: "1234126312341234",
  balance: 100,
  chargeable: false
},

```

### Create Account

Creates an account. A previosuly created user and a financial entity is required. You have to import the Account Payload Model to create a new one.

```javascript
import { Account } from "finerio-pfm-web";

...

const account = new Account(
        1115164,
        743443,
        "Mortgage",
        "Cuenta prueba",
        "1111 1111 1111 1111",
        1000
      );

Accounts.create(account)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

Output:

```console
Account {
  id: 2230303,
  dateCreated: 1646243107260,
  lastUpdated: 1646243107260,
  nature: "Mortgage",
  name: "Cuenta prueba",
  number: "1111 1111 1111 1111",
  balance: 1000,
  chargeable: false
}

```

### Update Account

Updates an account. You have to import the Account Payload Model to update it.

```javascript
import { Account } from "finerio-pfm-web";

...

const account = new Account(
        1115164,
        743443,
        "Mortgage",
        "Cuenta prueba 2",
        "1111 1111 1111 1111",
        1000
      );

Accounts.update(accountId, account)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

Output:

```console
Account {
  id: 2230303,
  dateCreated: 1646243107260,
  lastUpdated: 1646243107260,
  nature: "Mortgage",
  name: "Cuenta prueba 2",
  number: "1111 1111 1111 1111",
  balance: 1000,
  chargeable: false
}

```

### Delete Account

Deletes an account and all its information, including transactions.

```javascript
Accounts.delete(accountId)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

Output:

```console
204

```

If the account was deleted code 204 will be returned.

### Categories

### Transactions

### Budgets

### Insights
