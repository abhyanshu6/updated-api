const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// connection to mongodb
mongoose.connect('mongodb+srv://admin:apocalypse712@cluster0.2dfke.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const Book=require('./model');

app.post('/book', async(req, res) => {
  const new_book =new Book(req.body);
  const newBook=await new_book.save();
  res.json(newBook);
});

app.get('/books', async(req, res) => {
    const allBook=await Book.find();
    res.json(allBook);
});

app.get('/book/:isbn', async(req, res) => {
    const bookId = req.params.isbn;
    const getBook=await Book.findById(bookId);
    res.json(getBook);
});

app.delete('/book/:isbn', async(req, res) => {
  const bookId = req.params.isbn;
  await Book.remove({_id: bookId});
  res.json({ message: 'Book successfully deleted' });
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));
