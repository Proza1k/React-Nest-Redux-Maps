import { SelectOptionsType } from 'src/components/common/Select'

export type MapConfiguration = {
  state: {
    center: [number, number]
    zoom: number
  }
  polyline: {
    color: string
    geometry: [number, number][] | undefined
  }
  maxSpeed: number
  time: {
    startDate: null | {
      value: string
      options: SelectOptionsType[]
    }
    endDate: null | {
      value: string
      options: SelectOptionsType[]
    }
  }
  currentBus: string | null
}
