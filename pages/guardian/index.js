import { useState, useEffect } from "react"
import { useWeb3Contract } from "react-moralis"
import { useQuery, gql } from "@apollo/client"
import { useSelector } from "react-redux"
import Link from "next/link"
import { Button } from "flowbite-react"

import Loading from "../../components/Loading"
import { GET_GUARDIANS } from "../../constants/gql"
import { getStyleObjectFromString } from "../../units"
import GudianCard from "../../components/GudianCard"

export default function Guardians() {
    // web3 param
    const signer = useSelector((state) => state.app.signer)
    const auctionHouseAddress = useSelector((state) => state.app.auctionHouseAddress)
    const auctionHouseAbi = useSelector((state) => state.app.auctionHouseAbi)
    const { runContractFunction } = useWeb3Contract()
    const [accountIsGuardian, setAccountIsGuardian] = useState(false)

    // const error = null
    const { loading, error, data } = useQuery(GET_GUARDIANS)

    useEffect(() => {
        if (signer) {
            getIsGuardian()
        }
        if (error) {
            console.log(error)
        }
    }, [signer, error])

    // ------------------------------------------------------------------------
    async function getIsGuardian() {
        await runContractFunction({
            params: {
                abi: auctionHouseAbi,
                contractAddress: auctionHouseAddress,
                functionName: "isGuardians",
                params: {
                    _guardian: await signer.getAddress(),
                },
            },
            onSuccess: (result) => setAccountIsGuardian(result),
            onError: (error) => {
                console.log(error)
            },
        })
    }

    return (
        <div className="relative flex mx-auto w-full transition-all duration-300 justify-center items-center p-3  h-auto">
            <div className="overflow-x-hidden pb-1 container">
                <div
                    className="commonninja_component pid-4369e19f-0e13-41fb-b79b-a649b48762c2"
                    style={getStyleObjectFromString("transition: all 0.2s ease 0s;")}
                >
                    <div
                        className="sc-gsFSXq mNzpj plugin-wrapper widget-4369e19f-0e13-41fb-b79b-a649b48762c2 viewer grid"
                        style={getStyleObjectFromString("font-family: Lato, sans-serif;")}
                    >
                        <div className="flex justify-self-end">
                            <Button.Group>
                                <Link legacyBehavior href="/applyGuardian">
                                    <Button color="gray">
                                        <svg
                                            className="w-6 h-6 mr-3 text-gray-800 dark:text-white"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 20 18"
                                        >
                                            <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-2V5a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 0 0 2 0V9h2a1 1 0 1 0 0-2Z" />
                                        </svg>
                                        <p>Apply Guardian</p>
                                    </Button>
                                </Link>

                                {accountIsGuardian ? (
                                    <Link legacyBehavior href="/minNft">
                                        <Button color="gray">
                                            <svg
                                                className="w-6 h-6 mr-3  text-gray-800 dark:text-white"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.546.5a9.5 9.5 0 1 0 9.5 9.5 9.51 9.51 0 0 0-9.5-9.5ZM13.788 11h-3.242v3.242a1 1 0 1 1-2 0V11H5.304a1 1 0 0 1 0-2h3.242V5.758a1 1 0 0 1 2 0V9h3.242a1 1 0 1 1 0 2Z" />
                                            </svg>

                                            <p>Mint Nft</p>
                                        </Button>
                                    </Link>
                                ) : (
                                    <></>
                                )}
                            </Button.Group>
                        </div>

                        <div className="sc-klVQfs fUcTAH">
                            <div
                                className="info-list-container layout-6 skin-0 right-to-left-slide img-hover"
                                style={getStyleObjectFromString("gap: 20px;")}
                            >
                                {!loading || data ? (
                                    data.guardians.map((guardian) => {
                                        // console.log(guardian)
                                        return (
                                            <GudianCard
                                                key={guardian.id}
                                                guardian={guardian}
                                            ></GudianCard>
                                        )
                                    })
                                ) : (
                                    <Loading />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
