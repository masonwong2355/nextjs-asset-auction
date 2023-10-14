import { useEffect } from "react"
import { useMoralis } from "react-moralis"
import { useDispatch } from "react-redux"
import { ConnectButton } from "web3uikit"
import Link from "next/link"

import { initState } from "../store/auctionHouseSlice"
import { getStyleObjectFromString } from "../units"
import { auctionHouseAbi, auctionNFTAbi, networkMapping } from "../constants"

const pages = [
    {
        title: "Listing",
        href: "/listing",
    },
    {
        title: "Guardian",
        href: "/guardian",
    },
    {
        title: "Profile",
        href: "/profile",
    },
    {
        title: "About",
        href: "/about",
    },
]

export default function Header() {
    const { isWeb3Enabled, chainId, Moralis, web3: web3Provider } = useMoralis()
    const dispatch = useDispatch()

    const init = async () => {
        if (isWeb3Enabled && web3Provider) {
            // web3 part
            const chainString = chainId ? parseInt(chainId).toString() : "31337"
            const signer = web3Provider.getSigner()
            const ethers = Moralis.web3Library

            // contract part
            const auctionHouseAddress = chainId
                ? networkMapping[chainString].AuctionHouse[
                      networkMapping[chainString].AuctionHouse.length - 1
                  ]
                : null
            const auctionNFTAddress = chainId
                ? networkMapping[chainString].AuctionNFT[
                      networkMapping[chainString].AuctionNFT.length - 1
                  ]
                : null

            const auctionHouse = new ethers.Contract(auctionHouseAddress, auctionHouseAbi, signer)
            const auctionNft = new ethers.Contract(auctionNFTAddress, auctionNFTAbi, signer)

            // init state
            dispatch(
                initState({
                    chainId: chainString,
                    signer: signer,
                    auctionHouseAddress: auctionHouseAddress,
                    auctionNFTAddress: auctionNFTAddress,
                    auctionHouse: auctionHouse,
                    auctionNft: auctionNft,
                })
            )
        }
    }

    useEffect(() => {
        init()
    }, [web3Provider])

    return (
        <>
            <div
                id="main-body"
                className="min-h-full w-full flex flex-col smooth-scroll hyphen"
                style={getStyleObjectFromString(
                    "font-family:'Mulish', sans-serif;font-weight:500"
                )}
            >
                <header
                    id="website-header"
                    style={getStyleObjectFromString(
                        "background-color: rgb(233, 243, 243);color: rgb(17, 24, 39);"
                    )}
                >
                    <div
                        className="grid items-center lg:gap-6 xl:gap-10 mx-auto pt-6 pb-6 container"
                        style={getStyleObjectFromString("grid-template-columns:auto auto auto")}
                    >
                        <div className="col-span-2 lg:col-span-1 truncate">
                            <Link key="home" legacyBehavior href="/">
                                <a
                                    className="max-w-full overflow-hidden grid"
                                    target="_self"
                                    href="#"
                                >
                                    <h1
                                        className="heading-small lg:heading-medium overflow-hidden whitespace-nowrap overflow-ellipsis"
                                        style={getStyleObjectFromString(
                                            "color: rgb(17, 24, 39); font-family: Merriweather, serif; font-weight: 400;"
                                        )}
                                    >
                                        Auction House
                                    </h1>
                                </a>
                            </Link>
                        </div>

                        <div className="hidden lg:flex item-center justify-end gap-10 lg:col-span-2">
                            <div className="hidden lg:flex items-center ">
                                <ConnectButton
                                    className="button xl !text-2xl !py-1.5 z-50"
                                    style={getStyleObjectFromString(
                                        "border-width: 2px; border-style: solid; box-shadow: none; background-color: rgb(34, 75, 141); color: rgb(255, 255, 255); border-radius: 8px; border-color: rgb(34, 75, 141);"
                                    )}
                                    moralisAuth={false}
                                ></ConnectButton>
                            </div>

                            <ul
                                className="lg:flex hidden items-center flex-wrap gap-x-6 justify-end"
                                style={getStyleObjectFromString("color: rgb(17, 24, 39);")}
                            >
                                {pages.map((page) => {
                                    return (
                                        <li
                                            className="border-b-2"
                                            style={getStyleObjectFromString(
                                                "border-color:transparent"
                                            )}
                                            key={page.title}
                                        >
                                            <Link legacyBehavior href={page.href}>
                                                <a
                                                    className="block py-1.5 body-normal whitespace-nowrap"
                                                    target="_self"
                                                >
                                                    {page.title}
                                                </a>
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>

                        <div className="ml-auto lg:hidden">
                            <button
                                className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
                                style={getStyleObjectFromString("color: rgb(17, 24, 39);")}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    className="block h-5 w-5"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </header>
            </div>
        </>
    )
}
