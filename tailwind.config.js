module.exports = {
    content: [
        "./node_modules/tailwind-datepicker-react/dist/**/*.js",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [require("flowbite/plugin")],
}