import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    nav: {
      display: "flex",
      justifyContent: "space-between",
    },
  })
);

const Navbar = () => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar className={classes.nav}>
        <IconButton edge="start" color="inherit" aria-label="menu"></IconButton>
        <Typography variant="h6">Unique URL</Typography>
        <Button color="inherit">Create User</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
