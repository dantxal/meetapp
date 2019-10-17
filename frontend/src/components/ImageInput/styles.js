import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;
  margin-bottom: 20px;

  width: 100%;

  label {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    width: 100%;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 4px;

    &:hover {
      opacity: 0.7;
    }
    img {
      object-fit: contain;
      height: 40vw;
      max-height: 300px;
      max-width: 100%;
      background: rgba(0, 0, 0, 0.4);
    }
    input {
      display: none;
    }
  }
`;

export const ImageLabel = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  &:hover {
    opacity: 0.7;
  }

  h1 {
    color: #fff;
    opacity: 0.3;
    font-size: 20px;
  }
`;
