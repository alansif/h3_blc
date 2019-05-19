export function restbase() {
    return "/api/"
}

export function reserr(error) {
    return error.message ? error.message : error.response.statusText;
}