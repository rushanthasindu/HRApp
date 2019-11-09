const initialState = { anchor: 'left',
    vendor: [],
    managerList:[],
    open: false,
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    status: '',
    skills: [],
    email: '',
    role: '',
    manager: '',
    password: '',
    numOfProject: 0,
    reliability: 0,
    createdAt: new Date(),
 };


export function vendor(state = initialState, action) {
    switch (action.type) {
        case 'FETECHED_ALL_VENDOR':
            return {
            ...state,
            vendor: action.vendor
            };
        case 'FETECHED_ALL_MANAGERS':
            return {
            ...state,
            managerList: action.managerList
        };
        case 'VENDOR_DETAIL':
            return {
                ...state,
                ...action,
            };
        case "USER_UPDATED":
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