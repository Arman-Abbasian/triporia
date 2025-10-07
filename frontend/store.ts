import { Authenticate } from '@/services/auth'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    [Authenticate.reducerPath]: Authenticate.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      Authenticate.middleware
      //   Customers.middleware
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
