import mongoose from "mongoose";

async function connect() {
    //const uri = "mongodb+srv://root:igti@cluster0.pi7nj.mongodb.net/store?retryWrites=true&w=majority";
    const uri   = "mongodb+srv://rafaeleneas:admin@cluster0.ewtbx8x.mongodb.net/retryWrites=true&w=majority";  
    //mongodb://atlas-sql-664e8b8a1d8f9b637d5ae1d6-lxn0j.a.query.mongodb.net/retryWrites=true&w=majority?ssl=true&authSource=admin
   // const uri ="mongodb+srv://rafaeleneas:admin@cluster0.ewtbx8x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" 
   // const uri2 = "mongodb+srv://rafaeleneas:admin@cluster0.ewtbx8x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    return await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
}

export { connect }