import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import logo from '~/assets/logo.svg';
import { signUpRequest } from '~/store/modules/auth/actions';

const schema = Yup.object().shape({
  name: Yup.string().required('Full name is required'),
  email: Yup.string()
    .email('Please enter a valid email')
    .required('E-mail is required'),
  password: Yup.string()
    .min(6, 'Password must be between 6 and 10 characters long')
    .max(10, 'Password must be between 6 and 10 characters long')
    .required('The password is required.'),
});

export default function SignUp() {
  const dispatch = useDispatch();
  function handleSubmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }
  return (
    <>
      <img src={logo} alt="" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Full name" />
        <Input name="email" type="email" placeholder="E-mail" />
        <Input name="password" type="password" placeholder="Password" />
        <button type="submit">Sign Up</button>
        <Link to="/">Already have an account?</Link>
      </Form>
    </>
  );
}
