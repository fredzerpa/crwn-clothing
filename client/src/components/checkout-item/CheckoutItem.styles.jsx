import styled, { css } from 'styled-components';

const MinAndMaxValuesStyles = css`
  opacity: 0.25;
  cursor: default;
`;

const getMinAndMaxValueStyles = props => {
  // Min Value
  if (props.quantity === 1) return MinAndMaxValuesStyles;
};

export const CheckoutItemContainer = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;

  @media screen and (max-width: 800px) {
    font-size: 18px;
  }
`;

export const ImageContainer = styled.div`
  width: 23%;
  padding-right: 15px;

  img {
    width: 100%;
    height: 100%;
  }
`;

export const TextContainer = styled.span`
  width: 23%;

  @media screen and (max-width: 800px) {
    width: 22%;
  }
`;

export const QuantityContainer = styled(TextContainer)`
  display: flex;
  justify-content: center;

  span {
    margin: 0 10px;
  }
  `;

export const ArrowContainer = styled.div`
  cursor: pointer;
  ${getMinAndMaxValueStyles}
`

export const RemoveButtonContainer = styled.div`
  width: 8%;

  span {
    cursor: pointer;
  }
`;
