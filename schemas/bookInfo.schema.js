import mongoose from "mongoose";
import AvaluationsSchema from "./evaluations.schema.js";

const BookInfoSchema = new mongoose.Schema(
    {
        bookId: Number,
        description: String,
        pages: Number,
        publisher: String,    //editora  
        evaluations: [AvaluationsSchema] //avaliacoes
    }, { collection: "bookInfo" }
);

export default BookInfoSchema;