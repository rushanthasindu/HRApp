import { userService } from '../_services/';
import { history } from '../_helpers';

function getVendor(){
    return dispatch => {
        let apiEndpoint = '/employee';
        userService.get(apiEndpoint)
        .then((response)=>{
            console.log(response);
            dispatch(changeVendorsList(response.data));
        }).catch((err)=>{
            console.log("Error");
            console.log(err);
        })
    };
}


function getManagerList(){
    return dispatch => {
        let apiEndpoint = '/employee';
        userService.get(apiEndpoint)
        .then((response)=>{
            const { data } = response;
            const managers = data.filter(employee => employee.role !== 'EMPLOYEE');
            dispatch(addManagerList(managers));
        }).catch((err)=>{
            console.log("Error");
            console.log(err);
        })
    };
}

function createVendor(payload){
    return dispatch => {
        let apiEndpoint = '/employee';
        userService.post(apiEndpoint, payload)
        .then((response)=>{
            dispatch(createUserInfo());
            history.push('/vendor');
        }) 
    }
}

function getVendorById(id){

    return dispatch => {
        let apiEndpoint = '/employee/'+ id;
        userService.get(apiEndpoint)
        .then((response)=>{
            dispatch(editVendorsDetails(response.data));
        })
    };
}

function onChangeProps(props, event){
    return dispatch =>{
        dispatch(handleOnChangeProps(props, event.target.value));
    }
}

function editVendorInfo(id, payload){
    return dispatch => {
        let apiEndpoint = '/employee/'+ id;
        userService.put(apiEndpoint, payload)
        .then((response)=>{
            dispatch(updatedUserInfo());
            history.push('/vendor');
        }) 
    }
}

function deleteVendorById(id){
    return dispatch => {
        let apiEndpoint = '/employee/'+ id;
        userService.deleteDetail(apiEndpoint)
        .then((response)=>{
            dispatch(deleteVendorsDetails());
            dispatch(vendorAction.getVendor());
        })
    };
}

export function changeVendorsList(vendor){
    return{
        type: "FETECHED_ALL_VENDOR",
        vendor: vendor
    }
}

export function addManagerList(managerList){
    return{
        type: "FETECHED_ALL_MANAGERS",
        managerList: managerList
    }
}

export function handleOnChangeProps(props, value){
    return{
        type: "HANDLE_ON_CHANGE",
        props: props,
        value: value
    }
}

export function editVendorsDetails(vendor){
    return{
        type: "VENDOR_DETAIL",
        id: vendor._id,
        firstName: vendor.firstName,
        lastName: vendor.lastName,
        address: vendor.address,
        city: vendor.city,
        country: vendor.country,
        postalCode: vendor.postalCode,
        status: vendor.status,
        skills: vendor.skills,
        email: vendor.email,
        role: vendor.role,
        manager: vendor.manager,
        password: vendor.password,
        numOfProject: vendor.numOfProject,
        reliability: vendor.reliability,
        createdAt: vendor.createdAt,
        religion: vendor.religion,    
    }
}

export function updatedUserInfo(){
    return{
        type: "USER_UPDATED"
    }
}

export function createUserInfo(){
    return{
        type: "USER_CREATED_SUCCESSFULLY"
    }
}

export function deleteVendorsDetails(){
    return{
        type: "DELETED_VENDOR_DETAILS"
    }
}

export const vendorAction = {
    getVendor,
    getVendorById,
    onChangeProps,
    editVendorInfo,
    createVendor,
    deleteVendorById,
    getManagerList
};