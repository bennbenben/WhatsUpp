// Import libraries
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const AddChatroom = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [chat, setChat] = useState({name: "hello world"});

  // useEffect() to fetch global list of users and render it (search bar is optional)
  // rendering: MUI -> formcontrol with checkbox
  // submit -> submit to the BE. BE does a query to check if "# current participants == 1. if it's 1, then check if 
  // there is an existing chat between this 2 persons" -> return the chatroom ID --> FE navigate to rooms/:roomId
  // #currentpartipants>1 && groupname does not exist, then create a new record in chatrooms collections
  
  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setOpenDialog(false);
  }

  return !openDialog ? (
    <div onClick={handleClickOpen} className="sidebarChat">
      <h2>Add new Chat</h2>
    </div>
  ) : (
    <Dialog open={openDialog} onClose={handleClose}>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
          {chat.name}
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onSubmit={handleSubmit}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddChatroom;
