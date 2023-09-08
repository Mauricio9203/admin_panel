import React, { useState } from 'react';
import { Dialog, DialogContent, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import "../App.css"

function ImageViewer({ imageUrl }) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <IconButton
        color="primary"
        size="small"
        onClick={handleOpen}
      >
        <VisibilityIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        PaperProps={{
          style: {
            backgroundColor: 'rgba(0, 0, 0, 0)', // Color transparente
            boxShadow: 'none', // Sin sombra
            backdropFilter: 'blur(10px)', // Efecto de vidrio
          },
        }}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          style={{ position: 'absolute', top: 0, right: 0, color: "white" }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
          <img src={imageUrl} className='zoomable-image' alt="Imagen Ampliada" style={{ maxWidth: "80%", maxHeight: "100%" }} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ImageViewer;
