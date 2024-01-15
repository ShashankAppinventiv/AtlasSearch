import express from 'express';
import { routes } from './src/routes/routes';
import { AtlasSearchService } from './src/providers/atlas/altas.index.options';
export class App {
    private app: any;
    private context = '/start';
    private port = 3000;
    constructor() {
        this.startApp();
    }
    startApp() {
        this.app = express();
        this.routers();
        this.listen();
        new AtlasSearchService();
    }
    routers() {
        this.app.use(this.context, routes.loadAllRoutes());
    }

    listen() {
        this.app?.listen(this.port, this.callback);
    }
    callback = () => {
        console.log(`Server listening to port ${this.port}`);
    };
}
new App();
