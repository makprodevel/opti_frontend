const { protocol, hostname } = window.location

const BACKEND_URL = `${protocol}//${hostname}`

export { BACKEND_URL, hostname as HOST }
