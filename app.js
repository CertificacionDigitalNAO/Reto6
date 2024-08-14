const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Configuración de Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
