import { Flowbite, Button, Modal, Timeline, Spinner } from "flowbite-react"
import { HiCalendar } from "react-icons/hi"
import { useState, useEffect } from "react"

export default function TransactionCard(props) {
    // let openModal = props.openModal

    // const [openModal, setOpenModal] = useState(props.openModal)

    // console.log(openModal)

    // fixed top-0 right-0 left-0 z-50 h-modal h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full
    // mt-20
    const modalTheme = {
        modal: {
            root: {
                base: "",
                show: {
                    on: "flex p-20 bg-gray-900 bg-opacity-10 ",
                },
            },
        },
    }
    return (
        <>
            {/* <Button onClick={() => props.setOpenModal("dismissible")}>Toggle modal</Button> */}
            <Flowbite theme={{ theme: modalTheme }}>
                <Modal
                    dismissible
                    show={props.openModal === "dismissible"}
                    size={props.modalSize || "5xl"}
                    onClose={() => {
                        props.setOpenModal(undefined)
                        // openModal = undefined
                    }}
                >
                    <Modal.Body>
                        <div className="text-center m-60   ">
                            <div>
                                <Spinner
                                    className=""
                                    aria-label="Loading Guardian"
                                    size="xl"
                                    color="pink"
                                />
                            </div>

                            <div>
                                <span className="pl-3">Transaction Proccess ...</span>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </Flowbite>
        </>
    )
}
