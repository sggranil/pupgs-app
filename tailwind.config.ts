import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 1. --- Palette Tokens (No changes needed here) ---
        'palette': {
          'deep-red': '#96031A',
          'vibrant-orange': '#FAA916',
          'dark-charcoal': '#1B1B1E',
          'medium-grey': '#6D676E',
          'near-white': '#FBFFFE',
        },

        // 2. --- Semantic Tokens (The purposeful roles) ---

        // BRAND
        'brand': {
          'primary': 'var(--color-brand-primary, #96031A)',
          'secondary': 'var(--color-brand-secondary, #FAA916)',

          // --- NEW: Interactive States ---
          // Used for when a primary element is hovered or pressed.
          'primary-hover': 'var(--color-brand-primary-hover, #7a0215)', // A slightly darker deep-red
          'secondary-hover': 'var(--color-brand-secondary-hover, #e09914)', // A slightly darker vibrant-orange
        },

        // APP (Structure and Backgrounds)
        'app': {
          'background': 'var(--color-app-background, #FBFFFE)',
          'surface': 'var(--color-app-surface, #f5f5f5ff)',
          'divider': 'var(--color-app-divider, #6D676E)',

          // --- NEW: Surface Depth ---
          // Use for elevated or secondary background areas (e.g., sidebar, modal background)
          'surface-elevated': 'var(--color-app-surface-elevated, #FBFFFE)',

          // --- NEW: Accessibility/Interaction Focus ---
          // Used for the outline on focused interactive elements (e.g., keyboard navigation)
          'focus-ring': 'var(--color-app-focus-ring, #FAA916)', // Using your secondary color for a noticeable, accessible focus ring
        },

        // CONTENT (Text and Icons)
        'content': {
          'primary': 'var(--color-content-primary, #1B1B1E)',
          'secondary': 'var(--color-content-secondary, #6D676E)',

          // --- NEW: Disabled Text ---
          // For text on disabled buttons or greyed-out fields.
          'disabled': 'var(--color-content-disabled, #A5A1A6)', // A lighter grey for disabled state

          'on-brand': 'var(--color-content-on-brand, #FBFFFE)',

          // --- NEW: Icon Color ---
          'icon': 'var(--color-content-icon, #1B1B1E)', // Dedicated color for non-brand icons
        },

        // STATE (Feedback)
        'state': {
          'danger': '#F44336',
          'success': '#4CAF50',

          // --- NEW: Additional States ---
          'warning': '#FFC107', // Common yellow for warnings/alerts
          'info': '#2196F3', // Common blue for informational messages

          // --- NEW: Hover States for State Colors (e.g., Error button) ---
          'danger-hover': '#e53935',
        }
      },
    },
  },
  plugins: [],
} satisfies Config;
