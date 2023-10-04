import { Dialog, DialogTitle } from '@mui/material';
import React from 'react'

export default function SelectField(props) {
  const { onClose, selectedValue, open } = props;
  const handleClose = () => {
    onClose(selectedValue);
  }
  return (
    <>
     <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Select filter fields</DialogTitle>        
     </Dialog>
    </>
  )
}
