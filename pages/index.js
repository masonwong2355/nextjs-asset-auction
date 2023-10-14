import Link from "next/link"

import bg from "../assets/images/bg.jpeg"
import { getStyleObjectFromString } from "../units"

export default function Home() {
    return (
        <div className="">
            <section
                id="banner-0"
                data-combine-with-header="false"
                data-text-color="#FFFFFF"
                className="flex-shrink-0 flex relative  items-start"
                style={getStyleObjectFromString("min-height: calc(100vh - 90px);")}
            >
                <div className=" inset-0 pointer-events-none">
                    <div
                        className="absolute inset-0"
                        style={getStyleObjectFromString(
                            "background-color: rgb(34, 75, 141); opacity: 0.23;"
                        )}
                    ></div>
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `url(${bg.src})`,
                            backgroundPosition: "30% center",
                            backgroundSize: "cover",
                        }}
                    ></div>
                </div>
                <div className="relative container mx-auto px-6 pt-20 lg:pt-48 pb-12 lg:pb-40">
                    <div className="max-w-3xl text-left ml-0 mr-auto">
                        <h2
                            className="heading-xlarge mb-6 break-word text-left"
                            style={getStyleObjectFromString(
                                "color:#FFFFFF;font-family:'Merriweather', serif;font-weight:400"
                            )}
                        >
                            Discover the Treasures Awaiting You
                        </h2>
                        <p
                            className="body-large"
                            style={getStyleObjectFromString(
                                "color:#FFFFFF;font-family:'Mulish', sans-serif;font-weight:300"
                            )}
                        >
                            Auction House is your go-to resource for winning the bidding wars. With
                            experienced professionals managing your bids, you can be sure of the
                            best possible outcome. Don&rsquo;t settle for second best - let Auction
                            House help you win the bid today!
                        </p>
                        <Link
                            className="button xl mt-6 lg:mt-8 w-full md:w-max"
                            target="_self"
                            style={getStyleObjectFromString(
                                "border-width: 2px; border-style: solid; box-shadow: none; background-color: rgb(233, 243, 243); color: rgb(17, 24, 39); border-radius: 8px; border-color: rgb(233, 243, 243);"
                            )}
                            href="/"
                        >
                            Bid Now
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
