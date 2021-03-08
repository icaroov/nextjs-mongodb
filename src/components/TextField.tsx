import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from "@material-ui/core";
import React from "react";

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

type TextFieldProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  helperText: string;
  error: boolean;
  label: string;
  placeholder: string;
  value?: string;
  children: React.ReactNode;
};

const TextField = ({
  onChange,
  onSubmit,
  helperText,
  label,
  error,
  placeholder,
  value,
  children,
}: TextFieldProps) => {
  const classes = useStyles();

  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={onSubmit}
      className={classes.form}
    >
      <MuiTextField
        id="outlined-required"
        className={classes.margin}
        onChange={onChange}
        variant="outlined"
        helperText={helperText}
        error={error}
        label={label}
        placeholder={placeholder}
        value={value}
      />
      <Button variant="contained" color="primary" type="submit">
        {children}
      </Button>
    </form>
  );
};

export default TextField;
