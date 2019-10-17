import styled from 'styled-components';
import { darken } from 'polished';

export default styled.div`
  width: 100%;
  max-width: 940px;
  margin: 50px 25px 20px;
  form {
    display: flex;
    flex-direction: column;
    input,
    textarea {
      min-height: 50px;
      max-height: 50vh;
      border-radius: 4px;
      border: 0;
      line-height: 24px;
      background: rgba(0, 0, 0, 0.2);
      padding: 15px 20px;
      color: #fff;

      &::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }

      & + input,
      & + textarea {
        margin-top: 10px;
      }
    }

    textarea {
      min-height: 100px;
      resize: none;
    }

    > span {
      color: #f00;
      font-size: 16px;
      margin: 0 0 10px 0;
      align-self: flex-start;
      text-align: left;
    }

    > hr {
      height: 1px;
      background-color: #ffffff;
      opacity: 0.1;
      margin: 20px 0 10px;
    }
    .redBtn {
      display: flex;
      align-items: center;
      justify-content: center;
      max-width: fit-content;
      align-self: flex-end;
      border-radius: 4px;
      margin-top: 20px;
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
`;
