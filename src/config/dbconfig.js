require('dotenv/config')

module.exports = {
    dialect: "mysql",
    host: process.env.DB_HOST || "localhost",
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE,
    define: {
        timestamp: true,
        underscored: true,
        freezeTableName: true
    },
    logging: false
}