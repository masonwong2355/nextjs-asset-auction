import Datepicker from "tailwind-datepicker-react"
import { useState, useEffect } from "react"
import { useWeb3Contract } from "react-moralis"
import { useQuery, gql } from "@apollo/client"
import { useSelector } from "react-redux"
import { React, useNotification } from "web3uikit"
import { Button, Label, Modal, Radio } from "flowbite-react"
import { Flowbite } from "flowbite-react"
import ListingCard from "../../components/ListingCard"
import Loading from "../../components/Loading"
import { MdEditNote } from "react-icons/md"
import RecordNotFound from "../../components/RecordNotFound"

const GET_LISTINGS = gql`
    query GetListing($status: [String!]!) {
        listings(where: { status_in: $status }) {
            id
            buyer
            seller
            price
            netPrice
            startAt
            endAt
            status
            auctionNft {
                tokenId
                tokenUri
            }
            bids(first: 1, orderDirection: desc, orderBy: blockTimestamp) {
                bidPrice
                blockTimestamp
                buyer
            }
        }
    }
`

export default function Home() {
    // web3 param
    const signer = useSelector((state) => state.app.signer)
    const auctionHouse = useSelector((state) => state.app.auctionHouse)
    const auctionHouseAddress = useSelector((state) => state.app.auctionHouseAddress)
    const auctionHouseAbi = useSelector((state) => state.app.auctionHouseAbi)
    const { runContractFunction } = useWeb3Contract()

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
    // console.log(loading, data)

    const handleSelectedAuctionStatus = (e) => {
        setListings([])
        setAuctionNftData({})

        if (e.target.value == "all") {
            setSelectedAuctionStatus(defaultStatus)
            return
        }
        setSelectedAuctionStatus([e.target.value])
    }

    async function getAuctionNftData() {
        if (listings) {
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
    }

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

    // listing function
    const handleSubmitListing = async (event) => {
        event.preventDefault()
        // validation
        // console.log(tokenId, guardianAddress, price, auctionStartAt, auctionEndAt)

        listAssert()
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
                handleNewNotification("info", "Transaction proccessing")
            },
            onError: (error) => {
                handleNewNotification("error", "Transaction Error")
                console.log(error)
            },
        })
    }

    function nowTime() {
        const now = new Date()
        const twoMinutesLater = new Date(now.getTime() + 2 * 60 * 1000)

        return Math.floor(twoMinutesLater.getTime() / 1000)
    }

    function dateStringConvertTimestamp(dateString) {
        const [datePart, timePart] = dateString.split(", ")
        const [day, month, year] = datePart.split("/")
        const [hour, minute, second] = timePart.split(":")
        const date = new Date(year, month - 1, day, hour, minute)
        return Math.floor(date.getTime() / 1000)
    }

    // modlal
    const [openModal, setOpenModal] = useState()
    const props = { openModal, setOpenModal }
    const modalTheme = {
        modal: {
            root: {
                show: {
                    on: "flex pt-20 bg-gray-900 bg-opacity-10 ",
                },
            },
        },
    }

    useEffect(() => {}, [signer])

    return (
        <div className="container mx-auto m-3">
            {/* Header */}
            <div className="grid">
                <div className="justify-self-end">
                    <Button.Group>
                        <Button color="gray" onClick={() => props.setOpenModal("form-elements")}>
                            <MdEditNote className="mr-3 h-4 w-4" />
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
            <Flowbite theme={{ theme: modalTheme }}>
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
