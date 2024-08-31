/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    // screens: {
    //   '2xdesktop': '1600px'
    // },
    extend: {
      colors: {
        "primary": "#654AB4",
        "secondary": "#FFBEBE"
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        archivoBlack: ["Archivo Black", "sans-serif"],
        pacifico: ["Pacifico", "cursive"]
      },
      animation: {
        "border-beam": "border-beam 12s infinite linear",
        "gradient": "gradient 8s linear infinite",
        marquee: "marquee 20s linear infinite",
        "marquee-vertical": "marquee-vertical 20s linear infinite",
      },
      keyframes: {
        "border-beam": {
          "100%": {
            "offset-distance": "100%",
          },
        },
        "gradient": {
          to: {
            backgroundPosition: "200% 0",
          },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
