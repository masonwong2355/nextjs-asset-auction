import { configureStore } from "@reduxjs/toolkit"
// import auctionHouseReducer from "./auctionHouseSlice"
import auctionHouseReducer from "./auctionHouseSlice"

// import { curryGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware"

export const store = configureStore({
    reducer: {
        app: auctionHouseReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})
