import { JoinForm } from "../../components/JoinForm/JoinForm";
import "./styles.scss";
import logo from "../../assets/textures/logo.svg";

export const HomePage = () => {
  return (
    <div className="home">
      <div className="home__content">
        <img src={logo} alt="logo" draggable={false} />
        <span className="home__title">Party Games</span>
        <JoinForm />
      </div>
    </div>
  );
};
