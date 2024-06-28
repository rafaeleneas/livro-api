import SaleService from "../services/sale.service.js";

async function createSale(req, res, next) {
    try {
        let sale = req.body;
        if (!sale.value || !sale.date || !sale.clientId || !sale.bookId) {
            throw new Error("Value, Date, Client ID e Book ID são obrigatórios.");
        }        
        sale = await SaleService.createSale(sale);
        
        logger.info(`POST 1111/sale - ${JSON.stringify(sale.saleId)}`);
        return res.status(201).send(sale);
    } catch (err) {
        next(err);
    }
}

async function getSales(req, res, next) {
    try {
        res.status(200).send(await SaleService.getSales(req.query.bookId, req.query.authorId, req.query.clientId));
        logger.info("GET /sales");
    } catch (err) {
        next(err);
    }
}

async function getSale(req, res, next) {
    try {
        res.status(200).send(await SaleService.getSale(req.params.id));
        logger.info("GET /sale");
    } catch (err) {
        next(err);
    }
}

async function deleteSale(req, res, next) {
    try {
        await SaleService.deleteSale(req.params.id)
        res.status(200).end();
        logger.info("DELETE /sale");
    } catch (err) {
        next(err);
    }
}

async function updateSale(req, res, next) {
    try {
        let sale = req.body;
        if (!sale.saleId || !sale.value || !sale.date || !sale.clientId || !sale.bookId) {
            res.status(400);   
            throw new Error("Sale ID, Value, Date, Client ID e Book ID são obrigatórios.");
        }   
        sale = await SaleService.updateSale(sale);
        res.status(201).send(sale);
        logger.info(`PUT /sale - ${JSON.stringify(sale)}`);
    } catch (err) {
        next(err);
    }
}

export default {
    createSale,
    getSales,
    getSale,
    deleteSale,
    updateSale
}