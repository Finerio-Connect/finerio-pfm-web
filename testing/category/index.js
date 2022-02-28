const fcsdk = require("../../dist/index");

const FinerioConnectSDK = fcsdk.FinerioConnectSDK;
const Category = fcsdk.Category;
const CategoryObject = fcsdk.CategoryObject;

const fc = new FinerioConnectSDK(
  "https://pfm-api-sandbox.finerioconnect.com",
  "905e0065-a797-4139-81ae-66d671a284b7"
);

const userId = 1115162;
const cat = new Category(fc);
const newcat = new CategoryObject("Gastos Diarios", "#FF0000", null, userId);
const catupd = new CategoryObject("Vicios", "#0000FF", null);

/*
cat
  .getAll(userId)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
*/
/*
cat
  .get(1487869)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
*/
/*
cat
  .create(newcat)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
*/
/*
cat
  .update(1487869, catupd)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
*/
/*
cat
  .delete(1487874)
  .then((data) => console.log(data === 204 ? "Deleted" : `Error: ${data}`))
  .catch((error) => console.log(error));
*/
