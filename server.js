const express = require('express');
const path = require('path');

const port = process.env.PORT || 8080;
const app = express();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

app.listen(port, () => console.log(`Server started on port ${port}.`));
