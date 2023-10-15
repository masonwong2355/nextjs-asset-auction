import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { useQuery } from "@apollo/client"
import { useSelector } from "react-redux"
import { React } from "web3uikit"
import { Flowbite, Button, Label, TextInput } from "flowbite-react"
import { useWeb3Contract } from "react-moralis"
import Link from "next/link"
import { useNotification, Blockie } from "web3uikit"

import { getStyleObjectFromString, handleNewNotification } from "../../units"
import Loading from "../../components/Loading"
import BidTable from "../../components/BidTable"
import { GET_LISTING } from "../../constants/gql"

const custTheme = {
    avatar: {
        root: { base: "flex justify-start items-center space-x-4 rounded" },
    },
    modal: {
        root: {
            base: "fixed top-0 right-0 left-0 z-50 h-modal h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
            show: {
                on: "flex mt-20 bg-gray-900 bg-opacity-10 ",
            },
        },
    },
    table: {
        root: {
            shadow: "absolute w-full h-full top-0 left-0 rounded-lg drop-shadow-md -z-10",
        },
    },
}

export default function ListingDetail() {
    const router = useRouter()
    const listingId = router.query.listing
    const auctionHouseAddress = useSelector((state) => state.app.auctionHouseAddress)
    const auctionHouseAbi = useSelector((state) => state.app.auctionHouseAbi)
    const { runContractFunction } = useWeb3Contract()

    const [listing, setListing] = useState(null)
    const [auctionNft, setAuctionNft] = useState(null)
    const [startAt, setStartAt] = useState(0)
    const [endAt, setEndAt] = useState(0)
    const [bidPrice, setBidPrice] = useState(0)

    const dispatch = useNotification()

    // query
    const { loading, error, data } = useQuery(GET_LISTING, {
        variables: { id: listingId },
        skip: !listingId,
    })

    useEffect(() => {
        if (listing) {
            getAuctionNftData()
            setStartAt(new Date(parseInt(listing.startAt)))
            setEndAt(new Date(parseInt(listing.endAt)))
        }
    }, [listing])

    useEffect(() => {
        if (data && data.listing) {
            setListing(data.listing)
        }
    }, [data])

    // ------------------------------------------------------------------------
    const handleSubmitBid = (event) => {
        event.preventDefault()
        bid()
    }

    // ------------------------------------------------------------------------
    async function getAuctionNftData() {
        try {
            if (listing.auctionNft.tokenUri.includes("https://example.com")) {
                return
            }

            const response = await fetch(listing.auctionNft.tokenUri)

            if (!response.ok) {
                console.error("Failed fetch data")
            }

            const jsonData = await response.json()
            setAuctionNft(jsonData)
        } catch (err) {
            console.error("Unable fetch data", err)
        }
    }

    async function bid() {
        await runContractFunction({
            params: {
                abi: auctionHouseAbi,
                contractAddress: auctionHouseAddress,
                functionName: "bid",
                params: {
                    _tokenId: listing.auctionNft.tokenId,
                },
                msgValue: bidPrice,
            },
            onSuccess: (result) => {
                handleNewNotification(dispatch, "info", "Transaction proccessing")
            },
            onError: (error) => {
                handleNewNotification(dispatch, "error", "Transaction Error")
                console.log(error)
            },
        })
    }

    return (
        <div className="container mx-auto">
            {listing && auctionNft ? (
                <div
                    className="flex flex-none flex-shrink-0 relative items-center"
                    style={getStyleObjectFromString(
                        "min-height: calc(100vh - 96px); min-weigth: calc(100vh - 96px);"
                    )}
                >
                    <div className="relative container mx-auto pt-8 lg:pt-12 pb-8 lg:pb-12">
                        <div className="flex flex-col lg:flex-row w-full gap-10 lg:gap-20">
                            {/* image */}
                            <div className="flex-1 flex w-full justify-center lg:justify-start">
                                <div className="flex-shrink-0 relative w-full mx-auto aspect-w-1 aspect-h-1">
                                    <span
                                        style={getStyleObjectFromString(
                                            "box-sizing:border-box;display:block;overflow:hidden;width:initial;height:initial;background:none;opacity:1;border:0;margin:0;padding:0;position:absolute;top:0;left:0;bottom:0;right:0"
                                        )}
                                    >
                                        <img
                                            alt="We provide high quality services"
                                            src={auctionNft.imageCID}
                                            decoding="async"
                                            data-nimg="fill"
                                            className=""
                                            style={getStyleObjectFromString(
                                                "position:absolute;top:0;left:0;bottom:0;right:0;box-sizing:border-box;padding:0;border:none;margin:auto;display:block;width:0;height:0;min-width:100%;max-width:100%;min-height:100%;max-height:100%;object-fit:cover;object-position:50% center"
                                            )}
                                        />
                                    </span>
                                </div>
                            </div>

                            <Flowbite theme={{ theme: custTheme }}>
                                <div className="flex-1 flex flex-col items-start">
                                    <div
                                        className="rich-text-block w-full"
                                        style={getStyleObjectFromString("color: rgb(17, 24, 39);")}
                                    >
                                        <h3>{auctionNft.name}</h3>
                                        <hr></hr>

                                        <div className="space-y-1 font-medium dark:text-white justify-self-start">
                                            <div className="space-y-1 font-medium dark:text-white">
                                                <div>Owner</div>

                                                <div className="text-m text-gray-500 dark:text-gray-400">
                                                    <Blockie seed={listing.seller}></Blockie>{" "}
                                                    {listing.seller}
                                                </div>
                                            </div>
                                            {/* </Avatar> */}
                                        </div>

                                        <hr></hr>

                                        <div className="flex mb-3">
                                            <div className="flex-auto ">
                                                <div className="space-y-1 font-medium dark:text-white">
                                                    <div className="text-l text-gray-500 dark:text-gray-400">
                                                        Guardian
                                                    </div>
                                                    <div>
                                                        <Link
                                                            href={`/guardian/${listing.guardian.id}`}
                                                        >
                                                            <a>
                                                                {listing.guardian.name} (
                                                                {listing.guardian.location})
                                                            </a>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex-auto ">
                                                <div className="space-y-1 font-medium dark:text-white">
                                                    <div className="text-l text-gray-500 dark:text-gray-400">
                                                        Token ID
                                                    </div>
                                                    <div>{listing.auctionNft.tokenId}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex mb-3">
                                            <div className="flex-auto ">
                                                <div className="space-y-1 font-medium dark:text-white">
                                                    <div className="text-l text-gray-500 dark:text-gray-400">
                                                        Auction Duration
                                                    </div>
                                                    {/* listing.startAt is timestamp, help me change to human readble */}

                                                    <div>
                                                        {startAt.toLocaleDateString()} -
                                                        {endAt.toLocaleDateString()}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex mb-3">
                                            <div className="flex-auto ">
                                                <div className="space-y-1 font-medium dark:text-white">
                                                    <div className="text-l text-gray-500 dark:text-gray-400">
                                                        Year
                                                    </div>
                                                    <div>{auctionNft.year}</div>
                                                </div>
                                            </div>

                                            <div className="flex-auto ">
                                                <div className="space-y-1 font-medium dark:text-white">
                                                    <div className="text-l text-gray-500 dark:text-gray-400">
                                                        Size
                                                    </div>
                                                    <div>{auctionNft.caseSize}</div>
                                                </div>
                                            </div>

                                            <div className="flex-auto ">
                                                <div className="space-y-1 font-medium dark:text-white">
                                                    <div className="text-l text-gray-500 dark:text-gray-400">
                                                        Serial Number
                                                    </div>
                                                    <div>{auctionNft.serialNumber}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex mb-3">
                                            <div className="flex-auto ">
                                                <div className="space-y-1 font-medium dark:text-white">
                                                    <div className="text-l text-gray-500 dark:text-gray-400">
                                                        Material
                                                    </div>
                                                    <div>{auctionNft.caseMaterial}</div>
                                                </div>
                                            </div>

                                            <div className="flex-auto ">
                                                <div className="space-y-1 font-medium dark:text-white">
                                                    <div className="text-l text-gray-500 dark:text-gray-400">
                                                        band Material
                                                    </div>
                                                    <div>{auctionNft.bandMaterial}</div>
                                                </div>
                                            </div>

                                            <div className="flex-auto ">
                                                <div className="space-y-1 font-medium dark:text-white">
                                                    <div className="text-l text-gray-500 dark:text-gray-400">
                                                        Movement
                                                    </div>
                                                    <div>{auctionNft.movement}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex mb-3">
                                            <div className="flex-auto">
                                                <div className="space-y-1 font-medium dark:text-white">
                                                    <div className="text-l text-gray-500 dark:text-gray-400">
                                                        <p>Description</p>
                                                    </div>
                                                    <div className="text-m">
                                                        <p>{auctionNft.serviceHistory}</p>
                                                        <p>{auctionNft.story}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex mb-3">
                                            <div className="flex-auto">
                                                <div className="space-y-1 font-medium dark:text-white">
                                                    <div className="text-l text-gray-500 dark:text-gray-400">
                                                        Base Price
                                                    </div>
                                                    <div>$ {listing.price} Wei</div>
                                                </div>
                                            </div>

                                            <div className="flex-auto ">
                                                <div className="space-y-1 font-medium dark:text-white">
                                                    <div className="text-l text-gray-500 dark:text-gray-400">
                                                        Current Price
                                                    </div>
                                                    <div className="text-blue-700">
                                                        $ {listing.netPrice} Wei
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {listing.status == "Selling" ? (
                                            <>
                                                <div className="flex mb-3">
                                                    <div className="flex-auto w-full">
                                                        <form
                                                            action="#"
                                                            className="flex w-full flex-col items-center md:flex-row md:gap-x-3"
                                                            onSubmit={handleSubmitBid}
                                                        >
                                                            <Label
                                                                htmlFor="email"
                                                                className="mb-2 mr-auto flex-shrink-0 text-xl font-medium text-gray-500 dark:text-gray-400 md:m-0 md:mb-0"
                                                            >
                                                                Place Bid
                                                            </Label>
                                                            <TextInput
                                                                id="email"
                                                                placeholder="1 Wei"
                                                                required
                                                                value={bidPrice}
                                                                onChange={(e) => {
                                                                    setBidPrice(e.target.value)
                                                                }}
                                                            />
                                                            <Button type="submit" color="gray">
                                                                Submit
                                                            </Button>
                                                        </form>
                                                    </div>
                                                </div>

                                                <div className="flex mb-3">
                                                    <div className="flex-auto">
                                                        <BidTable bids={listing.bids}></BidTable>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                </div>
                            </Flowbite>
                        </div>
                    </div>
                </div>
            ) : (
                <Loading></Loading>
            )}
        </div>
    )
}
