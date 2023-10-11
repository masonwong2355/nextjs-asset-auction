import { useState, useEffect } from "react"
import { useWeb3Contract, useMoralis } from "react-moralis"
import { useQuery, gql } from "@apollo/client"
import { auctionHouseAbi, auctionNFTAbi, networkMapping } from "../constants"

const GET_SELLINGS = gql`
    {
        listings(orderBy: id) {
            id
            buyer
            seller
            netPrice
            price
            startAt
            endAt
        }
    }
`

export default function Home() {
    // web3 param
    // const signer = useSelector((state) => state.app.signer)
    // const auctionHouse = useSelector((state) => state.auctionHouse.auctionHouse)
    // const auctionHouseAddress = useSelector((state) => state.app.auctionHouseAddress)
    // const auctionHouseAbi = useSelector((state) => state.app.auctionHouseAbi)
    // const auctionNftAddress = useSelector((state) => state.app.auctionNftAddress)
    // const auctionNFTAbi = useSelector((state) => state.app.auctionNFTAbi)
    // const { runContractFunction } = useWeb3Contract()

    const { loading, error, data } = useQuery(GET_SELLINGS)

    useEffect(() => {}, [])

    return (
        <div className="container mx-auto">
            <h1 className="py-4 px-4 font-bold text-2xl">Sellings</h1>
            <div className="flex flex-wrap"></div>

            {!loading || data ? (
                data.listings.map((listing) => {
                    const { seller, netPrice, price, startAt, endAt } = listing
                    return (
                        <div key={listing.id}>
                            <div>Listing 1</div>
                            <div>{seller}</div>
                            <div>{netPrice}</div>
                            <div>{price}</div>
                            <div>{startAt}</div>
                            <div>{endAt}</div>
                        </div>
                    )
                })
            ) : (
                <div className="mb-6">Lodaing</div>
            )}
        </div>
    )
}

// ;<div className="mb-6">
//     <label for="attribute" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//         Image
//     </label>
//     <div className="flex items-center justify-center w-full">
//         <label
//             for="dropzone-file"
//             className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
//         >
//             <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                 <svg
//                     className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
//                     aria-hidden="true"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 20 16"
//                 >
//                     <path
//                         stroke="currentColor"
//                         stroke-linecap="round"
//                         stroke-linejoin="round"
//                         stroke-width="2"
//                         d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
//                     />
//                 </svg>
//                 <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
//                     <span className="font-semibold">Click to upload</span> or drag and drop
//                 </p>
//                 <p className="text-xs text-gray-500 dark:text-gray-400">
//                     SVG, PNG, JPG or GIF (MAX. 800x400px)
//                 </p>
//             </div>
//             <input id="dropzone-file" type="file" className="hidden" />
//         </label>
//     </div>
// </div>

// <div className="mb-6">
// <label
//     for="attribute"
//     className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
// >
//     Attributes
// </label>
// <textarea
//     id="attribute"
//     rows="2"
//     className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//     placeholder="Write attributes ..."
// ></textarea>
// </div>
