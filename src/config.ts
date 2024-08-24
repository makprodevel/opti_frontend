const { protocol, hostname } = window.location
export const BACKEND_URL = `${protocol}//${hostname}`
export const WS_URL =
  protocol == 'https:' ? `wss://${hostname}` : `ws://${hostname}`
