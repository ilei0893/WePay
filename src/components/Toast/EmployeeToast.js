import React, {useState} from 'react'
import { Toast } from "react-bootstrap";
export default function EmployeeToast(props) {
    return (
        <Toast
        position="top-end"
        className="p-3"
        onClose={props.closeToast}
        show={props.isEditSubmitted}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <img
            src="holder.js/20x20?text=%20"
            className="rounded me-2"
            alt=""
          />
          <strong className="me-auto">Edit Successful</strong>
        </Toast.Header>
        <Toast.Body>Employee has been successfully updated!</Toast.Body>
      </Toast>
    )
}
