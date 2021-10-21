import React from "react";
import styled from "styled-components";

const Button = (props) => {
    const {text, type, fontWeight, backgroundColor, _onClick} = props;

    return (
        <React.Fragment>
            <ElButton backgroundColor={backgroundColor} fontWeight={fontWeight} type={type}
                      onClick={_onClick}>{text}</ElButton>
        </React.Fragment>
    )
}

Button.defaultProps = {
    text: "입력",
    type: "submit",
    backgroundColor: "#3897f0",
    fontWeight: "500",
    _onClick: () => {
    },
}

const ElButton = styled.button`
  margin: 1rem 0 1.5rem;
  height: 3rem;
  background-color: ${(props) => props.backgroundColor};
  font-size: 1.4rem;
  font-weight: ${(props) => props.fontWeight};
  color: #fff;
  border: none;
  border-radius: .4rem;
  cursor: pointer;
`;

export default Button;