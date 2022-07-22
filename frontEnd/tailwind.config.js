/* eslint-disable no-undef */
module.exports = {
	content: ["./src/**/*.{js,jsx}"],
	mode: "jit",
	variants: {
		display: ["children", "default", "children-first", "children-last", "children-odd", "children-even", "children-not-first", "children-not-last", "children-hover", "hover", "children-focus", "focus", "children-focus-within", "focus-within", "children-active", "active", "children-visited", "visited", "children-disabled", "disabled", "responsive"],
		margin: ["responsive", "hover", "first", "last"]
	},
	prefix: "",
	important: true,
	theme: {
		extend: {},
	},
	plugins: [
		require("@tailwindcss/forms"),
		require("@tailwindcss/typography"),
		require("tailwind-children"),
		require("@tailwindcss/aspect-ratio")
	],
}