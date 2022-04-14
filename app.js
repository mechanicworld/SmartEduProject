const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Hello World');
});

const port = 3000;
app.listen(port, () => {
  console.log(`App started in port http://localhost:${port}`);
});
