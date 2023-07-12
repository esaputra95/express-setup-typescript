import express = require('express');
import { GetData } from '../../controllers/product';
const product = express.Router()

product.get('/', GetData)

export default product