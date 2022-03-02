const { FinerioConnectSDK, Category } = require("../../dist/index");

const fcs = new FinerioConnectSDK();
const { Categories } = fcs.connect("905e0065-a797-4139-81ae-66d671a284b7");

const userId = 1115162;
const newcat = new Category("Gastos Diarios", "#FF0000", null, userId);
const catupd = new Category("Vicios", "#0000FF", null);

Categories.list(userId)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));

/*
cat
  .listWithSubcategories(userId)
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
