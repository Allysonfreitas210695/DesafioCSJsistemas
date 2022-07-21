import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`

export const Container = styled.div`
  width: 70%;
  height: auto;
  margin: 50px auto;
  border-radius: 8px; 
  background-color: white;
  padding: 5px 10px;


  h1{
    font-size: 22px;
    text-transform: uppercase;
    color: #000;
    padding-bottom: 5px;
    border-bottom: 1px solid #000;
  }
`

export const Form = styled.form`
 flex: 1;
 display: flex;
 flex-wrap: wrap;
 flex-direction: row;
 gap: 20px;

 input{
  display: block;
  margin: 20px 10px;
 }

 button {
  display: block;
  align-items: center;
  width: 100%;
 }


`