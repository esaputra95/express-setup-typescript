"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const product_1 = require("../../controllers/product");
const product = express.Router();
product.get('/', product_1.GetData);
exports.default = product;
