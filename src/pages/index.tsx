import { GetStaticProps } from "next";
import Link from "next/link";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  CardHeader,
} from "@material-ui/core/";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import api from "@/src/config/api";

type User = {
  users: {
    _id: string;
    name: string;
  }[];
};

type DataResponse = {
  data: {
    users: User[];
  };
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(2),
    },
    button: {
      marginRight: theme.spacing(1),
    },
  })
);

function Home({ users }: User) {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        {users.map((user) => (
          <Grid item xs={12} sm={6} md={3} key={user._id}>
            <Card>
              <CardHeader title={`Name: ${user.name}`} />
              <CardContent>
                <Link href={`/${user._id}`}>
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                  >
                    View
                  </Button>
                </Link>
                <Link href={`/${user._id}/edit`}>
                  <Button variant="contained" color="secondary">
                    Edit
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await api.get<DataResponse>("/users");
  const { data } = response.data;

  if (!data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      users: data,
    },
  };
};

export default Home;
