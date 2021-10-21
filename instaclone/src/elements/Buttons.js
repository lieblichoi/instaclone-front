import React from "react"
import styled from "styled-components"

const Buttons = (props) => {
  const { padding, children, _onClick } = props
  const styles = {
    padding,
    children,
  }

  return (
    <ButtonDefault {...styles} onClick={_onClick}>
      {props.children}
    </ButtonDefault>
  )
}

Buttons.defaultProps = {
  padding: "0px",
  children: null,
  _onClick: () => {},
}

const ButtonDefault = styled.button`
  padding: ${(props) => props.padding};
  border: none;
  background-color: transparent;
  cursor: pointer;
  margin-right: 3px;
`
export default Buttons;