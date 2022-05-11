import RepoEntry from './RepoEntry.jsx';
import React from 'react';

const RepoList = ({repos, handleRepoListEntry}) => (
  <div>
  <h4> Repo List Component </h4>
  There are {repos.length} repos.

  <div className="repo-list">
  {repos.map(repo => (
    <RepoEntry
      handleRepoListEntry={handleRepoListEntry}
      repo={repo}
    />
    ))}
    </div>
    </div>
  );

    export default RepoList;

    {/*TODO: {/* Make each repo's name in the table link to that repo's page on GitHub. */}

