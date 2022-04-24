export type BusDirection = {
  ident: string
  directions: Bus[]
}

export type Bus = {
  id: number
  ident: string
  speed: string
  lon: string
  lat: string
  server_timestamp: string
  device_timestamp: string
  direction: string
}
