import { useState, useEffect } from "react"
import { useWeb3Contract } from "react-moralis"
import { useQuery, gql } from "@apollo/client"
import { useSelector } from "react-redux"
import Link from "next/link"
import { Button } from "flowbite-react"
import { GiCrescentBlade } from "react-icons/gi"
import { FaUserLock } from "react-icons/fa"

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

    const { loading, error, data } = useQuery(GET_GUARDIANS)

    // contract function params
    // const [guardianName, setGuardianName] = useState("")
    // const [guardianLocation, setGuardianLocation] = useState("")
    const [accountIsGuardian, setAccountIsGuardian] = useState(false)

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
                                    {/* onClick={handleApplyGuardian} */}
                                    <Button color="gray">
                                        <FaUserLock className="mr-3 h-4 w-4" />
                                        <p>Apply Guardian</p>
                                    </Button>
                                </Link>

                                {accountIsGuardian ? (
                                    <Link legacyBehavior href="/minNft">
                                        <Button color="gray">
                                            <GiCrescentBlade className="mr-3 h-4 w-4" />
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
                                        console.log(guardian)

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
