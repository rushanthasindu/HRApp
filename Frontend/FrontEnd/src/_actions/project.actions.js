import { userService } from '../_services';
import { history } from '../_helpers';
import { vendorAction } from './index'

function getProjectList(){
    return dispatch => {
        let apiEndpoint = '/project';
        userService.get(apiEndpoint)
        .then((response)=>{
            console.log(response);
            dispatch(changeProjectList(response.data));
        }).catch((err)=>{
            console.log("Error");
            console.log(err);
        })
    };
}


function getEmployeesBySkill(skill){
    return dispatch => {
        let apiEndpoint = '/info/employees-by-skill/' + skill;
        userService.get(apiEndpoint)
        .then((response)=>{
            console.log(response);
            dispatch(getEmployeesBySkillAction(response.data));
        }).catch((err)=>{
            console.log("Error");
            console.log(err);
        })
    };
}

function getAllEmployeeList(){
    return dispatch => {
        let apiEndpoint = '/employee';
        userService.get(apiEndpoint)
        .then((response)=>{
            console.log(response);
            dispatch(changeEmployeeList(response.data));
        }).catch((err)=>{
            console.log("Error");
            console.log(err);
        })
    };
}

function createProject(payload){
    return dispatch => {
        let apiEndpoint = '/project';
        userService.post(apiEndpoint, payload)
        .then((response)=>{
            dispatch(createProjectInfo());
            history.push('/project');
            return response;
        })
    }
}

function updateProjectCount(employeeId){
    return dispatch => {
        let apiEndpoint = '/employee/'+ employeeId;
        userService.get(apiEndpoint)
        .then((response)=>{
            console.log(response);
            const numOfProject = response.data.numOfProject;
            dispatch(vendorAction.editVendorInfo(employeeId, {numOfProject: numOfProject + 1}));
            history.push('/project');
            return response;
        })
    }
}

function getProjectById(id){

    return dispatch => {
        let apiEndpoint = '/project/'+ id;
        userService.get(apiEndpoint)
        .then((response)=>{
            dispatch(editProjectDetails(response.data));
        })
    };
}

function onChangeProps(props, event){
    return dispatch =>{
        dispatch(handleOnChangeProps(props, event.target.value));
    }
}

function editProjectInfo(id, payload){
    return dispatch => {
        let apiEndpoint = '/project/'+ id;
        userService.put(apiEndpoint, payload)
        .then((response)=>{
            dispatch(updatedProjectInfo());
            history.push('/project');
        }) 
    }
}

function deleteProjectById(id){
    return dispatch => {
        let apiEndpoint = '/project/'+ id;
        userService.deleteDetail(apiEndpoint)
        .then((response)=>{
            dispatch(updatedProjectInfo());
            dispatch(projectAction.getProjectList());
            history.push('/project');
        })
    };
}

export function changeProjectList(projectList){
    return{
        type: "FETECHED_ALL_PROJECTS",
        projectList: projectList
    }
}


export function changeEmployeeList(employeeList){
    return{
        type: "FETECHED_ALL_EMPLOYEES",
        employeeList: employeeList
    }
}

export function getEmployeesBySkillAction(employeeList){
    return{
        type: "FETECHED_EMPLOYEES_BY_SKILL",
        employeeList: employeeList
    }
}

export function handleOnChangeProps(props, value){
    return{
        type: "HANDLE_ON_CHANGE",
        props: props,
        value: value
    }
}

export function editProjectDetails(project){
    return{
        type: "PROJECT_DETAIL",
        id: project._id,
        projectId: project._id,
        projectName: project.projectName,
        startDate: project.startDate,
        endDate: project.endDate,
        actualCompletionDate: project.actualCompletionDate,
        technology: project.type,
        allocation: project.allocation,
        completionRate: project.completionRate,
        customerName: project.customerName,
        customerContact: project.customerContact,
        customerEmail: project.customerEmail,
        comment: project.comment,
        
    }
}

export function updatedProjectInfo(){
    return{
        type: "PROJECT_UPDATED"
    }
}

export function createProjectInfo(){
    return{
        type: "PROJECT_CREATED_SUCCESSFULLY"
    }
}

export function deleteProjectDetails(){
    return{
        type: "DELETED_PROJECT_DETAILS"
    }
}

export const projectAction = {
    getProjectList,
    getEmployeesBySkill,
    createProject,
    getProjectById,
    onChangeProps,
    editProjectInfo,
    deleteProjectById,
    getAllEmployeeList,
    updateProjectCount,
};