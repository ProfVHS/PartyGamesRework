import "./JoinFormStyle.scss";

import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "../Button/Button";
import { RowLayout } from "../layouts/RowLayout";

interface FormInputs {
  nickname: string;
  room: string;
}

export const JoinForm = () => {
  const { register, handleSubmit } = useForm<FormInputs>();
  const onJoin: SubmitHandler<FormInputs> = (data) => console.log("join", data);
  const onCreate: SubmitHandler<FormInputs> = (data) =>
    console.log("create", data);
  return (
    <form className="form">
      <input
        className="form-input"
        style={{ width: "100%" }}
        type="text"
        id="name"
        placeholder="Nickname"
        {...register("nickname")}
      />
      <RowLayout>
        <Button style={{ width: "50%" }} onClick={handleSubmit(onJoin)}>
          Join
        </Button>
        <input
          className="form-input"
          style={{ width: "50%" }}
          type="text"
          id="room"
          placeholder="Room Code"
          {...register("room", { required: true, maxLength: 5 })}
        />
      </RowLayout>
      <Button style={{ width: "100%" }} onClick={handleSubmit(onCreate)}>
        Create Room
      </Button>
    </form>
  );
};
