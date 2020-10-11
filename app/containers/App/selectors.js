
import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

const selectRouter = state => state.router;


const makeSelectLoading = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.error,
  );

const makeSelectPeople = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.people,
  );

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const makeSelectCurrentPerson = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.currentPerson,
  );
export {
  selectGlobal,
  makeSelectLoading,
  makeSelectError,
  makeSelectPeople,
  makeSelectLocation,
  makeSelectCurrentPerson
};
