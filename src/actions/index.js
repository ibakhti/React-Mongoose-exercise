import axios from '../config/axios'
import cookies from 'universal-cookie'

const cookie = new cookies()

export const onRegister = (name, age, email, password) => {
    return dispatch => {
        axios.post('/users', {
                name, age, email, password
        }).then(res => {
            console.log("YEaaaayyy");
            
        }).catch(e => {
            console.log(e.response.data.replace('User validation failed: ', ''));
        })
    }
}

export const onLogin = (email, password) => {
    return async dispatch => {
        try {
            const res = await axios.post('/users/login', {email, password})
            // console.log(res);
            
            cookie.set('masihLogin', res.data.name, {path:'/'})
            cookie.set('idLogin', res.data._id, {path:'/'})

            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: {
                    id: res.data._id , name: res.data.name, age: res.data.age
                }
            })
            
        } catch (e) {
            console.log(e);
            
        }
    }
    
}

export const keepLogin = _id => {
    return async dispatch => {
        try {
            const res = await axios.post('/users/login/cookie', {_id})

            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: {
                    id: res.data._id,
                    name: res.data.name,
                    age: res.data.age
                }
            })
        } catch (e) {
            console.log('Error from action keeplogin: ' + e)
        }
    }
}

export const onLogout = () => {
    cookie.remove('masihLogin')
    cookie.remove('idLogin')

    return {
        type: 'LOGOUT_SUCCESS'
    }

}

export const onEditAccount = (id, name, age) => {
    return async (dispatch) => {
        try {
            const res = await axios.put('/users/update', {
                id, name, age
            })

            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: {
                    id: res.data._id , name: res.data.name, age: res.data.age
                }
            })
        } catch (error) {
            console.log('error from action onEditAccount ' + error)
        }
    }
}