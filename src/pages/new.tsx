import { useState } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import {
  Button,
  CircularProgress,
  Container,
  TextField,
} from "@material-ui/core";

import api from "@/src/config/api";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      marginRight: theme.spacing(2),
    },
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    form: {
      display: "flex",
    },
  })
);

const NewUser = () => {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    helperText: "",
    error: false,
  });

  const router = useRouter();

  const classes = useStyles();

  const createUser = async () => {
    try {
      await api.post("/users", {
        name: name,
      });

      router.push("/");
      setIsLoading(false);
      console.log("Success!");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = event.currentTarget;
    setName(value);
  };

  const handlingError = () => {
    if (name.length > 2) {
      setErrors({ helperText: "", error: false });
      setIsLoading(true);
      createUser();
    } else {
      setErrors({ helperText: "Invalid name", error: true });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handlingError();
  };

  return (
    <Container className={classes.container}>
      <h1>Create User</h1>
      <div>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              id="outlined-required"
              helperText={errors.helperText}
              error={errors.error}
              className={classes.margin}
              onChange={handleChange}
              label="Name"
              placeholder="Enter your name"
              variant="outlined"
            />
            <Button variant="contained" color="primary" type="submit">
              Go!
            </Button>
          </form>
        )}
      </div>
    </Container>
  );
};

export default NewUser;
