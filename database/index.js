const mongoose = require('mongoose');



mongoose.connect('mongodb://localhost/githubRepos', {
useNewUrlParser: true,
useUnifiedTopology: true,
useCreateIndex: true,
useFindAndModify: true,
})
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('were connected!')
});

let repoSchema = new mongoose.Schema({
  userName: String,
  id: {
    type: String,
    unique: true
  },
  repoName: String,
  forkCount: String

});



let Repo = mongoose.model('Repo', repoSchema);

let save = (userName, id, repoName, forkCount, callback) => {
  // This function should save a repo or repos to
  // the MongoDB

  // console.log('we are in the save function', userName, id, repoName, forkCount)
  const newEntry = new Repo();
  // TODO: considering unique columns.

  Repo.updateOne({id}, {userName: userName, id:id, repoName:repoName, forkCount:forkCount}, {upsert:true}, (error, writeOpResult) => {
    if (error) {
      callback(error, null)
    } else {
      callback(null, writeOpResult)
    }
  })



}

// Promise.all(repos).then(repos) => {


let getTop25ByUsername = (user, callback) => {

  // console.log(user)
  // Repo.findOne({userName:'EtoKruto'})
  Repo.find({userName: user}).sort( { forkCount: 1 } ).limit( 25 )
  .then((collection) => {
    // console.log('colleciton inside geTOP25', collection)

    callback(collection)


  })
  .catch((err) => {
    // console.log('error inside geTOP25', err)
    callback(err);
  })


};


let getTop25 = (user, callback) => {
  // TODO: Get Top 25 USERS
  Repo.find().sort( { forkCount: 1 } ).limit( 25 )
  .then((collection) => {
    console.log('collection inside geTOP25', collection)

    callback(collection)


  })
  .catch((err) => {
    // console.log('error inside geTOP25', err)
    callback(err);
  })
};


module.exports.save = save;
module.exports.getTop25ByUsername = getTop25ByUsername;
module.exports.getTop25 = getTop25;



// let sortedCollection = collection.repos.sort((z, a) => (a.forkCount >= z.forkCount ? 1 : -1));
// let sort25Collection = sortedCollection.slice(0, 25);

// callback(sort25Collection)

// console.log('username INSIDE getTop25', collection);
// // db.newEntry.findOne({ name: username }, callback);
// //should return an array of users with that username (should be only one)

// console.log('we are in the getTop25ByUsername function')
// callback (collection);