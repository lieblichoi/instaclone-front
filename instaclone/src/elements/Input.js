import React from "react";
import styled from "styled-components";

const Input = (props) => {
  const { type, value, placeholder, _onChange } = props;
  return (
    <React.Fragment>
      <ElInput
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={_onChange}
      />
    </React.Fragment>
  );
};

Input.defaultProps = {
  placeholder: "입력",
  value: "",
  _onChange: () => {},
};

const ElInput = styled.input`
  padding: 0.8rem;
  margin-bottom: 0.5rem;
  border: 2px solid #eee;
  border-radius: 0.4rem;
`;

export default Input;
