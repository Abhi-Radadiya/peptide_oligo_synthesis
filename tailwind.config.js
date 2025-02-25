/** @type {import('tailwindcss').Config} */
/** color.purple & blue, bounce 0 - 100 & 50% is for simple-checkbox */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
        extend: {
            colors: {
                purple: {
                    500: "#8b5cf6",
                },
                blue: {
                    300: "#93c5fd",
                },
            },
            keyframes: {
                bounce: {
                    "0%, 100%": { transform: "scale(1)" },
                    "50%": { transform: "scale(1.1)" },
                },
            },
            animation: {
                bounce: "bounce 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            },
        },
    },
    plugins: [],
};
