// useless
import { Flowbite, Button, Modal, Timeline, Spinner } from "flowbite-react"

 export default function TransactionCard(props) {
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
