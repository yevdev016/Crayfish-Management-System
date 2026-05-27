import * as saleStockServices from '../models/saleStockModel.js'

export const getAllSaleStocks = async (req, res) => {
    try {
        const entries = await saleStockServices.getAllSaleStock(req.user.id);
        res.status(200).json(entries);
    } catch(err){
        res.status(500).json({message: err.message || err})
    }
}
export const createSaleStock = async (req, res) => {
    const data = req.body;
    try{
        const entry = await saleStockServices.createSaleStock(req.user.id, data);
        res.status(200).json(entry);
    }catch(err){
        res.status(500).json({message: err.message || err})
    }
}
export const updateSaleStock = async (req, res) => {
    try {
        const entry = await saleStockServices.updateSaleStock(req.params.id, req.user.id, req.body);
        res.status(200).json(entry)
    }catch(err){
        res.status(500).json({message: err.message || err})
    }
}
export const sellSaleStock = async (req, res) => {
    try {
        const entry = await saleStockServices.sellSaleStock(req.params.id, req.user.id, req.body.qty, req.body.customer_name);
        if (!entry) return res.status(400).json({message: 'Insufficient available stock'});
        res.status(200).json(entry);
    }catch(err){
        res.status(500).json({message: err.message || err})
    }
}
export const deleteSaleStock = async (req,res) => {
    try {
        const entry = await saleStockServices.deleteSaleStock(req.params.id, req.user.id);
        res.status(200).json(entry)
    }catch(err){
        res.status(500).json({message: err.message || err})
    }
}