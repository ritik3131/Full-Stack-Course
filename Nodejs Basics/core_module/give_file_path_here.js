
const path = require('path')

// The path.join() method joins all given path segments together using the platform-specific separator as a delimiter, then normalizes the resulting path.
const filePath = path.join('/content/', 'subfolder', 'test.txt')

module.exports = filePath;