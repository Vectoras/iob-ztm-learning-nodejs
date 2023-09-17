// ----------- importing npm dependencies
const express = require('express');
const path = require('path');

// ----------- importing routers
const friendsRouter = require('./routes/friends.router');
const messagesRouter = require('./routes/messages.router');

// ----------- setting up the server
const app = express();
// portnumber
const PORT = 3000;
// view engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// ----------- middleware
app.use((req, res, next) => {
  // enter time
  const start = Date.now();

  // go to the next middleware
  next();

  // leave time
  const end = Date.now();

  // duration
  const delta = end - start;

  // logging
  console.log(`${req.method} ${req.url} ${delta}ms`);
});
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// ----------- routes
app.get('/', (req, res) => {
  res.render('index', {
    title: 'My Friends are VERRY Clever',
    caption: "Let's go skiing!",
  });
});

// ----------- mounting routers
app.use('/friends', friendsRouter);
app.use('/messages', messagesRouter);

// ----------- starting the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
