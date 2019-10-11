import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  background: linear-gradient(180deg, #22202c, #402845);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 50px;
    input {
      height: 50px;
      border-radius: 4px;
      background: rgba(0, 0, 0, 0.2);
      border: 0;
      padding: 15px 20px;
      color: #fff;

      &:::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }

      & + input {
        margin-top: 10px;
      }
    }

    span {
      color: #f00;
      font-size: 16px;
      margin: 0 0 10px 0;
      align-self: flex-start;
      text-align: left;
    }

    button {
      border-radius: 4px;
      margin-top: 15px;
      height: 50px;
      background: #f94d6a;
      border: 0;
      color: #fff;
      font-weight: bold;
      font-size: 16px;

      transition: background 0.2s;
      &:hover {
        background: ${darken(0.02, '#f94d6a')};
      }
    }

    a {
      margin-top: 20px;
      font-size: 16px;
      color: #fff;
      font-weight: bold;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }
`;
