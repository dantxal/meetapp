import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Container, Content, LogoLink } from './styles';
import logo from '~/assets/logo.svg';
import { signOut } from '~/store/modules/auth/actions';

export default function Header() {
  const profile = useSelector(state => state.user.profile);

  const dispatch = useDispatch();
  function handleSignOut() {
    dispatch(signOut());
  }
  return (
    <Container>
      <Content>
        <LogoLink to="/dashboard">
          <img src={logo} alt="Meetapp logo" />
          <h1>DASHBOARD</h1>
        </LogoLink>

        <section>
          <Link to="/profile">
            <strong>{profile.name}</strong>
            <span>My profile</span>
          </Link>
          <button type="button" onClick={handleSignOut}>
            Log out
          </button>
        </section>
      </Content>
    </Container>
  );
}
