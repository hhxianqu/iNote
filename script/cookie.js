function getCookie(name) {
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookies.indexOf(name) === 0) {
            return cookies.substring(name.length + 1, cookie.length);
        }
    }
    return undefined;
}

function checkCookie(name) {
    let value = getCookie(name);
    return value !== undefined;
}