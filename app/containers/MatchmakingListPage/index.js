import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectPeople } from 'containers/App/selectors';
import 'bootstrap/dist/css/bootstrap.min.css';
import { updatePerson, getPerson } from 'containers/App/actions';
import { Button, DropdownButton, Dropdown } from 'react-bootstrap';
import './style.scss';
import history from 'utils/history';
// import HistoryPage from 'containers/HistoryPage';
// import HomePage from 'containers/HomePage/Loadable';

export function MatchmakingListPage({ people, onUpdatePerson }) {
  const [selectedFemale, setSelectedFemale] = useState('female');
  const [selectedPerson, setSelectedPerson] = useState('male');

  function handleUpdateChange({ id, firstName, gender }) {
    if (gender === 'male') setSelectedPerson(firstName);
    else setSelectedFemale(firstName);
    onUpdatePerson(id);
  }

  function HandleClick() {
    history.push('/history');
  }

  return (
    <div id="dropdown">
      <div className="drop">
        <DropdownButton
          id="dropdown-basic-button"
          title={selectedFemale}
          onSelect={eventKey => {
            handleUpdateChange(JSON.parse(eventKey));
          }}
        >
          {people
            .filter(
              person => person.gender === 'female' && person.status === true,
            )
            .map(person => (
              <Dropdown.Item id="dropItem" eventKey={JSON.stringify(person)}>
                <span id="span">
                  {person.firstName} {person.lastName}:
                </span>
                <span id="span">{person.age}</span>
              </Dropdown.Item>
            ))}
        </DropdownButton>
      </div>
      <div className="drop">
        {' '}
        <DropdownButton
          id="dropdown-basic-button"
          title={selectedPerson}
          onSelect={eventKey => {
            handleUpdateChange(JSON.parse(eventKey));
          }}
        >
          {people
            .filter(
              person => person.gender === 'male' && person.status === true,
            )
            .map(person => (
              <Dropdown.Item id="dropItem" eventKey={JSON.stringify(person)}>
                {' '}
                <span id="span">
                  {person.firstName} {person.lastName}:
                </span>
                <span id="span">{person.age}</span>
              </Dropdown.Item>
            ))}
        </DropdownButton>
      </div>
      <div>
        <Button
          onClick={() => {
            HandleClick();
          }}
        >
          Match
        </Button>
        <Button
          onClick={() => {
            history.push('/');
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
MatchmakingListPage.propTypes = {
  people: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onUpdatePerson: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  people: makeSelectPeople(),
});
function mapDispatchToProps(dispatch) {
  return {
    onSelectPerson: personId => dispatch(getPerson(personId)),
    onUpdatePerson: person => dispatch(updatePerson(person)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(MatchmakingListPage);
