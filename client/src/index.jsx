import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }

  componentDidMount () {
      // TODO: make sure there is a GET request here to get lates 25 repos
      // Refactor the client so that when the page loads, the top 25 repos are displayed on the page.


  }

  search (term) {
    console.log(`${term} was searched`);

    $.ajax('/repos', {
      method: 'GET',
      dataType: 'text/plain',
      data: {'searchedTerm': term}
    }).then(function (responseJSON) {
      console.log(responseJSON);
      console.log(JSON.parse(responseJSON));
      // TODO: make sure the console log shows up here.

    }).catch(function(err){
      console.log('Caught an error:' + err.statusText);
    });


  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
      </div>)
    }
  }

  ReactDOM.render(<App />, document.getElementById('app'));