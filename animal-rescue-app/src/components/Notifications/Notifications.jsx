import { useContext, useEffect, useState } from "react";
import { deleteNotification, getNotifications } from "../../api/notifications";
import NotificationCard from "./NotificationCard";
import { Box, Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useAuth } from "../../utils/context/authContext";
import NotificationForm from "./NotificationForm";
import { createNotification } from "../../api/notifications";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [dialog, setDialog] = useState(false);
  const { isAdmin } = useAuth();

  useEffect(() => {
    getNotifications().then(setNotifications);
  }, []);

  const onSubmit = (notification) => {
    createNotification(notification)
      .then(getNotifications)
      .then(setNotifications)
      .then(() => setDialog(false));
  };

  const onDelete = (id) => {
    deleteNotification(id).then(getNotifications).then(setNotifications);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        mt: 4,
        gap: 4
      }}
    >
      <Box sx={{ width: 600 }}>
        <Button variant="contained" onClick={() => setDialog(true)}>
          Create notification
        </Button>
        <Dialog open={dialog} onClose={() => setDialog(false)}>
          <DialogTitle>Creating a notification</DialogTitle>
          <DialogContent sx={{ width: 500 }}>
            <NotificationForm
              showIsImportantSwitch={isAdmin}
              onSubmit={onSubmit}
            />
          </DialogContent>
        </Dialog>
      </Box>
      {[...notifications]
        .sort((a, b) => b.createdAt - a.createdAt)
        .map((notification) => (
          <NotificationCard
            key={notification._id}
            {...notification}
            showDelete={isAdmin}
            onDelete={onDelete}
          />
        ))}
    </Box>
  );
}
