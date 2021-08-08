const express = require('express');
const path = require('path');
const subscriptions = require('../dbHelper');
const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.post('/api/subscribe', (req, res) => {
  subscriptions
    .add(req.body)
    .then((subscription) => {
      if (typeof subscription === 'number') {
        res.status(200).json(subscription);
      } else {
        throw 'unique';
      }
    })
    .catch((error) => {
      if (error === 'unique') {
        res
          .status(500)
          .json({ message: 'This email address is already registered!' });
      } else {
        res.status(500).json({ message: 'Cannot subscribe now!' });
      }
    });
});

app.get('/api/subscriptions', (req, res) => {
  subscriptions
    .find()
    .then((lists) => res.status(200).json({ lists: lists }))
    .catch((error) =>
      res.status(500).json({ message: 'No subscription list found!' })
    );
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
