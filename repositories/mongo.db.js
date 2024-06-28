import mongoose from "mongoose";

async function connect() {
    //const uri = "mongodb+srv://root:igti@cluster0.pi7nj.mongodb.net/store?retryWrites=true&w=majority";
    const uri   = "mongodb+srv://rafaeleneas:admin@cluster0.ewtbx8x.mongodb.net/retryWrites=true&w=majority";  
    //const uri2 ="mongodb+srv://rafaeleneas:admin@cluster0.ewtbx8x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
       return await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
}

export { connect }