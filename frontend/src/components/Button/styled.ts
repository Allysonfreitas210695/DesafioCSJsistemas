import styled from "styled-components";

export const Button = styled.button`
  text-align: center;
  text-transform: uppercase;
  background-color: #6683F0;
  padding: 10px 14px;
  border: none;
  border-radius: 8px;
  color: #FFF;
  font-weight: bold;
  font-size: 15px;

  a:first-child{
    text-decoration: none;
    color: #FFF;
    font-weight: bold;
  }

  &:hover{
    opacity: 0.6;
    transition: opacity 0.2s;
  }
`