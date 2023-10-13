import { useState, useEffect } from "react"
import { useWeb3Contract, useMoralis } from "react-moralis"
import { Button } from "web3uikit"
import { useSelector, useDispatch } from "react-redux"
import { useNotification } from "web3uikit"

export default function Home() {
    // web3 param
    const signer = useSelector((state) => state.app.signer)
    const auctionHouse = useSelector((state) => state.app.auctionHouse)
    const auctionHouseAddress = useSelector((state) => state.app.auctionHouseAddress)
    const auctionHouseAbi = useSelector((state) => state.app.auctionHouseAbi)
    const auctionNftAddress = useSelector((state) => state.app.auctionNftAddress)
    const auctionNFTAbi = useSelector((state) => state.app.auctionNFTAbi)
    const { runContractFunction } = useWeb3Contract()

    // variable
    const [proceeds, setProceeds] = useState()

    // functions
    async function getProceeds() {
        const proceeds = await auctionHouse.s_proceeds(await signer.getAddress())
        setProceeds(proceeds.toNumber())
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

    async function handleWithdraw() {
        await runContractFunction({
            params: {
                abi: auctionHouseAbi,
                contractAddress: auctionHouseAddress,
                functionName: "withdrawProceeds",
            },
            onSuccess: (result) => handleNewNotification("info", "Transaction proccessing"),
            onError: (error) => {
                handleNewNotification("error", "Transaction Error")
                console.log(error)
            },
        })
    }

    console.log(process.env.NEXT_PUBLIC_SUBGRAPH_URL)

    const loading = false

    useEffect(() => {
        if (signer) {
            getProceeds()
        }
    }, [signer])

    return (
        <div className="container mx-auto m-3">
            <div className="flex flex-wrap">
                <h3 className="py-4 px-4 font-bold text-2xl">My Profit: {proceeds}</h3>

                {proceeds > 0 ? (
                    <Button onClick={handleWithdraw} text="Withdraw Proceeds" type="button" />
                ) : (
                    <></>
                )}
            </div>
        </div>
    )
}
