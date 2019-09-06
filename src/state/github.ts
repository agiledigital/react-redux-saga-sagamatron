import Axios from "axios";
import { concoctBoilerplate } from "sagamatron";

// Types generated by running Github examples from https://developer.github.com/v3/search/#search-repositories
// through http://www.json2ts.com/ - Not bad 🤔

type GithubOwner = {
  readonly login: string;
  readonly id: number;
  readonly node_id: string;
  readonly avatar_url: string;
  readonly gravatar_id: string;
  readonly url: string;
  readonly received_events_url: string;
  readonly type: string;
};

type GithubRepository = {
  readonly id: number;
  readonly node_id: string;
  readonly name: string;
  readonly full_name: string;
  readonly owner: GithubOwner;
  readonly private: boolean;
  readonly html_url: string;
  readonly description: string;
  readonly fork: boolean;
  readonly url: string;
  readonly created_at: Date;
  readonly updated_at: Date;
  readonly pushed_at: Date;
  readonly homepage: string;
  readonly size: number;
  readonly stargazers_count: number;
  readonly watchers_count: number;
  readonly language: string;
  readonly forks_count: number;
  readonly open_issues_count: number;
  readonly master_branch: string;
  readonly default_branch: string;
  readonly score: number;
};

export type GithubRepositoriesResponse = {
  readonly total_count: number;
  readonly incomplete_results: boolean;
  readonly items: readonly GithubRepository[];
};

export type SearchReposState = {
  readonly loading: boolean;
  readonly result?: GithubRepositoriesResponse;
  readonly error?: Error;
};

const github = Axios.create({
  baseURL: "https://api.github.com"
});

const userApi = {
  searchRepos: (partialName: string): Promise<GithubRepositoriesResponse> =>
    github
      .get("search/repositories", {
        params: {
          q: `${partialName} in:name`,
          sort: "stars"
        }
      })
      .then(response => response.data as GithubRepositoriesResponse)
};

const actionTypes = {
  searchRepos: [
    "SEARCH_REPOS",
    "SEARCH_REPOS_SUCCESS",
    "SEARCH_REPOS_FAILURE",
    "repos"
  ]
} as const;

const {
  actions: {
    searchRepos: [searchRepos]
  },
  rootReducer,
  rootSaga
} = concoctBoilerplate(userApi, actionTypes, {});

export { searchRepos, rootReducer, rootSaga };
