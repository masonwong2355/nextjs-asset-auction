import Datepicker from "tailwind-datepicker-react"
import { useState, useEffect } from "react"
import { useWeb3Contract } from "react-moralis"
import { useQuery } from "@apollo/client"
import { useSelector } from "react-redux"
import { React, useNotification } from "web3uikit"
import { Flowbite, Button, Label, Modal, Radio } from "flowbite-react"

import ListingCard from "../../components/ListingCard"
import Loading from "../../components/Loading"
import RecordNotFound from "../../components/RecordNotFound"
import { GET_LISTINGS } from "../../constants/gql"
import { nowTime, dateStringConvertTimestamp, handleNewNotification } from "../../units"

const custTheme = {
    modal: {
        root: {
            show: {
                on: "flex pt-20 bg-gray-900 bg-opacity-10 ",
            },
        },
    },
}

export default function Home() {
    // web3 param
    const signer = useSelector((state) => state.app.signer)
    const auctionHouse = useSelector((state) => state.app.auctionHouse)
    const auctionHouseAddress = useSelector((state) => state.app.auctionHouseAddress)
    const auctionHouseAbi = useSelector((state) => state.app.auctionHouseAbi)
    const { runContractFunction } = useWeb3Contract()
    const dispatch = useNotification()
    const [openModal, setOpenModal] = useState()
    const props = { openModal, setOpenModal }

    // form variable
    const [tokenId, setTokenId] = useState(0)
    const [guardianAddress, setGuardianAddress] = useState(
        "0xe16726f788b65efe284f24d6fc5ce00eb5f0b6f1"
    )
    const [price, setPrice] = useState(1)
    const now = new Date()
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const [auctionStartAt, setAuctionStartAt] = useState(startOfToday.getTime())
    const [auctionEndAt, setAuctionEndAt] = useState(startOfToday.getTime())

    const [showStartAt, setShowStartAt] = useState(false)
    const [showEndAt, setShowEndAt] = useState(false)

    // ------------------------------------------------------------------------
    const defaultStatus = ["Listing", "Selling"]
    const [selectedAuctionStatus, setSelectedAuctionStatus] = useState(defaultStatus)
    // const [data, setData] = useState(null)
    const [listings, setListings] = useState([])
    const [auctionNftData, setAuctionNftData] = useState({})

    const { data, loading, error } = useQuery(GET_LISTINGS, {
        variables: { status: selectedAuctionStatus },
    })

    // modlal
    useEffect(() => {}, [signer])

    useEffect(() => {
        getAuctionNftData()
    }, [listings])

    useEffect(() => {
        if (!loading) {
            if (data) {
                setListings(data.listings)
                getAuctionNftData()
            }
        }
    }, [loading, data])

    // ------------------------------------------------------------------------

    const handleSelectedAuctionStatus = (e) => {
        setListings([])
        setAuctionNftData({})

        if (e.target.value == "all") {
            setSelectedAuctionStatus(defaultStatus)
            return
        }
        setSelectedAuctionStatus([e.target.value])
    }

    const handleSubmitListing = async (event) => {
        event.preventDefault()
        // validation
        // console.log(tokenId, guardianAddress, price, auctionStartAt, auctionEndAt)

        listAssert()
    }

    // ------------------------------------------------------------------------
    async function getAuctionNftData() {
        if (!listings) {
            return null
        }

        listings.map(async (listing) => {
            try {
                if (listing.auctionNft.tokenUri.includes("https://example.com")) {
                    return
                }

                const response = await fetch(listing.auctionNft.tokenUri)

                if (!response.ok) {
                    console.error("Failed fetch data")
                }

                const jsonData = await response.json()
                setAuctionNftData((prevState) => ({
                    ...prevState,
                    [listing.id]: jsonData,
                }))
            } catch (err) {
                console.error("Unable fetch data", err)
            }
        })
    }

    async function listAssert() {
        await runContractFunction({
            params: {
                abi: auctionHouseAbi,
                contractAddress: auctionHouseAddress,
                functionName: "listAssert",
                params: {
                    _tokenId: tokenId,
                    _price: price,
                    _guardian: guardianAddress,
                    _startAt: nowTime(),
                    _endAt: auctionEndAt,
                },
            },
            onSuccess: (result) => {
                setOpenModal(undefined)

                handleNewNotification(dispatch, "info", "Transaction proccessing")
            },
            onError: (error) => {
                handleNewNotification(dispatch, "error", "Transaction Error")
                console.log(error)
            },
        })
    }

    return (
        <div className="container mx-auto m-3">
            {/* Header */}
            <div className="grid">
                <div className="justify-self-end">
                    <Button.Group>
                        <Button color="gray" onClick={() => props.setOpenModal("form-elements")}>
                            <svg
                                className="w-6 h-6 mr-3 text-gray-800 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="20"
                                fill="none"
                                viewBox="0 0 18 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeWidth="2"
                                    d="M12 2h4a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h4m6 0v3H6V2m6 0a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1M5 5h8m-5 5h5m-8 0h.01M5 14h.01M8 14h5"
                                />
                            </svg>
                            <p>Listing Token</p>
                        </Button>
                    </Button.Group>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
                {/* Filter */}
                <div className="mb-3 text-gray-500 dark:text-gray-400">
                    <form>
                        <div className="mb-6">
                            <fieldset className="flex max-w-md flex-col gap-4" id="radio">
                                <legend className="mb-4">Auction Status</legend>
                                <div className="flex items-center gap-2 cursor-pointer">
                                    <Radio
                                        id="all"
                                        name="auctionStatus"
                                        value="all"
                                        checked={selectedAuctionStatus == "Listing,Selling"}
                                        onChange={handleSelectedAuctionStatus}
                                    />
                                    <Label htmlFor="all">All</Label>
                                </div>
                                <div className="flex items-center gap-2 cursor-pointer">
                                    <Radio
                                        id="listing"
                                        name="auctionStatus"
                                        value="Listing"
                                        checked={selectedAuctionStatus == "Listing"}
                                        onChange={handleSelectedAuctionStatus}
                                    />
                                    <Label htmlFor="listing">Listing</Label>
                                </div>
                                <div className="flex items-center gap-2 cursor-pointer">
                                    <Radio
                                        id="selling"
                                        name="auctionStatus"
                                        value="Selling"
                                        checked={selectedAuctionStatus == "Selling"}
                                        onChange={handleSelectedAuctionStatus}
                                    />
                                    <Label htmlFor="selling">Selling</Label>
                                </div>
                            </fieldset>
                        </div>
                    </form>
                </div>

                {/* Listing */}
                <div className="col-span-3">
                    <div className="mb-3 text-gray-500 dark:text-gray-400">
                        {!loading ? (
                            listings.length > 0 ? (
                                <div className="grid grid-cols-3 gap-4">
                                    {listings.map((listing) => {
                                        const nftMetaData = auctionNftData[listing.id]

                                        if (nftMetaData) {
                                            return (
                                                <ListingCard
                                                    key={listing.id}
                                                    listing={listing}
                                                    nftMetaData={auctionNftData[listing.id]}
                                                ></ListingCard>
                                            )
                                        }
                                    })}
                                </div>
                            ) : (
                                <RecordNotFound></RecordNotFound>
                            )
                        ) : (
                            <Loading></Loading>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal */}
            <Flowbite theme={{ theme: custTheme }}>
                <Modal
                    show={props.openModal === "form-elements"}
                    size={"3xl"}
                    popup
                    dismissible
                    onClose={() => props.setOpenModal(undefined)}
                >
                    <Modal.Header />
                    <Modal.Body>
                        <div className="space-y-6">
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                                List your token
                            </h3>
                            <form onSubmit={handleSubmitListing}>
                                <div className="mb-6">
                                    <label
                                        htmlFor="tokenId"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Token Id
                                    </label>
                                    <input
                                        id="tokenId"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="0"
                                        value={tokenId}
                                        // required
                                        onChange={(event) => {
                                            setTokenId(event.target.value)
                                        }}
                                    />
                                </div>
                                <div className="mb-6">
                                    <label
                                        htmlFor="guardian"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Guardian Address
                                    </label>
                                    <input
                                        id="guardian"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="0x000000000000000"
                                        value={guardianAddress}
                                        // required
                                        onChange={(event) => {
                                            setGuardianAddress(event.target.value)
                                        }}
                                    />
                                </div>
                                <div className="mb-6">
                                    <label
                                        htmlFor="price"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Price
                                    </label>
                                    <input
                                        id="price"
                                        min="1"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="1 wei"
                                        value={price}
                                        // required
                                        onChange={(event) => {
                                            setPrice(event.target.value)
                                        }}
                                    />
                                </div>
                                <div className="mb-6">
                                    <label
                                        htmlFor="startAt"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Auction Start At
                                    </label>

                                    <Datepicker
                                        id="startAt"
                                        show={showStartAt}
                                        setShow={(state) => {
                                            setShowStartAt(state)
                                        }}
                                        onChange={(date) => {
                                            setAuctionStartAt(
                                                dateStringConvertTimestamp(date.toLocaleString())
                                            )
                                        }}
                                    />
                                </div>

                                <div className="mb-6">
                                    <label
                                        htmlFor="endAt"
                                        className="block mb-2 text-sm font-medium text-gray-900"
                                    >
                                        Auction End At
                                    </label>

                                    <Datepicker
                                        id="endAt"
                                        show={showEndAt}
                                        setShow={(state) => {
                                            setShowEndAt(state)
                                        }}
                                        onChange={(date) => {
                                            setAuctionEndAt(
                                                dateStringConvertTimestamp(date.toLocaleString())
                                            )
                                        }}
                                    />
                                </div>

                                <div className="w-full">
                                    <button
                                        type="submit"
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </Modal.Body>
                </Modal>
            </Flowbite>
        </div>
    )
}
