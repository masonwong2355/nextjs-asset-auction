import { LuSearchX } from "react-icons/lu"

export default function RecordNotFound() {
    return (
        <div className="text-center m-60">
            <div>
                <LuSearchX
                    className="mx-48"
                    style={{ fontSize: "48px", textAlign: "center" }}
                ></LuSearchX>
                <div className="pl-3">Record Not Found </div>
            </div>
        </div>
    )
}
