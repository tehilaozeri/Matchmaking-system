import produce from 'immer';
import * as data from 'data/people-data.json';
import {
  LOAD_PERSON_SUCCESS,
  LOAD_PERSON,
  LOAD_PERSON_ERROR,
  ADD_PERSON,
  GET_PERSON,
  UPDATE_PERSON,
  DELETE_PERSON,
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  people: data.default,
  currentPerson: false,
  status: false,
};

// mock functions
function getPerson(peopleList, personId) {
  const currentPerson = peopleList.find(person => person.id === personId);
  return currentPerson;
}

function updatePerson(peopleList, personId) {
  const newPeopleList = [...peopleList];
  newPeopleList.find(person => person.id === personId).status = false;
  return newPeopleList;
}

function addPerson(peopleList, addedPerson) {
  const newPeopleList = [...peopleList];
  // eslint-disable-next-line no-param-reassign
  addedPerson.status = true;
  newPeopleList.push(addedPerson);
  return newPeopleList;
}
function deletePerson(peopleList, personId) {
  const newPeopleList = [...peopleList];
  const currentPersonIndex = peopleList.findIndex(
    person => person.id === personId,
  );
  newPeopleList.splice(currentPersonIndex, 1);
  return newPeopleList;
}
/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_PERSON:
        draft.loading = true;
        draft.error = false;
        draft.userData.people = false;
        break;

      case LOAD_PERSON_SUCCESS:
        draft.userData.people = action.data;
        draft.loading = false;

        break;

      case LOAD_PERSON_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;

      case GET_PERSON:
        draft.currentPerson = getPerson(state.people, action.personId);
        break;

      case ADD_PERSON:
        draft.people = addPerson(state.people, action.person);
        draft.currentPerson = action.person;
        break;

      case UPDATE_PERSON:
        draft.people = updatePerson(state.people, action.person);
        draft.currentPerson = action.person;
        break;

      case DELETE_PERSON:
        draft.people = deletePerson(state.people, action.personId);
        draft.currentPerson = false;
        break;
    }
  });

export default appReducer;
