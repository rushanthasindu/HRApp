
let auth =  localStorage.getItem('auth');
const initialState = auth ? { 
  loggedIn: true, 
  auth, 
  userId: localStorage.getItem('userId'),
  userRole: localStorage.getItem('userRole')
} : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        loggingIn: true,
        auth: action.auth,
        userId: action.userInfo._id,
        userRole: action.userInfo.role,
      };
      case 'APPLICATION_ERROR':
        return {
          error: true,
          errorMessage: action.err,
        }; 
    case 'LOGOUT_SUCCESS':
      return {
        auth: false
      };
    default:
      return state
  }
}