import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";
import * as React from "react";
import { connect } from "react-redux";
import { GithubRepositoriesResponse, SearchReposState } from "~/state/github";

const mapStateToProps = ({ repos }: { readonly repos: SearchReposState }) => {
  return repos;
};

const Empty = () => <div></div>;

const ResultsList = ({
  result
}: {
  readonly result: GithubRepositoriesResponse;
}) => (
  <Paper>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Repository</TableCell>
          <TableCell>Stars</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {result.items.map(repo => (
          <TableRow key={repo.id}>
            <TableCell>{repo.full_name}</TableCell>
            <TableCell>{repo.stargazers_count}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Paper>
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
