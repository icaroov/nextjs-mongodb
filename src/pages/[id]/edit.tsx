import { useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { CircularProgress, Container } from "@material-ui/core";

import api from "@/src/config/api";
import TextField from "@/src/components/TextField";
import { useUser } from "@/src/hooks/useUser";

type EditUserProps = {
  user: {
    name: string;
  };
};

const EditUser = ({ user }: EditUserProps) => {
  const [name, setName] = useState(user.name);

  const { updateUser, isLoading, handlingError, errors } = useUser();

  const router = useRouter();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.currentTarget;
    setName(value);
  };

  const { id } = router.query;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handlingError(name);
    updateUser(id, name);
  };

  return (
    <Container>
      <h1>Update User</h1>

      <TextField
        onSubmit={handleSubmit}
        helperText={errors.helperText}
        error={errors.error}
        onChange={handleChange}
        label="Name"
        value={name}
        placeholder="Edit name"
      >
        {isLoading ? <CircularProgress /> : "Update"}
      </TextField>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const response = await api.put(`/users/${params.id}`);
  const { data } = response.data;

  return {
    props: {
      user: data,
    },
  };
};

export default EditUser;
