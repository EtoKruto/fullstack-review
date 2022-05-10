const axios = require('axios');
// const config = require('../config.js');
require("dotenv").config({ path: './githubConfig.env'})

// console.log('process.env.TOKEN', process.env.TOKEN)

let getReposByUsername = (userName, callback) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${userName}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${process.env.TOKEN}`
    }
  };

  axios(options)
  .then(function (response) {
    // console.log('GITHUB RESPONSE', response.data);
    callback(response.data)

  });


}

module.exports.getReposByUsername = getReposByUsername;