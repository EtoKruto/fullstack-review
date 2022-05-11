import React from 'react';

const RepoEntry = ({repo, handleRepoListEntry}) => {

  return (
    <div className="repo-list-title"
    onClick={() => {handleRepoListEntry(repo)}}
    >{repo.userName}
    </div>
    )
  }



  {/* // TODO: {/* Make each repo's name in the table link to that repo's page on GitHub. */}

  export default RepoEntry;

