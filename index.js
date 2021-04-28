const bodyParser = require('body-parser');
const express = require('express');

const patientsRouter = require('./routes/patientsRouter');
const surgeriesRouter = require('./routes/surgeriesRouter');

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(patientsRouter);
app.use(surgeriesRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Port: ${PORT}`);
});