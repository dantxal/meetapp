import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';
import * as Yup from 'yup';
import FormContainer from '~/components/FormContainer';
import { updateProfileRequest } from '~/store/modules/user/actions';

export default function Profile() {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();
  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  const schema = Yup.object().shape({
    name: Yup.string().required('Please enter your name'),
    email: Yup.string()
      .email('Please enter a valid email')
      .required('Please enter your email'),
    oldPassword: Yup.string(),
    password: Yup.string(),
    confirmPassword: Yup.string(),
  });

  return (
    <FormContainer>
      <Form initialData={profile} onSubmit={handleSubmit} schema={schema}>
        <Input name="name" placeholder="Full name" />
        <Input name="email" type="email" placeholder="E-mail" />
        <hr />
        <Input name="oldPassword" type="password" placeholder="Old password" />
        <Input name="password" type="password" placeholder="New password" />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirm password"
        />
        <button type="submit" className="redBtn">
          <MdAddCircleOutline color="#fff" size={20} />
          Save
        </button>
      </Form>
    </FormContainer>
  );
}
