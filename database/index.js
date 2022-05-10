const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/githubRepos', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('were connected!')
});

let repoSchema = new mongoose.Schema({
  userName: String,
  repos: {
    type: Array,
    trim: true,
    required: true,
    maxlength: 3200
  }
  // repos: [{id: String, repo: String, forkCount: Number}]

});



let Repo = mongoose.model('Repo', repoSchema);




let save = (userName, reposArray, callback) => {
  // This function should save a repo or repos to
  // the MongoDB

  console.log('we are in the save function', userName, reposArray)
  const newEntry = new Repo({userName: userName, repos: reposArray});
  // db.repos.createIndex( { userName: 1 }, { unique: true })
  // TODO: considering unique columns.


  newEntry.save()
  .then((err) => {
    callback(err)
  })
  .catch((err) => {

    callback(err);
  })
}


let getTop25ByUsername = (user, callback) => {

  // let coach = 'EtoKruto'
  Repo.findOne({userName:'EtoKruto'})
  .then((collection) => {
    console.log('colleciton inside geTOP25', collection)

    let sortedCollection = collection.sort((z, a) => (a.forkCount >= z.forkCount ? 1 : -1));
    let sort25Collection = sortedCollection.slice(0, 25);

    callback(sort25Collection)
  })
  .catch((err) => {
    console.log('error inside geTOP25', err)
    callback(err);
  })

  console.log('username INSIDE getTop25', collection);
  // db.newEntry.findOne({ name: username }, callback);
  //should return an array of users with that username (should be only one)

  console.log('we are in the getTop25ByUsername function')
  callback (collection);
};



module.exports.save = save;
module.exports.getTop25ByUsername = getTop25ByUsername;