const express = require("express");
const mongoose = require("mongoose");
const hbs = require("express-handlebars");
const fileUpload = require("express-fileupload");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(fileUpload());
app.use(express.json());
app.use(require("./routes/index"));

app.engine(".hbs", hbs({ extname: ".hbs" }));
app.set("view engine", ".hbs");

mongoose
  .connect(
    "mongodb+srv://into:code@cluster0.ophke.mongodb.net/library-project?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    app.listen(3000);
    console.log("Соединение установлено");
  })
  .catch(() => {
    console.log("Что-то пошло не так");
  });
