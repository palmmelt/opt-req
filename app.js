const express = require("express");
const path = require("path");
const app = express();
// const router = express.Router();
require('dotenv').config();

const { router } = require("./routes/route");

app.set("views", path.join(__dirname, "views"));
app.set("view engime", "ejs");

app.use(router);
// app.use('/',()=>{
//   console.log(router);
// })

const port = 3000;
app.listen(port, () => {
  console.log(`app start port ${port}`);
});
