const initialState = { anchor: 'left',
    projectList: [],
    employeeList:[],
    skilledEmployeeList: [],
    open: false,
    id: '',
    projectId: '',
    projectName: '',
    startDate: '',
    endDate: '',
    actualCompletionDate: '',
    technology: '',
    allocation: [],
    completionRate: 0
 };


export function project(state = initialState, action) {
    switch (action.type) {
        case 'FETECHED_ALL_PROJECTS':
            return {
            ...state,
            projectList: action.projectList
            };
        case 'FETECHED_EMPLOYEES_BY_SKILL':
            return {
            ...state,
            skilledEmployeeList: action.employeeList
        };
        case 'FETECHED_ALL_EMPLOYEES':
                return {
                    ...state,
                    employeeList: action.employeeList
                };
        case 'PROJECT_DETAIL':
            return {
                ...state,
                ...action,
            };
        case "PROJECT_UPDATED":
            return state;
        case "HANDLE_ON_CHANGE":
            return {
                ...state,
                [action.props]: action.value
            };    
        default:
            return state
    }
  }