import { ethers } from "ethers"
import { useState, useEffect } from "react"
import { useWeb3Contract } from "react-moralis"
import { useQuery, gql } from "@apollo/client"
import { useSelector } from "react-redux"
import { getStyleObjectFromString } from "../../units"
import GudianCard from "../../components/GudianCard"
import Link from "next/link"
import { Button, Table } from "flowbite-react"
import { GiCrescentBlade } from "react-icons/gi"
import { FaUserLock } from "react-icons/fa"
import Loading from "../../components/Loading"

const GET_GUARDIANS = gql`
    {
        guardians {
            id
            guardian
            name
            location
            stacking
            auctionNft {
                id
                mintAt
                tokenId
                owner
                tokenUri
            }
        }
    }
`

export default function Guardians() {
    // web3 param
    const signer = useSelector((state) => state.app.signer)
    const auctionHouseAddress = useSelector((state) => state.app.auctionHouseAddress)
    const auctionHouseAbi = useSelector((state) => state.app.auctionHouseAbi)
    const auctionNftAddress = useSelector((state) => state.app.auctionNftAddress)
    const auctionNFTAbi = useSelector((state) => state.app.auctionNFTAbi)
    const { runContractFunction } = useWeb3Contract()

    const { loading, error, data } = useQuery(GET_GUARDIANS)

    // contract function params
    const [guardianName, setGuardianName] = useState("")
    const [guardianLocation, setGuardianLocation] = useState("")
    const [accountIsGuardian, setAccountIsGuardian] = useState(false)

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

    useEffect(() => {
        if (signer) {
            getIsGuardian()
        }
    }, [signer])

    // console.log(data.guardians)

    return (
        <div className="relative z-10 flex mx-auto w-full transition-all duration-300 justify-center items-center p-3  h-auto">
            <div className=" overflow-x-hidden pb-1 container">
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

// const { name, location, auctionNft } = guardian

// const auctionNftRender = auctionNft.map((a) => {
//     return (
//         <div key={a.id}>
//             {a.tokenId} + {a.tokenUri}{" "}
//         </div>
//     )
// })

// return (
//     <div
//         className="list-item ltr"
//         key={guardian.id}
//     >
//         <div className="img-wrapper">
//             <img
//                 className="cover-img"
//                 src="https://website-assets.commoninja.com/distribution/1659524147663_papardelle1.png"
//                 alt="Short Ribs Pappardelle"
//             />
//         </div>
//         <div className="content scroller">
//             <div className="content-top-wrapper menu-list">
//                 <div className="title-wrapper">
//                     <h3
//                         className=""
//                         style={getStyleObjectFromString(
//                             "color: rgb(0, 0, 0);"
//                         )}
//                     >
//                         {name}
//                     </h3>
//                     <div className="icons">
//                         <div title="Meat">
//                             <span
//                                 className="icon"
//                                 style={getStyleObjectFromString(
//                                     "color: rgb(0, 0, 0);"
//                                 )}
//                             >
//                                 <svg
//                                     stroke="currentColor"
//                                     fill="currentColor"
//                                     strokeWidth="0"
//                                     viewBox="0 0 512 512"
//                                     height="1em"
//                                     width="1em"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                 >
//                                     <path d="M468.958 108.958c-27.507 2.08-48.997 7.94-71.375 22.572-5.333-2.214-12.62-17.738-16-16-11.82 6.08-14.892 19.555-4.916 32.817l-59.084 9.916c-24.776 3.341-49.567 4.838-74.187 5.334 1.326 3.832 2.96 7.636 4.812 10.05 5.219 6.802 20.323 6.21 21.07 14.75 1.935 22.098-24.876 47.415-47.056 47.057-15.401-.248-17.017-28.762-31.604-33.713-19.097-6.482-41.62 18.77-59.699 9.832-15.267-7.547-24.992-39.8-27.836-50.41-10.213-.127-20.327-.142-30.316.035-12.564.366-22.902 5.645-29.408 14.239-8.676 11.458-11.652 26.658-13.254 42.925-1.78 18.057 6.147 53.007 5.517 70.282-.504 13.85-7.493 11.87-11.912 18.888-13.52 21.47 8.894 20.83 17.014 5.56 12.482-23.473 4.253-63.11 7.195-92.974 1.855-35.76 10.597-23.937 15.664-24.588-4.2 13.065-6.21 30.962-7 51.334 6.895-2.342 36.498-11.6 42.73-.174 6.872 12.598-27.802 22.016-23.878 35.819 2.464 8.666 22.95 2.378 24.582 11.238 3.322 18.035-32.13 38.713-42.236 44.209.812 23.329 1.564 45.567 1.238 65.086H88.91c-4.234-16.543-12.038-49.944-4.06-55.084 21.425-18.091 29.836-37.484 42.732-56.428 8.755 2.556 16.92 4.787 24.782 6.672 3.553.972 7.244 1.771 10.984 2.44 24.859 4.967 61.553 5.678 90.783-.172 3.76 34.12 7.263 68.452 4.602 102.572h28.957c-12.375-26.902-4.263-65.044 13.892-86.27l44.934-33.462c24.881-16.384 42.93-37.996 55.982-63.38 30.402 3.413 57.086 3.29 77.192-.786l12.84-19.55c-24.257-17.857-43.3-36.585-62.948-58.13 10.063-14.533 25.027-22.765 39.375-32.506zm-39.375 54.572a8 8 0 1 1 0 16 8 8 0 0 1 0-16zM366.2 183.481c5.029 9.822-26.17 10.808-24.933 21.772.998 8.847 22.204 3.839 23.53 12.643 3.818 25.373-28.44 53.805-54.08 54.78-14.262.544-34.902-14.06-32.308-28.093 2.605-14.092 34.551-1.657 40.383-14.748 4.724-10.603-18.352-22.01-12.992-32.307 6.264-12.032 30.364-22.553 41.934-22.646 11.57-.093 15.606 3.347 18.466 8.6zm-26.585 126.346l-34.707 23.96 6.464 69.255h34.414c-11.783-22.454-15.58-55.506-6.171-93.215zm-204.561 1.41c-6.047 12.184-14.147 21.97-22.174 31.242 5.97 3.235 11.648 5.414 17.154 6.614 11.218 2.443 21.636.333 29.948-4.408 10.056-5.737 17.521-14.452 24.115-23.368-14.615-.869-32.96-2.962-49.043-10.08zm24.252 52c-8.737 2.585-17.452 3.7-25.566 2.96 5.167 12.624 10.45 24.152 15.824 36.845h28.306c-10.393-18.48-16.148-29.285-18.564-39.805z"></path>
//                                 </svg>
//                             </span>
//                         </div>
//                     </div>
//                     <p
//                         className="subtitle"
//                         style={getStyleObjectFromString(
//                             "color: rgba(0, 0, 0, 0.85);"
//                         )}
//                     ></p>
//                 </div>

//                 <p
//                     className="price"
//                     style={getStyleObjectFromString(
//                         "color: rgb(0, 0, 0);"
//                     )}
//                 >
//                     $15
//                 </p>
//             </div>
//             <div className="content-bottom-wrapper menu-list">
//                 <p
//                     style={getStyleObjectFromString(
//                         "color: rgb(0, 0, 0);"
//                     )}
//                 >
//                     {location}
//                     <br></br>

//                     {auctionNftRender}
//                 </p>
//                 <a
//                     href="https://www.commoninja.com"
//                     target="_blank"
//                     style={getStyleObjectFromString(
//                         "padding: 0px;"
//                     )}
//                 >
//                     Learn More
//                     <svg
//                         stroke="currentColor"
//                         fill="currentColor"
//                         strokeWidth="0"
//                         viewBox="0 0 24 24"
//                         className="btn-icon"
//                         height="1em"
//                         width="1em"
//                         xmlns="http://www.w3.org/2000/svg"
//                     >
//                         <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
//                     </svg>
//                 </a>
//             </div>
//         </div>
//     </div>
// )
// --------------------------------------------------------------------------------------------------------------------

// return (

//     <div className="container mx-auto">
//         <div className="flex flex-wrap">
//             {!loading || data ? (
//                 data.guardians.map((guardian) => {
//                     const { name, location, auctionNft } = guardian

//                     const auctionNftRender = auctionNft.map((a) => {
//                         return (
//                             <div key={a.id}>
//                                 {a.tokenId} + {a.tokenUri}{" "}
//                             </div>
//                         )
//                     })

//                     return (
//                         <div key={guardian.id}>
//                             v{name} - {location} {auctionNftRender}
//                         </div>
//                     )
//                 })
//             ) : (
//                 <div>Loading Data</div>
//             )}
//         </div>
//     </div>
// )

// --------------------------------------------------------------------------------------------------------------------
// ;<Button
//     onClick={() => {
//         runContractFunction({
//             params: {
//                 abi: nftMarketplaceAbi,
//                 contractAddress: marketplaceAddress,
//                 functionName: "withdrawProceeds",
//                 params: {},
//             },
//             onError: (error) => console.log(error),
//             onSuccess: () => handleWithdrawSuccess,
//         })
//     }}
//     text="Apply Guardian"
//     type="button"
// />

// FE
// 1. Listing Form -> done
// 2. apply guardian -> done
// 3. mint NFT -> done
// 4. show all listing NFT -> done
// 5. show all Auction -> done
// 6. bid NFT
// 7. withdraw proccess -> done
// 8. withdraw stacking

// --------------------------------------------------------------------------------------------------------------------

/* <div className="list-item ltr">
<div className="img-wrapper">
    <img
        className="cover-img"
        src="https://website-assets.commoninja.com/distribution/1672825529564_restaurant_image_salmon_pasta.png"
        alt="Salmon Linguini"
    />
</div>
<div className="content scroller">
    <div className="content-top-wrapper menu-list">
        <div className="title-wrapper">
            <h3
                className=""
                style={getStyleObjectFromString(
                    "color: rgb(0, 0, 0);"
                )}
            >
                Salmon Linguini
            </h3>
            <div className="icons"></div>
            <p
                className="subtitle"
                style={getStyleObjectFromString(
                    "color: rgba(0, 0, 0, 0.85);"
                )}
            ></p>
        </div>
        <p
            className="price"
            style={getStyleObjectFromString(
                "color: rgb(0, 0, 0);"
            )}
        >
            $16
        </p>
    </div>
    <div className="content-bottom-wrapper menu-list">
        <p
            style={getStyleObjectFromString(
                "color: rgb(0, 0, 0);"
            )}
        >
            In cream and white wine sauce, salmon
            pieces are pan-seared with broccoli,
            spinach, and chives.
        </p>
        <a
            href="https://www.commoninja.com"
            target="_blank"
            style={getStyleObjectFromString(
                "padding: 0px;"
            )}
        >
            Learn More
            <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                className="btn-icon"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
            </svg>
        </a>
    </div>
</div>
</div>
<div className="list-item ltr">
<div className="img-wrapper">
    <img
        className="cover-img"
        src="https://website-assets.commoninja.com/distribution/1659524227728_fillet.png"
        alt="Hunter's Veal Fillet"
    />
</div>
<div className="content scroller">
    <div className="content-top-wrapper menu-list">
        <div className="title-wrapper">
            <h3
                className=""
                style={getStyleObjectFromString(
                    "color: rgb(0, 0, 0);"
                )}
            >
                Hunter's Veal Fillet
            </h3>

            <div className="icons">
                <div title="Cocktail">
                    <span
                        className="icon"
                        style={getStyleObjectFromString(
                            "color: rgb(0, 0, 0);"
                        )}
                    >
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 576 512"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M296 464h-56V338.78l168.74-168.73c15.52-15.52 4.53-42.05-17.42-42.05H24.68c-21.95 0-32.94 26.53-17.42 42.05L176 338.78V464h-56c-22.09 0-40 17.91-40 40 0 4.42 3.58 8 8 8h240c4.42 0 8-3.58 8-8 0-22.09-17.91-40-40-40zM432 0c-62.61 0-115.35 40.2-135.18 96h52.54c16.65-28.55 47.27-48 82.64-48 52.93 0 96 43.06 96 96s-43.07 96-96 96c-14.04 0-27.29-3.2-39.32-8.64l-35.26 35.26C379.23 279.92 404.59 288 432 288c79.53 0 144-64.47 144-144S511.53 0 432 0z"></path>
                        </svg>
                    </span>
                </div>
                <div title="Meat">
                    <span
                        className="icon"
                        style={getStyleObjectFromString(
                            "color: rgb(0, 0, 0);"
                        )}
                    >
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 512 512"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M468.958 108.958c-27.507 2.08-48.997 7.94-71.375 22.572-5.333-2.214-12.62-17.738-16-16-11.82 6.08-14.892 19.555-4.916 32.817l-59.084 9.916c-24.776 3.341-49.567 4.838-74.187 5.334 1.326 3.832 2.96 7.636 4.812 10.05 5.219 6.802 20.323 6.21 21.07 14.75 1.935 22.098-24.876 47.415-47.056 47.057-15.401-.248-17.017-28.762-31.604-33.713-19.097-6.482-41.62 18.77-59.699 9.832-15.267-7.547-24.992-39.8-27.836-50.41-10.213-.127-20.327-.142-30.316.035-12.564.366-22.902 5.645-29.408 14.239-8.676 11.458-11.652 26.658-13.254 42.925-1.78 18.057 6.147 53.007 5.517 70.282-.504 13.85-7.493 11.87-11.912 18.888-13.52 21.47 8.894 20.83 17.014 5.56 12.482-23.473 4.253-63.11 7.195-92.974 1.855-35.76 10.597-23.937 15.664-24.588-4.2 13.065-6.21 30.962-7 51.334 6.895-2.342 36.498-11.6 42.73-.174 6.872 12.598-27.802 22.016-23.878 35.819 2.464 8.666 22.95 2.378 24.582 11.238 3.322 18.035-32.13 38.713-42.236 44.209.812 23.329 1.564 45.567 1.238 65.086H88.91c-4.234-16.543-12.038-49.944-4.06-55.084 21.425-18.091 29.836-37.484 42.732-56.428 8.755 2.556 16.92 4.787 24.782 6.672 3.553.972 7.244 1.771 10.984 2.44 24.859 4.967 61.553 5.678 90.783-.172 3.76 34.12 7.263 68.452 4.602 102.572h28.957c-12.375-26.902-4.263-65.044 13.892-86.27l44.934-33.462c24.881-16.384 42.93-37.996 55.982-63.38 30.402 3.413 57.086 3.29 77.192-.786l12.84-19.55c-24.257-17.857-43.3-36.585-62.948-58.13 10.063-14.533 25.027-22.765 39.375-32.506zm-39.375 54.572a8 8 0 1 1 0 16 8 8 0 0 1 0-16zM366.2 183.481c5.029 9.822-26.17 10.808-24.933 21.772.998 8.847 22.204 3.839 23.53 12.643 3.818 25.373-28.44 53.805-54.08 54.78-14.262.544-34.902-14.06-32.308-28.093 2.605-14.092 34.551-1.657 40.383-14.748 4.724-10.603-18.352-22.01-12.992-32.307 6.264-12.032 30.364-22.553 41.934-22.646 11.57-.093 15.606 3.347 18.466 8.6zm-26.585 126.346l-34.707 23.96 6.464 69.255h34.414c-11.783-22.454-15.58-55.506-6.171-93.215zm-204.561 1.41c-6.047 12.184-14.147 21.97-22.174 31.242 5.97 3.235 11.648 5.414 17.154 6.614 11.218 2.443 21.636.333 29.948-4.408 10.056-5.737 17.521-14.452 24.115-23.368-14.615-.869-32.96-2.962-49.043-10.08zm24.252 52c-8.737 2.585-17.452 3.7-25.566 2.96 5.167 12.624 10.45 24.152 15.824 36.845h28.306c-10.393-18.48-16.148-29.285-18.564-39.805z"></path>
                        </svg>
                    </span>
                </div>
            </div>
            <p
                className="subtitle"
                style={getStyleObjectFromString(
                    "color: rgba(0, 0, 0, 0.85);"
                )}
            ></p>
        </div>

        <p
            className="price"
            style={getStyleObjectFromString(
                "color: rgb(0, 0, 0);"
            )}
        >
            $32
        </p>
    </div>
    <div className="content-bottom-wrapper menu-list">
        <p
            style={getStyleObjectFromString(
                "color: rgb(0, 0, 0);"
            )}
        >
            A mushroom and chestnut ragu served with
            roasted veal fillet medallions, homemade
            mushroom tortellini, and black pepper cream
            sauce.
        </p>
        <a
            href="https://www.commoninja.com"
            target="_blank"
            style={getStyleObjectFromString(
                "padding: 0px;"
            )}
        >
            Learn More
            <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                className="btn-icon"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
            </svg>
        </a>
    </div>
</div>
</div>
<div className="list-item ltr">
<div className="img-wrapper">
    <img
        className="cover-img"
        src="https://website-assets.commoninja.com/distribution/1659524272783_salad2.png"
        alt="Caesar Salad"
    />
</div>
<div className="content scroller">
    <div className="content-top-wrapper menu-list">
        <div className="title-wrapper">
            <h3
                className=""
                style={getStyleObjectFromString(
                    "color: rgb(0, 0, 0);"
                )}
            >
                Caesar Salad
            </h3>
            <div className="icons">
                <div title="Glass">
                    <span
                        className="icon"
                        style={getStyleObjectFromString(
                            "color: rgb(0, 0, 0);"
                        )}
                    >
                        <svg
                            stroke="currentColor"
                            fill="none"
                            strokeWidth="0"
                            viewBox="0 0 24 24"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M5 2H19L17.3602 18.398C17.1557 20.4428 15.4351 22 13.38 22H10.62C8.56494 22 6.84428 20.4428 6.6398 18.398L5 2ZM7.50998 7L7.20998 4H16.79L16.49 7H7.50998ZM7.70998 9L8.62988 18.199C8.73212 19.2214 9.59245 20 10.62 20H13.38C14.4076 20 15.2679 19.2214 15.3701 18.199L16.29 9H7.70998Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                    </span>
                </div>
                <div title="Milk">
                    <span
                        className="icon"
                        style={getStyleObjectFromString(
                            "color: rgb(0, 0, 0);"
                        )}
                    >
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 512 512"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M302.958 20.019l-93.916 46.564v35.404c31.305-15.522 62.61-31.047 93.916-46.568zm6.53 52.252l-95.4 47.3 63.036 78.137 95.397-47.303zm-111.915 55.492l-33.732 16.724h47.224zm-22.119 34.722l71.615 26.633-21.484-26.633zm-41.021 3.948v276.752l131.22 48.796v-276.75zm243.134 1.56c-31.306 15.521-62.61 31.044-93.916 46.567v275.863l93.916-46.567zM176.501 272.466s-15.3 15.085-9.889 24.203c4.167 7.02 21.889 5.418 21.889 5.418l15.549 3.848s17.72 10.374 21.887 5.416c5.41-6.44-9.887-29.098-9.887-29.098s35.91 33.492 29.662 47.318c-3.143 6.955-24.719-2.117-24.719-2.117s5.495 7.21 4.944 10.549c-1.001 6.062-13.774 9.916-13.774 9.916s1.111 21.24-6 25.168c-5.147 2.843-14.628.497-19.775-4.895-7.111-7.448-6-28.136-6-28.136s-12.775-10.177-13.776-16.735c-.55-3.611 4.944-8.103 4.944-8.103s-21.575-1.607-24.717-10.117c-6.247-16.919 29.662-32.635 29.662-32.635z"></path>
                        </svg>
                    </span>
                </div>
                <div title="Pepper">
                    <span
                        className="icon"
                        style={getStyleObjectFromString(
                            "color: rgb(0, 0, 0);"
                        )}
                    >
                        <svg
                            stroke="currentColor"
                            fill="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 512 512"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M330.67 263.12V173.4l-52.75-24.22C219.44 218.76 197.58 400 56 400a56 56 0 0 0 0 112c212.64 0 370.65-122.87 419.18-210.34l-37.05-38.54zm131.09-128.37C493.92 74.91 477.18 26.48 458.62 3a8 8 0 0 0-11.93-.59l-22.9 23a8.06 8.06 0 0 0-.89 10.23c6.86 10.36 17.05 35.1-1.4 72.32A142.85 142.85 0 0 0 364.34 96c-28 0-54 8.54-76.34 22.59l74.67 34.29v78.24h89.09L506.44 288c3.26-12.62 5.56-25.63 5.56-39.31a154 154 0 0 0-50.24-113.94z"></path>
                        </svg>
                    </span>
                </div>
            </div>
            <p
                className="subtitle"
                style={getStyleObjectFromString(
                    "color: rgba(0, 0, 0, 0.85);"
                )}
            ></p>
        </div>
        <p
            className="price"
            style={getStyleObjectFromString(
                "color: rgb(0, 0, 0);"
            )}
        >
            $9
        </p>
    </div>
    <div className="content-bottom-wrapper menu-list">
        <p
            style={getStyleObjectFromString(
                "color: rgb(0, 0, 0);"
            )}
        >
            A Caesar salad with lettuce hearts, endive,
            Salanova, purple onion, croutons, a
            soft-boiled egg, and Parmesan.
        </p>
        <a
            href="https://www.commoninja.com"
            target="_blank"
            style={getStyleObjectFromString(
                "padding: 0px;"
            )}
        >
            Learn More
            <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                className="btn-icon"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
            </svg>
        </a>
    </div>
</div>
</div>
<div className="list-item ltr">
<div className="img-wrapper">
    <img
        className="cover-img"
        src="https://website-assets.commoninja.com/distribution/1659524318100_caprese.png"
        alt="Caprese"
    />
</div>
<div className="content scroller">
    <div className="content-top-wrapper menu-list">
        <div className="title-wrapper">
            <h3
                className=""
                style={getStyleObjectFromString(
                    "color: rgb(0, 0, 0);"
                )}
            >
                Caprese
            </h3>
            <div className="icons"></div>
            <p
                className="subtitle"
                style={getStyleObjectFromString(
                    "color: rgba(0, 0, 0, 0.85);"
                )}
            ></p>
        </div>
        <p
            className="price"
            style={getStyleObjectFromString(
                "color: rgb(0, 0, 0);"
            )}
        >
            $11
        </p>
    </div>
    <div className="content-bottom-wrapper menu-list">
        <p
            style={getStyleObjectFromString(
                "color: rgb(0, 0, 0);"
            )}
        >
            Mozzarella, tomato sauce, roasted cherry
            tomatoes, garlic confit, basil, arugula,
            and roasted almonds, and reduced balsamic
            vinegar, with creme fraiche and torn
            Mozzarella.
        </p>
        <a
            href="https://www.commoninja.com"
            target="_blank"
            style={getStyleObjectFromString(
                "padding: 0px;"
            )}
        >
            Learn More
            <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                className="btn-icon"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
            </svg>
        </a>
    </div>
</div>
</div>
<div className="list-item ltr">
<div className="img-wrapper">
    <img
        className="cover-img"
        src="https://website-assets.commoninja.com/distribution/1659524339185_shcnitzel2.png"
        alt="Polo Schnitzel"
    />
</div>
<div className="content scroller">
    <div className="content-top-wrapper menu-list">
        <div className="title-wrapper">
            <h3
                className=""
                style={getStyleObjectFromString(
                    "color: rgb(0, 0, 0);"
                )}
            >
                Polo Schnitzel
            </h3>
            <div className="icons"></div>
            <p
                className="subtitle"
                style={getStyleObjectFromString(
                    "color: rgba(0, 0, 0, 0.85);"
                )}
            ></p>
        </div>
        <p
            className="price"
            style={getStyleObjectFromString(
                "color: rgb(0, 0, 0);"
            )}
        >
            $29
        </p>
    </div>
    <div className="content-bottom-wrapper menu-list">
        <p
            style={getStyleObjectFromString(
                "color: rgb(0, 0, 0);"
            )}
        >
            Pattani Fritti and Dijon Mustard Aioli
            accompany the large chicken Schnitzel in a
            crispy panko and breadcrumbs coating.
        </p>
        <a
            href="https://www.commoninja.com"
            target="_blank"
            style={getStyleObjectFromString(
                "padding: 0px;"
            )}
        >
            Learn More
            <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                className="btn-icon"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
            </svg>
        </a>
    </div>
</div>
</div> */
