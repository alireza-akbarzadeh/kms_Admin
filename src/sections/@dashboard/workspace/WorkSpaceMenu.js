import {useRef, useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';
// material
import {Menu, MenuItem, IconButton, ListItemIcon, ListItemText} from '@mui/material';
// component
import Iconify from '../../../components/Iconify';
import {deleteSmsAction} from "../../../redux/features/admin/sms/deleteSlice";
import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import {deleteWorkSpaceAction} from "../../../redux/features/admin/workspace/deleteWorkSpace";
import * as _ from "lodash"
// ----------------------------------------------------------------------

const WorkSpaceMenu = ({setOpenUpdateModal, id, data, setWorkspaceList}) => {
    const ref = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const handleDeleteSms = (id) => {
        let newState = _.cloneDeep(data);
        const newData = _.remove(newState, function (x) {
            return x?.id !== id;
        });
        setWorkspaceList(newData)
        dispatch(deleteWorkSpaceAction(id))
    }
    return (
        <>
            <IconButton ref={ref} onClick={() => setIsOpen(true)}>
                <Iconify icon="eva:more-vertical-fill" width={20} height={20}/>
            </IconButton>
            <Menu
                open={isOpen}
                anchorEl={ref.current}
                onClose={() => setIsOpen(false)}
                PaperProps={{
                    sx: {width: 200, maxWidth: '100%'}
                }}
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
            >
                <MenuItem disabled={data?.length === 1} onClick={() => handleDeleteSms(id)}
                          sx={{color: 'text.secondary'}}>
                    <ListItemIcon>
                        <Iconify icon="eva:trash-2-outline" width={24} height={24}/>
                    </ListItemIcon>
                    <ListItemText primary={t("Delete")} primaryTypographyProps={{variant: 'body2'}}/>
                </MenuItem>
                <MenuItem onClick={() => setOpenUpdateModal({modal: true, id: id})}
                          sx={{color: 'text.secondary'}}>
                    <ListItemIcon>
                        <Iconify icon="eva:edit-fill" width={24} height={24}/>
                    </ListItemIcon>
                    <ListItemText primary={t("Edit")} primaryTypographyProps={{variant: 'body2'}}/>
                </MenuItem>
            </Menu>
        </>
    );
}
export default WorkSpaceMenu;