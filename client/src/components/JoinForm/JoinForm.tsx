import "./JoinFormStyle.scss";

import { useForm, SubmitHandler } from "react-hook-form";
import { RowLayout } from "./layouts/RowLayout";

interface FormInputs {
  nickname: string;
  room: string;
}

export const JoinForm = () => {
  const { register, handleSubmit } = useForm<FormInputs>();
  const onSubmit: SubmitHandler<FormInputs> = (data) => console.log(data);
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        id="name"
        placeholder="Nickname"
        {...register("nickname")}
      />
      <RowLayout>
        <input
          type="text"
          id="room"
          placeholder="Room Code"
          {...register("room", { required: true, maxLength: 5 })}
        />
        <button type="submit">Join</button>
      </RowLayout>
    </form>
  );
};
