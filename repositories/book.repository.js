import Book from "../models/book.model.js";

async function insertBook(book) {
    try {
        return await Book.create(book);
    } catch (err) {
        throw err;
    }
}

async function getBooks() {
    try {
        return await Book.findAll();
    } catch (err) {
        throw err;
    }
}

async function getBooksByAuthorId (authorId){
    try {
        return await Book.findAll({
            where: {
                authorId: authorId
            }
        });
    } catch (err) {
        throw err;
    }
}

async function getBook(id) {
    try {
        return await Book.findByPk(id);
    } catch (err) {
        throw err;
    }
}

async function deleteBook(id) {
    try {
        await Book.destroy({
            where: {
                bookId: id
            }
        });
    } catch (err) {
        throw err;
    }
}

async function updateBook(book) {
    try {
        await Book.update(book, {
            where: {
                bookId: book.bookId
            }
        });
        return await getBook(book.bookId);
    } catch (err) {
        throw err;
    }
}

export default {
    insertBook,
    getBooks,
    getBooksByAuthorId,
    getBook,
    updateBook,
    deleteBook
}
