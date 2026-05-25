import express from 'express'
import passport from 'passport'
import * as saleStocksController from '../controllers/saleStocksController.js'

const router = express.Router();

router.use(passport.authenticate('jwt', {session: false}));
router.get('/', saleStocksController.getAllSaleStocks);
router.post('/', saleStocksController.createSaleStock);
router.put('/:id', saleStocksController.updateSaleStock);
router.patch('/:id', saleStocksController.sellSaleStock);
router.delete('/:id', saleStocksController.deleteSaleStock);
export default router