import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';

import { Form, Input } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';
import { toast } from 'react-toastify';
import { parseISO } from 'date-fns/esm';
import Textarea from '~/components/Textarea';
import FormContainer from '~/components/FormContainer';
import DateTimePicker from '~/components/DateTimePicker';
import ImageInput from '~/components/ImageInput';

import api from '~/services/api';
import history from '~/services/history';

export default function Edit({ match }) {
  const schema = Yup.object().shape({
    name: Yup.string().required('The name is required'),
    description: Yup.string()
      .max(255, "Description can't have more than 255 characters ")
      .required('The descriptions is required '),
    date: Yup.date().required('The date is required '),
    location: Yup.string().required('The location is required '),
    banner_id: Yup.number(),
  });

  const [meetup, setMeetup] = useState({});
  useEffect(() => {
    async function getMeetup() {
      const response = await api.get(`/meetups/${match.params.id}`);
      const { date } = response.data;
      setMeetup({ ...response.data, date: parseISO(date) });
    }
    getMeetup();
  }, [match.params.id]);

  async function handleSubmit(data) {
    try {
      await api.put(`/meetups/${match.params.id}`, data);

      history.push(`/meetups/${match.params.id}`);
      toast.success('Meetup successfully updated!');
    } catch (err) {
      const error = err.response ? err.response.data.error : err;
      toast.error(error);
    }
  }
  return (
    <FormContainer>
      <Form
        initialData={meetup}
        onSubmit={data => handleSubmit(data)}
        schema={schema}
      >
        <ImageInput name="banner" />
        <Input name="name" placeholder="Meetup name" />
        <Textarea name="description" placeholder="Description" />
        <DateTimePicker name="date" placeholder="Date" />
        <Input name="location" placeholder="Location" />

        <button className="redBtn" type="submit">
          <MdAddCircleOutline color="#fff" size={20} />
          Save
        </button>
      </Form>
    </FormContainer>
  );
}
