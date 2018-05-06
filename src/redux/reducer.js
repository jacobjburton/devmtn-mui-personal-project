import axios from 'axios';

const initialState =
{
    user: null,
    eventData: {}
}

const GET_USER_INFO = 'GET_USER_INFO',
    GET_EVENT_INFO = 'GET_EVENT_INFO';


export function getUser()
{
    let userData = axios.get('/auth/me').then(res => 
    {
        //console.log(res.data)
        return res.data;
    });
    return (
    {  
        type: GET_USER_INFO,
        payload: userData  
    });
}

// export function getEventData()
// {
//     const db = req.app.get('db');
//     let events = axios.get('/auth/myEvents').then(res =>
//     {
//         return res.data;
//     });
//     return (
//     {
//         type: GET_EVENT_INFO,
//         payload: events
//     });
// }

export default function reducer(state = initialState, action)
{
    switch (action.type)
    {
        case GET_USER_INFO + '_FULFILLED':
            return Object.assign({}, state, {user: action.payload});
        case GET_EVENT_INFO +'_FULFILLED':
            return Object.assign({}, state, {eventData: action.payload});
        default:
            return state;
    }
}