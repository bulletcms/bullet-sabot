const app = require('./lib').app;

const port = 5000;

app.listen(port, () => console.log('server launched on localhost:'+port));
