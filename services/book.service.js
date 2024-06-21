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
    if (await AuthorRepository.getAuthor(book.author_id)) {        
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
    //const books = await BookInfoRepository.getBooksInfo();  
    //return books;
}

async function updateBookInfo(bookInfo) {
    await BookInfoRepository.updateBookInfo(bookInfo);
}

export default {
    createBook,
    getBooks,
    getBook,
    deleteBook,
    updateBook,

    createBookInfo,
    getBookInfo,
    getBooksInfo,
    updateBookInfo
}