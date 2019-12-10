import pkg from '../package.json';

export class ServerConfig {
    port: number = Number(process.env.PORT || 3000);
    name: string = pkg.name;
    version: string = pkg.version;
}

export default new ServerConfig();
