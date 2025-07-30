const dotenv = require('dotenv')
const express = require('express')
const cors = require('cors')
const connectDB = require('./db/index.js')
const routes = require('./config/routes.js')

dotenv.config({ path: './.env' });

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

require("./middlewares/Base").init(app);
routes(app)

connectDB()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB Connection Error:", err);
    });
module.exports = app;



