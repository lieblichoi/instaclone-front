import React from "react"
import styled from "styled-components"

const Texts = (props) => {
  const { size, bold, children } = props

  return (
    <TextBold size={size} bold={bold}>
      {children}
    </TextBold>
  )
}

Texts.defaultProps = {
  size: "14",
  bold: false,
}

const TextBold = styled.div`
  font-size: ${(props) => props.size}px;
  ${(props) => (props.bold ? "font-weight:bold" : "color:#999999")};
  /* text-align: center; */
`

export default Texts;