import { Link } from 'react-router-dom';
import * as S from './styled';

type TypeButton = {
  type?: 'button' | 'submit' | 'reset' | undefined
  text: string
  router?: string
  link?: boolean
}

export const Button = ({type, text, router = "/", link = false}: TypeButton) => {
  return (
    <S.Button type={type}>
      {
        link ? (<Link to={router}>
          {text}
        </Link>) :(
          <>{text}</>
        )
      }
    </S.Button>
  )
}
