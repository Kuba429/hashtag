module.exports = {
    purge: {
        content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
        options: {
            safelist: [/data-theme$/],
        },
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [
        require("@tailwindcss/typography"),
        require("daisyui"),
        require("@tailwindcss/line-clamp"),
    ],
    daisyui: {
        themes: ["corporate"],
    },
};
