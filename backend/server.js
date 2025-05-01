//require express package
const express = require("express");
require("dotenv").config();
const workoutRoutes = require("./routes/workoutRoute");
const userRoutes = require('./routes/userRoute')
const mongoose = require("mongoose");

//create express app,start express app
const app = express();

//middleware
app.use(express.json()); //this middleware check if there is a request body if then, it passes to the req then we can access it.

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

//database connect
mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log("listening on port :", process.env.PORT);
      console.log("db connected!");
    });
  })
  .catch((error) => {
    console.log(error);
  });

// //routes,we dont use routes in main server. we do it in router directory with creating router files.This is for only testing purpose
// app.get('/', (req, res) => {
//     res.json({ mssg: 'hi' });
// })
