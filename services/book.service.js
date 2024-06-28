import BookRepository from "../repositories/book.repository.js";
import AuthorRepository from "../repositories/author.repository.js";
import SaleRepository from "../repositories/sale.repository.js";
import BookInfoRepository from "../repositories/bookInfo.repository.js";


async function createBook(book) {
    if (await AuthorRepository.getAuthor(book.authorId)) {
        return await BookRepository.insertBook(book);
    }
    throw new Error("O author_id informado não existe.");
}

async function getBooks() {
    return await BookRepository.getBooks();
}

async function getBooksByAuthorId(authorId) {
  
    return await BookRepository.getBooksByAuthorId(authorId);
}

async function getBook(id) {
    return await BookRepository.getBook(id);
}

async function deleteBook(id) {
    const sales = await SaleRepository.getSalesByBookId(id);
    if (sales.length > 0) {
        throw new Error("Não é possível excluir o produto pois ele tem vendas.")
    }
    await BookRepository.deleteBook(id);
}

async function updateBook(book) {
    if (await AuthorRepository.getAuthor(book.authorId)) {        
        return await BookRepository.updateBook(book);
    }
    throw new Error("O author_id informado não existe.");
}


//info
async function createBookInfo(bookInfo) {
    await BookInfoRepository.createBookInfo(bookInfo);
}

async function getBookInfo(bookInfo) {
    return await BookInfoRepository.getBookInfo(bookInfo);
}

async function getBooksInfo() {
    return await BookInfoRepository.getBooksInfo();
}

async function updateBookInfo(bookInfo) {
    return await BookInfoRepository.updateBookInfo(bookInfo);
}

async function deleteBookInfo(bookInfo) {
    return await BookInfoRepository.deleteBookInfo(bookInfo);
}

//evaluation
async function createBookEvaluation(bookId, bookEvaluation) {    
    return await BookInfoRepository.createEvaluations(bookId, bookEvaluation);
}

async function deleteBookEvaluation(bookId, index) {
    return await BookInfoRepository.deleteEvaluations(bookId, index);
}

export default {
    createBook,
    getBooks,
    getBooksByAuthorId,
    getBook,
    deleteBook,
    updateBook,

    createBookInfo,
    getBookInfo,
    getBooksInfo,
    updateBookInfo,
    deleteBookInfo,

    createBookEvaluation,
    deleteBookEvaluation
}