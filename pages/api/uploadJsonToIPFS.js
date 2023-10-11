import pinataSDK from "@pinata/sdk"

const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_JWT })

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const jsonData = req.body

            const response = await pinata.pinJSONToIPFS(jsonData)
            console.log(response)

            const { IpfsHash } = response
            return res.status(200).send({ tokenUri: IpfsHash })
        } catch (e) {
            console.error(e)
            res.status(500).send("Server Error")
        }
    } else {
        res.status(500).send("Unknow Method")
    }
}
