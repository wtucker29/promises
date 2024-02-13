/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var request = require('needle');
Promise.promisifyAll(fs);
Promise.promisifyAll(request);



var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // TODO
  return fs.readFileAsync(readFilePath, 'utf-8')
    .then(function(file) {
      if (!file) {
        throw new Error('File does not exist');
      } else {
        const user = file.split('\n')[0];
        return request('get', `https://api.github.com/users/${user}`);
      }
    })
    .then(function(response) {
      return fs.writeFileAsync(writeFilePath, JSON.stringify(response.body));
    });

};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
