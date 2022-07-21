import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../Button';
import * as S from './styled';

interface IHeader {
  router: string;
  text: string;
}

export const Header = ({router, text}:IHeader) => {
  return (
    <S.Wrapper>
      <S.Header>
        <Link to="/">
         Reciclagem Maps
        </Link>
      </S.Header>
      <S.Header>
        <Button text={text} type='button' router={router} link={true}/>
      </S.Header>
    </S.Wrapper>
  )
}
