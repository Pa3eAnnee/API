import express from 'express';
import * as routes from './routes';
const app = express();
const port = 3000;

Object.keys(routes).forEach(key => {
    routes[key](app);
});

app.listen(port, () => {
  console.log('Server is running on port 3000');
});
