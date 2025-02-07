const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 8080;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "css")));
app.use(express.static(path.join(__dirname, "js")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/:lang?", (req, res) => {
  const lang = req.params.lang || "de";
  const langFile = path.join(__dirname, `public/data/lan_${lang}.json`);
  let langData = {};

  if (fs.existsSync(langFile)) {
    langData = JSON.parse(fs.readFileSync(langFile, "utf8"));
  } else {
    langData = { error: "Language file not found" };
  }

  res.render("index", { langData, lang });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
