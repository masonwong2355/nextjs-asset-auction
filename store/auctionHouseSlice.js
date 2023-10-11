import { createSlice } from "@reduxjs/toolkit"
import { auctionHouseAbi, auctionNFTAbi } from "../constants"

const initialState = {
    chainId: null,
    signer: null,

    auctionHouseAddress: null,
    auctionNftAddress: null,

    auctionHouse: null,
    auctionNft: null,

    auctionHouseAbi: auctionHouseAbi,
    auctionNFTAbi: auctionNFTAbi,
}

export const slice = createSlice({
    name: "auctionHouseSlice",
    initialState,
    reducers: {
        initState: (state, action) => {
            state.chainId = action.payload.chainId
            state.signer = action.payload.signer
            state.auctionHouseAddress = action.payload.auctionHouseAddress
            state.auctionNftAddress = action.payload.auctionNFTAddress
            state.auctionHouse = action.payload.auctionHouse
            state.auctionNft = action.payload.auctionNft
        },
    },
})

export const { initState } = slice.actions
export default slice.reducer
