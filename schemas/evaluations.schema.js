import mongoose from "mongoose";

const EvaluationsSchema = new mongoose.Schema(
    {
        name: String,
        note: Number, //nota
        evaluation : String, //avaliacao
    }, { collection: "bookInfo" }
);

export default EvaluationsSchema;