import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the addPersonPage state domain
 */

const selectAddPersonPageDomain = state => state.addPersonPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AddPersonPage
 */

const makeSelectAddPersonPage = () =>
  createSelector(
    selectAddPersonPageDomain,
    substate => substate,
  );

export default makeSelectAddPersonPage;
export { selectAddPersonPageDomain };
