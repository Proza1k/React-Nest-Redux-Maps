import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit'
import { asyncThunk, setError, setLoading, setSuccess } from 'src/helpers/redux.helper'
import { RequestMethod } from 'src/helpers/request.helper'
import { BusDirection } from 'src/types/bus.types'
import { Status } from 'src/types/status.types'
import API_ROUTER from '../router'

export type BusState = {
  status: Status
  data: BusDirection[] | null
}

const initialState: BusState = {
  data: null,
  status: Status.LOADING,
}

export const GET_BUS = asyncThunk<null, BusDirection[], null>({
  thunk: 'busSlice/GET_BUS',
  route: API_ROUTER.bus,
  method: RequestMethod.GET,
})

export const busSlice = createSlice({
  name: 'bus',
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<BusState>) => {
    builder.addCase(GET_BUS.fulfilled, setSuccess)
    builder.addCase(GET_BUS.rejected, setError)
    builder.addCase(GET_BUS.pending, setLoading)
  },
})
