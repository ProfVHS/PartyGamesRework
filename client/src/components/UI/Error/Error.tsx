import { Button } from '../Button/Button.tsx';
import "./ErrorStyle.scss"
import { ErrorIcon } from '../../common/Icons.tsx';

type ErrorProps = {
  message: string;
  onClick?: () => void;
};

export const Error = ({message, onClick}: ErrorProps) => {

  return (
    <div className="error">
      <ErrorIcon className="error__icon"/>
      <span className="error__message">{message}</span>
      <Button color="remove" onClick={onClick && onClick}>Exit from lobby</Button>
    </div>
  )
}