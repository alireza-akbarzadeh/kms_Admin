import React, {useState} from 'react';
import {Box, Button, Stack, TextareaAutosize, Tooltip, useMediaQuery, Avatar} from "@mui/material";
import {useTranslation} from "react-i18next";
import {FileUploader} from "../../../helper";
import {useDispatch, useSelector} from "react-redux";
import {createTicketsAction} from "../../../redux/features/admin/Tickets/AddMessage";
import {LoadingButton} from "@mui/lab";
import {showTicketsAction} from "../../../redux/features/admin/Tickets/show";
import {changeStatusTicketsAction} from "../../../redux/features/admin/Tickets/ChangeStatus";
import {SelectBox} from "../../../core";
import ChangeDepModal from "../workspace/task/ChangeDepModal";

const AddMessage = ({messageId}) => {
    const [logoPic, setLogoPic] = useState(null);
    const [text, setText] = useState("");
    const [openModal, setOpenModal] = useState(null);
    const {loading, error} = useSelector((state) => state.createTicketsSlice);

    const {t} = useTranslation();
    const match = useMediaQuery("(max-width:700px)")
    const dispatch = useDispatch();

    let formData = new FormData();
    const handleAddMessage = () => {
        formData.append("ticket_id", messageId);
        formData.append("message", text);
        if (logoPic !== null) {
            formData.append("file", logoPic[0]);
        }
        dispatch(createTicketsAction(formData))
    }

    const handleChangeDep = () => {
        setOpenModal(true)
    }

    const handleCloseTicket = (e) => {
        const data = {
            ticket_id: messageId, status: e.target.value
        }
        dispatch(changeStatusTicketsAction(data))
    }
    const statusData = [{value: "admin_close", text: t("Close_Ticket")}, {value: "in_progress", text: t("in_progress")}]
    return (<>
        <Box sx={{marginTop: 5, width: "100%"}}>
            <TextareaAutosize style={{width: '100%', fontFamily: "Vazir", padding: 5}} maxRows={"100"} minRows={"12"}
                              onChange={(e) => setText(e.target.value)}/>
        </Box>
        <Box sx={{
            display: "flex", justifyContent: "space-between", mt: 5, alignItems: "flex-start"
        }}>
            <Tooltip title={t("UpLoad_Photo")}>
                <div>
                    <FileUploader
                        src={logoPic}
                        onFileUpload={setLogoPic}
                        uploadMultiple={false}
                        showPreview={true}
                        title={t("PHOTO_SELECTION_KEY")}
                        description={t("NEED_CHANGE_IMAGE_KEY")}
                    >
                        <Box>
                            <div className="wrap-custom-file">
                                <label htmlFor="avatar">
                                    <Box
                                        sx={{
                                            backgroundColor: "#fff",
                                            borderRadius: 2,
                                            padding: 0.5,
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            cursor: "pointer"
                                        }}
                                    >
                                        <Avatar title={"Upload"} color={"#eee"} variant={"rounded"}
                                                src={"/static/upload.png"}/>
                                    </Box>
                                </label>
                            </div>
                        </Box>
                    </FileUploader>
                </div>
            </Tooltip>
            <Box>
                <SelectBox style={{width: "200px"}} label={t("Ticket_Status")} data={statusData}
                           onChange={handleCloseTicket}/>
                <Button sx={{margin: "0 20px"}} onClick={handleChangeDep} size={"large"} variant={"contained"}
                        color={"info"}>
                    {t("Send_Another_Department")}
                </Button>
                <LoadingButton
                    onClick={handleAddMessage}
                    type="submit"
                    size={"large"}
                    variant="contained"
                    loading={loading}
                >
                    {t("Add_Message")}
                </LoadingButton>
            </Box>
        </Box>
        <ChangeDepModal setOpenModal={setOpenModal} openModal={openModal} ticketId={messageId}/>
    </>);
};

export default AddMessage;
