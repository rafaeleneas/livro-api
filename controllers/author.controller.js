import AuthorService from "../services/author.service.js";

async function createAuthor(req, res, next) {
    try {
        let author = req.body;
        if (!author.name || !author.email ||  !author.phone ) {
            throw new Error("Name, Phone, Email e Address são obrigatórios.");
        }        
        author = await AuthorService.createAuthor(author);
        return res.status(201).send(author);
        //return res.status(201).json(c)
        logger.info(`POST /author - ${JSON.stringify(author)}`);
    } catch (err) {
        next(err);
    }
}

async function getAuthors(req, res, next) {
    try {
        res.status(200).send(await AuthorService.getAuthors());
        logger.info("GET /author");
    } catch (err) {
        next(err);
    }
}

async function getAuthor(req, res, next) {
    try {
        res.status(200).send(await AuthorService.getAuthor(req.params.id));
        logger.info("GET /author");
    } catch (err) {
        next(err);
    }
}

async function deleteAuthor(req, res, next) {
    try {
        await AuthorService.deleteAuthor(req.params.id)
        res.status(200).end();
        logger.info("DELETE /author");
    } catch (err) {
        next(err);
    }
}

async function updateAuthor(req, res, next) {
    try {
        let author = req.body;
        if (!author.authorId || !author.name  || !author.email || !author.phone ) {
            throw new Error("Author ID, Name, Phone, Email  são obrigatórios.");
        }        
        author = await AuthorService.updateAuthor(author);
        res.status(201).send(author);
        logger.info(`PUT /author - ${JSON.stringify(author)}`);
    } catch (err) {
        next(err);
    }
}


export default {
    createAuthor,
    getAuthors,
    getAuthor,
    deleteAuthor,
    updateAuthor
}