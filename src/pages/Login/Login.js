import React from 'react'
import {Login as LoginComponent} from "../../components"
import PropTypes from "prop-types"; //USE NPM UPDATE IF U DONT HAVE THISSSS

export default function Login({setToken}) {
    return (
        <div>
            <LoginComponent setToken={setToken}/>
        </div>
    )
}
  