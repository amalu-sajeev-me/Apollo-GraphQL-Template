import 'reflect-metadata';
import './bin/config';
import { container } from 'tsyringe';
import { Server } from './bin/Server';
import { Scream } from './services/Scream.service';
import { Mongo } from './bin/Mongo';

container.registerSingleton<Scream>(Scream);
container.registerSingleton<Server>(Server);
container.registerSingleton<Mongo>(Mongo);

(async function () {
    const server = container.resolve(Server);
    await server.initialize();
    await server.start();
})();