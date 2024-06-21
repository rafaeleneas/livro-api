import AuthorRepository from "../repositories/author.repository.js";

async function createAuthor(author) {
    return await AuthorRepository.insertAuthor(author);
}

async function getAuthors() {
    return await AuthorRepository.getAuthors();
}

async function getAuthor(id) {
    return await AuthorRepository.getAuthor(id);
}

async function deleteAuthor(id) {
    await AuthorRepository.deleteAuthor(id);
}

async function updateAuthor(author) {
    return await AuthorRepository.updateAuthor(author);
}

export default {
    createAuthor,
    getAuthors,
    getAuthor,
    deleteAuthor,
    updateAuthor
}