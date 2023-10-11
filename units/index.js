const formatStringToCamelCase = (str) => {
    const splitted = str.split("-")
    if (splitted.length === 1) return splitted[0]
    return (
        splitted[0] +
        splitted
            .slice(1)
            .map((word) => word[0].toUpperCase() + word.slice(1))
            .join("")
    )
}

const getStyleObjectFromString = (str) => {
    const style = {}
    str.split(";").forEach((el) => {
        const [property, value] = el.split(":")
        if (!property) return

        const formattedProperty = formatStringToCamelCase(property.trim())
        style[formattedProperty] = value.trim()
    })

    return style
}

const uploadFileToIpfs = async (images) => {
    if (!images) {
        console.error("Please select a file first")
        return
    }
    const formData = new FormData()
    formData.append("file", images, { filename: images.name })

    try {
        const response = await fetch("/api/uploadFileToIPFS", {
            method: "POST",
            body: formData,
        })

        if (response.ok) {
            const data = await response.json()
            return data.IpfsHash
        } else {
            console.error("Error uploading file:", response.error)
        }
    } catch (error) {
        console.error("Network error:", error)
    }
}

const uploadJsonToIpfs = async (jsonForm) => {
    try {
        const response = await fetch("/api/uploadJsonToIPFS", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: jsonForm,
        })

        if (response.ok) {
            const data = await response.json()
            return data.tokenUri
        } else {
            console.error("Error uploading Json:", response.error)
        }
    } catch (error) {
        console.error("Network error:", error)
    }
}

const truncateStr = (fullStr, strLen) => {
    if (fullStr.length <= strLen) return fullStr

    const separator = "..."
    const seperatorLength = separator.length
    const charsToShow = strLen - seperatorLength
    const frontChars = Math.ceil(charsToShow / 2)
    const backChars = Math.floor(charsToShow / 2)
    return (
        fullStr.substring(0, frontChars) +
        separator +
        fullStr.substring(fullStr.length - backChars)
    )
}

// const imageContext = require.context("../assets/images/guardian", false, /\.(png|jpe?g)$/)
// export function getAllWarehouseImages() {
//     return imageContext.keys().map(imageContext)
// }

module.exports = {
    getStyleObjectFromString,
    uploadFileToIpfs,
    uploadJsonToIpfs,
    truncateStr,
}
