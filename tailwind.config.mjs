/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],

  // ─── Dark Mode ────────────────────────────────────────────────────────────
  // 'class' strategy: toggle .dark on <html> element
  darkMode: 'class',

  theme: {
    extend: {
      // ─── Custom Fonts ──────────────────────────────────────────────────
      fontFamily: {
        // Serif for body/prose — elegant long-form reading
        serif: ['Lora', 'Georgia', 'serif'],
        // Sans for UI, nav, metadata
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        // Mono for code
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
        // Display for headings/hero
        display: ['Playfair Display', 'Georgia', 'serif'],
      },

      // ─── Color System ─────────────────────────────────────────────────
      colors: {
        // Warm neutral base — feels like paper/ink
        ink: {
          50:  '#faf9f7',
          100: '#f2f0eb',
          200: '#e6e2d8',
          300: '#d0c9b8',
          400: '#b3a98f',
          500: '#8c7f63',
          600: '#6e6148',
          700: '#564b38',
          800: '#3d3527',
          900: '#28221a',
          950: '#17120e',
        },
        // Accent — deep teal/sage for links, highlights
        accent: {
          50:  '#f0f7f6',
          100: '#d9eeeb',
          200: '#b3dcd6',
          300: '#7dc0b8',
          400: '#4da09a',
          500: '#338480',
          600: '#266a67',
          700: '#215655',
          800: '#1e4545',
          900: '#1c3938',
          950: '#0a2323',
        },
      },

      // ─── Typography Scale ─────────────────────────────────────────────
      fontSize: {
        'xs':   ['0.75rem',  { lineHeight: '1.5',  letterSpacing: '0.02em' }],
        'sm':   ['0.875rem', { lineHeight: '1.6',  letterSpacing: '0.01em' }],
        'base': ['1rem',     { lineHeight: '1.75', letterSpacing: '0' }],
        'lg':   ['1.125rem', { lineHeight: '1.75', letterSpacing: '-0.01em' }],
        'xl':   ['1.25rem',  { lineHeight: '1.6',  letterSpacing: '-0.01em' }],
        '2xl':  ['1.5rem',   { lineHeight: '1.4',  letterSpacing: '-0.02em' }],
        '3xl':  ['1.875rem', { lineHeight: '1.3',  letterSpacing: '-0.02em' }],
        '4xl':  ['2.25rem',  { lineHeight: '1.2',  letterSpacing: '-0.03em' }],
        '5xl':  ['3rem',     { lineHeight: '1.1',  letterSpacing: '-0.04em' }],
        '6xl':  ['3.75rem',  { lineHeight: '1',    letterSpacing: '-0.04em' }],
      },

      // ─── Spacing ──────────────────────────────────────────────────────
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },

      // ─── Max Widths ───────────────────────────────────────────────────
      maxWidth: {
        'prose':    '68ch',   // Ideal reading line length
        'prose-lg': '80ch',   // Research/technical content
        'content':  '52rem',  // Page content container
        'wide':     '72rem',  // Wide layouts
      },

      // ─── Typography Plugin Config ─────────────────────────────────────
      typography: (theme) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body':         theme('colors.ink.800'),
            '--tw-prose-headings':     theme('colors.ink.950'),
            '--tw-prose-links':        theme('colors.accent.600'),
            '--tw-prose-bold':         theme('colors.ink.900'),
            '--tw-prose-counters':     theme('colors.ink.500'),
            '--tw-prose-bullets':      theme('colors.ink.400'),
            '--tw-prose-hr':           theme('colors.ink.200'),
            '--tw-prose-quotes':       theme('colors.ink.700'),
            '--tw-prose-quote-borders':theme('colors.accent.300'),
            '--tw-prose-captions':     theme('colors.ink.500'),
            '--tw-prose-code':         theme('colors.ink.900'),
            '--tw-prose-pre-code':     theme('colors.ink.100'),
            '--tw-prose-pre-bg':       theme('colors.ink.950'),
            '--tw-prose-th-borders':   theme('colors.ink.300'),
            '--tw-prose-td-borders':   theme('colors.ink.200'),

            // Dark mode variants
            '--tw-prose-invert-body':         theme('colors.ink.200'),
            '--tw-prose-invert-headings':     theme('colors.ink.50'),
            '--tw-prose-invert-links':        theme('colors.accent.300'),
            '--tw-prose-invert-bold':         theme('colors.ink.100'),
            '--tw-prose-invert-counters':     theme('colors.ink.400'),
            '--tw-prose-invert-bullets':      theme('colors.ink.500'),
            '--tw-prose-invert-hr':           theme('colors.ink.700'),
            '--tw-prose-invert-quotes':       theme('colors.ink.300'),
            '--tw-prose-invert-quote-borders':theme('colors.accent.600'),
            '--tw-prose-invert-captions':     theme('colors.ink.400'),
            '--tw-prose-invert-code':         theme('colors.ink.100'),
            '--tw-prose-invert-pre-code':     theme('colors.ink.300'),
            '--tw-prose-invert-pre-bg':       'rgb(20 17 12 / 1)',
            '--tw-prose-invert-th-borders':   theme('colors.ink.600'),
            '--tw-prose-invert-td-borders':   theme('colors.ink.700'),

            // Body typography
            fontFamily: theme('fontFamily.serif').join(', '),
            fontSize: '1.125rem',
            lineHeight: '1.8',
            maxWidth: '68ch',

            // Headings
            'h1, h2, h3, h4': {
              fontFamily: theme('fontFamily.display').join(', '),
              fontWeight: '700',
              letterSpacing: '-0.02em',
            },
            h1: { fontSize: '2.25rem', lineHeight: '1.2', marginBottom: '1.5rem' },
            h2: { fontSize: '1.625rem', lineHeight: '1.3', marginTop: '2.5rem', marginBottom: '1rem' },
            h3: { fontSize: '1.25rem', lineHeight: '1.4', marginTop: '2rem' },
            h4: { fontSize: '1.125rem', fontStyle: 'italic', fontWeight: '600' },

            // Links
            a: {
              fontWeight: '500',
              textDecoration: 'underline',
              textDecorationColor: theme('colors.accent.300'),
              textUnderlineOffset: '3px',
              transition: 'color 150ms, text-decoration-color 150ms',
              '&:hover': {
                color: theme('colors.accent.700'),
                textDecorationColor: theme('colors.accent.600'),
              },
            },

            // Code
            code: {
              fontFamily: theme('fontFamily.mono').join(', '),
              fontSize: '0.875em',
              fontWeight: '500',
              backgroundColor: theme('colors.ink.100'),
              padding: '0.15em 0.35em',
              borderRadius: '0.25rem',
              '&::before': { content: 'none' },
              '&::after': { content: 'none' },
            },
            pre: {
              fontFamily: theme('fontFamily.mono').join(', '),
              fontSize: '0.875rem',
              lineHeight: '1.7',
              borderRadius: '0.5rem',
              border: `1px solid ${theme('colors.ink.200')}`,
            },

            // Blockquote
            blockquote: {
              fontStyle: 'italic',
              fontFamily: theme('fontFamily.serif').join(', '),
              borderLeftWidth: '3px',
              paddingLeft: '1.5rem',
            },

            // Tables
            table: { fontSize: '0.9em' },
            thead: { fontFamily: theme('fontFamily.sans').join(', ') },

            // Horizontal rule
            hr: { borderStyle: 'solid', borderTopWidth: '1px', margin: '3rem 0' },
          },
        },
        // Larger variant for research/long-form
        lg: {
          css: {
            fontSize: '1.125rem',
            lineHeight: '1.85',
            maxWidth: '75ch',
          },
        },
      }),
    },
  },

  plugins: [
    require('@tailwindcss/typography'),
  ],
};
