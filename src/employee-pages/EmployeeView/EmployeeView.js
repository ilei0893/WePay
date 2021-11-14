import React, { Component } from 'react'
import {EmployeeTable} from '../../employee-components'

export default class EmployeeView extends Component {
    render() {
        return (
            <div>
                <EmployeeTable />
            </div>
        )
    }
}
