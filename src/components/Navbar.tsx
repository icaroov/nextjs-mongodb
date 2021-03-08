import Link from "next/link";
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
    link: {
      color: "#fff",
      textDecoration: "none",
    },
  })
);

const Navbar = () => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar className={classes.nav}>
        <IconButton edge="start" color="inherit" aria-label="menu"></IconButton>

        <Typography variant="h6">
          <Link href="/">
            <a className={classes.link}>Unique URL</a>
          </Link>
        </Typography>

        <Link href="/new">
          <Button color="inherit">Create User</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
