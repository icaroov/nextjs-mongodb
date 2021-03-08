import { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Button, CircularProgress, Container } from "@material-ui/core";

import api from "@/src/config/api";
import Dialog from "@/src/components/Dialog";
import { useUser } from "@/src/hooks/useUser";

type UserProps = {
  user: {
    name: string;
  };
};

const User = ({ user }: UserProps) => {
  const [confirm, setConfirm] = useState(false);

  const { deleteUser, isLoading, setIsLoading } = useUser();

  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    if (isLoading) {
      deleteUser(id);
      setIsLoading(false);
    }
  }, [isLoading]);

  const openDialog = () => setConfirm(true);
  const closeDialog = () => setConfirm(false);

  const handleDelete = async () => {
    setIsLoading(true);
    closeDialog();
  };

  return (
    <Container>
      <h1>User: {user.name}</h1>
      <Button color="secondary" onClick={openDialog}>
        {isLoading ? <CircularProgress /> : "Delete"}
      </Button>

      <Dialog
        open={confirm}
        handleClose={closeDialog}
        onDelete={handleDelete}
      />
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const response = await api.get(`/users/${params.id}`);
  const { data } = response.data;

  return {
    props: {
      user: data,
    },
  };
};

export default User;
