import axios from 'axios';

export const FETCH_FILES_REQUEST = 'FETCH_FILES_REQUEST';
export const FETCH_FILES_SUCCESS = 'FETCH_FILES_SUCCESS';
export const FETCH_FILES_FAILURE = 'FETCH_FILES_FAILURE';

axios.defaults.baseURL =  process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

export const fetchFiles = (fileName = '') => {
    return async (dispatch) => {
        dispatch({ type: FETCH_FILES_REQUEST });
        try {
            let url = '/files/data';
            if (fileName) {
                url += `?fileName=${fileName}`;
            }
            const response = await axios.get(url);
            dispatch({ type: FETCH_FILES_SUCCESS, payload: response.data });
        } catch (error) {
            dispatch({ type: FETCH_FILES_FAILURE, error });
        }
    };
};


