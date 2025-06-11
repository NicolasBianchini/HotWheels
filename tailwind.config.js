/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                hotwheel: {
                    primary: '#991B1B', // Vermelho corporativo discreto
                    red: '#B91C1C', // Vermelho de apoio
                    accent: '#DC2626', // Vermelho para destaques
                    dark: '#1F2937', // Preto/cinza escuro
                    slate: '#0F172A', // Azul escuro corporativo
                    black: '#000000', // Preto puro
                    white: '#FFFFFF', // Branco puro
                    gray: {
                        25: '#FCFCFD',
                        50: '#F8FAFC',
                        100: '#F1F5F9',
                        200: '#E2E8F0',
                        300: '#CBD5E1',
                        400: '#94A3B8',
                        500: '#64748B',
                        600: '#475569',
                        700: '#334155',
                        800: '#1E293B',
                        900: '#0F172A'
                    }
                }
            },
            fontFamily: {
                'racing': ['Racing Sans One', 'cursive'],
            }
        },
    },
    plugins: [],
} 