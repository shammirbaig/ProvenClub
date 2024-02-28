const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser=require('body-parser');
const CirculationRoute=require("./Routes/CirculationRoute");
const OverdueRoute=require("./Routes/OverdueRoute");
const PORT = process.env.PORT || 5000;

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;


db.on('connected', () => {
  console.log('Connected to MongoDB');
});


app.use(bodyParser.json());
app.use("/circulation",CirculationRoute);
app.use("/overdue",OverdueRoute)

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

//post req to checkout a book by a member
//post req to return a book by a member
//get req calculate overdue books of a mem and fine calculations


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
