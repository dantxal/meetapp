import React, { useState } from 'react';
import { MdMenu } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  Container,
  Content,
  LogoLink,
  Logout,
  MobileMenuBars,
  MobileMenu,
  MobileUserName,
} from './styles';
import logo from '~/assets/logo.svg';
import { signOut } from '~/store/modules/auth/actions';

export default function Header({ history }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const profile = useSelector(state => state.user.profile);
  const [firstName, secondName] = profile.name.split(' ');

  const dispatch = useDispatch();
  function handleSignOut() {
    dispatch(signOut());
  }
  return (
    <>
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
            <Logout type="button" onClick={handleSignOut}>
              Log out
            </Logout>

            <MobileUserName>{`${firstName} ${secondName}`}</MobileUserName>
            <MobileMenuBars
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <MdMenu size={42} color="#fff" />
            </MobileMenuBars>
          </section>
        </Content>
      </Container>
      <MobileMenu isMenuOpen={isMenuOpen}>
        <li>
          <button type="button" onClick={() => history.push('/dashboard')}>
            DASHBOARD
          </button>
        </li>
        <li>
          <button type="button" onClick={() => history.push('/profile')}>
            PROFILE
          </button>
        </li>
        <li>
          <button type="button" onClick={handleSignOut}>
            LOGOUT
          </button>
        </li>
      </MobileMenu>
    </>
  );
}
