import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 100%;
  max-width: 940px;
  margin: 0 25px;

  header {
    display: flex;
    margin: 50px 0;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    h1 {
      font-size: 32px;
      font-weight: bold;
      color: #fff;
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      padding: 12px 20px;
      height: 42px;
      background: #f94d6a;
      border: 0;
      color: #fff;
      font-weight: bold;
      font-size: 16px;

      transition: background 0.2s;
      &:hover {
        background: ${darken(0.02, '#f94d6a')};
      }

      svg {
        margin-right: 10px;
      }
    }
  }

  > button {
    width: 100%;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    border: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 20px 30px;
    color: #fff;
    transition: background 0.2s;
    svg {
      transition: 0.3s;
    }
    &:hover {
      background: rgba(0, 0, 0, 0.2);
      svg {
        transform: translate(0.6em, 0);
      }
    }

    h2 {
      font-size: 18px;
    }
    span {
      display: flex;
      flex-direction: row;
      align-items: center;
      p {
        opacity: 0.6;
        margin-right: 15px;
      }
    }
    & + button {
      margin-top: 10px;
    }
  }

  @media (max-width: 600px) {
    header {
    display: flex;
    margin: 50px 0;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

      h1 {
        font-size: 25px;
        font-weight: bold;
        color: #fff;
      }

      button {
        svg {
        }
      }
    }
  }
`;

export const EmptyMeetups = styled.h2``;
