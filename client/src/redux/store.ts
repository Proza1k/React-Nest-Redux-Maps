import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { busSlice } from './reducers/busReducer'
import { mapSlice } from './reducers/mapReducer'

export const store = configureStore({
  reducer: {
    bus: busSlice.reducer,
    map: mapSlice.reducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
