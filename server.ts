import express from 'express';
import { routes } from './src/routes/routes';
import { atlasIndexing } from './src/providers/atlas/atlas.search.indexing';
import { AtlasIndexController } from './src/controllers/v1/create.index.controller';
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
        new AtlasIndexController()
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
