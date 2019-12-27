import {MethodType} from "../ts/types";

export interface FetchOptionsHeadersInterface {
    "Content-Type"?: string;
    Authorization: string;
    body?: string;
}

export type FetchOptionsMethodType = MethodType;

export interface FetchOptionsInterface {
    method: FetchOptionsMethodType;
    headers: FetchOptionsHeadersInterface;
    mode: string;
    cache: string;
    processData?: boolean,
    contentType?: boolean,
}

export function FetchInit(body: any, method: MethodType, token: string = "", formData: boolean = false): any {
    let obj: FetchOptionsInterface = {
        method: method,
        headers: {
            Authorization: `bearer ${token}`
        },
        mode: 'cors',
        cache: 'default',
    };
    if (!formData) {
        obj.headers["Content-Type"] = "application/json";
    } else {
        obj.processData = formData ? false : undefined;
        obj.contentType = formData ? false : undefined;
    }
    if (method != "GET") {
        obj["body"] = formData ? body : JSON.stringify(body);

    }
    return obj;
}
