import { BusDirection } from 'src/types/bus.types'
import { MapConfiguration } from 'src/types/map.types'
import { SelectOptionsType } from 'src/components/common/Select'

export const getColor = (): string => {
  const alphabet = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += alphabet[Math.floor(Math.random() * 16)]
  }
  return color
}

export const generateGeometryPolyline = (bus: BusDirection): [number, number][] => {
  return bus.directions.map((direction) => [parseFloat(direction.lat), parseFloat(direction.lon)])
}

export const generateCenterPosition = (bus: BusDirection): [number, number] => {
  const lon = bus.directions.map((direction) => parseFloat(direction.lon))
  const lat = bus.directions.map((direction) => parseFloat(direction.lat))
  return [(Math.max(...lat) + Math.min(...lat)) / 2, (Math.max(...lon) + Math.min(...lon)) / 2]
}

export const generateOptionsNameBus = (directions: BusDirection[]): SelectOptionsType[] =>
  directions.map((direction) => ({
    label: direction.ident,
    value: direction.ident,
  }))

export const generateOptionsTimeBus = (times: string[] | undefined): SelectOptionsType[] => {
  if (!times)
    return [
      {
        label: '',
        value: '',
      },
    ]

  return times.map((time) => ({
    label: time,
    value: time,
  }))
}

export const generateDefaultMapOptions = (): MapConfiguration => ({
  state: {
    center: [55.75, 37.57],
    zoom: 8,
  },
  polyline: {
    color: getColor(),
    geometry: [],
  },
  maxSpeed: 0,
  time: {
    startDate: null,
    endDate: null,
  },
  currentBus: null,
})

export const getMaxSpeed = (bus: BusDirection): number => {
  const speeds = bus.directions.map((direction) => Number(direction.speed))
  return Math.max(...speeds)
}

export const getDistanceByCoordinates = (coordinates: [number, number][]): string => {
  const length = coordinates.reduce((acc, curr) => {
    return (
      acc +
      Math.sqrt(
        Math.pow(curr[0] - coordinates[coordinates.length - 1][0], 2) +
          Math.pow(curr[1] - coordinates[coordinates.length - 1][1], 2),
      )
    )
  }, 0)

  return `${Math.round(length * 10) / 100} км`
}
