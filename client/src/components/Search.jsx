import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: ''
    }
    this.onChange = this.onChange.bind(this);
    this.search = this.search.bind(this);
  }

  onChange (e) {
    this.setState({
      term: e.target.value
    });
  }

  search() {
    console.log(this.state.term);

    this.props.onSearch(this.state.term);
  }

  render() {

    console.log(this.props.repos);
    let reposInfo;
    if(this.props.repos.length === 0) {
      reposInfo =  <h4>Add more repos!</h4>
    }


    return (
      <div>
      <h4>{reposInfo}</h4>
      Enter a github username: <input value={this.state.terms} onChange={this.onChange}/>
      <button onClick={this.search}> Add Repos </button>
      </div>
      )
    }
  }

  export default Search;

