import Sequelize from "sequelize";

const sequelize = new Sequelize(
    //"postgres://iiusoxuk:G-YgoynyaaHPdK2K9W_8yeY_3z2491AG@queenie.db.elephantsql.com/iiusoxuk",
    "postgres://admin:admin@localhost:5440/bookstore",
    {
        dialect: "postgres",
        define: {
            timestamps: false
        }
    }
)

export default sequelize;