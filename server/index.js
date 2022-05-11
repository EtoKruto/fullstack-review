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
  mongooseDB.getTop25((collection) => {
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



  console.log('req',req);
  console.log('req.data', req.vody);
  console.log('req.data', req.body.searchedTerm);
  console.log('req.data', req.body);
  console.log('req.data', req.data.searchedTerm);

  if(req.body.searchedTerm === 'firstLoad') {

    mongooseDB.getTop25ByUsername(req.body.searchedTerm, (collection) => {
      if (!collection) {
        res.sendStatus(405)
      } else {
        console.log('AND WE ARE BACK to GET', collection)
        res.status(200).send(JSON.stringify(collection))
        //possibly res.status(200).json(collection)
        // TODO: make sure the console log shows up here.

      }
    });
  } else {
    // gitHubHelper.getReposByUsername(req.body.searchedTerm, (userName, repos) => {


    //   console.log('userName, repos', userName, repos[0])
    //   repos.forEach(repo => {
    //     mongooseDB.save(userName, repo.id, repo.name, repo.forks_count, (err, writeOpResult) => {
    //       if (err) {
    //         console.log(err);
    //       }
    //     });
    //   })

    // }).then(()=> {
    //   res.sendStatus(201)
    // }).catch(()=> {
    //   res.sendStatus(407)
    // })


  }


});

// Promise.all([promise1, promise2, promise3]).then((values) => {
//   console.log(values);
// });




let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});


// for(let repo of repos) {
//   mongooseDB.save(userName, repo.id, repo.name, repo.forks_count, (collection) => {
//     if(!collection) {
//       // console.log('didnt save', collection)
//     } else {
//       // console.log('AND WE ARE BACK to POST', collection)
//     }
//   })
// }