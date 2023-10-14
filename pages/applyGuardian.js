import React, { useState } from "react"
import { useSelector } from "react-redux"
import { useWeb3Contract } from "react-moralis"
import { ethers } from "ethers"
import { FileInput, Label, Button } from "flowbite-react"
import { useNotification } from "web3uikit"

import { handleNewNotification } from "../units"

const ApplyGuardian = () => {
    const auctionHouseAddress = useSelector((state) => state.app.auctionHouseAddress)
    const auctionHouseAbi = useSelector((state) => state.app.auctionHouseAbi)
    const { runContractFunction } = useWeb3Contract()
    const stackingAmound = ethers.utils.parseEther("0.001")
    const [formData, setFormData] = useState({
        name: "GGood",
        location: "Korea",
        stackingAmound: stackingAmound,
    })

    const dispatch = useNotification()

    // ------------------------------------------------------------------------
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        handleApplyGuardian()
    }

    async function handleApplyGuardian() {
        await runContractFunction({
            params: {
                abi: auctionHouseAbi,
                contractAddress: auctionHouseAddress,
                functionName: "applyGuardian",
                params: {
                    _name: formData.name,
                    _location: formData.location,
                },
                msgValue: formData.stackingAmound,
            },
            onSuccess: (result) => {
                handleNewNotification(dispatch, "info", "Transaction proccessing")
            },
            onError: (error) => {
                handleNewNotification(dispatchm, "error", "Transaction Error")
                console.log(error)
            },
        })
    }

    return (
        <div className="container mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
            <div>
                <h2 className="text-xl font-bold mb-4">Guardian Form</h2>

                <form onSubmit={handleSubmit}>
                    {/* Basic Details */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Name:</label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            type="text"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Location:</label>
                        <input
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            type="text"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">
                            Stacking Amount (Wei):
                        </label>
                        <input
                            name="stackingAmound"
                            value={formData.stackingAmound}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            type="text"
                        />
                    </div>

                    {/* Images & Videos */}
                    <div className="mb-4">
                        <Label
                            className="block text-sm font-medium mb-2"
                            htmlFor="file"
                            value="Upload Images"
                        />

                        <div className="max-w-md" id="fileUpload">
                            <div className="mb-2 block"></div>
                        </div>

                        <FileInput
                            className="w-full p-2 border rounded"
                            onChange={(e) => {
                                if (e.target.files.length > 0) {
                                    setImages(e.target.files[0])
                                }
                            }}
                            id="file"
                        />
                        {/* <input
                        name="images"
                        className="w-full p-2 border rounded"
                        type="file"
                        // multiple
                    /> */}
                    </div>

                    {/* Submit Button */}
                    <div className="mb-4">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Apply Guardian
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ApplyGuardian
