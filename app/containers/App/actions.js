import {
   LOAD_PERSON,
   LOAD_PERSON_SUCCESS,
    LOAD_PERSON_ERROR,
    ADD_PERSON,
    GET_PERSON,
    UPDATE_PERSON,
    DELETE_PERSON
 } from './constants';

 //GET PEOPLE LIST
/**
 * Load the people, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_PERSON
 */
export function loadPeople() {
  return {
    type: LOAD_PERSON,
  };
}

/**
 * Dispatched when the people are loaded by the request saga
 *
 * @param  {array} people The peopleitory data
 *
 * @return {object}      An action object with a type of LOAD_PERSON_SUCCESS passing the people
 */
export function peopleLoaded(people) {
  return {
    type: LOAD_PERSON_SUCCESS,
    people,
    
  };
}

/**
 * Dispatched when loading the people fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_PERSON_ERROR passing the error
 */
export function repoLoadingError(error) {
  return {
    type: LOAD_PERSON_ERROR,
    error,
  };
}
//GET PERSON
export function getPerson(personId) {
  return {
    type: GET_PERSON,
    personId,
  };
}
//UPDATE PERSON
export function updatePerson(person) {
  return {
    type: UPDATE_PERSON,
    person,
  };
}
//ADD PERSON
export function addPerson(person) {

  return {
    type: ADD_PERSON,
    person,
  };
}
//DELETE PERSON
export function deletePerson(personId) {
  return {
    type: DELETE_PERSON,
    personId,
  };
}


