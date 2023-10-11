import { getStyleObjectFromString } from "../units"

export default function Footer() {
    return (
        <footer
            id="website-footer"
            className="flex-1 relative z-10"
            style={getStyleObjectFromString("color: rgb(17, 24, 39);")}
        >
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute inset-0 z-10"
                    style={getStyleObjectFromString("background-color: rgb(233, 243, 243);")}
                ></div>
            </div>
            <div className="relative z-10 container mx-auto pt-12 lg:pt-14 xl:pt-20 pb-12 lg:pb-14 xl:pb-20">
                <div className="flex flex-col justify-center gap-12 text-center">
                    <div className="flex flex-col items-center gap-6">
                        <div className="max-w-full overflow-hidden grid">
                            <h3
                                className="heading-medium overflow-hidden whitespace-nowrap overflow-ellipsis xl:heading-small"
                                style={getStyleObjectFromString(
                                    "color: rgb(17, 24, 39); font-family: Merriweather, serif; font-weight: 400;"
                                )}
                            >
                                Auction House
                            </h3>
                        </div>
                        <div
                            className="body-normal"
                            style={getStyleObjectFromString("color: rgb(17, 24, 39);")}
                        >
                            Create By Mason Wong
                        </div>
                    </div>
                    <div className="flex flex-col justify-center gap-12 lg:gap-14">
                        <ul
                            className="flex flex-col lg:flex-row items-start lg:items-center flex-wrap gap-6 justify-center items-center"
                            style={getStyleObjectFromString("color: rgb(17, 24, 39);")}
                        >
                            <li
                                className="border-b-2"
                                style={getStyleObjectFromString("border-color:transparent")}
                            >
                                <a
                                    className="block pb-1.5 body-normal"
                                    target="_self"
                                    href="/terms-of-service"
                                >
                                    Terms of service
                                </a>
                            </li>
                        </ul>
                        <ul className="flex items-center gap-x-4 gap-y-2 flex-wrap justify-center">
                            <li>
                                <a target="_blank" rel="noreferrer" href="https://twitter.com/1">
                                    <div className="flex justify-center items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                            width="24"
                                            height="24"
                                            className="w-8 h-8"
                                            style={getStyleObjectFromString(
                                                "color: rgb(17, 24, 39);"
                                            )}
                                        >
                                            <path d="M22 5.92396c-.7352.32682-1.5265.54727-2.3567.64592.8477-.50748 1.4976-1.31133 1.8042-2.27026-.7929.47053-1.6707.81196-2.6057.99628C18.0936 4.49855 17.0271 4 15.8469 4c-2.2658 0-4.1029 1.83708-4.1029 4.10328 0 .32114.0362.63415.1064.93498-3.41027-.17132-6.43404-1.8046-8.45787-4.28719-.35321.60573-.55539 1.31052-.55539 2.06321 0 1.42338.72428 2.6795 1.8253 3.41512-.67231-.0215-1.30523-.2062-1.85859-.51355-.00041.01705-.00041.03451-.00041.05197 0 1.98768 1.41445 3.64578 3.29172 4.02328-.34427.0934-.70682.1437-1.08113.1437-.2647 0-.52169-.0255-.77219-.0738.52251 1.63 2.03764 2.8167 3.8329 2.8496-1.4043 1.1006-3.17317 1.7566-5.09591 1.7566-.33088 0-.6577-.0194-.97883-.0576 1.81637 1.1648 3.97296 1.8436 6.28991 1.8436 7.54769 0 11.67449-6.2522 11.67449-11.67451 0-.17782-.0037-.35524-.0114-.53143.8014-.57731 1.4973-1.30037 2.047-2.1233Z"></path>
                                        </svg>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a target="_blank" rel="noreferrer" href="https://linkedin.com/1">
                                    <div className="flex justify-center items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                            width="24"
                                            height="24"
                                            className="w-8 h-8"
                                            style={getStyleObjectFromString(
                                                "color: rgb(17, 24, 39);"
                                            )}
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M19.5565 2C20.9051 2 22 3.09492 22 4.44352V19.5565C22 20.9051 20.9051 22 19.5565 22H4.44352C3.09492 22 2 20.9051 2 19.5565V4.44352C2 3.09492 3.09488 2 4.44352 2H19.5565ZM8.26801 18.5343V9.71723H5.33676v8.81707h2.93125Zm10.56789 0v-5.0562c0-2.7083-1.446-3.96822-3.3742-3.96822-1.5549 0-2.2513.85512-2.6413 1.45572V9.71723H9.88988c.03887.82737 0 8.81707 0 8.81707h2.93052v-4.9241c0-.2636.0189-.527.0966-.7154.2115-.5264.694-1.0716 1.5037-1.0716 1.0599 0 1.4846.8088 1.4846 1.9936v4.7175h2.9306ZM6.82219 5.4657c-1.00289 0-1.65813.65934-1.65813 1.52352 0 .84601.63532 1.52351 1.61934 1.52351 1.02207 0 1.67719-.6775 1.67719-1.52351-.01895-.86297-.63442-1.52164-1.6384-1.52352Z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}
