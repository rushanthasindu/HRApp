import { userService } from '../_services';
import { history } from '../_helpers';

function getLeaveListByEmployee(employeeId){
    return dispatch => {
        let apiEndpoint = '/info/leave-by-employee/' + employeeId;
        userService.get(apiEndpoint)
        .then((response)=>{
            console.log(response);
            dispatch(changeLeaveList(response.data));
        }).catch((err)=>{
            console.log("Error");
            console.log(err);
        })
    };
}

function getLeaveListByManager(managerId){
    return dispatch => {
        let apiEndpoint = '/info/leave-by-manager/' + managerId;
        userService.get(apiEndpoint)
        .then((response)=>{
            console.log(response);
            dispatch(getLeaveListForManager(response.data));
        }).catch((err)=>{
            console.log("Error");
            console.log(err);
        })
    };
}

function createLeave(payload){
    return dispatch => {
        let apiEndpoint = '/leave';
        userService.post(apiEndpoint, payload)
        .then((response)=>{
            dispatch(createLeaveInfo());
            history.push('/leave');
        }) 
    }
}

function getLeaveById(id){

    return dispatch => {
        let apiEndpoint = '/leave/'+ id;
        userService.get(apiEndpoint)
        .then((response)=>{
            dispatch(editLeaveDetails(response.data));
        })
    };
}

function onChangeProps(props, event){
    return dispatch =>{
        dispatch(handleOnChangeProps(props, event.target.value));
    }
}

function editLeaveInfo(id, payload){
    return dispatch => {
        let apiEndpoint = '/leave/'+ id;
        userService.put(apiEndpoint, payload)
        .then((response)=>{
            dispatch(updatedUserInfo());
            history.push('/leave');
        }) 
    }
}

function approveLeave(id, managerId){
    return dispatch => {
        let apiEndpoint = '/leave/'+ id;
        userService.get(apiEndpoint)
        .then((response)=>{
            const payload = {
                id: response.data._id,
                leaveId: response.data._id,
                employeeId: response.data.employeeId,
                leaveStart: response.data.leaveStart,
                leaveEnd: response.data.leaveEnd,
                reason: response.data.reason,
                status: 'Approved',
                approvedBy: managerId,
            }
            dispatch(leaveAction.editLeaveInfo(id, payload));
            history.push('/approve-leave');
        }) 
    }
}

function deleteLeaveById(id){
    return dispatch => {
        let apiEndpoint = '/leave/'+ id;
        userService.deleteDetail(apiEndpoint)
        .then((response)=>{
            dispatch(deleteLeaveDetails());
            if (response.data && response.data.employeeId) {
                dispatch(leaveAction.getLeaveListByEmployee(response.data.employeeId));
            }
            history.push('/leave');
        })
    };
}

export function changeLeaveList(leaveList){
    return{
        type: "FETECHED_ALL_LEAVES_BY_EMPLOYEE",
        leaveList: leaveList
    }
}

export function getLeaveListForManager(leaveList){
    return{
        type: "FETECHED_ALL_LEAVES_BY_MANAGER",
        approvalList: leaveList
    }
}

export function handleOnChangeProps(props, value){
    return{
        type: "HANDLE_ON_CHANGE",
        props: props,
        value: value
    }
}

export function editLeaveDetails(leave){
    return{
        type: "LEAVE_DETAIL",
        id: leave._id,
        leaveId: leave.leaveId,
        employeeId: leave.employeeId,
        leaveStart: leave.leaveStart,
        leaveEnd: leave.leaveEnd,
        reason: leave.reason,
        status: leave.status,
        approvedBy: leave.approvedBy,
    }
}

export function updatedUserInfo(){
    return{
        type: "LEAVE_UPDATED"
    }
}

export function createLeaveInfo(){
    return{
        type: "LEAVE_CREATED_SUCCESSFULLY"
    }
}

export function deleteLeaveDetails(){
    return{
        type: "DELETED_LEAVE_DETAILS"
    }
}

export const leaveAction = {
    getLeaveListByEmployee,
    createLeave,
    getLeaveById,
    onChangeProps,
    editLeaveDetails,
    deleteLeaveById,
    editLeaveInfo,
    getLeaveListByManager,
    approveLeave,
};