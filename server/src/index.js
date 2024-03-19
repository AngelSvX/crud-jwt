const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const userRouter = require('./api/userRouters');
const authRouter = require('./api/authRouters')

app.use('/user', userRouter)
app.use('/auth', authRouter)

app.listen(process.env.PORT, () => {
  console.log("Corriendo en el puerto 3001");
});