import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { MdAddCircleOutline, MdChevronRight } from 'react-icons/md';
import history from '~/services/history';

import { Container, EmptyMeetups, MeetupButton } from './styles';
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
          {window.innerWidth <= 600 ? 'New' : 'New meetup'}
        </button>
      </header>
      {meetups.length > 0 ? (
        meetups.map(meetup => (
          <MeetupButton
            past={meetup.past}
            key={meetup.id}
            type="button"
            onClick={() => history.push(`/meetups/${meetup.id}`)}
          >
            <span>
              <strong>{meetup.name}</strong>
              <p>{format(parseISO(meetup.date), "MMMM do' at 'H:mm aa")}</p>
            </span>
            <MdChevronRight size={25} color="#fff" />
          </MeetupButton>
        ))
      ) : (
        <EmptyMeetups>You have not created a meetup yet.</EmptyMeetups>
      )}
    </Container>
  );
}
