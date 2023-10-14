import { gql } from "@apollo/client"

export const GET_GUARDIAN = gql(/* GraphQL */ `
    query GetGuardian($id: String!) {
        guardian(id: $id) {
            id
            name
            location
            stacking
            auctionNft {
                id
                mintAt
                owner
                tokenId
                tokenUri
            }
        }
    }
`)

export const GET_LISTING = gql(/* GraphQL */ `
    query GetListing($id: String!) {
        listing(id: $id) {
            id
            buyer
            seller
            price
            netPrice
            startAt
            endAt
            status
            auctionNft {
                tokenId
                tokenUri
            }
            guardian {
                id
                location
                name
            }
            bids(first: 1, orderDirection: desc, orderBy: blockTimestamp) {
                bidPrice
                blockTimestamp
                buyer
            }
        }
    }
`)

export const GET_LISTINGS = gql`
    query GetListing($status: [String!]!) {
        listings(where: { status_in: $status }) {
            id
            buyer
            seller
            price
            netPrice
            startAt
            endAt
            status
            auctionNft {
                tokenId
                tokenUri
            }
            bids(first: 1, orderDirection: desc, orderBy: blockTimestamp) {
                bidPrice
                blockTimestamp
                buyer
            }
        }
    }
`

export const GET_GUARDIANS = gql`
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
