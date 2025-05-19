module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: {
      // This ensures Tailwind classes have higher specificity
      important: true
    },
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? { cssnano: { preset: 'default' } } : {})
  },
  // Enable sourcemap generation in PostCSS
  map: { inline: false }
};
