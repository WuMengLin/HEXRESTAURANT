'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  HTTP_PATH:'"http://localhost/"',
  APIPATH: '"https://vue-course-api.hexschool.io"',
  CUSTOMPATH:'"starbucks"',
})
