export type Config = {
    server: Server;
}

type Server = {
    host : string;
    port: number;
}