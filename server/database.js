"use strict";
const mongoose = require("mongoose");

module.exports = () => {
  mongoose
    .connect("addmongodburl", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    })
    .then(() => console.log("Connected  Mongodb ....:)"));
};
