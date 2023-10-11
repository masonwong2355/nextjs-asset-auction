import Link from "next/link"
import { Card } from "flowbite-react"

import { Button, Timeline } from "flowbite-react"
import { truncateStr } from "../units"
import { Flowbite } from "flowbite-react"
import { getStyleObjectFromString } from "../units"

export default function ListingCard(props) {
    const listing = props.listing
    const nftMetaData = props.nftMetaData

    const startAtDate = new Date(parseInt(listing.startAt))
    const endAtDate = new Date(parseInt(listing.endAt))

    function dateFormat(date) {
        return date.toDateString()
    }

    const cardTheme = {
        card: {
            img: {
                base: "h-80 w-full object-cover",
            },
        },
    }

    return (
        <div className="mt-3">
            <Flowbite theme={{ theme: cardTheme }}>
                <Link legacyBehavior passHref href={`/listing/${listing.id}`}>
                    {/* hover:bg-gray-200 */}

                    <Card
                        imgSrc={nftMetaData.imageCID}
                        className="transition duration-300 cursor-pointer"
                    >
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {nftMetaData.name}
                        </h5>
                        <div className="font-normal text-gray-700 dark:text-gray-400 ">
                            <div className="min-w-0 flex-1 mb-3">
                                <p className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Seller
                                </p>
                                <p className="truncate text-m text-gray-900 dark:text-white">
                                    {truncateStr(listing.seller, 15)}
                                </p>
                            </div>
                            <div className="min-w-0 flex-1 mb-3">
                                <p className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Net Price
                                </p>
                                <p className="truncate text-l font-sans subpixel-antialiased text-gray-900 dark:text-white">
                                    $ {listing.netPrice} Wei
                                </p>
                            </div>
                            <div className="min-w-0 flex-1 mb-3">
                                <p className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Auction Time
                                </p>
                                <p className="truncate text-m text-gray-900 dark:text-white">
                                    {dateFormat(startAtDate)} - {dateFormat(endAtDate)}
                                </p>
                            </div>

                            {listing.status === "Selling" && (
                                // {listing.status === "Listing" && (
                                <div className="min-w-0 flex-1 ">
                                    <p className="truncate text-m text-gray-900 dark:text-white justify-self">
                                        <Button color="gray" pill className="hover:bg-gray-300">
                                            Bid Now
                                        </Button>
                                    </p>
                                </div>
                            )}
                        </div>
                    </Card>
                </Link>
            </Flowbite>
        </div>
    )
}
