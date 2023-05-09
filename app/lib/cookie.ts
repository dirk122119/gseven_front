export function getCookie(name: string) {
    let value = "; " + document.cookie;
    let parts:any = value.split("; " + name + "=");
    if (parts.length === 2) {
        return parts.pop().split(";").shift();
    }
}

export function setCookie(name: string, value: string, days: number) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }


    document.cookie = `${name}=${value};expires=${expires};path=/`;

}