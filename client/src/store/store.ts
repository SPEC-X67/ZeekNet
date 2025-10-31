import { configureStore } from '@reduxjs/toolkit'
import auth from './slices/auth.slice'
import { setAuthTokenGetter } from '@/api'

export const store = configureStore({
  reducer: { auth },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

setAuthTokenGetter(() => store.getState().auth.token)