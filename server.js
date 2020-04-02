const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query);
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now();
    req.body.isCompleted = false;
  }

  if (req.method === 'DELETE') {
    console.log(req.params);
    console.log(req.path);
    const params = req.path.split('/');
    console.log(params[2]);
    const response = {
      id: parseInt(params[2]),
      text: 'something',
      isCompleted: false
    };
    res.jsonp(response);
    //return;
    //res.body.id = req.param.id;
    ///res.body.text = 'it was deleted';
    //res.send(res.body);
  }
  // Continue to JSON Server router
  next();
});

// Use default router
server.use(router);
server.listen(8080, () => {
  console.log('JSON Server is running');
});
