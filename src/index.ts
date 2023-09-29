import 'reflect-metadata';
import './bin/config.ts';
import { container } from 'tsyringe';
import { Server } from './bin/Server.ts';
import { Scream } from './services/Scream.service.ts';
import { Mongo } from './bin/Mongo.ts';

container.registerSingleton<Scream>(Scream);
container.registerSingleton<Server>(Server);
container.registerSingleton<Mongo>(Mongo);

(async function () {
    const server = container.resolve(Server);
    await server.initialize();
    await server.start();
})();