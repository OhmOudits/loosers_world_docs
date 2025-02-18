/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      typography: {
        invert: {
          css: {
            '--tw-prose-body': '#D1D5DB',
            '--tw-prose-headings': '#FFFFFF',
            '--tw-prose-lead': '#D1D5DB',
            '--tw-prose-links': '#A78BFA',
            '--tw-prose-bold': '#FFFFFF',
            '--tw-prose-counters': '#D1D5DB',
            '--tw-prose-bullets': '#D1D5DB',
            '--tw-prose-hr': '#374151',
            '--tw-prose-quotes': '#D1D5DB',
            '--tw-prose-quote-borders': '#374151',
            '--tw-prose-captions': '#D1D5DB',
            '--tw-prose-code': '#FFFFFF',
            '--tw-prose-pre-code': '#D1D5DB',
            '--tw-prose-pre-bg': '#0A0A0A',
            '--tw-prose-th-borders': '#374151',
            '--tw-prose-td-borders': '#374151',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};