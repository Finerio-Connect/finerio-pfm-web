require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
class Accounts {
    constructor(fcSdk) {
        this.fcSdk = fcSdk;
        this.path = "/ddde998e39f1892650715c23817c09e102ac1ec4";
    }
    processResponse(response) {
        return new models_1.Account(response);
    }
    processDeleteResponse(status) {
        return status === "" ? 204 : 500;
    }
    processListResponse(response) {
        if (!response.data) {
            return [];
        }
        return response.data.map((account) => new models_1.Account(account));
    }
    get(id) {
        return this.fcSdk.doGet(`${this.path}/${id}`, this.processResponse);
    }
    update(id, updateObject) {
        return this.fcSdk.doPut(`${this.path}/${id}`, updateObject ? updateObject.payload : {}, this.processResponse);
    }
    create(accountToCreate) {
        return this.fcSdk.doPost(this.path, accountToCreate.plainObject, this.processResponse);
    }
    delete(id) {
        return this.fcSdk.doDelete(`${this.path}/${id}`, this.processDeleteResponse);
    }
    list(userId, cursor) {
        const uri = `${this.path}?userId=${userId}${cursor ? `&cursor=${cursor}` : ""}`;
        return this.fcSdk.doGet(uri, this.processListResponse);
    }
}
exports.default = Accounts;

},{"../models":17}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
class Budgets {
    constructor(fcSdk) {
        this.fcSdk = fcSdk;
        this.path = "/205e33ba58fee3ee07ef1a8cccc4ba9b97d3caf2";
    }
    get(id) {
        const uri = `${this.path}/${id}`;
        return this.fcSdk.doGet(uri, this.processResponse);
    }
    update(id, updateObject) {
        const uri = `${this.path}/${id}`;
        return this.fcSdk.doPut(uri, updateObject.plainObject, this.processResponse);
    }
    create(createBudget) {
        const uri = `${this.path}`;
        return this.fcSdk.doPost(uri, createBudget.plainObject, this.processResponse);
    }
    processResponse(response) {
        return new models_1.Budget(response);
    }
    delete(id) {
        const uri = `${this.path}/${id}`;
        return this.fcSdk.doDelete(uri, this.processDeleteResponse);
    }
    processDeleteResponse(status) {
        return status === "" ? 204 : 500;
    }
    list(userId) {
        const uri = `${this.path}${`?userId=${userId}`}`;
        return this.fcSdk.doGet(uri, this.processlistResponse);
    }
    processlistResponse(response) {
        return response.data
            ? response.data.reverse().map((bud) => new models_1.Budget(bud))
            : [];
    }
}
exports.default = Budgets;

},{"../models":17}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
class Categories {
    constructor(fcSdk) {
        this.fcSdk = fcSdk;
        this.path = "/b07db4dc65bda086ae37ffeb8e03a126b18ffa6f";
    }
    get(id) {
        const uri = `${this.path}/${id}`;
        return this.fcSdk.doGet(uri, this.processResponse);
    }
    update(id, updateObject) {
        const uri = `${this.path}/${id}`;
        return this.fcSdk.doPut(uri, updateObject.plainObject, this.processResponse);
    }
    create(createCategory) {
        const uri = `${this.path}`;
        return this.fcSdk.doPost(uri, createCategory.plainObject, this.processResponse);
    }
    processResponse(response) {
        return new models_1.Category(response);
    }
    delete(id) {
        const uri = `${this.path}/${id}`;
        return this.fcSdk.doDelete(uri, this.processDeleteResponse);
    }
    processDeleteResponse(status) {
        return status === "" ? 204 : 500;
    }
    list(userId, cursor = 1) {
        const uri = `${this.path}${userId ? `?userId=${userId}&cursor=${cursor}` : ""}`;
        return this.fcSdk.doGet(uri, this.processlistResponse);
    }
    processlistResponse(response) {
        return response.data
            ? response.data.reverse().map((cat) => new models_1.Category(cat))
            : [];
    }
    listWithSubcategories(userId, cursor = 1) {
        const uri = `${this.path}${userId ? `?userId=${userId}&cursor=${cursor}` : ""}`;
        return this.fcSdk.doGet(uri, this.processListWithSubcategoriesResponse);
    }
    processListWithSubcategoriesResponse(response) {
        let categories = [];
        if (response.data) {
            const catsOrd = response.data.reverse();
            categories = catsOrd
                .filter((cat) => !cat.parentCategoryId)
                .map((cat) => new models_1.ParentCategory(cat));
            categories.forEach((parcat) => {
                parcat.subcategories = catsOrd
                    .filter((rescat) => rescat.parentCategoryId === parcat.id)
                    .map((cat) => new models_1.Category(cat));
            });
        }
        return categories;
    }
}
exports.default = Categories;

},{"../models":17}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USERS_TYPE = exports.INSIGHTS_TYPE = exports.BUDGET_TYPE = exports.TRANSACTION_TYPE = exports.FINANCIAL_ENTITY_TYPE = exports.CATEGORY_TYPE = exports.ACCOUNT_TYPE = exports.SERVER_URL = void 0;
exports.SERVER_URL = "https://pfm-api-sandbox.finerioconnect.com";
exports.ACCOUNT_TYPE = "PFM_SDK/ACCOUNT_TYPE";
exports.CATEGORY_TYPE = "PFM_SDK/CATEGORY_TYPE";
exports.FINANCIAL_ENTITY_TYPE = "PFM_SDK/FINANCIAL_ENTITY_TYPE";
exports.TRANSACTION_TYPE = "PFM_SDK/TRANSACTION_TYPE";
exports.BUDGET_TYPE = "PFM_SDK/BUDGET_TYPE";
exports.INSIGHTS_TYPE = "PFM_SDK/INSIGHTS_TYPE";
exports.USERS_TYPE = "PFM_SDK/USERS_TYPE";

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Error {
    constructor(code, title, detail) {
        this.code = code;
        this.title = title;
        this.detail = detail;
    }
}
exports.default = Error;

},{}],6:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Error_1 = __importDefault(require("./Error"));
exports.default = Error_1.default;

},{"./Error":5}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
class FinancialEntities {
    constructor(fcSdk) {
        this.fcSdk = fcSdk;
        this.path = "/9d83483fad268a4d685f3e60c01ab804121113a9";
    }
    processResponse(response) {
        return new models_1.FinancialEntity(response);
    }
    processDeleteResponse(status) {
        return status === "" ? 204 : 500;
    }
    processListResponse(response) {
        if (!response.data) {
            return [];
        }
        return response.data.map((financialEntity) => new models_1.FinancialEntity(financialEntity));
    }
    get(id) {
        return this.fcSdk.doGet(`${this.path}/${id}`, this.processResponse);
    }
    update(id, updateObject) {
        return this.fcSdk.doPut(`${this.path}/${id}`, updateObject ? updateObject.payload : {}, this.processResponse);
    }
    create(financialEntityToCreate) {
        return this.fcSdk.doPost(this.path, financialEntityToCreate.plainObject, this.processResponse);
    }
    delete(id) {
        return this.fcSdk.doDelete(`${this.path}/${id}`, this.processDeleteResponse);
    }
    list(cursor) {
        const uri = `${this.path}${cursor ? `?cursor=${cursor}` : ""}`;
        return this.fcSdk.doGet(uri, this.processListResponse);
    }
}
exports.default = FinancialEntities;

},{"../models":17}],8:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const error_1 = __importDefault(require("../error"));
const constants_1 = require("../constants");
const Categories_1 = __importDefault(require("../categories/Categories"));
const Budgets_1 = __importDefault(require("../budgets/Budgets"));
const accounts_1 = __importDefault(require("../accounts"));
const financialEntities_1 = __importDefault(require("../financialEntities"));
const Transactions_1 = __importDefault(require("../transactions/Transactions"));
const Insights_1 = __importDefault(require("../insights/Insights"));
const Users_1 = __importDefault(require("../users/Users"));
const getIncludedClasses = (includes) => {
    if (includes) {
        if (Array.isArray(includes)) {
            return includes;
        }
        if (typeof includes === "string") {
            return [includes];
        }
    }
    return [];
};
class FinerioConnectSDK {
    constructor(includes) {
        this._includedClasses = getIncludedClasses(includes);
        this._apiKey = "";
        this._serverUrl = constants_1.SERVER_URL;
        this._headers = {};
    }
    connect(apiKey) {
        this._apiKey = apiKey;
        this._headers = Object.assign(Object.assign({}, this._headers), { "Api-Key": apiKey });
        if (this._includedClasses.length) {
            return this._includedClasses.reduce((acc, current) => {
                switch (current) {
                    case constants_1.ACCOUNT_TYPE:
                        return Object.assign(Object.assign({}, acc), { Accounts: new accounts_1.default(this) });
                    case constants_1.CATEGORY_TYPE:
                        return Object.assign(Object.assign({}, acc), { Categories: new Categories_1.default(this) });
                    case constants_1.BUDGET_TYPE:
                        return Object.assign(Object.assign({}, acc), { Budgets: new Budgets_1.default(this) });
                    case constants_1.FINANCIAL_ENTITY_TYPE:
                        return Object.assign(Object.assign({}, acc), { FinancialEntities: new financialEntities_1.default(this) });
                    case constants_1.TRANSACTION_TYPE:
                        return Object.assign(Object.assign({}, acc), { Transactions: new Transactions_1.default(this) });
                    case constants_1.INSIGHTS_TYPE:
                        return Object.assign(Object.assign({}, acc), { Insights: new Insights_1.default(this) });
                    case constants_1.USERS_TYPE:
                        return Object.assign(Object.assign({}, acc), { Users: new Users_1.default(this) });
                    default:
                        return acc;
                }
            }, {});
        }
        return {
            Accounts: new accounts_1.default(this),
            Categories: new Categories_1.default(this),
            FinancialEntities: new financialEntities_1.default(this),
            Transactions: new Transactions_1.default(this),
            Budgets: new Budgets_1.default(this),
            Insights: new Insights_1.default(this),
            Users: new Users_1.default(this),
        };
    }
    get apiKey() {
        return this._apiKey;
    }
    get serverUrl() {
        return this._serverUrl;
    }
    doGet(uri, success) {
        const url = `${this._serverUrl}${uri}`;
        return new Promise((resolve, reject) => {
            axios_1.default
                .get(url, { headers: this._headers })
                .then((response) => resolve(success(response.data)))
                .catch((error) => this.processErrors(error, reject));
        });
    }
    doPost(uri, body, success) {
        const url = `${this._serverUrl}${uri}`;
        return new Promise((resolve, reject) => {
            axios_1.default
                .post(url, body, {
                headers: this._headers,
            })
                .then((response) => resolve(success(response.data)))
                .catch((error) => this.processErrors(error, reject));
        });
    }
    doPut(uri, body, success) {
        const url = `${this._serverUrl}${uri}`;
        return new Promise((resolve, reject) => {
            axios_1.default
                .put(url, body, { headers: this._headers })
                .then((response) => resolve(success(response.data)))
                .catch((error) => this.processErrors(error, reject));
        });
    }
    doDelete(uri, success) {
        const url = `${this._serverUrl}${uri}`;
        return new Promise((resolve, reject) => {
            axios_1.default
                .delete(url, { headers: this._headers })
                .then((response) => resolve(success(response.data)))
                .catch((error) => this.processErrors(error, reject));
        });
    }
    processErrors(error, reject) {
        var _a;
        if (error.response &&
            error.response.data &&
            error.response.status !== 500) {
            reject(this.createErrorBadRequest((_a = error.response) === null || _a === void 0 ? void 0 : _a.data));
        }
        else if (error.response && error.response.status) {
            reject(this.createErrorResObject(error));
        }
        else {
            reject(this.createErrorObject(error));
        }
    }
    createErrorBadRequest(errors) {
        const errorsList = [];
        errors.errors.forEach((error) => {
            errorsList.push(new error_1.default(error.code, error.title, error.detail));
        });
        return errorsList;
    }
    createErrorResObject(axiosError) {
        const { response: error } = axiosError;
        return new error_1.default(`${error.status}`, error.statusText, error.status === 404 ? "The item you requested was not found" : "");
    }
    createErrorObject(error) {
        return new error_1.default(`${error.code}`, "", "");
    }
}
exports.default = FinerioConnectSDK;

},{"../accounts":1,"../budgets/Budgets":2,"../categories/Categories":3,"../constants":4,"../error":6,"../financialEntities":7,"../insights/Insights":9,"../transactions/Transactions":32,"../users/Users":33,"axios":34}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
class Insights {
    constructor(fcSdk) {
        this.fcSdk = fcSdk;
        this.resumePath = "/f4f8faab7f280eaf05fc812c285c7902f6a6d05a";
        this.analysisPath = "/824aa15eed3dfc815bd0bec5c34354d471a44557";
    }
    resume(userId, accountId, dateFrom, dateTo) {
        const uri = `${this.resumePath}?userId=${userId}${accountId ? `?accountId=${accountId}` : ""}${dateFrom ? `?dateFrom=${dateFrom}` : ""}${dateTo ? `?accountId=${dateTo}` : ""}`;
        return this.fcSdk.doGet(uri, this.processResumeResponse);
    }
    processResumeResponse(response) {
        return new models_1.Resume(response);
    }
    analysis(userId, accountId, dateFrom, dateTo) {
        const uri = `${this.analysisPath}?userId=${userId}${accountId ? `?accountId=${accountId}` : ""}${dateFrom ? `?dateFrom=${dateFrom}` : ""}${dateTo ? `?accountId=${dateTo}` : ""}`;
        return this.fcSdk.doGet(uri, this.processAnalysisResponse);
    }
    processAnalysisResponse(response) {
        return response.data.map((res) => new models_1.Analysis(res));
    }
}
exports.default = Insights;

},{"../models":17}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Account {
    constructor({ id, nature, name, number, balance, chargeable, dateCreated, lastUpdated, }) {
        this._id = id;
        this._nature = nature;
        this._name = name;
        this._number = number;
        this._balance = balance;
        this._chargeable = chargeable;
        this._dateCreated = dateCreated ? new Date(dateCreated) : null;
        this._lastUpdated = lastUpdated ? new Date(lastUpdated) : null;
    }
    get id() {
        return this._id;
    }
    get nature() {
        return this._nature;
    }
    set nature(value) {
        this._nature = value;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get number() {
        return this._number;
    }
    set number(value) {
        this._number = value;
    }
    get balance() {
        return this._balance;
    }
    set balance(value) {
        this._balance = value;
    }
    get chargeable() {
        return this._chargeable;
    }
    set chargeable(value) {
        this._chargeable = value;
    }
    get dateCreated() {
        return this._dateCreated;
    }
    get lastUpdated() {
        return this._lastUpdated;
    }
    get payload() {
        return {
            nature: this._nature,
            name: this._name,
            number: this._number,
            balance: this._balance,
        };
    }
    get toJSON() {
        return {
            id: this._id,
            nature: this._nature,
            name: this._name,
            number: this._number,
            balance: this._balance,
            chargeable: this._chargeable,
            dateCreated: this._dateCreated && this._dateCreated.getTime() / 1000,
            lastUpdated: this.lastUpdated && this.lastUpdated.getTime() / 1000,
        };
    }
}
exports.default = Account;

},{}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Budget {
    constructor({ id, categoryId, name, amount, warningPercentage, spent, leftToSpend, status, dateCreated, lastUpdated, }) {
        this._id = id;
        this._categoryId = categoryId;
        this._name = name;
        this._amount = amount;
        this._warningPercentage = warningPercentage;
        this._spent = spent;
        this._leftToSpend = leftToSpend;
        this._status = status;
        this._dateCreated = dateCreated;
        this._lastUpdated = lastUpdated;
    }
    get id() {
        return this._id;
    }
    get categoryId() {
        return this._categoryId;
    }
    get name() {
        return this._name;
    }
    get amount() {
        return this._amount;
    }
    get warningPercentage() {
        return this._warningPercentage;
    }
    get spent() {
        return this._spent;
    }
    get leftToSpend() {
        return this._leftToSpend;
    }
    get status() {
        return this._status;
    }
    get dateCreated() {
        return this._dateCreated;
    }
    get lastUpdated() {
        return this._lastUpdated;
    }
    get plainObject() {
        return {
            id: this._id,
            categoryId: this._categoryId,
            name: this._name,
            amount: this._amount,
            warningPercentage: this._warningPercentage,
            spent: this._spent,
            leftToSpend: this._leftToSpend,
            status: this._status,
            dateCreated: this._dateCreated,
            lastUpdated: this._lastUpdated,
        };
    }
}
exports.default = Budget;

},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FinancialEntity {
    constructor({ id, name, code, dateCreated, lastUpdated, }) {
        this._id = id;
        this._name = name;
        this._code = code;
        this._dateCreated = dateCreated ? new Date(dateCreated) : null;
        this._lastUpdated = lastUpdated ? new Date(lastUpdated) : null;
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get code() {
        return this._code;
    }
    set code(value) {
        this._code = value;
    }
    get dateCreated() {
        return this._dateCreated;
    }
    get lastUpdated() {
        return this._lastUpdated;
    }
    get payload() {
        return {
            name: this._name,
            code: this._code,
        };
    }
    get toJSON() {
        return {
            id: this._id,
            name: this._name,
            code: this._code,
            dateCreated: this._dateCreated && this._dateCreated.getTime() / 1000,
            lastUpdated: this.lastUpdated && this.lastUpdated.getTime() / 1000,
        };
    }
}
exports.default = FinancialEntity;

},{}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Transaction {
    constructor({ id, accountId, amount, categoryId, charge, date, dateCreated, description, lastUpdated, average, quantity, }) {
        this._id = id;
        this._accountId = accountId;
        this._amount = amount;
        this._charge = charge;
        this._date = date;
        this._description = description;
        this._categoryId = categoryId;
        this._dateCreated = dateCreated;
        this._lastUpdated = lastUpdated;
        this._average = average;
        this._quantity = quantity;
    }
    get id() {
        return this._id;
    }
    get charge() {
        return this._charge;
    }
    set charge(value) {
        this._charge = value;
    }
    get date() {
        return this._date;
    }
    set date(value) {
        this._date = value;
    }
    get dateCreated() {
        return this._dateCreated;
    }
    get description() {
        return this._description;
    }
    get amount() {
        return this._amount;
    }
    get categoryId() {
        return this._categoryId;
    }
    get accountId() {
        return this._accountId;
    }
    set accountId(value) {
        this._accountId = value;
    }
    get lastUpdated() {
        return this._lastUpdated;
    }
    get average() {
        return this._average;
    }
    get quantity() {
        return this._quantity;
    }
    get plainObject() {
        return {
            id: this._id,
            amount: this._amount,
            categoryId: this._categoryId,
            charge: this._charge,
            date: this._date,
            description: this._description,
            dateCreated: this._dateCreated,
            lastUpdated: this.lastUpdated,
        };
    }
}
exports.default = Transaction;

},{}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor({ id, name, dateCreated }) {
        this._id = id;
        this._name = name;
        this._dateCreated = dateCreated;
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get dateCreated() {
        return this._dateCreated;
    }
    get plainObject() {
        return {
            id: this._id,
            name: this._name,
            dateCreated: this._dateCreated,
        };
    }
}
exports.default = User;

},{}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Category {
    constructor({ id, name, color, parentCategoryId, userId, dateCreated, lastUpdated, }) {
        this._id = id;
        this._name = name;
        this._color = color;
        this._parentCategoryId = parentCategoryId;
        this._userId = userId;
        this._dateCreated = dateCreated;
        this._lastUpdated = lastUpdated;
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get color() {
        return this._color;
    }
    get parentCategoryId() {
        return this._parentCategoryId;
    }
    get userId() {
        return this._userId;
    }
    get dateCreated() {
        return this._dateCreated;
    }
    get lastUpdated() {
        return this._lastUpdated;
    }
    get plainObject() {
        return {
            id: this._id,
            name: this._name,
            color: this._color,
            parentCategoryId: this._parentCategoryId,
            userId: this._userId,
            dateCreated: this._dateCreated,
            lastUpdated: this._lastUpdated,
        };
    }
}
exports.default = Category;

},{}],16:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Category_1 = __importDefault(require("./Category"));
class ParentCategory extends Category_1.default {
    constructor({ id, name, color, parentCategoryId, userId, dateCreated, lastUpdated, }, subcategories = []) {
        super({
            id,
            name,
            color,
            parentCategoryId,
            userId,
            dateCreated,
            lastUpdated,
        });
        this._subcategories = subcategories;
    }
    get subcategories() {
        return this._subcategories;
    }
    set subcategories(subcategories) {
        this._subcategories = subcategories;
    }
}
exports.default = ParentCategory;

},{"./Category":15}],17:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Analysis = exports.Resume = exports.Budget = exports.Transaction = exports.ParentCategory = exports.FinancialEntity = exports.Category = exports.Account = void 0;
var Account_1 = require("./Account");
Object.defineProperty(exports, "Account", { enumerable: true, get: function () { return __importDefault(Account_1).default; } });
var Category_1 = require("./category/Category");
Object.defineProperty(exports, "Category", { enumerable: true, get: function () { return __importDefault(Category_1).default; } });
var FinancialEntity_1 = require("./FinancialEntity");
Object.defineProperty(exports, "FinancialEntity", { enumerable: true, get: function () { return __importDefault(FinancialEntity_1).default; } });
var ParentCategory_1 = require("./category/ParentCategory");
Object.defineProperty(exports, "ParentCategory", { enumerable: true, get: function () { return __importDefault(ParentCategory_1).default; } });
var Transaction_1 = require("./Transaction");
Object.defineProperty(exports, "Transaction", { enumerable: true, get: function () { return __importDefault(Transaction_1).default; } });
var Budget_1 = require("./Budget");
Object.defineProperty(exports, "Budget", { enumerable: true, get: function () { return __importDefault(Budget_1).default; } });
var Resume_1 = require("./insights/Resume");
Object.defineProperty(exports, "Resume", { enumerable: true, get: function () { return __importDefault(Resume_1).default; } });
var Analysis_1 = require("./insights/Analysis");
Object.defineProperty(exports, "Analysis", { enumerable: true, get: function () { return __importDefault(Analysis_1).default; } });
var User_1 = require("./User");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return __importDefault(User_1).default; } });

},{"./Account":10,"./Budget":11,"./FinancialEntity":12,"./Transaction":13,"./User":14,"./category/Category":15,"./category/ParentCategory":16,"./insights/Analysis":18,"./insights/Resume":22}],18:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CategoryInsights_1 = __importDefault(require("./CategoryInsights"));
class Analysis {
    constructor({ date, categories }) {
        this._date = date;
        this._categories = categories.map((cat) => new CategoryInsights_1.default(cat));
    }
    get date() {
        return this._date;
    }
    get categories() {
        return this._categories;
    }
}
exports.default = Analysis;

},{"./CategoryInsights":20}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Balance {
    constructor({ date, incomes, expenses }) {
        this._incomes = incomes;
        this._expenses = expenses;
        this._date = date;
    }
    get date() {
        return this._date;
    }
    set date(date) {
        this._date = date;
    }
    get incomes() {
        return this._incomes;
    }
    set incomes(incomes) {
        this._incomes = incomes;
    }
    get expenses() {
        return this._expenses;
    }
    set expenses(expenses) {
        this._expenses = expenses;
    }
}
exports.default = Balance;

},{}],20:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Transaction_1 = __importDefault(require("../Transaction"));
const Subcategory_1 = __importDefault(require("./Subcategory"));
class CategoryInsights {
    constructor({ categoryId, amount, average, quantity, subcategories, transactions, }) {
        this._categoryId = categoryId;
        this._amount = amount;
        this._average = average;
        this._quantity = quantity;
        this._subcategories = subcategories
            ? subcategories.map((subcat) => new Subcategory_1.default(subcat))
            : [];
        this._transactions = transactions
            ? transactions.map((transaction) => new Transaction_1.default(transaction))
            : [];
    }
    get categoryId() {
        return this._categoryId;
    }
    get amount() {
        return this._amount;
    }
    get average() {
        return this._average;
    }
    get quantity() {
        return this._quantity;
    }
    get subcategories() {
        return this._subcategories;
    }
    get transactions() {
        return this._transactions;
    }
}
exports.default = CategoryInsights;

},{"../Transaction":13,"./Subcategory":23}],21:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CategoryInsights_1 = __importDefault(require("./CategoryInsights"));
class IncomeExpense {
    constructor({ date, categories, amount }) {
        this._date = date;
        this._categories = categories.map((cat) => new CategoryInsights_1.default(cat));
        this._amount = amount;
    }
    get date() {
        return this._date;
    }
    get categories() {
        return this._categories;
    }
    get amount() {
        return this._amount;
    }
}
exports.default = IncomeExpense;

},{"./CategoryInsights":20}],22:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Balance_1 = __importDefault(require("./Balance"));
const IncomeExpense_1 = __importDefault(require("./IncomeExpense"));
class Resume {
    constructor({ incomes, expenses, balances }) {
        this._incomes = incomes.map((income) => new IncomeExpense_1.default(income));
        this._expenses = expenses.map((expense) => new IncomeExpense_1.default(expense));
        this._balances = balances.map((balance) => new Balance_1.default(balance));
    }
    get incomes() {
        return this._incomes;
    }
    get expenses() {
        return this._expenses;
    }
    get balances() {
        return this._balances;
    }
}
exports.default = Resume;

},{"./Balance":19,"./IncomeExpense":21}],23:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Transaction_1 = __importDefault(require("../Transaction"));
const TransactionsByDate_1 = __importDefault(require("./TransactionsByDate"));
class Subcategory {
    constructor({ categoryId, amount, average, quantity, transactionsByDate, transactions, }) {
        this._categoryId = categoryId;
        this._amount = amount;
        this._average = average;
        this._quantity = quantity;
        this._transactionsByDate = transactionsByDate
            ? transactionsByDate.map((transaction) => new TransactionsByDate_1.default(transaction))
            : [];
        this._transactions = transactions
            ? transactions.map((transaction) => new Transaction_1.default(transaction))
            : [];
    }
    get categoryId() {
        return this._categoryId;
    }
    get amount() {
        return this._amount;
    }
    get average() {
        return this._average;
    }
    get quantity() {
        return this._quantity;
    }
    get transactionsByDate() {
        return this._transactionsByDate;
    }
    get transactions() {
        return this._transactions;
    }
}
exports.default = Subcategory;

},{"../Transaction":13,"./TransactionsByDate":24}],24:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Transaction_1 = __importDefault(require("../Transaction"));
class TransactionsByDate {
    constructor({ date, transactions }) {
        this._date = date;
        this._transactions = transactions.map((transaction) => new Transaction_1.default(transaction));
    }
    get date() {
        return this._date;
    }
    get transactions() {
        return this._transactions;
    }
}
exports.default = TransactionsByDate;

},{"../Transaction":13}],25:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AccountPayload {
    constructor(_userId, _financialEntityId, _nature, _name, _number, _balance) {
        this._userId = _userId;
        this._financialEntityId = _financialEntityId;
        this._nature = _nature;
        this._name = _name;
        this._number = _number;
        this._balance = _balance;
    }
    get userId() {
        return this._userId;
    }
    set userId(value) {
        this._userId = value;
    }
    get financialEntityId() {
        return this._financialEntityId;
    }
    set financialEntityId(value) {
        this._financialEntityId = value;
    }
    get nature() {
        return this._nature;
    }
    set nature(value) {
        this._nature = value;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get number() {
        return this._number;
    }
    set number(value) {
        this._number = value;
    }
    get balance() {
        return this._balance;
    }
    set balance(value) {
        this._balance = value;
    }
    get plainObject() {
        return {
            userId: this._userId,
            financialEntityId: this._financialEntityId,
            nature: this._nature,
            name: this._name,
            number: this._number,
            balance: this._balance,
        };
    }
}
exports.default = AccountPayload;

},{}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BudgetPayload {
    constructor(_categoryId, _name, _amount, _warningPercentage, _userId) {
        this._categoryId = _categoryId;
        this._name = _name;
        this._amount = _amount;
        this._warningPercentage = _warningPercentage;
        this._userId = _userId;
    }
    get categoryId() {
        return this._categoryId;
    }
    set categoryId(categoryId) {
        this._categoryId = categoryId;
    }
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }
    get amount() {
        return this._amount;
    }
    set amount(amount) {
        this._amount = amount;
    }
    get warningPercentage() {
        return this._warningPercentage;
    }
    set warningPercentage(warningPercentage) {
        this._warningPercentage = warningPercentage;
    }
    get userId() {
        return this._userId;
    }
    set userId(userId) {
        this._userId = userId;
    }
    get plainObject() {
        return {
            categoryId: this._categoryId,
            name: this._name,
            amount: this._amount,
            warningPercentage: this.warningPercentage,
            userId: this.userId,
        };
    }
}
exports.default = BudgetPayload;

},{}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CategoryPayload {
    constructor(_name, _color, _parentCategoryId, _userId) {
        this._name = _name;
        this._color = _color;
        this._parentCategoryId = _parentCategoryId;
        this._userId = _userId;
    }
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }
    get color() {
        return this._color;
    }
    set color(color) {
        this._color = color;
    }
    get parentCategoryId() {
        return this._parentCategoryId;
    }
    set parentCategoryId(parentCategoryId) {
        this._parentCategoryId = parentCategoryId;
    }
    get userId() {
        return this._userId;
    }
    set userId(userId) {
        this._userId = userId;
    }
    get plainObject() {
        return {
            name: this._name,
            color: this._color,
            parentCategoryId: this._parentCategoryId,
            userId: this._userId,
        };
    }
}
exports.default = CategoryPayload;

},{}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FinancialEntityPayload {
    constructor(_name, _code) {
        this._name = _name;
        this._code = _code;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get code() {
        return this._code;
    }
    set code(value) {
        this._code = value;
    }
    get plainObject() {
        return {
            name: this._name,
            code: this._code,
        };
    }
}
exports.default = FinancialEntityPayload;

},{}],29:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TransactionPayload {
    constructor(_accountId, _date, _charge, _description, _amount, _categoryId) {
        this._accountId = _accountId;
        this._date = _date;
        this._charge = _charge;
        this._description = _description;
        this._amount = _amount;
        this._categoryId = _categoryId;
    }
    get charge() {
        return this._charge;
    }
    set charge(value) {
        this._charge = value;
    }
    get date() {
        return this._date;
    }
    set date(value) {
        this._date = value;
    }
    get description() {
        return this._description;
    }
    get amount() {
        return this._amount;
    }
    get categoryId() {
        return this._categoryId;
    }
    get accountId() {
        return this._accountId;
    }
    set accountId(value) {
        this._accountId = value;
    }
    get plainObject() {
        return {
            accountId: this._accountId,
            amount: this._amount,
            categoryId: this._categoryId,
            charge: this._charge,
            date: this._date.getTime() / 1000,
            description: this._description,
        };
    }
}
exports.default = TransactionPayload;

},{}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserPayload {
    constructor(_name) {
        this._name = _name;
    }
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }
    get plainObject() {
        return {
            name: this._name,
        };
    }
}
exports.default = UserPayload;

},{}],31:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPayload = exports.TransactionPayload = exports.FinancialEntityPayload = exports.BudgetPayload = exports.CategoryPayload = exports.AccountPayload = void 0;
var AccountPayload_1 = require("./AccountPayload");
Object.defineProperty(exports, "AccountPayload", { enumerable: true, get: function () { return __importDefault(AccountPayload_1).default; } });
var CategoryPayload_1 = require("./CategoryPayload");
Object.defineProperty(exports, "CategoryPayload", { enumerable: true, get: function () { return __importDefault(CategoryPayload_1).default; } });
var BudgetPayload_1 = require("./BudgetPayload");
Object.defineProperty(exports, "BudgetPayload", { enumerable: true, get: function () { return __importDefault(BudgetPayload_1).default; } });
var FinancialEntityPayload_1 = require("./FinancialEntityPayload");
Object.defineProperty(exports, "FinancialEntityPayload", { enumerable: true, get: function () { return __importDefault(FinancialEntityPayload_1).default; } });
var TransactionPayload_1 = require("./TransactionPayload");
Object.defineProperty(exports, "TransactionPayload", { enumerable: true, get: function () { return __importDefault(TransactionPayload_1).default; } });
var UserPayload_1 = require("./UserPayload");
Object.defineProperty(exports, "UserPayload", { enumerable: true, get: function () { return __importDefault(UserPayload_1).default; } });

},{"./AccountPayload":25,"./BudgetPayload":26,"./CategoryPayload":27,"./FinancialEntityPayload":28,"./TransactionPayload":29,"./UserPayload":30}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
class Transactions {
    constructor(fcSdk) {
        this.fcSdk = fcSdk;
        this.path = "/cc6ba13e82dbaf4505ae7324c0c151aa53622329";
    }
    processResponse(response) {
        return new models_1.Transaction(response);
    }
    processDeleteResponse(status) {
        return status === "" ? 204 : 500;
    }
    processListResponseBuild(accountId) {
        return (response) => {
            if (!response.data) {
                return [];
            }
            return response.data.map((transaction) => new models_1.Transaction(Object.assign(Object.assign({}, transaction), { accountId })));
        };
    }
    /*  */
    get(id) {
        return this.fcSdk.doGet(`${this.path}/${id}`, this.processResponse);
    }
    update(id, updateObject) {
        return this.fcSdk.doPut(`${this.path}/${id}`, updateObject ? updateObject.plainObject : {}, this.processResponse);
    }
    create(transactionToCreate) {
        return this.fcSdk.doPost(this.path, transactionToCreate.plainObject, this.processResponse);
    }
    delete(id) {
        return this.fcSdk.doDelete(`${this.path}/${id}`, this.processDeleteResponse);
    }
    list(accountId, listOptions) {
        const uri = `${this.path}?accountId=${accountId}`;
        if (!listOptions) {
            return this.fcSdk.doGet(uri, this.processListResponseBuild(accountId));
        }
        const { minAmount, maxAmount, dateFrom, dateTo, cursor } = listOptions;
        const newUri = `${uri}${minAmount ? `&minAmount=${minAmount}` : ""}${maxAmount ? `&maxAmount=${maxAmount}` : ""}${dateFrom ? `&dateFrom=${dateFrom}` : ""}${dateTo ? `&dateTo=${dateTo}` : ""}${cursor ? `&cursor=${cursor}` : ""}`;
        return this.fcSdk.doGet(newUri, this.processListResponseBuild(accountId));
    }
}
exports.default = Transactions;

},{"../models":17}],33:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
class Users {
    constructor(fcSdk) {
        this.fcSdk = fcSdk;
        this.path = "/00611e5e13b4853ed35571e62220ab1542c3678c";
    }
    get(id) {
        const uri = `${this.path}/${id}`;
        return this.fcSdk.doGet(uri, this.processResponse);
    }
    update(id, updateObject) {
        const uri = `${this.path}/${id}`;
        return this.fcSdk.doPut(uri, updateObject.plainObject, this.processResponse);
    }
    create(createUser) {
        const uri = `${this.path}`;
        return this.fcSdk.doPost(uri, createUser.plainObject, this.processResponse);
    }
    processResponse(response) {
        return new models_1.User(response);
    }
    delete(id) {
        const uri = `${this.path}/${id}`;
        return this.fcSdk.doDelete(uri, this.processDeleteResponse);
    }
    processDeleteResponse(status) {
        return status === "" ? 204 : 500;
    }
    list(cursor = 0) {
        const uri = `${this.path}${`?cursor=${cursor}`}`;
        return this.fcSdk.doGet(uri, this.processlistResponse);
    }
    processlistResponse(response) {
        return response.data ? response.data.map((user) => new models_1.User(user)) : [];
    }
}
exports.default = Users;

},{"../models":17}],34:[function(require,module,exports){
module.exports = require('./lib/axios');
},{"./lib/axios":36}],35:[function(require,module,exports){
'use strict';

var utils = require('./../utils');
var settle = require('./../core/settle');
var cookies = require('./../helpers/cookies');
var buildURL = require('./../helpers/buildURL');
var buildFullPath = require('../core/buildFullPath');
var parseHeaders = require('./../helpers/parseHeaders');
var isURLSameOrigin = require('./../helpers/isURLSameOrigin');
var createError = require('../core/createError');
var defaults = require('../defaults');
var Cancel = require('../cancel/Cancel');

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;
    var responseType = config.responseType;
    var onCanceled;
    function done() {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(onCanceled);
      }

      if (config.signal) {
        config.signal.removeEventListener('abort', onCanceled);
      }
    }

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !responseType || responseType === 'text' ||  responseType === 'json' ?
        request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);

      // Clean up request
      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
      var transitional = config.transitional || defaults.transitional;
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(
        timeoutErrorMessage,
        config,
        transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken || config.signal) {
      // Handle cancellation
      // eslint-disable-next-line func-names
      onCanceled = function(cancel) {
        if (!request) {
          return;
        }
        reject(!cancel || (cancel && cancel.type) ? new Cancel('canceled') : cancel);
        request.abort();
        request = null;
      };

      config.cancelToken && config.cancelToken.subscribe(onCanceled);
      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
      }
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

},{"../cancel/Cancel":37,"../core/buildFullPath":42,"../core/createError":43,"../defaults":49,"./../core/settle":47,"./../helpers/buildURL":52,"./../helpers/cookies":54,"./../helpers/isURLSameOrigin":57,"./../helpers/parseHeaders":59,"./../utils":62}],36:[function(require,module,exports){
'use strict';

var utils = require('./utils');
var bind = require('./helpers/bind');
var Axios = require('./core/Axios');
var mergeConfig = require('./core/mergeConfig');
var defaults = require('./defaults');

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  // Factory for creating new instances
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Expose Cancel & CancelToken
axios.Cancel = require('./cancel/Cancel');
axios.CancelToken = require('./cancel/CancelToken');
axios.isCancel = require('./cancel/isCancel');
axios.VERSION = require('./env/data').version;

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = require('./helpers/spread');

// Expose isAxiosError
axios.isAxiosError = require('./helpers/isAxiosError');

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;

},{"./cancel/Cancel":37,"./cancel/CancelToken":38,"./cancel/isCancel":39,"./core/Axios":40,"./core/mergeConfig":46,"./defaults":49,"./env/data":50,"./helpers/bind":51,"./helpers/isAxiosError":56,"./helpers/spread":60,"./utils":62}],37:[function(require,module,exports){
'use strict';

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;

},{}],38:[function(require,module,exports){
'use strict';

var Cancel = require('./Cancel');

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;

  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;

  // eslint-disable-next-line func-names
  this.promise.then(function(cancel) {
    if (!token._listeners) return;

    var i;
    var l = token._listeners.length;

    for (i = 0; i < l; i++) {
      token._listeners[i](cancel);
    }
    token._listeners = null;
  });

  // eslint-disable-next-line func-names
  this.promise.then = function(onfulfilled) {
    var _resolve;
    // eslint-disable-next-line func-names
    var promise = new Promise(function(resolve) {
      token.subscribe(resolve);
      _resolve = resolve;
    }).then(onfulfilled);

    promise.cancel = function reject() {
      token.unsubscribe(_resolve);
    };

    return promise;
  };

  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Subscribe to the cancel signal
 */

CancelToken.prototype.subscribe = function subscribe(listener) {
  if (this.reason) {
    listener(this.reason);
    return;
  }

  if (this._listeners) {
    this._listeners.push(listener);
  } else {
    this._listeners = [listener];
  }
};

/**
 * Unsubscribe from the cancel signal
 */

CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
  if (!this._listeners) {
    return;
  }
  var index = this._listeners.indexOf(listener);
  if (index !== -1) {
    this._listeners.splice(index, 1);
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;

},{"./Cancel":37}],39:[function(require,module,exports){
'use strict';

module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

},{}],40:[function(require,module,exports){
'use strict';

var utils = require('./../utils');
var buildURL = require('../helpers/buildURL');
var InterceptorManager = require('./InterceptorManager');
var dispatchRequest = require('./dispatchRequest');
var mergeConfig = require('./mergeConfig');
var validator = require('../helpers/validator');

var validators = validator.validators;
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(configOrUrl, config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof configOrUrl === 'string') {
    config = config || {};
    config.url = configOrUrl;
  } else {
    config = configOrUrl || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  var transitional = config.transitional;

  if (transitional !== undefined) {
    validator.assertOptions(transitional, {
      silentJSONParsing: validators.transitional(validators.boolean),
      forcedJSONParsing: validators.transitional(validators.boolean),
      clarifyTimeoutError: validators.transitional(validators.boolean)
    }, false);
  }

  // filter out skipped interceptors
  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
      return;
    }

    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });

  var promise;

  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest, undefined];

    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);

    promise = Promise.resolve(config);
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  }


  var newConfig = config;
  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();
    try {
      newConfig = onFulfilled(newConfig);
    } catch (error) {
      onRejected(error);
      break;
    }
  }

  try {
    promise = dispatchRequest(newConfig);
  } catch (error) {
    return Promise.reject(error);
  }

  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;

},{"../helpers/buildURL":52,"../helpers/validator":61,"./../utils":62,"./InterceptorManager":41,"./dispatchRequest":44,"./mergeConfig":46}],41:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;

},{"./../utils":62}],42:[function(require,module,exports){
'use strict';

var isAbsoluteURL = require('../helpers/isAbsoluteURL');
var combineURLs = require('../helpers/combineURLs');

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};

},{"../helpers/combineURLs":53,"../helpers/isAbsoluteURL":55}],43:[function(require,module,exports){
'use strict';

var enhanceError = require('./enhanceError');

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

},{"./enhanceError":45}],44:[function(require,module,exports){
'use strict';

var utils = require('./../utils');
var transformData = require('./transformData');
var isCancel = require('../cancel/isCancel');
var defaults = require('../defaults');
var Cancel = require('../cancel/Cancel');

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }

  if (config.signal && config.signal.aborted) {
    throw new Cancel('canceled');
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData.call(
    config,
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(
      config,
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};

},{"../cancel/Cancel":37,"../cancel/isCancel":39,"../defaults":49,"./../utils":62,"./transformData":48}],45:[function(require,module,exports){
'use strict';

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  };
  return error;
};

},{}],46:[function(require,module,exports){
'use strict';

var utils = require('../utils');

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  // eslint-disable-next-line consistent-return
  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(undefined, config2[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  // eslint-disable-next-line consistent-return
  function mergeDirectKeys(prop) {
    if (prop in config2) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  var mergeMap = {
    'url': valueFromConfig2,
    'method': valueFromConfig2,
    'data': valueFromConfig2,
    'baseURL': defaultToConfig2,
    'transformRequest': defaultToConfig2,
    'transformResponse': defaultToConfig2,
    'paramsSerializer': defaultToConfig2,
    'timeout': defaultToConfig2,
    'timeoutMessage': defaultToConfig2,
    'withCredentials': defaultToConfig2,
    'adapter': defaultToConfig2,
    'responseType': defaultToConfig2,
    'xsrfCookieName': defaultToConfig2,
    'xsrfHeaderName': defaultToConfig2,
    'onUploadProgress': defaultToConfig2,
    'onDownloadProgress': defaultToConfig2,
    'decompress': defaultToConfig2,
    'maxContentLength': defaultToConfig2,
    'maxBodyLength': defaultToConfig2,
    'transport': defaultToConfig2,
    'httpAgent': defaultToConfig2,
    'httpsAgent': defaultToConfig2,
    'cancelToken': defaultToConfig2,
    'socketPath': defaultToConfig2,
    'responseEncoding': defaultToConfig2,
    'validateStatus': mergeDirectKeys
  };

  utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
    var merge = mergeMap[prop] || mergeDeepProperties;
    var configValue = merge(prop);
    (utils.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
  });

  return config;
};

},{"../utils":62}],47:[function(require,module,exports){
'use strict';

var createError = require('./createError');

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};

},{"./createError":43}],48:[function(require,module,exports){
'use strict';

var utils = require('./../utils');
var defaults = require('./../defaults');

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  var context = this || defaults;
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn.call(context, data, headers);
  });

  return data;
};

},{"./../defaults":49,"./../utils":62}],49:[function(require,module,exports){
(function (process){(function (){
'use strict';

var utils = require('./utils');
var normalizeHeaderName = require('./helpers/normalizeHeaderName');
var enhanceError = require('./core/enhanceError');

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = require('./adapters/xhr');
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = require('./adapters/http');
  }
  return adapter;
}

function stringifySafely(rawValue, parser, encoder) {
  if (utils.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

var defaults = {

  transitional: {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false
  },

  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');

    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data) || (headers && headers['Content-Type'] === 'application/json')) {
      setContentTypeIfUnset(headers, 'application/json');
      return stringifySafely(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    var transitional = this.transitional || defaults.transitional;
    var silentJSONParsing = transitional && transitional.silentJSONParsing;
    var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';

    if (strictJSONParsing || (forcedJSONParsing && utils.isString(data) && data.length)) {
      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw enhanceError(e, this, 'E_JSON_PARSE');
          }
          throw e;
        }
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },

  headers: {
    common: {
      'Accept': 'application/json, text/plain, */*'
    }
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

}).call(this)}).call(this,require('_process'))
},{"./adapters/http":35,"./adapters/xhr":35,"./core/enhanceError":45,"./helpers/normalizeHeaderName":58,"./utils":62,"_process":63}],50:[function(require,module,exports){
module.exports = {
  "version": "0.26.0"
};
},{}],51:[function(require,module,exports){
'use strict';

module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

},{}],52:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

},{"./../utils":62}],53:[function(require,module,exports){
'use strict';

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};

},{}],54:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);

},{"./../utils":62}],55:[function(require,module,exports){
'use strict';

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
};

},{}],56:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
module.exports = function isAxiosError(payload) {
  return utils.isObject(payload) && (payload.isAxiosError === true);
};

},{"./../utils":62}],57:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);

},{"./../utils":62}],58:[function(require,module,exports){
'use strict';

var utils = require('../utils');

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

},{"../utils":62}],59:[function(require,module,exports){
'use strict';

var utils = require('./../utils');

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};

},{"./../utils":62}],60:[function(require,module,exports){
'use strict';

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

},{}],61:[function(require,module,exports){
'use strict';

var VERSION = require('../env/data').version;

var validators = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function(type, i) {
  validators[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

var deprecatedWarnings = {};

/**
 * Transitional option validator
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 * @returns {function}
 */
validators.transitional = function transitional(validator, version, message) {
  function formatMessage(opt, desc) {
    return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return function(value, opt, opts) {
    if (validator === false) {
      throw new Error(formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')));
    }

    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

/**
 * Assert object's properties type
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new TypeError('options must be an object');
  }
  var keys = Object.keys(options);
  var i = keys.length;
  while (i-- > 0) {
    var opt = keys[i];
    var validator = schema[opt];
    if (validator) {
      var value = options[opt];
      var result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new TypeError('option ' + opt + ' must be ' + result);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw Error('Unknown option ' + opt);
    }
  }
}

module.exports = {
  assertOptions: assertOptions,
  validators: validators
};

},{"../env/data":50}],62:[function(require,module,exports){
'use strict';

var bind = require('./helpers/bind');

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return Array.isArray(val);
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return toString.call(val) === '[object FormData]';
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (isArrayBuffer(val.buffer));
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return toString.call(val) === '[object URLSearchParams]';
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};

},{"./helpers/bind":51}],63:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],"FinerioPfmSDK":[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Transaction = exports.Budget = exports.FinancialEntity = exports.Category = exports.Account = exports.USERS_TYPE = exports.INSIGHTS_TYPE = exports.BUDGET_TYPE = exports.TRANSACTION_TYPE = exports.FINANCIAL_ENTITY_TYPE = exports.CATEGORY_TYPE = exports.ACCOUNT_TYPE = exports.FinerioConnectSDK = void 0;
var FinerioConnectSDK_1 = require("./finerioConnectSDK/FinerioConnectSDK");
Object.defineProperty(exports, "FinerioConnectSDK", { enumerable: true, get: function () { return __importDefault(FinerioConnectSDK_1).default; } });
var constants_1 = require("./constants");
Object.defineProperty(exports, "ACCOUNT_TYPE", { enumerable: true, get: function () { return constants_1.ACCOUNT_TYPE; } });
Object.defineProperty(exports, "CATEGORY_TYPE", { enumerable: true, get: function () { return constants_1.CATEGORY_TYPE; } });
Object.defineProperty(exports, "FINANCIAL_ENTITY_TYPE", { enumerable: true, get: function () { return constants_1.FINANCIAL_ENTITY_TYPE; } });
Object.defineProperty(exports, "TRANSACTION_TYPE", { enumerable: true, get: function () { return constants_1.TRANSACTION_TYPE; } });
Object.defineProperty(exports, "BUDGET_TYPE", { enumerable: true, get: function () { return constants_1.BUDGET_TYPE; } });
Object.defineProperty(exports, "INSIGHTS_TYPE", { enumerable: true, get: function () { return constants_1.INSIGHTS_TYPE; } });
Object.defineProperty(exports, "USERS_TYPE", { enumerable: true, get: function () { return constants_1.USERS_TYPE; } });
var payloads_1 = require("./payloads");
Object.defineProperty(exports, "Account", { enumerable: true, get: function () { return payloads_1.AccountPayload; } });
Object.defineProperty(exports, "Category", { enumerable: true, get: function () { return payloads_1.CategoryPayload; } });
Object.defineProperty(exports, "FinancialEntity", { enumerable: true, get: function () { return payloads_1.FinancialEntityPayload; } });
Object.defineProperty(exports, "Budget", { enumerable: true, get: function () { return payloads_1.BudgetPayload; } });
Object.defineProperty(exports, "Transaction", { enumerable: true, get: function () { return payloads_1.TransactionPayload; } });
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return payloads_1.UserPayload; } });

},{"./constants":4,"./finerioConnectSDK/FinerioConnectSDK":8,"./payloads":31}]},{},[]);
