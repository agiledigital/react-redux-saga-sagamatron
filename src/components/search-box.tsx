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
    <div>
      <p>Start typing!</p>
      <label>
        Repo name:
        <input onChange={onChange} />
      </label>
    </div>
  );
};

export const SearchBox = connect(
  undefined,
  mapDispatchToProps
)(SearchBoxInner);
