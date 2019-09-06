import { Card, CardContent, TextField, Typography } from "@material-ui/core";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { searchRepos } from "~/state/github";

type DispatchSearch = (partialName: string) => void;

const mapDispatchToProps = (dispatch: Dispatch) => ({
  dispatchSearchRepos: (partialName: string) =>
    dispatch(searchRepos(partialName))
});

const SearchBoxInner = ({
  dispatchSearchRepos
}: {
  readonly dispatchSearchRepos: DispatchSearch;
}) => {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    event.target.value.length > 3
      ? dispatchSearchRepos(event.target.value)
      : undefined;
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          Start typing the name of a Github repository
        </Typography>

        <Typography variant="body2" component="div">
          <TextField label="Repository Name" onChange={onChange} />
        </Typography>
      </CardContent>
    </Card>
  );
};

export const SearchBox = connect(
  undefined,
  mapDispatchToProps
)(SearchBoxInner);
