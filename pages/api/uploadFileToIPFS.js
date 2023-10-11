import pinataSDK from "@pinata/sdk"
import { IncomingForm } from "formidable"
import fs from "fs"

export const config = {
    api: {
        bodyParser: false,
    },
}

const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_JWT })

const saveFile = async (file) => {
    try {
        const stream = fs.createReadStream(file.filepath)
        const options = {
            pinataMetadata: {
                name: file.newFilename,
            },
        }
        const response = await pinata.pinFileToIPFS(stream, options)
        fs.unlinkSync(file.filepath)

        return response
    } catch (error) {
        throw error
    }
}

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const form = new IncomingForm()
            form.parse(req, async function (err, fields, files) {
                if (err) {
                    console.error({ err })
                    return res.status(500).send("Upload Error")
                }

                const response = await saveFile(files.file[0])
                console.log(response)
                const { IpfsHash } = response
                return res.status(200).send({ IpfsHash: IpfsHash })
            })
        } catch (e) {
            console.error(e)
            res.send(500).send("Server Error")
        }
    } else {
        res.status(500).send("Unknow method")
    }
}
