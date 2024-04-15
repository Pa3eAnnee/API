    import express from 'express';
    import * as routes from './routes';
    import path from 'path';
    const app = express();
    const port = 3000;

    app
    .use(express.json())
    .use(express.static(path.join(__dirname + '/../java-client')));
    routes.userRoute(app);
    Object.keys(routes).forEach(key => {
        (routes as any)[key](app);
    });

    app.listen(port, () => {
      console.log('Server is running on port 3000');
    });
