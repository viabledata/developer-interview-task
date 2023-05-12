/* eslint-disable dot-notation */
module.exports = process['env'];

/*
 * Webpack’s DefinePlugin only replaces free variables and by avoiding
 * using process.env directly there, you circumvent the Webpack replacement magic
 * So we create this file, then require it in webpack to access the env variables.
 */
