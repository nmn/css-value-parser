module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: 'defaults',
        // modules: false,
      },
    ],
    '@babel/preset-flow',
  ],
  plugins: [['babel-plugin-syntax-hermes-parser', { flow: 'detect' }]],
};
