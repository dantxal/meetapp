import React, { useState, useEffect } from 'react';
import { MdDeleteForever, MdEdit, MdEvent, MdPlace } from 'react-icons/md';
import { format, parseISO } from 'date-fns';
import { toast } from 'react-toastify';
import history from '~/services/history';
import { Container } from './styles';
import api from '~/services/api';

export default function Details({ match }) {
  const [meetup, setMeetup] = useState({});
  useEffect(() => {
    async function getMeetup() {
      const response = await api.get(`/meetups/${match.params.id}`);
      const { date } = response.data;
      setMeetup({
        ...response.data,
        date: format(parseISO(date), "MMMM do' at 'h:mm aa"),
      });
    }
    getMeetup();
  }, [match]);

  function handleEdit() {
    return meetup.past
      ? toast.error('You cannot edit a meetup that already happened')
      : history.push(`/meetups/${meetup.id}/edit`);
  }

  async function handleCancel() {
    if (meetup.past)
      return toast.error('You cannot cancel a meetup that already happened');
    await api.delete(`meetups/${meetup.id}`);
    toast.success(`You have canceled ${meetup.name}!`);
    return history.push('/dashboard');
  }

  return (
    <Container>
      <header>
        <h1>{meetup.name}</h1>
        <div>
          <button className="blueBtn" type="button" onClick={handleEdit}>
            <MdEdit size={18} color="#fff" />
            <span>Editar</span>
          </button>
          <button className="redBtn" type="button" onClick={handleCancel}>
            <MdDeleteForever size={18} color="#fff" />
            <span>Cancelar</span>
          </button>
        </div>
      </header>
      <img
        src={
          meetup.banner
            ? meetup.banner.url
            : 'https://images.unsplash.com/photo-1568992688065-536aad8a12f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=889&q=80'
        }
        alt="Meetup banner"
      />
      <section>
        <p>{meetup.description}</p>
        <span>
          <span>
            <MdEvent size={18} color="#fff" />
            {meetup.date}
          </span>
          <span>
            <MdPlace size={18} color="#fff" />
            {meetup.location}
          </span>
        </span>
      </section>
    </Container>
  );
}
