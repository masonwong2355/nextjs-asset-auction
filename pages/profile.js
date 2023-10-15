import { useState, useEffect } from "react"
import { useWeb3Contract, useMoralis } from "react-moralis"
import { Button } from "web3uikit"
import { useSelector, useDispatch } from "react-redux"
import { useNotification } from "web3uikit"
import { useQuery } from "@apollo/client"

import { handleNewNotification } from "../units"
import BidTable from "../components/BidTable"
import { GET_BIDS } from "../constants/gql"

import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink, gql } from "@apollo/client"
const client = new ApolloClient({
    uri: "https://api.studio.thegraph.com/query/50930/auction-housev2/v0.0.8",
    cache: new InMemoryCache(),
})

export default function Home() {
    // web3 param
    const signer = useSelector((state) => state.app.signer)
    const auctionHouse = useSelector((state) => state.app.auctionHouse)
    const auctionHouseAddress = useSelector((state) => state.app.auctionHouseAddress)
    const auctionHouseAbi = useSelector((state) => state.app.auctionHouseAbi)
    const auctionNftAddress = useSelector((state) => state.app.auctionNftAddress)
    const auctionNFTAbi = useSelector((state) => state.app.auctionNFTAbi)
    const { runContractFunction } = useWeb3Contract()
    const dispatch = useNotification()

    const [bids, setBids] = useState(null)
    const [userAddress, setUserAddress] = useState("")

    // variable
    const [proceeds, setProceeds] = useState()

    async function getBids() {
        const { data } = await client.query({
            query: GET_BIDS,
            variables: { buyer: userAddress },
        })

        console.log(data)
    }

    // // query
    // const { loading, error, data } = useQuery(GET_BIDS, {
    //     variables: { buyer: userAddress },
    //     skip: !userAddress,
    // })

    // useEffect(() => {
    //     // console.log(signer, data)
    //     if (data && data.bids) {
    //         setBids(data.bids)
    //     }

    //     if (error) {
    //         console.log(error)
    //     }
    // }, [data, error])

    useEffect(() => {
        if (signer) {
            getProceeds()
            getBids()
        }
    }, [signer])

    // ------------------------------------------------------------------------
    async function getProceeds() {
        setUserAddress(await signer.getAddress())

        const proceeds = await auctionHouse.s_proceeds(await signer.getAddress())
        setProceeds(proceeds.toNumber())
    }

    // ------------------------------------------------------------------------
    async function handleWithdraw() {
        await runContractFunction({
            params: {
                abi: auctionHouseAbi,
                contractAddress: auctionHouseAddress,
                functionName: "withdrawProceeds",
            },
            onSuccess: (result) =>
                handleNewNotification(dispatch, "info", "Transaction proccessing"),
            onError: (error) => {
                handleNewNotification(dispatch, "error", "Transaction Error")
                console.log(error)
            },
        })
    }

    return (
        <div className="container mx-auto m-3">
            <div className="grid grid-cols-1">
                <div>
                    <h3 className="py-4 px-4 font-bold text-2xl">My Profit: {proceeds}</h3>
                    {proceeds > 0 ? (
                        <Button onClick={handleWithdraw} text="Withdraw Proceeds" type="button" />
                    ) : (
                        <></>
                    )}
                    <br></br>
                </div>

                {process.env.NEXT_PUBLIC_SUBGRAPH_URL}
                <br></br>
                {process.env.NEXT_PUBLIC_SOME_MSG}
                <br></br>

                <div>
                    <h3 className="py-4 px-4 font-bold text-2xl">Bids History</h3>
                    <hr></hr>
                    <BidTable bids={bids} showListing={true}></BidTable>
                </div>
            </div>
        </div>
    )
}

// biding product
// listing
//
