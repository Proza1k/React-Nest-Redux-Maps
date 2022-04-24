import { createSlice } from '@reduxjs/toolkit'
import { setSuccess } from 'src/helpers/redux.helper'
import { MapConfiguration } from 'src/types/map.types'
import { Status } from 'src/types/status.types'
import { generateDefaultMapOptions } from '../utils/map.utils'

export type MapState = {
  status: Status
  data: MapConfiguration | null
}

const initialState: MapState = {
  data: null,
  status: Status.LOADING,
}

export const setMapState = (state: MapState, props?: MapConfiguration): MapState => {
  if (!props) {
    return setSuccess(state, { payload: generateDefaultMapOptions(), type: '' })
  }

  return setSuccess(state, { payload: props, type: '' })
}

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    GET_MAP: (state: MapState) => setMapState(state),
    UPDATE_MAP: (state: MapState, action: { payload: MapConfiguration }) => setMapState(state, action.payload),
  },
})
