var gitHubHelper = require('./../helpers/github.js');
var mongooseDB = require('./../database/index.js');
const express = require('express');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.json());
app.use(express.urlencoded());

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  mongooseDB.getTop25ByUsername(req.body.searchedTerm, (collection) => {
    if (!colleciton) {
      res.sendStatus(405)
    } else {
      console.log('AND WE ARE BACK to GET', collection)
      res.status(200).send(JSON.stringify(collection))
      //possibly res.status(200).json(collection)
        // TODO: make sure the console log shows up here.


    }
  });
});

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  // console.log('req', req)
  // console.log('req.body', req.body.searchedTerm)
  gitHubHelper.getReposByUsername(req.body.searchedTerm, (repos) => {

    filteredRepoList = [];
    // console.log('repos[0] inside APP.POST', repos[0]);
    for(let repo of repos) {
      filteredRepoList.push({'id': repo.id, 'repo': repo.name, 'forkCount': repo.forks_count})
    }

    // console.log('filteredRepoList', filteredRepoList);
    mongooseDB.save(req.body.searchedTerm, filteredRepoList, (err) => {
      if(err) {
        res.sendStatus(400);
      } else {
        console.log('AND WE ARE BACK to POST', err)
        res.sendStatus(200);
      }

    });
  });
});


let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

