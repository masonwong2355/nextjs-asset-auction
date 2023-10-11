import { Spinner } from "flowbite-react"

export default function Loading() {
    return (
        <div className="text-center m-60">
            <Spinner className="" aria-label="Loading Guardian" size="xl" />
            <span className="pl-3">Loading...</span>
        </div>
    )
}
