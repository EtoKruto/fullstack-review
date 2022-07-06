import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import RepoEntry from './components/RepoEntry.jsx';
const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [{userName: "REPO TITLE GOES HERE"}]
    }
    this.handleRepoListEntry = this.handleRepoListEntry.bind(this);

  }

  componentDidMount () {

    axios.get('/repos')
    .then((collection)=> {
      console.log('collection.data', collection.data);
      this.setState({
        repos: collection.data
      })
    })
    .catch(function (error) {
      console.log(error);
    });

    // TODO: make sure there is a GET request here to get lates 25 repos
    // Refactor the client so that when the page loads, the top 25 repos are displayed on the page.
    // $.ajax('/repos', {
    //   method: 'GET',
    //   dataType: 'text/plain',
    //   data: {'searchedTerm': 'firstLoad'},
    //   success: function(collection){
    //     console.log('BOTH WORKED', collection)
    //     this.setState({
    //       repos: collection
    //     })
    //   }
    // })
  }

  search (term) {
    console.log(`${term} was searched`);


    axios.post('/repos', {
      username: term
    })
    .then(()=> {
      return axios.get('/repos')
    })
    .then((collection)=> {
      //function to RENDER
      console.log('collection.data', collection.data)
      this.setState({
        repos: collection.data
      })
    })
    .catch(function (error) {
      console.log(error);
    });




    // $.ajax('/repos', {
    //   method: 'POST',
    //   dataType: 'text/plain',
    //   data: {'searchedTerm': term},
    //   success: function(response){
    //     //if request if made successfully then the response represent the data
    //     console.log('NOW DOING GET', response)
    //     $.ajax('/repos', {
    //       method: 'GET',
    //       dataType: 'text/plain',
    //       data: {'searchedTerm': term},
    //       success: function(collection){
    //         console.log('BOTH WORKED', collection)
    //         this.setState({
    //           repos: collection
    //         })
    //       }
    //     })
    //   }
    // })
  }

  handleRepoListEntry () {
    console.log("hello")

  }


  //   function (responseJSON) {
  //   console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
  //   console.log('responseJSON', responseJSON);
  //   console.log('JSON.parse(responseJSON', JSON.parse(responseJSON));
  //   // TODO: make sure the console log shows up here.

  // }).catch(function(err){
  //   console.log('Caught an error:' + err.statusText);
  // });




  render () {
    return (
    <div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}
      handleRepoListEntry={this.handleRepoListEntry}
      />
      <Search repos={this.state.repos} onSearch={this.search.bind(this)}/>
      </div>
      )
    }
  }

  ReactDOM.render(<App />, document.getElementById('app'));