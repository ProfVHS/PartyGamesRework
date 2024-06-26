import "./FormStyle.scss";

import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "../Button/Button";
import { useNavigate } from "react-router-dom";

interface FormInputs {
  nickname: string;
  room: string;
}

type CreateFormProps = {
  onCancel: () => void;
};

export const CreateForm = ({ onCancel }: CreateFormProps) => {
  const navigator = useNavigate();
  const { register, handleSubmit } = useForm<FormInputs>();

  const onJoin: SubmitHandler<FormInputs> = (data) => {
    console.log("join", data);
    navigator("/room");
  };

  return (
    <form className="form" onSubmit={handleSubmit(onJoin)} onReset={onCancel}>
      <input
        className="form-input"
        style={{ width: "100%" }}
        type="text"
        id="name"
        placeholder="Nickname"
        {...register("nickname")}
      />
      <Button style={{ width: "100%" }} type="submit">
        Create
      </Button>
      <Button style={{ width: "100%" }} type="reset">
        Go Back
      </Button>
    </form>
  );
};
