import React from 'react';
import * as Yup from 'yup';

import { Form, Input, Textarea } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';
import { toast } from 'react-toastify';
import FormContainer from '~/components/FormContainer';
import DateTimePicker from '~/components/DateTimePicker';
import ImageInput from '~/components/ImageInput';

import api from '~/services/api';
import history from '~/services/history';

export default function New() {
  const schema = Yup.object().shape({
    name: Yup.string().required('The name is required'),
    description: Yup.string()
      .max(255, "Description can't have more than 255 characters ")
      .required('The descriptions is required '),
    date: Yup.date().required('The date is required '),
    location: Yup.string().required('The location is required '),
    banner_id: Yup.number(),
  });

  async function handleSubmit(data) {
    try {
      const response = await api.post('/meetups', data);
      const { id } = response.data;

      history.push(`/meetups/${id}`);
      toast.success('Meetup successfully created!');
    } catch (err) {
      toast.error(err.response.data.error);
    }

    console.tron.log(data);
  }
  return (
    <FormContainer>
      <Form onSubmit={handleSubmit} schema={schema}>
        <ImageInput name="banner_id" />
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
