import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { MdAddCircleOutline, MdChevronRight } from 'react-icons/md';
import history from '~/services/history';

import { Container } from './styles';
import api from '~/services/api';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function getMeetups() {
      const response = await api.get('/mymeetups');

      console.tron.log(response);
      setMeetups(response.data);
    }
    getMeetups();
  }, []);

  return (
    <Container>
      <header>
        <h1>My meetups</h1>
        <button type="button" onClick={() => history.push('/meetups/new')}>
          <MdAddCircleOutline size={18} color="#fff" />
          New meetup
        </button>
      </header>
      {meetups ? (
        meetups.map(meetup => (
          <button
            key={meetup.id}
            type="button"
            onClick={() => history.push(`/meetups/${meetup.id}`)}
          >
            <h2>{meetup.name}</h2>
            <span>
              <p>{format(parseISO(meetup.date), "MMMM do' at 'H:mm aa")}</p>
              <MdChevronRight size={25} color="#fff" />
            </span>
          </button>
        ))
      ) : (
        <h1>no</h1>
      )}
    </Container>
  );
}
