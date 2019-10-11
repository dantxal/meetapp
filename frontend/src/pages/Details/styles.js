import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 940px;
  margin: 0 25px;
  display: flex;
  flex-direction: column;
  align-items: center;

  header {
    width: 100%;
    margin: 50px 0;
    max-width: 940px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    span {
      display: flex;
      flex-direction: row;
      align-items: center;
      button {
        padding: 11px 20px;
        color: #fff;
        border: 0;
        border-radius: 4px;
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 16px;
        font-weight: bold;
        svg {
          margin-right: 10px;
        }

        & + button {
          margin-left: 15px;
        }
      }
      .redBtn {
        background: #d44059;
      }
      .blueBtn {
        background: #4dbaf9;
      }
    }
  }

  img {
    border-radius: 4px;
    max-width: 100%;
    max-height: 300px;
  }
  section {
    width: 100%;
    p {
      white-space: pre-line
      margin: 25px 0 30px;
      color: #fff;
      font-size: 18px;
      line-height: 32px;
    }
    span {
      color: #fff;
      font-size: 16px;
      opacity: 0.6;
      display: flex;
      flex-direction: row;
      align-items: center;
      svg {
        margin-right: 10px;
      }
      & + span {
        margin-left: 30px;
      }
    }
  }
`;
