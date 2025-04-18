const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

connectToMongo();

const app = express();
const port = 3600;

app.use(cors())
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/policies', require('./routes/policies'));

app.get('/', (req, res) => {
  res.send('You want localhost:3000 this is 3600!');
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});