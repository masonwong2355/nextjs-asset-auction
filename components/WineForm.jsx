import React, { useState } from "react"
import { uploadFileToIpfs, uploadJsonToIpfs } from "../units"

export default function WatchForm({ handleMintNft }) {
    const [formData, setFormData] = useState({
        name: "Château Margaux 2010",
        vintage: "2010",
        region: "Bordeaux",
        country: "France",
        varietal: "Cabernet Sauvignon",
        type: "Red",
        alcoholContent: "13.5%",
        bottleSize: "750ml",
        tastingNotes:
            "Full-bodied with layers of concentrated fruit. Hints of blackcurrants, plums, and chocolate.",
        producer: "Château Margaux",
        productionQuantity: "15,000 bottles",
        story: "A standout wine from Château Margaux, one of the most prestigious wine estates in Bordeaux. The 2010 vintage was one of the best in decades, producing wines with longevity and incredible structure.",
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
            <h2 className="text-xl font-bold mb-4">List Your Wine for Auction</h2>

            <form onSubmit={handleSubmit}>
                {/* Basic Details */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Wine Name/Title:</label>
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        type="text"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Vintage:</label>
                    <input
                        name="vintage"
                        value={formData.vintage}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        type="text"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Varietal:</label>
                    <input
                        name="varietal"
                        value={formData.varietal}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        type="text"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Bottle Size:</label>
                    <input
                        name="bottleSize"
                        value={formData.bottleSize}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        type="text"
                    />
                </div>

                {/* Location */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Region:</label>
                        <input
                            name="region"
                            value={formData.region}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            type="text"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Country:</label>
                        <input
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            type="text"
                        />
                    </div>
                </div>

                {/* Characteristics */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                        Type (Red, White, Rosé):
                    </label>
                    <select
                        name="wineType"
                        value={formData.wineType}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    >
                        <option>Red</option>
                        <option>White</option>
                        <option>Rosé</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Alcohol Content (%):</label>
                    <input
                        name="alcoholContent"
                        value={formData.alcoholContent}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        type="text"
                    />
                </div>

                {/* Additional Information */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Tasting Notes:</label>
                    <textarea
                        name="tastingNotes"
                        value={formData.tastingNotes}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    ></textarea>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Story/Background:</label>
                    <textarea
                        name="story"
                        value={formData.story}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    ></textarea>
                </div>

                {/* Images */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Upload Images:</label>
                    <input
                        name="wineImages"
                        onChange={(e) => {
                            if (e.target.files.length > 0) {
                                setImages(e.target.files[0])
                            }
                        }}
                        className="w-full p-2 border rounded"
                        type="file"
                        // multiple
                    />
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
