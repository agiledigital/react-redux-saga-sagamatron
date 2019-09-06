import * as React from "react";
import { connect } from "react-redux";
import {
  GithubRepositoriesResponse,
  searchRepos,
  SearchReposState
} from "~/state/github";
import { makeStyles } from "@material-ui/styles";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";

const mapStateToProps = ({ repos }: { readonly repos: SearchReposState }) => {
  return repos;
};

// tslint:disable-next-line: no-any
const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
}));

const Empty = () => <div></div>;

const ResultsList = ({
  result
}: {
  readonly result: GithubRepositoriesResponse;
}) => {
  const classes = useStyles({});

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
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
};

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
