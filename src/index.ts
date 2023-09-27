import 'reflect-metadata';
import './bin/config';
import { container } from 'tsyringe';
import { Server } from './bin/Server';
import { Scream } from './services/Scream.service';

container.registerSingleton<Server>(Server);
container.registerSingleton<Scream>(Scream);

(async function () {
    const server = container.resolve(Server);
    await server.initialize();
    await server.start();
})();