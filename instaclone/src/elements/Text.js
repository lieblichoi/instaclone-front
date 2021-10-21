import React from "react";
import styled from "styled-components";

const Text = (props) => {
    const { bold, color, size, margin, children } = props;
    const styles = {bold: bold, color: color, size: size, margin: margin};
    return (
        <P {...styles}>
            {children}
        </P>
    )
};

Text.defaultProps = {
    children: null,
    bold: false,
    color: "#222831",
    size: "14px",
    margin: false,
};

const P = styled.p`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold? "600" : "400")};
  margin: ${(props) => props.margin};
  // margin: ${(props) => (props.margin? `${props.margin}` : "")};
  // ${(props) =>(props.margin? `margin: ${props.margin};`:'')}
`;

export default Text;