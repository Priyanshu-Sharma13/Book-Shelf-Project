require(`express-async-errors`);
require(`dotenv`).config();

const express = require(`express`);
const path = require(`path`);
const app = express();
const connectDB = require(`./db/connect`);

const morgan = require(`morgan`);
const cookieParser = require(`cookie-parser`);
const fileUpload = require(`express-fileupload`);
const errorHandlerMiddleware = require(`./middleware/error-handler`);
const notFoundMiddleware = require(`./middleware/not-found`);

const cloudinary = require(`cloudinary`).v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

const authRoutes = require(`./routes/authRoutes`);
const userRoutes = require(`./routes/userRoutes`);
const bookRoutes = require(`./routes/bookRoutes`);

app.use(express.static(path.resolve(__dirname, `../FrontEnd/dist`)));
app.use(express.json());
app.use(fileUpload({useTempFiles: true}));
app.use(cookieParser(process.env.JWT_SECRET));
app.use(morgan(`tiny`));

app.use(`/api/v1/auth`, authRoutes);
app.use(`/api/v1/user`, userRoutes);
app.use(`/api/v1/book`, bookRoutes);

const port = process.env.PORT || 5000;

app.get('*', (req, res)=>{
  res.sendFile(path.resolve(__dirname, `../FrontEnd/dist`, `index.html`));
})

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log("Connection established");
        app.listen(port, console.log(`Server listening on port ${port}`));
    } catch (error) {
        console.log(error);
    }
}

start();