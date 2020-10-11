import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { makeSelectPeople } from 'containers/App/selectors';
import { createStructuredSelector } from 'reselect';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, DropdownButton, Dropdown } from 'react-bootstrap';

import './style.scss';

export function HistoryPage({ people }) {
  const [sortedPeopleList, setSortedPeopleList] = useState(renderMatchesList());

  function chooseFilter(filter, e) {
    switch (filter) {
      case 'status':
        filterPeopleByStatus(e);
        break;
      case 'date':
        filterPeopleByDob(e);
        break;
      case 'originalList':
        renderPeopleList();
        break;
      default:
        renderPeopleList();
    }
  }

  function filterPeopleByStatus(status) {
    let stat = false;
    if (status === 'false') stat = false;
    else stat = true;

    const sortedPeople = people.filter(person => person.status === stat);
    setSortedPeopleList(renderMatchesList(sortedPeople));
  }

  function filterPeopleByDob(type) {
    const sortedPeople = people.sort(
      (a, b) => new Date(b.birthday) - new Date(a.birthday),
    );
    if (type === 'decrease') {
      sortedPeople.reverse();
    }

    setSortedPeopleList(renderMatchesList(sortedPeople));
  }

  function renderPeopleList() {
    setSortedPeopleList(renderMatchesList(people));
  }

  function renderMatchesList(sortedPeople = people) {
    return sortedPeople.map(person => (
      <div id="show-list">
        <div id="card">
          {' '}
          <div id="name">
            {person.firstName}
            <li id="space"> </li>
            {person.lastName}
          </div>
          <li id="id"> {person.id}, </li> <li> {person.age},</li>
          <li> {person.status === false ? 'married' : 'single'}, </li>
          <li>{person.birthday}</li>
        </div>
      </div>
    ));
  }
  return (
    <div>
      <Helmet>
        <title>HistoryPage</title>
        <meta name="description" content="Description of HistoryPage" />
      </Helmet>
      <div id="choose-sort">
        <DropdownButton
          id="dropdown-basic-button"
          title="Filter by status"
          onSelect={e => {
            chooseFilter('status', e);
          }}
        >
          <Dropdown.Item eventKey="true">single</Dropdown.Item>
          <Dropdown.Item eventKey="false">married</Dropdown.Item>
        </DropdownButton>
        <br />
        <DropdownButton
          id="dropdown-basic-button"
          title="Sort by dob"
          onSelect={e => {
            chooseFilter('date', e);
          }}
        >
          <Dropdown.Item eventKey="increase" id="dropItem">
            increase order
          </Dropdown.Item>
          <Dropdown.Item eventKey="decrease" id="dropItem">
            decrease order
          </Dropdown.Item>
        </DropdownButton>
        <br />
        <Button
          variant="primary"
          value="originalList"
          id="ListButton"
          onClick={() => {
            chooseFilter('originalList');
          }}
        >
          originalList
        </Button>
      </div>
      {sortedPeopleList}
    </div>
  );
}

HistoryPage.propTypes = {
  people: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  people: makeSelectPeople(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
  memo,
)(HistoryPage);
