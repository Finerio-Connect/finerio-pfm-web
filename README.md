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
  - [Categories](#categories)
    - [List Categories](#list-categories)
    - [List Categories and Subcategories](#list-categories-and-subcategories)
    - [Get Category](#get-category)
    - [Create Category](#create-category)
    - [Update Category](#update-category)
    - [Delete Category](#delete-category)
  - [Transactions](#transactions)
  - [Budgets](#budgets)
    - [List Budgets](#list-budgets)
    - [Get Budget](#get-budget)
    - [Create Budget](#create-budget)
    - [Update Budget](#update-budget)
    - [Delete Budget](#delete-budget)
  - [Insights](#insights)
    - [Resume](#resume)
    - [Analysis](#analysis)

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
    id: 1115160,
    name: 'Rossie18@gmail.com',
    dateCreated: 1645069610495
  },
  User {
    id: 1115155,
    name: 'Salvador.Nitzsche67@gmail.com',
    dateCreated: 1644967736923
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
  id: 1115162,
  name: 'Henri47@hotmail.com',
  dateCreated: 1645206810630
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
  id: 2230329,
  name: 'test@finerioconnect.com',
  dateCreated: 1647297242399
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
  id: 2230329,
  name: 'testupd@finerioconnect.com',
  dateCreated: 1647297242399
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

FinancialEntities.update(1486880, financialEntity)
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
FinancialEntities.delete(1486880)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

Output:

```console
204

```

If the user was deleted code 204 will be returned.

### Accounts

### Categories

Categories are the classification of transactions and budgets.

### List Categories

Fetches a list of categories, sorted by ID in ascending order. The API is able to fetch up to 100 categories.

```javascript
const userId = 1115162;
Categories.list([userId])
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

If a cursor is specified, the list starts with the item that has that ID. If a user ID is specified, both system and user categories are fetched. If a user ID is not specified, only system categories are fetched.

Output:

```console
[
  Category {
    id: 1,
    name: 'Hogar',
    color: '#A3CB38',
    parentCategoryId: null,
    userId: null,
    dateCreated: null,
    lastUpdated: null
  },
  Category {
    id: 2,
    name: 'Alimentos',
    color: '#FECA46',
    parentCategoryId: null,
    userId: null,
    dateCreated: null,
    lastUpdated: null
  },
  ...
]

```

### List Categories And Subcategories

Fetches a list of categories, sorted by ID in ascending order grouped by parent category and subcategories. The API is able to fetch up to 100 categories.

```javascript
const userId = 1115162;
Categories.listWithSubcategories([userId])
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

If a cursor is specified, the list starts with the item that has that ID. If a user ID is specified, both system and user categories are fetched. If a user ID is not specified, only system categories are fetched.

Output:

```console
[
  ParentCategory {
    id: 1,
    name: 'Hogar',
    color: '#A3CB38',
    parentCategoryId: null,
    userId: null,
    dateCreated: null,
    lastUpdated: null,
    subcategories: [
      [Category], [Category],
      [Category], [Category],
      [Category], [Category],
      [Category], [Category],
      [Category]
    ]
  },
  ParentCategory {
    id: 2,
    name: 'Alimentos',
    color: '#FECA46',
    parentCategoryId: null,
    userId: null,
    dateCreated: null,
    lastUpdated: null,
    subcategories: [ [Category], [Category], [Category] ]
  },
  ...
]

```

### Get Category

Given a valid category ID, fetches the information of a category.

```javascript
const categoryId = 27;
Categories.get(userId)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

Output:

```console
Category {
  id: 27,
  name: 'Otros Auto y Transporte',
  color: '#99ECD8',
  parentCategoryId: 5,
  userId: null,
  dateCreated: null,
  lastUpdated: null
}

```

### Create Category

Creates a category. If a user ID is not specified, the category is considered as a system category. If a parent category ID is specified, the category is considered a subcategory. You have to import the Category Payload Model to update it.

```javascript
import { Category } from "finerio-pfm-web";

...
const name = "Streaming";
const color = "#FF0000";
const parentCategoryId = 1859616;
const category = new Category(name, color, parentCategoryId, [userId]);

Categories.create(category)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

Output:

```console
Category {
  id: 1859620,
  name: 'Streaming',
  color: '#FF0000',
  parentCategoryId: 1859616,
  userId: null,
  dateCreated: 1647380144534,
  lastUpdated: 1647380144534
}
```

### Update Category

Given a valid category id updates a category. You have to import the Category Payload Model to update it.

```javascript
import { Category } from "finerio-pfm-web";

...
const name = "Streaming Test";
const color = "#00FF00";
const parentCategoryId = null;
const category = new Category(name, color, parentCategoryId);

Categories.create(category)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

Output:

```console
Category {
  id: 1859621,
  name: 'Streaming Test',
  color: '#00FF00',
  parentCategoryId: null,
  userId: null,
  dateCreated: 1647380312266,
  lastUpdated: 1647380312266
}

```

### Delete Category

Given a valid category id deletes a category.

```javascript
const categoryId = 1859621;
Categories.delete(categoryId)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

Output:

```console
204

```

If the category was deleted code 204 will be returned.

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
    id: 1486872,
    categoryId: 3,
    name: 'Streaming services',
    amount: 1500,
    warningPercentage: 0.6,
    spent: 0,
    leftToSpend: 1500,
    status: 'ok',
    dateCreated: 1646257102160,
    lastUpdated: 1646257642253
  },
  Budget {
    id: 1486874,
    categoryId: 87,
    name: 'Sports',
    amount: 178.17999267578125,
    warningPercentage: 0.7,
    spent: 0,
    leftToSpend: 178.17999267578125,
    status: 'ok',
    dateCreated: 1646259181915,
    lastUpdated: 1646259181915
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
  id: 1486874,
  categoryId: 87,
  name: 'Sports',
  amount: 178.17999267578125,
  warningPercentage: 0.7,
  spent: 0,
  leftToSpend: 178.17999267578125,
  status: 'ok',
  dateCreated: 1646259181915,
  lastUpdated: 1646259181915
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
  id: 1858596,
  categoryId: 15,
  name: 'Budget Test',
  amount: 5000,
  warningPercentage: 0.5,
  spent: 0,
  leftToSpend: 5000,
  status: 'ok',
  dateCreated: 1647299628041,
  lastUpdated: 1647299628041
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
  id: 1858596,
  categoryId: 16,
  name: 'Budget',
  amount: 5000,
  warningPercentage: 0.5,
  spent: 0,
  leftToSpend: 5000,
  status: 'ok',
  dateCreated: 1647299628041,
  lastUpdated: 1647299628041
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

### Analysis

Given a valid user ID, fetches an analysis of the financial information of a user.

```javascript
const userId = 1115162;
Insights.analysis(userId)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

Output:

```console
[
  Analysis {
    date: 1646114400000,
    categories: [
      {
        categoryId: 12,
        amount: 400,
        average: undefined,
        quantity: undefined,
        subcategories: [
          {
            categoryId: 82,
            amount: 400,
            average: 200,
            quantity: 2,
            transactionsByDate: [],
            transactions: [
              Transaction {
                id: undefined,
                accountId: undefined,
                amount: 400,
                charge: undefined,
                date: undefined,
                description: 'Test',
                categoryId: undefined,
                dateCreated: undefined,
                lastUpdated: undefined,
                average: 200,
                quantity: 2
              }
            ]
          }
         ],
        transactions: []
      }
    ]
  }
]

```

### Resume

Given a valid user ID, fetches a resume of the financial information of a user. It contains expenses, incomes and balances.

```javascript
const userId = 1115162;
Insights.resume(userId)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

Output:

```console
Resume {
  incomes: [
    IncomeExpense {
      date: 1643695200000,
      categories: [
        {
          categoryId: 12,
          amount: 200,
          average: undefined,
          quantity: undefined,
          subcategories: [
            {
              categoryId: 82,
              amount: 200,
              average: undefined,
              quantity: undefined,
              transactionsByDate: [
                {
                  date: 1645596000000,
                  transactions: [
                    {
                      id: 2230310,
                      accountId: undefined,
                      amount: 200,
                      charge: false,
                      date: 1645632564947,
                      description: 'Test',
                      categoryId: null,
                      dateCreated: 1646258563935,
                      lastUpdated: 1646258563935,
                      average: undefined,
                      quantity: undefined
                    }
                  ]
                }
              ],
              transactions: []
            }
          ],
          transactions: []
        }
      ],
      amount: 200
    }
  ],
  expenses: [
    IncomeExpense {
      date: 1646114400000,
      categories: [Array],
      amount: 400
    }
  ],
  balances: [
    Balance { incomes: 200, expenses: 0, date: 1643695200000 },
    Balance { incomes: 0, expenses: 400, date: 1646114400000 }
  ]
}

```
