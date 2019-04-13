const init = {
    id: '',
    name: ''
}

export default (state = init, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {...state, id: action.payload.id, name: action.payload.name}
        
        case 'LOGOUT_SUCCESS':
            return {...state, id: '', name: ''}
    
        default:
            return state
    }
}