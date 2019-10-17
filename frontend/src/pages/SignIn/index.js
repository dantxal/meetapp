import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';
import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Please enter your email'),
  password: Yup.string().required('Please enter your password'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input
          name="email"
          type="email"
          placeholder="E-mail"
          autoComplete="e-mail"
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          autoComplete="current-password"
        />
        <button type="submit">{loading ? 'Logging in...' : 'Log in'}</button>
        <Link to="/register">Create free account</Link>
      </Form>
    </>
  );
}
