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
  margin-top: 6px;
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

export const CardView = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const CardContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin: 16px;
  width: 300px;
`;

export const CardTitle = styled.h2`
  color: #333;
`;

export const CardContent = styled.p`
  color: #666;
`;

export const Content = styled.div`
  padding: 8px 0px
`
export const CardFooter = styled.div`
  padding: 8px 0px;
`