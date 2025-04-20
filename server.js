const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.post('/order', (req, res) => {
  console.log('New Order:', req.body);
  res.send('Order recieved!');
});

app.listen(port, () => {
  console.log(`Server is running: http://localhost:${port}`);
});
