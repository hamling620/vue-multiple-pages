module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: {
          version: '3.29'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    [
      '@babel/plugin-transform-typescript',
      {
        corejs: false,
        helpler: true,
        regenerator: false
      }
    ]
  ]
}
