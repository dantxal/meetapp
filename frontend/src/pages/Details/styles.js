import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 940px;
  margin: 0 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 20px;

  header {
    width: 100%;
    margin: 50px 0;
    max-width: 940px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    > h1 {
      padding-right: 20px;
    }

    > div {
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
        margin: 10px 7px;
        svg {
          margin-right: 10px;
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
    object-fit: contain;
    border-radius: 4px;
    width: 100%;
  }
  section {
    width: 100%;
    p {
      white-space: pre-line;
      margin: 25px 0 30px;
      color: #fff;
      font-size: 18px;
      line-height: 32px;
    }
    span {
      color: #fff;
      font-size: 1em;
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

  @media (max-width: 600px) {
    max-width: 95%;
    header {
      margin: 30px 0 20px;
      div {
        button {
          padding: 14px;
          > span {
            display: none;
          }
          svg {
            margin: 0;
          }
        }
      }
    }
    img {
      max-width: 100%;
    }
    section {
      font-size: 0.9em;
      > p {
        margin-bottom: 20px;
      }
    }
  }
`;
