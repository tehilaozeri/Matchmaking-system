import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the matchmakingListPage state domain
 */

const selectMatchmakingListPageDomain = state =>
  state.matchmakingListPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MatchmakingListPage
 */

const makeSelectMatchmakingListPage = () =>
  createSelector(
    selectMatchmakingListPageDomain,
    substate => substate,
  );

export default makeSelectMatchmakingListPage;
export { selectMatchmakingListPageDomain };
