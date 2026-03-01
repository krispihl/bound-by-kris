export default {
  plugins: {
    'postcss-mixins': {},
    'postcss-nested': {},
    'postcss-preset-env': {
      stage: 3,
      features: {
        'nesting-rules': false,
      },
    },
    autoprefixer: {},
  },
}
