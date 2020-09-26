import styled from 'styled-components';

export const ErrorImageOverlay = styled.div`
  height: 60vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ErrorImageContainer = styled.div`
  display: inline-block;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  width: 40vh;
  height: 40vh;
`;

export const ErrorImageTitle = styled.h2`
  font-size: 28px;
  color: #ff9e57;

`;

export const ErrorImageText = styled.p`
  font-size: 18px;
  color: #803c0a;
  width: 80%;
  text-align: justify;
`