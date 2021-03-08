import { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Button, CircularProgress, Container } from "@material-ui/core";

import api from "@/src/config/api";
import Dialog from "@/src/components/Dialog";

type UserProps = {
  user: {
    name: string;
  };
};

const User = ({ user }: UserProps) => {
  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (isDeleting) {
      deleteUser();
    }
  }, [isDeleting]);

  const openDialog = () => setConfirm(true);
  const closeDialog = () => setConfirm(false);

  const deleteUser = async () => {
    const { id } = router.query;

    try {
      await api.delete(`/users/${id}`);

      console.log("User deleted!");
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    closeDialog();
  };

  return (
    <Container>
      {isDeleting ? (
        <CircularProgress />
      ) : (
        <>
          <h1>{user.name}</h1>
          <Button color="secondary" onClick={openDialog}>
            Delete
          </Button>
        </>
      )}

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
