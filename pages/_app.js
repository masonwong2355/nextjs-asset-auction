import { Provider } from "react-redux"
import { MoralisProvider } from "react-moralis"
import { NotificationProvider } from "web3uikit"
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"
import Head from "next/head"

import Header from "../components/Header"
import "../styles/globals.css"
import { store } from "../store/store"
import Footer from "../components/Footer"
import logo from "/assets/images/logo.svg"

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: process.env.NEXT_PUBLIC_SUBGRAPH_URL,
})

function MyApp({ Component, pageProps }) {
    return (
        <div>
            <Head>
                <title>Asset Auction House</title>
                <meta name="description" content="Asset Auction House" />
                <link rel="icon" href={logo.src} />
            </Head>
            <MoralisProvider initializeOnMount="">
                <ApolloProvider client={client}>
                    <NotificationProvider>
                        <Provider store={store}>
                            <Header />
                            <Component {...pageProps} />
                            <Footer />
                        </Provider>
                    </NotificationProvider>
                </ApolloProvider>
            </MoralisProvider>
        </div>
    )
}

export default MyApp
