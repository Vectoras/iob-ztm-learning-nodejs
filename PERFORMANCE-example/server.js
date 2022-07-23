// requesting node modules
const os = require('os');
// const cluster = require('cluster');
// requesting npm modules
const express = require('express');

// setting the app
const app = express();

// functions
function delay(duration) {
  const startTime = Date.now();

  while (Date.now() - startTime < duration) {
    // event loop is blocked
  }
}

// routing
app.get('/', (req, res) => {
  res.send(`Performance example ${process.pid}`);
});
app.get('/timer', (req, res) => {
  // delay the response
  delay(4000);
  res.send(`Beep Beep Beep ${process.pid}`);
});

// managing the cluster
// if (cluster.isMaster) {
//   console.log('Master process started ... ');
//   // forking worker processes
//   const NUM_WORKERS = os.cpus().length;
//   for (let i = 0; i < NUM_WORKERS; i++) {
//     cluster.fork();
//   }
// } else {
console.log(`Worker process started, pid: ${process.pid}`);
// starting the app/server
app.listen(3000, () => {});
// }
