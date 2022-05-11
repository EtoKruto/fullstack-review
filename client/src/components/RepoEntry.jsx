import React from 'react';

const RepoEntry = ({repo, handleRepoListEntry}) => {

  return (
    <div className="repo-list-title"
    onClick={() => {handleRepoListEntry(repo)}}
    >
    <span>User Name {console.log(repo.owner)}</span>
    <span>Repo Name: {repo.name}</span>
    <span>Fork Count {repo.forks_count}</span>
    <br>
    </br>
    </div>
    )
  }



  {/* // TODO: {/* Make each repo's name in the table link to that repo's page on GitHub. */}

  export default RepoEntry;

