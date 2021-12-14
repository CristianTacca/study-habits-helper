import React from "react";
import PopUpBase from "../popUpBase";
import Input from "../../input";
import Button from "../../button";
import toast from "react-hot-toast";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { ActivitiesContext } from "../../../providers/activities/activities";

const NewActivity = ({ newActivity, setNewActivity }) => {
  const { createActivities } = useContext(ActivitiesContext);

  let now = new Date();

  const formSchema = yup.object().shape({
    title: yup.string().required("Título obrigatório"),
    realization_time: yup
      .date()
      .required("Campo obrigatório")
      .nullable()
      .typeError("Data e hora obrigatórios")
      .min(now, "Não pode ser no passado"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const onSubmitFunction = (data) => {
    const groupId = localStorage.getItem("GroupID");

    let dateTime =
      data.realization_time.toISOString().replace(/\..+/, "") + "Z";

    const payload = { ...data, realization_time: dateTime, group: groupId };
    createActivities(payload);
    setNewActivity(!newActivity);
  };

  const closePopUp = () => {
    setNewActivity(!newActivity);
  };

  return (
    <PopUpBase title="Nova Atividade" closePopUp={closePopUp}>
      <form onSubmit={handleSubmit(onSubmitFunction)}>
        <Input
          label="Título:"
          name="title"
          register={register}
          error={errors.title?.message}
        />
        <Input
          label="Será concluída em:"
          type="datetime-local"
          register={register}
          name="realization_time"
          error={errors.realization_time?.message}
        />
        <Button type="submit">Criar</Button>
      </form>
    </PopUpBase>
  );
};

export default NewActivity;
