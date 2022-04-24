import { BusDirection } from 'src/types/bus.types'
import { BusState } from '../reducers/busReducer'

export const getBusByIdent = (bus: BusState, ident: string): BusDirection | undefined =>
  bus.data?.find((b: BusDirection) => b.ident === ident)

export const getAllTimePicker = (bus: BusDirection): string[] =>
  bus?.directions.map((direction) => direction.server_timestamp)
