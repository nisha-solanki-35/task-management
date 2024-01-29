import styled from 'styled-components';

export const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

export const Input = styled.input`
  padding: 8px;
  margin-bottom: 16px;
  border: ${(props) => (props.error && '1px solid red')};
`;

export const Button = styled.button`
  padding: 10px;
  background-color: #282C35;
  color: #ffffff;
  cursor: pointer;
`;

export const ErrorText = styled.p`
  color: red;
  margin-top: -10px;
  margin-bottom: 10px;
`;

export const StyledSelect = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 16px;
  border: ${(props) => (props.error && '1px solid red')};
`;

export const Container = styled.div`
  width: 300px;
  height: 200px;
  border: 1px solid #ccc;
`;

export const SelectContainer = styled.div`
  margin-bottom: 16px;
`;