import { Spinner } from "flowbite-react"

export default function Loading() {
    return (
        <div className="text-center h-120">
            <div className="m-8">
                <Spinner className="mt-12" aria-label="Loading Guardian" size="xl" />
                <span className="pl-3">Loading...</span>
            </div>
        </div>
    )
}
