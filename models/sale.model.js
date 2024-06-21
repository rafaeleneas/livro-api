import Sequelize from "sequelize";
import db from "../repositories/db.js";
import Client from "./client.model.js";
import Book from "./book.model.js";

const Sale = db.define("sales", {
    saleId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    value: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    }
}, { underscored: true });

Sale.belongsTo(Client, { foreignKey: "clientId" });
Sale.belongsTo(Book, { foreignKey: "bookId" });

export default Sale;