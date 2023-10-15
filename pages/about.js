import Image from "next/image"
import about from "../assets/images/about.jpg"
import { getStyleObjectFromString } from "../units"

export default function About() {
    return (
        <>
            <section
                id="hero-0"
                className="flex flex-none flex-shrink-0 relative  items-center"
                style={getStyleObjectFromString("min-height: calc(144px);")}
            >
                <div className="absolute inset-0 pointer-events-none">
                    <div
                        className="absolute inset-0"
                        style={getStyleObjectFromString("background-color: rgb(233, 243, 243);")}
                    ></div>
                </div>
                <div className="relative container mx-auto pt-12 lg:pt-20 pb-12 lg:pb-20">
                    <div className="flex flex-col lg:flex-row w-full gap-10 lg:gap-20 items-center lg:!flex-row-reverse">
                        <div className="flex-1 flex flex-col items-center lg:items-start">
                            <div
                                className="rich-text-block"
                                style={getStyleObjectFromString("color: rgb(17, 24, 39);")}
                            >
                                <h3>Welcome to Auction House</h3>
                                <p>
                                    At Auction House, we provide you with a unique opportunity to
                                    purchase rare and unique items. Our professional team of
                                    experts will help you find the perfect item for your needs -
                                    whether you are looking for a new car, a vintage piece of
                                    furniture, or a one-of-a-kind artwork. With our competitive
                                    bidding process and excellent customer service, you can be sure
                                    you are getting the best value for your money.
                                </p>
                            </div>
                        </div>
                        <div className="flex-1 flex w-full justify-center lg:justify-start lg:!justify-end">
                            <div className="flex-shrink-0 relative w-full mx-auto aspect-w-3 aspect-h-2">
                                <span
                                    style={getStyleObjectFromString(
                                        "box-sizing: border-box; display: block; overflow: hidden; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; position: absolute; inset: 0px;"
                                    )}
                                >
                                    {/* <Image
                                        alt="We provide high quality services"
                                         src={logabouto.src}
                                        // decoding="async"
                                        // data-nimg="fill"
                                        layout="fill"
                                        width={500}
      height={500}
                                        // className=""
                                        style={getStyleObjectFromString(
                                            "position: absolute; inset: 0px; box-sizing: border-box; padding: 0px; border: none; margin: auto; display: block; width: 0px; height: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%; object-fit: cover; object-position: center center;"
                                        )}
                                    /> */}

                                    <img
                                        alt="We provide high quality services"
                                        src={about.src}
                                        // decoding="async"
                                        // data-nimg="fill"
                                        layout="fill"
                                        style={getStyleObjectFromString(
                                            "position: absolute; inset: 0px; box-sizing: border-box; padding: 0px; border: none; margin: auto; display: block; width: 0px; height: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%; object-fit: cover; object-position: center center;"
                                        )}
                                    />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
