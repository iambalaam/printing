export interface Cookies { [name: string]: string };
export const getCookies = (): Cookies => {
    const cookies: Cookies = {};
    window.document.cookie
        .split('; ')
        .forEach(cookie => {
            const [name, value] = cookie.split('=');
            cookies[name] = value;
        });
    return cookies;
}

export const setCookie = (name: string, value: string, days = 365) => {
    const expDate = new Date();
    expDate.setDate(expDate.getDate() + days);
    window.document.cookie = `${name}=${value}; expires=${expDate.toUTCString()}; path=/`;
}

