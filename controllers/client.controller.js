import ClientService from "../services/client.service.js";

async function createClient(req, res, next) {
    try {
        let client = req.body;
        if (!client.name || !client.password || !client.phone || !client.email || !client.address) {
            throw new Error("Name, Email, password,Phone, e Address são obrigatórios.");
        }        
        client = await ClientService.createClient(client);
        res.status(201).send(client);
        logger.info(`POST /client - ${JSON.stringify(client)}`);
    } catch (err) {
        next(err);
    }
}

async function getClients(req, res, next) {
    try {
        res.status(200).send(await ClientService.getClients());
        logger.info("GET /client");
    } catch (err) {
        logger.info("GET /client");
        next(err);
    }
}

async function getClient(req, res, next) {
    try {
        res.status(200).send(await ClientService.getClient(req.params.id));
        logger.info("GET /client");
    } catch (err) {
        next(err);
    }
}

async function deleteClient(req, res, next) {
    try {
        await ClientService.deleteClient(req.params.id)
        res.status(200).end();
        logger.info("DELETE /client");
    } catch (err) {
        next(err);
    }
}

async function updateClient(req, res, next) {
    try {
        let client = req.body;
        if (!client.clientId || !client.name || !client.password || !client.phone || !client.email || !client.address) {
            throw new Error("Client ID, Name, password, Phone, Email e Address são obrigatórios.");
        }        
        client = await ClientService.updateClient(client);
        res.status(201).send(client);
        logger.info(`PUT /client - ${JSON.stringify(client)}`);
    } catch (err) {
        next(err);
    }
}

export default {
    createClient,
    getClients,
    getClient,
    deleteClient,
    updateClient
}