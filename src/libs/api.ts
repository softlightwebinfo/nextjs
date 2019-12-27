import config from "@src/config";

export const getUrl = (url: string) => {
    return `${config.url}${url}`;
};
