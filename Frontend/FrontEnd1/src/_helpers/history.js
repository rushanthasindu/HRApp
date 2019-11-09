import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export const getFormattedEmployeeList = (employees, allocation) => {
    return allocation.map(employeeId => {
        const filtered = employees.filter(employee => employee._id === employeeId);
        const actualEmployee = filtered[0];
        return actualEmployee? `${actualEmployee.firstName} ${actualEmployee.lastName}` : 'N/A';
    })
}