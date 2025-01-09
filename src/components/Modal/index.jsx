import * as React from 'react';
import { Dialog, DialogContent, DialogTitle, Divider, AppBar, Toolbar, IconButton, Typography, } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function Modal({ open, handleClose, className, children, title, fullScreen, showTitle = true, showCloseIcon = true, maxWidth = "sm" }) {
  // Sample receipt data

  return (
    <Dialog
      className={className}
      fullScreen={fullScreen || false}
      maxWidth={maxWidth}
      fullWidth={true}
      TransitionComponent={Transition}
      open={open}
      onClose={handleClose}

    >
      <div className=" position-relative">


        {showTitle && <DialogTitle className="dialogHeader" sx={{ m: 0, p: 1 }} id="customized-dialog-title">{title}</DialogTitle>}

        {showCloseIcon && <CloseIcon onClick={handleClose} className="dialogCloseIcon" />}
      </div>
      <Divider sx={{ color: "border.primary" }} />

      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  );
}
