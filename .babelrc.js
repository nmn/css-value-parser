


module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-flow',
  ],
  plugins: [['babel-plugin-syntax-hermes-parser', { flow: 'detect' }]]
};
