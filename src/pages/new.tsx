import { useState } from "react";
import { CircularProgress, Container } from "@material-ui/core";

import TextField from "@/src/components/TextField";
import { useUser } from "@/src/hooks/useUser";

const NewUser = () => {
  const [name, setName] = useState("");

  const { createUser, isLoading, handlingError, errors } = useUser();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setName(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handlingError(name);
    createUser(name);
  };

  return (
    <Container>
      <h1>Create User</h1>
      <div>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <TextField
            onSubmit={handleSubmit}
            onChange={handleChange}
            helperText={errors.helperText}
            error={errors.error}
            label="Name"
            placeholder="Enter your name"
          >
            Create
          </TextField>
        )}
      </div>
    </Container>
  );
};

export default NewUser;
