module.exports = {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? { cssnano: { preset: 'default' } } : {})
  },
  // Disable inline maps to prevent sourcemap warnings
  map: false
};
