import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Col, Row, Button } from 'react-bootstrap';

import {
  updatePerson,
  addPerson,
  deletePerson,
  getPerson,
} from 'containers/App/actions';
import history from 'utils/history';
// import HistoryPage from 'containers/HistoryPage';
// import HomePage from 'containers/HomePage/Loadable';
import saga from './saga';
import reducer from './reducer';
import { makeSelectAddPersonPage } from './selectors';
import './style.scss';

// eslint-disable-next-line no-unused-vars
const options = [
  { key: 1, text: 'male', value: 'male' },
  { key: 2, text: 'female', value: 'female' },
];
export function AddPersonPage({ people, onAddedPerson }) {
  useInjectReducer({ key: 'addPersonPage', reducer });
  useInjectSaga({ key: 'addPersonPage', saga });

  const [addedPerson, setAddedPerson] = useState(false);

  function handleAddChange(proprtyName, event) {
    const person = { ...addedPerson };
    person[proprtyName] = event.target.value;
    setAddedPerson(person);
  }

  function handleAlert() {
    alert('Data saved successfully');
  }

  function handleClick() {
    // eslint-disable-next-line no-unused-expressions
    onAddedPerson(addedPerson), history.push('/history'), handleAlert();
  }

  function renderAddPerson() {
    return (
      <div className="add">
        <p id="p">Add person</p>
        <Form.Group as={Row} controlId="formHorizontalFirstName">
          <Form.Label column sm={2} />
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="tz"
              value={addedPerson.id}
              // eslint-disable-next-line react/jsx-no-bind
              onChange={handleAddChange.bind(this, 'id')}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formHorizontalFirstName">
          <Form.Label column sm={2} />
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="First Name"
              value={addedPerson.firstName}
              // eslint-disable-next-line react/jsx-no-bind
              onChange={handleAddChange.bind(this, 'firstName')}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formHorizontalFirstName">
          <Form.Label column sm={2} />
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Last Name"
              value={addedPerson.lastname}
              // eslint-disable-next-line react/jsx-no-bind
              onChange={handleAddChange.bind(this, 'lastname')}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formHorizontalFirstName">
          <Form.Label column sm={2} />
          <Col sm={10}>
            <Form.Control
              type="number"
              placeholder="age"
              value={addedPerson.age}
              // eslint-disable-next-line react/jsx-no-bind
              onChange={handleAddChange.bind(this, 'age')}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formHorizontalFirstName">
          <Form.Label column sm={2} />
          <Col sm={10}>
            <Form.Control
              type="date"
              placeholder="dob"
              value={addedPerson.birthday}
              // eslint-disable-next-line react/jsx-no-bind
              onChange={handleAddChange.bind(this, 'birthday')}
            />
          </Col>
        </Form.Group>
        <select
          id="select"
          value={addedPerson.gender}
          onChange={handleAddChange.bind(this, 'gender')}
        >
          <option id="gender">gender</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
        </select>
        <br />
        <Button
          id="button"
          onClick={() => {
            handleClick();
          }}
        >
          save
        </Button>
        <Button
          id="button"
          onClick={() => {
            history.push('/');
          }}
        >
          Cancel
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>AddPersonPage</title>
        <meta name="description" content="Description of AddPersonPage" />
      </Helmet>

      {renderAddPerson()}
    </div>
  );
}

AddPersonPage.propTypes = {
  people: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  // currentPerson: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onAddedPerson: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  // people: makeSelectPeople(),
  // currentPerson:makeSelectCurrentPerson()
});

function mapDispatchToProps(dispatch) {
  return {
    onSelectPerson: personId => dispatch(getPerson(personId)),
    onDeletePerson: personId => dispatch(deletePerson(personId)),
    onUpdatePerson: person => dispatch(updatePerson(person)),
    onAddedPerson: person => dispatch(addPerson(person)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AddPersonPage);
