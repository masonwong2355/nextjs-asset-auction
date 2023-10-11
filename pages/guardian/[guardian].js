import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useQuery, gql } from "@apollo/client"
import { Card } from "flowbite-react"

import { Avatar } from "flowbite-react"
import bg from "/assets/images/bg.jpeg"
import ethLogo from "/assets/images/ethereum-eth-logo.svg"
import maticLogo from "/assets/images/polygon-matic-logo.svg"
import { truncateStr } from "../../units"
import { Flowbite } from "flowbite-react"
import Link from "next/link"

import Loading from "../../components/Loading"
import RecordNotFound from "../../components/RecordNotFound"

const GET_GUARDIAN = gql(/* GraphQL */ `
    query GetGuardian($id: String!) {
        guardian(id: $id) {
            id
            name
            location
            stacking
            auctionNft {
                id
                mintAt
                owner
                tokenId
                tokenUri
            }
        }
    }
`)

function useGuardianDetail() {
    const router = useRouter()
    const guardianId = router.query.guardian
    const [guardian, setGuardian] = useState(null)

    const { loading, error, data } = useQuery(GET_GUARDIAN, {
        variables: { id: guardianId },
        skip: !guardianId,
    })

    useEffect(() => {
        if (data) {
            setGuardian(data.guardian)
        }

        if (error) {
            console.log(error)
        }
    }, [error, data])

    return [data, guardian]
}

export default function GuardianDetail() {
    const [data, guardian] = useGuardianDetail()

    // const router = useRouter()
    // const guardianId = router.query.guardian
    const [auctionNftData, setAuctionNftData] = useState({})
    // const [guardian, setGuardian] = useState()

    // const { loading, error, data } = useQuery(GET_GUARDIAN, {
    //     variables: { id: guardianId },
    //     skip: !guardianId,
    // })

    // useEffect(() => {
    //     if (data) {
    //         setGuardian(data.guardian)
    //     }

    //     if (error) {
    //         console.log(error)
    //     }
    // }, [data, error])

    useEffect(() => {
        if (guardian) {
            getAuctionNftData()
        }
    }, [guardian])

    async function getAuctionNftData() {
        if (guardian.auctionNft) {
            guardian.auctionNft.map(async (nft) => {
                try {
                    if (nft.tokenUri.includes("https://example.com")) {
                        return
                    }

                    const response = await fetch(nft.tokenUri)

                    if (!response.ok) {
                        console.error("Failed fetch data")
                    }

                    const jsonData = await response.json()
                    setAuctionNftData((prevState) => ({ ...prevState, [nft.id]: jsonData }))
                } catch (err) {
                    console.error("Unable fetch data", err)
                }
            })
        }
    }

    const cardTheme = {
        card: {
            img: {
                base: "h-60 object-cover",
            },
        },
    }

    return (
        <div className="container mx-auto">
            {data && guardian ? (
                <div className="my-8 grid grid-cols-4 gap-4">
                    <div className="mb-3">
                        <Avatar img={bg.src} size="xl" rounded>
                            <div className="truncate text-l font-medium">
                                &nbsp;&nbsp; {data.guardian.name}
                            </div>
                        </Avatar>

                        <hr></hr>

                        <div className="min-w-0 flex-1">
                            <div className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                                Number Of Assets
                            </div>
                            <div className="truncate text-sm text-gray-900 dark:text-white">
                                {data.guardian.auctionNft.length}
                            </div>
                        </div>
                        <div className="min-w-0 flex-1">
                            <div className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                                Stacking
                            </div>
                            <div className="flex truncate text-sm text-gray-900 dark:text-white">
                                <Avatar alt="eth logo" img={ethLogo.src} rounded size="xs">
                                    {data.guardian.stacking} Wei
                                </Avatar>
                            </div>
                        </div>
                        <div className="min-w-0 flex-1">
                            <div className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                                Chain Supported
                            </div>
                            <div className="flex truncate text-sm text-gray-900 dark:text-white">
                                <Avatar
                                    alt="eth logo"
                                    img={ethLogo.src}
                                    rounded
                                    size="xs"
                                ></Avatar>
                                <Avatar
                                    alt="eth logo"
                                    img={maticLogo.src}
                                    rounded
                                    size="xs"
                                ></Avatar>
                            </div>
                        </div>

                        <hr></hr>

                        <div className="min-w-0 flex-1">
                            <div className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                                Ethereum
                            </div>
                            <div className="flex truncate text-sm text-gray-900 dark:text-white">
                                0x2D478a26CF0e2fF4455c280ee7E6FE6Ef73cf850
                            </div>
                            <div className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                                Polygon
                            </div>
                            <div className="flex truncate text-sm text-gray-900 dark:text-white">
                                0x2D478a26CF0e2fF4455c280ee7E6FE6Ef73cf850
                            </div>
                        </div>
                    </div>
                    <div className="col-span-3">
                        <h2 className="truncate text-xl text-gray-900">Asset</h2>
                        <Flowbite theme={{ theme: cardTheme }}>
                            {auctionNftData ? (
                                data.guardian.auctionNft.length > 0 ? (
                                    <div className="grid grid-cols-3 gap-4">
                                        {data.guardian.auctionNft.map((nft) => {
                                            const nftData = auctionNftData[nft.id]

                                            if (!nftData) {
                                                // NO Data
                                                return null
                                            }
                                            const { name, story, imageCID } = nftData

                                            return (
                                                <div key={nft.tokenId}>
                                                    {/* <Link
                                                        legacyBehavior
                                                        href={`/listing/${listing.id}`}
                                                    > */}
                                                    <Card imgSrc={imageCID}>
                                                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                                            {name}
                                                        </h5>
                                                        <div className="font-normal text-gray-700 dark:text-gray-400">
                                                            {story}
                                                        </div>

                                                        <div className="font-normal text-gray-700 dark:text-gray-400 ">
                                                            <div className="mb-3 min-w-0 flex-1">
                                                                <div className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                                                                    Owner
                                                                </div>
                                                                <div className="truncate text-m text-gray-900 dark:text-white">
                                                                    {truncateStr(nft.owner, 15)}
                                                                </div>
                                                            </div>
                                                            <div className="mb-3 min-w-0 flex-1">
                                                                <div className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                                                                    Token Id
                                                                </div>
                                                                <div className="truncate text-l font-sans subpixel-antialiased text-gray-900 dark:text-white">
                                                                    {nft.tokenId}
                                                                </div>
                                                            </div>
                                                            <div className="mb-3 min-w-0 flex-1">
                                                                <div className="truncate text-sm font-medium text-gray-500 dark:text-gray-400">
                                                                    MintAt
                                                                </div>
                                                                <div className="truncate text-m text-gray-900 dark:text-white">
                                                                    {new Date(
                                                                        parseInt(nft.mintAt)
                                                                    ).toDateString()}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Card>
                                                    {/* </Link> */}
                                                </div>
                                            )
                                        })}
                                    </div>
                                ) : (
                                    <RecordNotFound />
                                )
                            ) : (
                                <Loading />
                            )}
                        </Flowbite>
                    </div>
                </div>
            ) : (
                <Loading />
            )}
        </div>
    )
}
