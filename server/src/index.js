const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const port = process.env.PORT || 3000;
const route = require('./routes/index')

const app = express();

require('dotenv').config({ path: 'src/.env' })

app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

route(app);

app.listen(port, () => {
  console.log(`Server started at port: ${port}`)
})
