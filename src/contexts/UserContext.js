import React, { createContext, useReducer, useState } from 'react';
import { initialState, UserReducer } from '../reducers/UserReducer';

export const UserContext = createContext();

export default ({children}) => {
    const [state, dispatch] = useReducer(UserReducer, initialState);

    return (
        <UserContext.Provider value={{state, dispatch}}>
            {children}
        </UserContext.Provider>
    );
}