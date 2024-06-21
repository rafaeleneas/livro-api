import Author from "../models/author.model.js";

async function insertAuthor(author) {
    try {
        return await Author.create(author);
    } catch (err) {
        throw err;
    }
}

async function getAuthors() {
    try {
        return await Author.findAll();
    } catch (err) {
        throw err;
    }
}

async function getAuthor(id) {
    try {
        return await Author.findByPk(id);
    } catch (err) {
        throw err;
    }
}

async function deleteAuthor(id) {
    try {
        await Author.destroy({
            where: {
                authorId: id
            }
        });
    } catch (err) {
        throw err;
    }
}

async function updateAuthor(author) {
    try {
        await Author.update(author, {
            where: {
                authorId: author.authorId
            }
        });
        return await getAuthor(author.authorId);
    } catch (err) {
        throw err;
    }
}

export default {
    insertAuthor,
    getAuthors,
    getAuthor,
    updateAuthor,
    deleteAuthor
}
