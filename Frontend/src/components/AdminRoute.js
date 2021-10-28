/* eslint-disable no-useless-rename */
import React from 'react'
import {Route, Redirect} from 'react-router-dom'

const AdminRoute= ({ isAdmin: isAuth, component: Component, ...rest}) => {
    return (
        <Route 
        {...rest}
        render={(props) => {
            if (isAuth === true) {
                return <Component /> ;
            } else {
                return (
                    <Redirect to ="/admin" />
                );
            }
        }}
        />
    );
}

export default AdminRoute
