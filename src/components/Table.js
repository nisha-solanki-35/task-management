import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

export const Th = styled.th`
  background-color: #f2f2f2;
  padding: 10px;
  text-align: left;
`;

export const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

export const EditButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 8px 12px;
  border: none;
  cursor: pointer;
  margin-right: 5px;
`;

export const DeleteButton = styled.button`
  background-color: #f44336;
  color: white;
  padding: 8px 12px;
  border: none;
  cursor: pointer;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: ${(props) => (props.moreButton ? 'space-between' : 'end')} ;
  margin: 15px;
`

export const Button = styled.button`
  background-color: #000000;
  color: #ffffff;
  padding: 10px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  text-align: right;
  &:hover {
    background-color: #217dbb;
  }
`;

export const DataNotFound = styled.h2`
  display: flex;
  justify-content: center;
  padding: 50px 0px;
`
