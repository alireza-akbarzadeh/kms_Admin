import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {Paper, IconButton, useMediaQuery} from "@mui/material";
import styled from "@emotion/styled";
import {Icons} from "../components";

const ModalCore = ({open, setOpen, children, title, size}) => {
    const matches = useMediaQuery("(max-width:398px)");
    const defaultSize = matches ? 320 : 400;
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: size ? size : defaultSize,
        bgcolor: "background.paper",
        maxWidth: "100%",
        margin: "0 5px",
        borderRadius: 5,
        p: 3,
    };
    return (
        <>
            <Modal
                open={open}
                components={Paper}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <ModalHead>
                        {title}
                        <IconButton onClick={handleClose}>
                            <Icons option={"fe:close"}/>
                        </IconButton>
                    </ModalHead>
                    <ModalBody>{children}</ModalBody>
                </Box>
            </Modal>
        </>
    );
};

export default ModalCore;

const ModalHead = styled(Box)`
  display: flex;
  justify-items: center;
  justify-content: space-between;
  border-top-left-radius: 15px;
  background-color: #00ab55;
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding: 0 15px;
  border-top-right-radius: 15px;
  color: #fff;
  position: fixed;
  left: 0;
  top: 0;

  svg {
    color: #fff;
  }
`;
const ModalBody = styled(Box)`
  margin-top: 50px;
`;
