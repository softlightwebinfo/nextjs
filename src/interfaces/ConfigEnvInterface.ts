export interface ConfigEnvInterface {
    development: ConfigEnvModuleInterface,
    staging: ConfigEnvModuleInterface,
    production: ConfigEnvModuleInterface,

    [p: string]: any;
}

export interface ConfigEnvModuleInterface {
    api: string;
    url: string;
}
