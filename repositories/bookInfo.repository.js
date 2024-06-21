import BookInfoSchema from "../schemas/bookInfo.schema.js";
import { connect } from "./mongo.db.js";


async function createBookInfo(bookInfo) {
    try {
        const mongoose = await connect();
        const bookInfoSh = mongoose.model("bookInfo", BookInfoSchema);
        bookInfo = new bookInfoSh(bookInfo);
        await bookInfo.save();
    } catch (err) {
        throw err;
    }
}

async function updateBookInfo(bookInfo) {
    try {
        const mongoose = await connect();
        const bookInfoSh = mongoose.model("bookInfo", BookInfoSchema);      
        await bookInfoSh.findOneAndUpdate({ bookId: bookInfo.bookId }, bookInfo);
    } catch (err) {
        throw err;
    }
}

async function getBookInfo(bookId) {
    try {
        const mongoose = await connect();
        const bookInfoSh = mongoose.model("bookInfo", BookInfoSchema);
        const query = bookInfoSh.findOne({ bookId });
        return await query.exec();
    } catch (err) {
        throw err;
    }
}

async function createReview(review, bookId) {
    try {
        const bookInfo = await getBookInfo(bookId);
        bookInfo.reviews.push(review);
        await updateBookInfo(bookInfo);
    } catch (err) {
        throw err;
    }
}

async function deleteReview(bookId, index) {
    try {
        const bookInfo = await getBookInfo(bookId);
        bookInfo.reviews.splice(index, 1);
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
        const bookInfo = mongoose.model("bookInfo", BookInfoSchema);        
        await bookInfo.deleteOne({ bookId });
    } catch (err) {
        throw err;
    }
}

export default { 
    createBookInfo, 
    updateBookInfo, 

    getBookInfo, 
    
    createReview, 
    deleteReview, 
    getBooksInfo, 
    deleteBookInfo 
}