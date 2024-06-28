import { json } from "sequelize";
import BookService from "../services/book.service.js";
import { check, validationResult } from 'express-validator'

async function createBook(req, res, next) {
    try {

        await check('name', 'Nome deve ser informado').notEmpty().run(req)
        await check('value', 'Valor deve ser informado').notEmpty().run(req)
        await check('value', 'Valor deve ser numérico').isFloat().run(req)      
        await check('stock', 'Estoque deve ser informado').notEmpty().run(req)
        await check('stock', 'Estoque deve ser inteiro').isInt().notEmpty().run(req)
        await check('authorId', 'Author Id deve ser informado').notEmpty().run(req)
        await check('authorId', 'Author Id deve ser inteiro').isInt().run(req)
    
        const result = validationResult(req)
    
        if (!result.isEmpty()) {
          res.status(400).json({ erros: result.array() })
          return
        }

        let book = req.body;
        //if (!book.name || !book.value || !book.stock || !book.authorId) {
        //    throw new Error("Name, Description, Value, Stock e author ID são obrigatórios.");
        //}        
        book = await BookService.createBook(book);
        res.status(201).send(book);
        logger.info(`POST /book - ${JSON.stringify(book)}`);
    } catch (err) {
        next(err);
    }
}

async function getBooks(req, res, next) {
   
    try {
        if(req.query.authorId){
           
            res.send(await BookService.getBooksByAuthorId(req.query.authorId));
            logger.info("GET /book1");
            return;
        }
        res.status(200).send(await BookService.getBooks());
        logger.info("GET /book");
    } catch (err) {
        next(err);
    }
}

async function getBook(req, res, next) {
    try {
        res.status(200).send(await BookService.getBook(req.params.id));
        logger.info("GET /book");
    } catch (err) {
        next(err);
    }
}

async function deleteBook(req, res, next) {
    try {
        await BookService.deleteBook(req.params.id)
        res.status(200).end();
        logger.info("DELETE /book");
    } catch (err) {
        next(err);
    }
}

async function updateBook(req, res, next) {
    try {
        await check('bookId', 'Book Id deve ser informado').notEmpty().run(req)
        await check('name', 'Nome deve ser informado').notEmpty().run(req)
        await check('value', 'Valor deve ser informado').notEmpty().run(req)
        await check('value', 'Valor deve ser numérico').isFloat().run(req)
        await check('stock', 'Estoque deve ser informado').notEmpty().run(req)
        await check('stock', 'Estoque deve ser inteiro').isInt().notEmpty().run(req)
        await check('authorId', 'Author Id deve ser informado').notEmpty().run(req)
        await check('authorId', 'Author Id deve ser inteiro').isInt().run(req)
    
        const result = validationResult(req)
    
        if (!result.isEmpty()) {
          res.status(400).json({ erros: result.array() })
          return
        }

        let book = req.body;
        //if (!book.bookId || !book.name || !book.value || !book.stock || !book.author_id) {
        //    throw new Error("Book ID, Name, Description, Value, Stock e author ID são obrigatórios.");
       // }        
        book = await BookService.updateBook(book);
        res.status(201).send(book);
        logger.info(`PUT /book - ${JSON.stringify(book)}`);
    } catch (err) {
        next(err);
    }
}


//info
async function createBookInfo(req, res, next) {
    try {
        await check('bookId', 'BookId  deve ser informado').notEmpty().run(req)
        await check('bookId', 'BookId deve ser um número inteiro positivo.').isInt().run(req)
    
        await check('description', 'Descricao deve ser informado').notEmpty().run(req)
        await check('pages', 'O número de páginas de um número inteiro positivo.').notEmpty().run(req)
        await check('pages', 'Paginas deve ser numérico').isInt().run(req)
        await check('publisher', 'Editora deve ser informado').notEmpty().run(req)
    
        const result = validationResult(req)
    
        if (!result.isEmpty()) {
          res.status(400).json({ erros: result.array() })
          return
        }

        let bookInfo = req.body;
        if (!bookInfo.bookId) {
            throw new Error("Book ID é obrigatório.");            
        }
        await BookService.createBookInfo(bookInfo);
        //res.end();
        logger.info(`POST /book 1/info - ${JSON.stringify(bookInfo)}`);        
        return res.status(201).json(bookInfo)
    } catch (err) {
        next(err);
    }
}

async function updateBookInfo(req, res, next) {
    try {
        await check('bookId', 'BookId  deve ser informado').notEmpty().run(req)
        await check('bookId', 'BookId deve ser um número inteiro.').isInt().run(req)
    
        await check('description', 'Descricao deve ser informado').notEmpty().run(req)
        await check('pages', 'O número de páginas de um número inteiro positivo.').notEmpty().run(req)
        await check('pages', 'Paginas deve ser numérico').isInt().run(req)
        await check('publisher', 'Editora deve ser informado').notEmpty().run(req)
    
        const result = validationResult(req)
    
        if (!result.isEmpty()) {
          res.status(400).json({ erros: result.array() })
          return
        }
        
        let bookInfo = req.body;
        //if (!bookInfo.bookId) {
        //    throw new Error("Book ID é obrigatório.");            
       // }
        await BookService.updateBookInfo(bookInfo);
        //res.end();
        logger.info(`PUT /book/info - ${JSON.stringify(bookInfo)}`);    
        return res.status(201).json(bookInfo)    
    } catch (err) {
        next(err);
    }
}

async function getBooksInfo(req, res, next) {
    try {
        logger.info("GET /book /info inicio...");
        res.status(200).send(await BookService.getBooksInfo() ) ;      
        logger.info("GET /book/info");
    } catch (err) {
        next(err);
    }
}

async function deleteBookInfo(req, res, next) {
    try {
        res.status(200).send(await BookService.deleteBookInfo(parseInt(req.params.id)));
        logger.info("DELETE /book/info");
    } catch (err) {
        next(err);
    }
}

async function createBookEvalution(req, res, next) {
    logger.info("inicio.........");
    try {
        await check('name', 'Nome  deve ser informado').notEmpty().run(req)
        await check('note', 'Nota deve ser um número inteiro positivo.').isInt().run(req)
    
        await check('evaluation', 'Avaliacao deve ser informado').notEmpty().run(req)
        //await check('pages', 'O número de páginas de um número inteiro positivo.').notEmpty().run(req)
        //await check('pages', 'Paginas deve ser numérico').isInt().run(req)
        //await check('publisher', 'Editora deve ser informado').notEmpty().run(req)
    
        const result = validationResult(req)
    
        if (!result.isEmpty()) {
          res.status(400).json({ erros: result.array() })
          return
        }

        let evalutaion = req.body;
        if (!req.params.id) {
            throw new Error("Book ID é obrigatório.");            
        }
        const bookInfo = await BookService.createBookEvaluation (req.params.id, evalutaion);
        //res.end();
        logger.info(`POST /book/info/evaluation - ${JSON.stringify(bookInfo)}`);        
        return res.status(201).json(bookInfo)
    } catch (err) {
        next(err);
    }
}

function deleteBookEvaluation(req, res, next) {
    try {
        res.status(200).send(BookService.deleteBookEvaluation(parseInt(req.params.id), parseInt(req.params.index)));
        logger.info("DELETE /book/info/evaluation");
    } catch (err) {
        next(err);
    }
}   

export default {
    createBook,
    getBooks,
    getBook,
    deleteBook,
    updateBook,

    createBookInfo,
    updateBookInfo,
    deleteBookInfo,
    
    getBooksInfo,

    createBookEvalution,
    deleteBookEvaluation


}