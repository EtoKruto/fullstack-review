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
  // userName: String,
  // id: {
  //   type: String,
  //   unique: true
  // },
  // repoName: String,
  // forkCount: String

  id: String,

  name: String,
  'owner': {login: String},
  forks_count: Number


});



let Repo = mongoose.model('Repo', repoSchema);


// userName, id, repoName, forkCount, callback
let save = (repos) => {
  // This function should save a repo or repos to
  // the MongoDB

  // console.log('we are in the save function', userName, id, repoName, forkCount)
  // const newEntry = new Repo();
  // // TODO: considering unique columns.

  // Repo.updateOne({id}, {userName: userName, id:id, repoName:repoName, forkCount:forkCount}, {upsert:true}, (error, writeOpResult) => {
  //   if (error) {
  //     callback(error, null)
  //   } else {
  //     callback(null, writeOpResult)
  //   }
  // })

  // PROMISE ALL
  // return Promise.all(repos.map(repo => {
  //   console.log(repo.id)
  //   return new Repo(repo).updateOne({}, {id: repo.id, name: repo.name, username: repo.username, forks_count: repo.forks_count}, {upsert:true})
  // }))
  return Repo.create(repos);


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


let getTop25 = () => {
  // TODO: Get Top 25 USERS
  // Repo.find().sort( { forkCount: 1 } ).limit( 25 )
  // .then((collection) => {
  //   console.log('collection inside geTOP25', collection)

  //   callback(collection)


  // })
  // .catch((err) => {
  //   // console.log('error inside geTOP25', err)
  //   callback(err);
  // })

  return Repo.find()
  .sort('fork_count')
  .limit(25)
  // .then(data => {
  //   console.log('data in getTop:', data)
  // });
  .exec()

};

module.exports.Repo = Repo; //if we are using it elsewhere
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