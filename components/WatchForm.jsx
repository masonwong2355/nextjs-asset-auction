import React, { useState } from "react"
import { uploadFileToIpfs, uploadJsonToIpfs } from "../units"
import { FileInput, Label } from "flowbite-react"

export default function WatchForm({ handleMintNft }) {
    const [formData, setFormData] = useState({
        name: "Rolex Submariner",
        year: "2020",
        serialNumber: "123456789",
        caseSize: "40mm",
        dialColor: "Blue",
        caseMaterial: "Stainless Steel",
        bandMaterial: "Metal",
        movement: "Automatic",
        waterResistance: "300m",
        condition: "New",
        serviceHistory: "Serviced in 2021, no issues found.",
        story: "Purchased during a trip to Switzerland.",
        imageCID: "https://gateway.ipfs.io/ipfs/Qmcg4P1KcBQWYezSrV7KTCJxiq9a2aRtr1GBrXLAxNJqXy",
    })
    const [images, setImages] = useState(null)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prevState) => ({ ...prevState, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const ipfsFileCID = await uploadFileToIpfs(images)

        const updatedFormData = { ...formData }
        updatedFormData.imageCID = `https://gateway.ipfs.io/ipfs/${ipfsFileCID}`
        const ipfsJsonCID = await uploadJsonToIpfs(JSON.stringify(updatedFormData))

        const tokenUri = `https://gateway.ipfs.io/ipfs/${ipfsJsonCID}`
        handleMintNft(tokenUri)
    }

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">List Your Watch for Auction</h2>

            <form onSubmit={handleSubmit}>
                {/* Basic Details */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Name/Model:</label>
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        type="text"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Year of Manufacture:</label>
                    <input
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        type="text"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Serial Number:</label>
                    <input
                        name="serialNumber"
                        value={formData.serialNumber}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        type="text"
                    />
                </div>

                {/* Physical Attributes */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Case Size:</label>
                        <input
                            name="caseSize"
                            value={formData.caseSize}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            type="text"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Dial Color:</label>
                        <input
                            name="dialColor"
                            value={formData.dialColor}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            type="text"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Case Material:</label>
                        <input
                            name="caseMaterial"
                            value={formData.caseMaterial}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            type="text"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Band Material:</label>
                        <input
                            name="bandMaterial"
                            value={formData.bandMaterial}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            type="text"
                        />
                    </div>
                </div>

                {/* Technical Attributes */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Movement:</label>
                    <select
                        name="movement"
                        value={formData.movement}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    >
                        <option>Automatic</option>
                        <option>Manual</option>
                        <option>Quartz</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Water Resistance:</label>
                    <input
                        name="waterResistance"
                        value={formData.waterResistance}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        type="text"
                    />
                </div>

                {/* Condition & History */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Condition:</label>
                    <select
                        name="condition"
                        value={formData.condition}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    >
                        <option>New</option>
                        <option>Like New</option>
                        <option>Used</option>
                        <option>Vintage</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Service History:</label>
                    <textarea
                        name="serviceHistory"
                        onChange={handleChange}
                        value={formData.serviceHistory}
                        className="w-full p-2 border rounded"
                    ></textarea>
                </div>

                {/* Additional Information */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Story/Background:</label>
                    <textarea
                        name="story"
                        value={formData.story}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    ></textarea>
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
                        Minting
                    </button>
                </div>
            </form>
        </div>
    )
}
