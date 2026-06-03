import express from 'express'
import passport from 'passport'
import * as saleStocksController from '../controllers/saleStocksController.js'
import { validate } from '../middleware/validate.js'
import { createSaleStockSchema, updateSaleStockSchema, sellSaleStockSchema } from '../validators/saleStockValidator.js'

const router = express.Router();

router.use(passport.authenticate('jwt', {session: false}));
router.get('/', saleStocksController.getAllSaleStocks);
router.post('/', validate(createSaleStockSchema), saleStocksController.createSaleStock);
router.put('/:id', validate(updateSaleStockSchema), saleStocksController.updateSaleStock);
router.patch('/:id', validate(sellSaleStockSchema), saleStocksController.sellSaleStock);
router.delete('/:id', saleStocksController.deleteSaleStock);
export default router