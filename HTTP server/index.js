const http = require('http');

const PORT = 3000;

const server = http.createServer();

const friends = [
  {
    id: 0,
    name: 'Nikola Tesla',
  },
  {
    id: 1,
    name: 'Sir Isaac Newton',
  },
  {
    id: 2,
    name: 'Albert Einstein',
  },
];

server.on('request', (req, res) => {
  const items = req.url.split('/');

  if (req.method === 'GET' && items[1] === 'json') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });

    res.end(
      JSON.stringify({
        type: 'json',
        messge: 'Hello! Sir Isaac Newton is your friend!',
      })
    );
  } else if (req.method === 'GET' && items[1] === 'html') {
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });

    // res.statusCode(200);
    // res.setHeader('Content-Type', 'text/html');

    res.write('<html>');
    res.write('<body>');
    res.write('<ul>');
    res.write('<li> Hellow Isaac!</li>');
    res.write('<li>What are your thoughts on astronomy?</li>');
    res.write('</ul>');
    res.write('</body>');
    res.write('</html>');

    res.end();
  } else if (req.method === 'POST' && items[1] === 'friends') {
    req.on('data', (data) => {
      const friend = data.toString();
      console.log(friend);
      friends.push(JSON.parse(friend));
    });

    req.pipe(res);
  } else if (req.method === 'GET' && items[1] === 'friends') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });

    if (items.length === 3) {
      const friendIndex = Number(items[2]);
      res.end(JSON.stringify(friends[friendIndex]));
    } else {
      const friendIndex = items[2];
      res.end(JSON.stringify(friends));
    }
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(
    '\nListening on port ' +
      PORT +
      '... \naddress: ' +
      '\033[1;34mhttp://localhost:' +
      PORT +
      '\033[0m'
  );
});
