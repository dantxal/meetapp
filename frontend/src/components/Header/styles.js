import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { darken } from 'polished';

export const Container = styled.header`
  display: flex;
  width: 100%;
  justify-content: center;
  background: #000;
`;

export const LogoLink = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  img {
    width: 32px;
  }

  h1 {
    margin-left: 30px;
    color: #fff;
    opacity: 0.7;
    font-size: 18px;

    transition: opacity 0.2s;

    &:hover {
      opacity: 1;
    }
  }

  @media (max-width: 600px) {
    h1 {
      display: none;
    }
  }
`;

export const Content = styled.section`
  width: 100%;
  max-width: 940px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 25px;

  section {
    display: flex;
    flex-direction: row;
    align-items: center;
    a {
      color: #fff;
      text-align: right;
      font-size: 14px;

      button {
        display: none;
      }

      strong {
        margin-bottom: 5px;
        display: block;
      }
      span {
        opacity: 0.7;
        color: #999;

        transition: opacity 0.2s;
        &:hover {
          opacity: 1;
        }
      }
    }
  }

  @media (max-width: 600px) {
    margin: 0;
    margin-left: 25px;

    section > a {
      display: none;
    }
  }
`;

export const Logout = styled.button`
  height: 42px;
  border: 0;
  margin-left: 30px;
  padding: 12px 20px;
  border-radius: 4px;
  background: #d44059;
  color: #fff;
  font-weight: bold;
  font-size: 16px;

  &:hover {
    background: ${darken(0.02, '#d44059')};
  }

  @media (max-width: 600px) {
    display: none;
  }
`;
export const MobileMenuBars = styled.button`
  display: none;

  @media (max-width: 600px) {
    border: 0;
    padding: 12px;
    background: #d44059;
    display: inherit;
  }
`;

export const MobileMenu = styled.ul`
  display: none;

  @media (max-width: 600px) {
    display: ${({ isMenuOpen }) => (isMenuOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 66px;
    right: 0;
    left: 50%;
    background: #111;
    li {
      color: #fff;
      button {
        width: 100%;
        padding: 20px;
        background: none;
        border: 0;
        color: #fff;
        text-align: left;
        border-bottom: 1px solid #666;
      }
    }
  }
`;

export const MobileUserName = styled.strong`
  color: #fff;
  font-size: 16px;
  margin-right: 20px;
`;
