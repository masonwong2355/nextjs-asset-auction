import React, { useState, useEffect } from "react"
import WatchForm from "../components/WatchForm"
import WineForm from "../components/WineForm"
import { useSelector } from "react-redux"
import { useWeb3Contract } from "react-moralis"
import { useNotification } from "web3uikit"

export default function MintingAuctionNftForm() {
    const auctionNftAddress = useSelector((state) => state.app.auctionNftAddress)
    const auctionNFTAbi = useSelector((state) => state.app.auctionNFTAbi)
    const { runContractFunction } = useWeb3Contract()

    const [nftOwner, setNftOwner] = useState("")
    const [assetType, setAssetType] = useState("") // Empty string as default

    const handleMintNft = async (tokenUri) => {
        await runContractFunction({
            params: {
                abi: auctionNFTAbi,
                contractAddress: auctionNftAddress,
                functionName: "mint",
                params: {
                    _owner: nftOwner,
                    _tokenURI: tokenUri,
                },
            },
            onSuccess: () => {
                handleNewNotification("info", "Transaction proccessing")
            },
            onError: (error) => {
                handleNewNotification("error", "Transaction Error")
                console.log(error)
            },
        })
    }

    const dispatch = useNotification()

    const handleNewNotification = (type, title, message, icon) => {
        dispatch({
            type,
            message: message,
            title: title,
            icon: icon,
            position: "topR",
        })
    }

    // useEffect(() => {
    //     console.log("auctionNftAddress", auctionHouseAddress)
    //     console.log("auctionNFTAbi", auctionNFTAbi)
    // }, [auctionNftAddress])

    return (
        <div className="container mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Nft Owner:</label>
                <input
                    name="nftOwner"
                    value={nftOwner}
                    onChange={(e) => {
                        setNftOwner(e.target.value)
                    }}
                    className="w-full p-2 border rounded"
                    type="text"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Select Asset Type:</label>
                <select
                    value={assetType}
                    onChange={(e) => {
                        setAssetType(e.target.value)
                    }}
                    className="w-full p-2 border rounded"
                >
                    <option value="">-- Select Asset Type --</option>
                    <option value="watch">Watch</option>
                    <option value="wine">Wine</option>
                </select>
            </div>

            {assetType === "watch" && <WatchForm handleMintNft={handleMintNft}></WatchForm>}
            {assetType === "wine" && <WineForm handleMintNft={handleMintNft}></WineForm>}
        </div>
    )
}

// export default mintingAuctionNftForm
