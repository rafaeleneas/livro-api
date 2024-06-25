import BookInfoSchema from "../schemas/bookInfo.schema.js";
import { connect } from "./mongo.db.js";


async function createBookInfo(bookInfo) {
    try {
        const mongoose = await connect();
        const BookInfoSh = mongoose.model("bookInfo", BookInfoSchema);
        bookInfo = new BookInfoSh(bookInfo);
        await bookInfo.save();
    } catch (err) {
        throw err;
    }
}

async function updateBookInfo(bookInfo) {
    try {
        const mongoose = await connect();
        const bookInfoSh = mongoose.model("bookInfo", BookInfoSchema);      
        return await bookInfoSh.findOneAndUpdate({ bookId: bookInfo.bookId }, bookInfo);
    } catch (err) {
        throw err;
    }
}

async function getBookInfo(bookId) {
    try {
        const mongoose = await connect();
        const bookInfoSh = mongoose.model("bookInfo", BookInfoSchema);
        const query = bookInfoSh.findOne({ bookId });
        const bookEvalution = await query.exec();
        return bookEvalution;
    } catch (err) {
        throw err;
    }
}

async function createEvaluations(bookId, evaluation) {   
    try {
        const bookInfo = await getBookInfo(bookId);
        bookInfo.evaluations.push(evaluation);
        await updateBookInfo(bookInfo);
        const updatedBookInfo = await getBookInfo(bookId); // Corrigido: variável renomeada
        return updatedBookInfo.evaluations[updatedBookInfo.evaluations.length - 1]; // Corrigido: índice ajustado
    } catch (err) {
        throw err;
    }
}

async function deleteEvaluations(bookId, index) {
    try {
        const bookInfo = await getBookInfo(bookId);
        bookInfo.evaluations.splice(index, 1);
        await updateBookInfo(bookInfo);
    } catch (err) {
        throw err;
    }
}

async function getBooksInfo() {
    try {
        const mongoose = await connect();
        const bookInfoSh = mongoose.model("bookInfo", BookInfoSchema);
        const query = bookInfoSh.find({});
        const books = await query.exec();
       
        return books;

      
    } catch (err) {
        throw err;
    }
}

async function deleteBookInfo(bookId) {
    try {
        const mongoose = await connect();
        const BookInfo = mongoose.model("bookInfo", BookInfoSchema);        
        const result = await BookInfo.deleteOne({bookId: bookId });
         // Opcional: Verifique se algum documento foi realmente excluído
         if (result.deletedCount === 0) {
            throw new Error("Nenhum documento encontrado com o bookId fornecido.");
        }
       // return await BookInfo. _('bookInfo').deleteOne(bookId)
    } catch (err) {
        throw err;
    }
}

/*async function createBookEvaluation(bookInfoEvaluation) {
    try {
        const mongoose = await connect();
        const BookInfo = mongoose.model("bookInfo", BookInfoSchema);
        const BookInfoSh = new BookInfo(bookInfoEvaluation);
        await BookInfoSh.save();
    } catch (err) {
        throw err;
    }
}*/


export default { 
    createBookInfo, 
    updateBookInfo,
    getBookInfo, 
    
    createEvaluations, 
    deleteEvaluations, 

    getBooksInfo, 
    deleteBookInfo 
}