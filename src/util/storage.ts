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
