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
    button {

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
      svg {
        display: none;
      }
    }
  }

    @media (max-width: 600px) {
      section {
        a {
          strong {
            display: none;
          }
          span {
            display: none;
          }
          button {
            display: flex;
            flex-direction: row;
            align-items: center;
            label {
              display: block;
              font-size: 14px;
              margin-right: 5px;
            }
          }
        }
        button {
          margin-left: 15px;
          padding: 12px;
          label {
            display: none;
          }

          svg {
            display: inline;
          }
        }
      }
    }

`;
