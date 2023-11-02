import { Table } from "flowbite-react"
import { useState, useEffect } from "react"

export default function BidTable(props) {
    const bids = props.bids
    const showListing = props.showListing ? props.showListing : false
    const [auctionNftData, setAuctionNftData] = useState({})

    async function getAuctionNftData(listingId, tokenUri) {
        try {
            if (tokenUri.includes("https://example.com")) {
                return
            }
            const response = await fetch(tokenUri)

            if (!response.ok) {
                console.error("Failed fetch data")
            }

            const jsonData = await response.json()
            setAuctionNftData((prevState) => ({ ...prevState, [listingId]: jsonData }))
        } catch (err) {
            console.error("Unable fetch data", err)
        }
    }

    useEffect(() => {
        if (showListing && bids) {
            bids.map((bid) => {
                getAuctionNftData(bid.listing.id, bid.listing.auctionNft.tokenUri)
            })
        }
    }, [bids])

    useEffect(() => {}, [auctionNftData])

    return (
        <Table>
            <Table.Head>
                {showListing ? <Table.HeadCell>Production Name</Table.HeadCell> : <></>}

                <Table.HeadCell>Bid Price</Table.HeadCell>
                <Table.HeadCell>Bider</Table.HeadCell>
                <Table.HeadCell>Time</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                {bids && bids.length > 0 ? (
                    bids.map((bid) => {
                        const time = new Date(parseInt(bid.blockTimestamp * 1000))

                        return (
                            <Table.Row
                                key={bid.blockTimestamp}
                                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                            >
                                {showListing && auctionNftData[bid.listing.id] ? (
                                    <Table.HeadCell>
                                        {auctionNftData[bid.listing.id].name}
                                    </Table.HeadCell>
                                ) : (
                                    <></>
                                )}

                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {bid.bidPrice}
                                </Table.Cell>
                                <Table.Cell>{bid.buyer}</Table.Cell>
                                <Table.Cell>{time.toLocaleDateString()}</Table.Cell>
                            </Table.Row>
                        )
                    })
                ) : (
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        {showListing ? <Table.HeadCell>-</Table.HeadCell> : <></>}
                        <Table.Cell>-</Table.Cell>
                        <Table.Cell>-</Table.Cell>
                        <Table.Cell>-</Table.Cell>
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    )
}
