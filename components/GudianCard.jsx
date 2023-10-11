import { getStyleObjectFromString } from "../units"
import Link from "next/link"
import Image from "next/image"

export default function GudianCard(props) {
    const guardian = props.guardian

    return (
        <div className="list-item ltr">
            <div className="img-wrapper">
                <img
                    className="cover-img"
                    src={`images/guardians/${guardian.guardian}.jpg`}
                    alt="Short Ribs Pappardelle"
                />
            </div>
            <div className="content scroller">
                <div className="content-top-wrapper menu-list">
                    <div className="title-wrapper">
                        <h3 className="" style={getStyleObjectFromString("color: rgb(0, 0, 0);")}>
                            {guardian.name}
                        </h3>
                    </div>

                    <div className="price">
                        <img
                            className=""
                            src={`images/location/${guardian.guardian}.png`}
                            alt="flag"
                            style={getStyleObjectFromString("width: 1em;")}
                        />

                        {guardian.location}
                    </div>
                </div>
                <div className="content-bottom-wrapper menu-list">
                    <p style={getStyleObjectFromString("color: rgb(0, 0, 0);")}>
                        Stacked with {guardian.stacking} Wei
                        <br></br>
                        Assets : {guardian.auctionNft.length}
                    </p>

                    <Link legacyBehavior href={`/guardian/${guardian.id}`}>
                        <a style={getStyleObjectFromString("padding: 0px;")}>
                            Learn More
                            <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 24 24"
                                className="btn-icon"
                                height="1em"
                                width="1em"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
                            </svg>
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
}
