import * as React from "react";
import { connect } from "react-redux";
import {
  GithubRepositoriesResponse,
  searchRepos,
  SearchReposState
} from "~/state/github";

const mapStateToProps = ({ repos }: { readonly repos: SearchReposState }) => {
  return repos;
};

const Empty = () => <div>No Results</div>;

const ResultsList = ({
  result
}: {
  readonly result: GithubRepositoriesResponse;
}) => (
  <ul>
    {result.items.map(repo => (
      <ul key={repo.id}>
        {repo.full_name}&nbsp;{repo.stargazers_count}
      </ul>
    ))}
  </ul>
);

const Error = ({ error }: { readonly error: Error }) => (
  <div>{JSON.stringify(error)}</div>
);

const ResultsInner = ({ result, error }: SearchReposState) => {
  // tslint:disable: no-if-statement
  if (result !== undefined) {
    return <ResultsList result={result} />;
  } else if (error !== undefined) {
    return <Error error={error} />;
  }
  return <Empty />;
  // tslint:enable: no-if-statement
};

export const Results = connect(mapStateToProps)(ResultsInner);
