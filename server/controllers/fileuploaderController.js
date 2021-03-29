"use strict";

const MultipleFile = require("../models/multiplefile");

const multipleFileUpload = async (req, res, next) => {
  try {
    const multipleFiles = new MultipleFile({
      title: req.body.title,
      files: req.body.files,
    });
    await multipleFiles.save();
    res.status(201).send("Files Uploaded Successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getallMultipleFiles = async (req, res, next) => {
  try {
    const files = await MultipleFile.find();
    res.status(200).send(files);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  multipleFileUpload,
  getallMultipleFiles,
};
