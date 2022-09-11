// Import libraries
import { useState } from "react";
// Imports for Modal
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
// Imports for Checkbox
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddChatroom = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [chat, setChat] = useState({name: "hello world"});

  
  // ToDo:
  // useEffect() API call - Fetch all available users
  // Render availalbe users into Checkbox
  // (optional - searrchbar)
  // Grab input from Checkbox
  // Post request with input
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
    <Dialog
        fullScreen
        open={openDialog}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>

          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {/* Title of the modal */}
              Sound
            </Typography>
            {/* Button to submit POST request to addNewChat */}
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
            
          </Toolbar>

        </AppBar>

        
        <List>
          {/* Convert these child elements to checkbox */}
          <FormGroup>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Person1" />
            <FormControlLabel disabled control={<Checkbox />} label="Person2" />
          </FormGroup>

          <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>
          
          <Divider />

          <ListItem button>
            <ListItemText primary="Default notification ringtone" secondary="Tethys" />
          </ListItem>

        </List>

      </Dialog>
  );
};

export default AddChatroom;
