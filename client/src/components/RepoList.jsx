import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.


  </div>
)

export default RepoList;

    // TODO: {/* Make each repo's name in the table link to that repo's page on GitHub. */}
