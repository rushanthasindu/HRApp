const initialState = { anchor: 'left',
    leaveList: [],
    approvalList: [],
    open: false,
    leaveId: '',
    employeeId: '',
    leaveStart: new Date(),
    leaveEnd: '',
    reason: '',
    status: '',
    approvedBy: ''
 };


export function leave(state = initialState, action) {
    switch (action.type) {
        case 'FETECHED_ALL_LEAVES_BY_EMPLOYEE':
            return {
            ...state,
            leaveList: action.leaveList
            };
        case 'FETECHED_ALL_LEAVES_BY_MANAGER':
                return {
                ...state,
                approvalList: action.approvalList
        };
        case 'LEAVE_DETAIL':
            return {
                ...state,
                ...action,
            };
        case "LEAVE_UPDATED":
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