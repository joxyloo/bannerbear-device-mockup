const bannerbear = require('./bannerbear');
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get('/mockup', async (req, res) => {
  let url = req.query.url;

  const screenshotUrl = await bannerbear.screenshot(url);

  const mockup = await bannerbear.generateImage(screenshotUrl);

  res.send(mockup);
});
