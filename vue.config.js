module.exports = {
  "devServer": {
    "proxy": {
      "^/api": {
        "target": "http://localhost:3001"
      }
    }
  },
  "transpileDependencies": [
    "vuetify"
  ]
  // css : {
  //   loaderOptions : {
  //     sass : {
  //       prependData : `@import '~@/assets/scss/_theme.scss';`
  //     } 
  //   }
  // }
}