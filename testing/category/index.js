const fcsdk = require("../../dist/index");

const FinerioConnectSDK = fcsdk.FinerioConnectSDK;
const Category = fcsdk.Category;

const fc = new FinerioConnectSDK(
  "https://pfm-api-sandbox.finerioconnect.com",
  "905e0065-a797-4139-81ae-66d671a284b7"
);

const cat = new Category(fc);

cat
  .getById(25)
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
