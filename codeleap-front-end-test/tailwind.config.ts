import type { Config } from "tailwindcss";

const config: Config = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "var(--primary)",
                background: "var(--background)",
                foreground: "var(--foreground)",
                success: 'var(--success)',
                error: 'var(--error)',
                secondaryText: 'var(--text-secondary)',
                inputBorder: "var(--input-border)",
                cardBorder: "var(--card-border)",
                buttonBorder: "var(--button-border)",
            }
        }
    }
};

export default config;