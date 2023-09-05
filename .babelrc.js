module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: 'defaults',
        modules: process.env['NODE_ENV'] === 'test' ? undefined : false,
      },
    ],
    '@babel/preset-flow',
  ],
  plugins: [['babel-plugin-syntax-hermes-parser', { flow: 'detect' }]],
};
