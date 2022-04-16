import {combineReducers} from "@reduxjs/toolkit";
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import Login from "./features/Auth/logInSlice";
import Logout from "./features/Auth/logOutSlice";
import userProfile from "./features/users/profileSlice";
import ForgotPass from "./features/Auth/forgotpassSlice";
import SetPss from "./features/Auth/setPasswordSlice";
import resetPassword from "./features/users/resetPassword";
import UpdateProfile from "./features/users/UpdateProfile";
import registerAdmin from "./features/admin/registerAdminSlice";
import deleteSms from "./features/admin/sms/deleteSlice";
import getSmsListSlice from "./features/admin/sms/indexSlice";
import storeSmsSlice from "./features/admin/sms/storeSlice";
import updateSmsSlice from "./features/admin/sms/updateSlice";
import updateEmailSlice from "./features/admin/email/updateSlice";
import storeEmailSlice from "./features/admin/email/storeSlice";
import getEmailListSlice from "./features/admin/email/indexSlice";
import detailsEmailSlice from "./features/admin/email/showSlice";
import deleteEmailSlice from "./features/admin/email/deleteSlice";
import getFileListSlice from "./features/admin/file/fileIndexSlice";
import deleteFileListSlice from "./features/admin/file/deleteFiles";
import notifySettingAction from "./features/admin/notifySettingSlice";
import workSpaceUserSlice from "./features/admin/customer/user/workSpaceUserSlice";
import reportUserSlice from "./features/admin/customer/report/userReportSlice";
import getWorkspaceListSlice from "./features/admin/workspace";
import deleteWorkSpaceSlice from "./features/admin/workspace/deleteWorkSpace";
import updateWorkSpaceSlice from "./features/admin/workspace/updateWorkSpace";
import storeWorkSpaceSlice from "./features/admin/workspace/storeWorkSpace";
import getNotifySettingSlice from "./features/admin/getNotifiSetting";
import getCustomerListSlice from "./features/admin/customer";
import loginWithUserSlice from "./features/Auth/loginWithUserId";
import changeStatusSlice from "./features/admin/customer/changeStatusSlice";
import deleteDeleteDepartmentAdminSlice from "./features/admin/removeDepartemanSlice";
import storeAdminDepartmentSlice from "./features/admin/createDepartemanSlice";
import getDepartmentListSlice from "./features/admin/departeman/indexDepartment";
import showDepartmentListSlice from "./features/admin/departeman/ShowDepartment";
import storeDepartmentSlice from "./features/admin/departeman/StoreDepartment";
import updateDepartmentSlice from "./features/admin/departeman/UpdateDepartment";
import storeDepartmentAdminSlice from "./features/admin/departeman/storeDepartmentAdmin";
import adminListSlice from "./features/admin/departeman/adminListSlice";
import showDriveListSlice from "./features/admin/Drive/Show";
import getTaskListSlice from "./features/admin/workspace/GetTaskList";
import showTaskListSlice from "./features/admin/workspace/ShowTaskList";
import getProjectListSlice from "./features/admin/workspace/getProjectList";
import showProjectListSlice from "./features/admin/workspace/ShowProjectList";
import getTeamListSlice from "./features/admin/workspace/geTteamList";
import showTeamList from "./features/admin/workspace/ShowTeamList";
import getDocumentListSlice from "./features/admin/workspace/geDocumentList";
import showDocumentListSlice from "./features/admin/workspace/ShowDocumentList";
import getTicketsSlice from "./features/admin/Tickets/index";
import showTicketsSlice from "./features/admin/Tickets/show";
import changeDepartmentTicketsSlice from "./features/admin/Tickets/ChangeDeperteman";
import changeStatusTicketsSlice from "./features/admin/Tickets/ChangeStatus";
import createTicketsSlice from "./features/admin/Tickets/AddMessage";
import getEvaluateListSlice from "./features/admin/workspace/getEvaluateList";
import showEvaluateListSlice from "./features/admin/workspace/showEvaluateList";


const persistConfig = {
    key: "root",
    storage,
    whitelist: ["userProfile"],
};
///// All Reducers
export const rootReducers = combineReducers({
    Login,
    Logout,
    loginWithUserSlice,
    userProfile,
    ForgotPass,
    SetPss,
    resetPassword,
    UpdateProfile,
    registerAdmin,
    deleteSms,
    getSmsListSlice,
    storeSmsSlice,
    updateSmsSlice,
    storeEmailSlice,
    updateEmailSlice,
    getEmailListSlice,
    deleteEmailSlice,
    detailsEmailSlice,
    getFileListSlice,
    notifySettingAction,
    workSpaceUserSlice,
    reportUserSlice,
    getWorkspaceListSlice,
    deleteWorkSpaceSlice,
    storeWorkSpaceSlice,
    updateWorkSpaceSlice,
    getNotifySettingSlice,
    getCustomerListSlice,
    deleteFileListSlice,
    changeStatusSlice,
    deleteDeleteDepartmentAdminSlice,
    storeAdminDepartmentSlice,
    getDepartmentListSlice,
    showDepartmentListSlice,
    storeDepartmentSlice,
    updateDepartmentSlice,
    storeDepartmentAdminSlice,
    adminListSlice,
    showDriveListSlice,
    getTaskListSlice,
    showTaskListSlice,
    getProjectListSlice,
    showProjectListSlice,
    getTeamListSlice,
    showTeamList,
    getDocumentListSlice,
    showDocumentListSlice,
    getTicketsSlice,
    showTicketsSlice,
    changeDepartmentTicketsSlice,
    changeStatusTicketsSlice,
    createTicketsSlice,
    getEvaluateListSlice,
    showEvaluateListSlice,
});

export default persistReducer(persistConfig, rootReducers);
