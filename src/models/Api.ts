import fetch from 'isomorphic-unfetch';

export class Api {
    static headers(token = '') {
        return {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`
        }
    }

    static async get(url: string) {
        const xhr = await fetch(url, {
            headers: Api.headers(),
        });
        return await xhr.json();
    }

    static async post(url: string, body: any) {
        try {
            const obj: any = {
                headers: Api.headers(),
                method: "POST",
                body: JSON.stringify(body),
                mode: 'cors',
            };
            const xhr = await fetch(url, obj);
            return await xhr.json();
        } catch (e) {
            console.log("err", e)
        }
    }

    static async put(url: string, body: any) {
        const xhr = await fetch(url, {
            headers: Api.headers(),
            method: "POST",
            body: body,
        });
        return await xhr.json();
    }

    static async delete(url: string, body: any) {
        const xhr = await fetch(url, {
            headers: Api.headers(),
            method: "DELETE",
            body: body,
        });
        return await xhr.json();
    }
}
