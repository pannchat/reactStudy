import React from "react";
import styled, { css } from "styled-components";
import { darken, lighten } from "polished";
const colorStyles = css`
  ${({ theme, color }) => {
    const selected = theme.palette[color];
    return css`
      background: ${selected};
      &:hover {
        background: ${lighten(0.1, selected)};
      }
      &:active {
        background: ${darken(0.1, selected)};
      }
      ${(props) =>
        props.outline &&
        css`
          color: ${selected};
          background: none;
          border: 1px solid ${selected};
          &:hover {
            background: ${selected};
            color: white;
          }
        `}
    `;
  }}
`;
const sizes = {
  large: {
    height: "3rem",
    fontSize: "1.25rem",
  },
  medium: {
    height: "2rem",
    fontSize: "1rem",
  },
  small: {
    height: "1.75rem",
    fonsSize: "0.875",
  },
};

const sizeStyles = css`
  ${({ size }) => css`
    height: ${sizes[size].height};
    font-size: ${sizes[size].fontSize};
  `}
`;
const fullWidthStyles = css`
  ${(props) =>
    props.fullwidth &&
    css`
      width: 100%;
      justify-content: center;
      margin-top: 1rem;
      margin-left: 0px;
    `}
`;
const StyledButton = styled.button`
  /* 공통 스타일*/
  display: inline-flex;
  outline: none;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;
  & + & {
    margin-left: 1rem;
  }

  /* 기타 */

  ${sizeStyles};
  ${colorStyles};
  ${fullWidthStyles};
`;

function Button({ children, color, size, outline, fullwidth, ...rest }) {
  return (
    <StyledButton
      size={size}
      color={color}
      outline={outline}
      fullwidth={fullwidth}
      {...rest}
    >
      {children}
    </StyledButton>
  );
}

Button.defaultProps = {
  color: "blue",
  size: "medium",
};
export default Button;
