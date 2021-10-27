import React from "react";
import { Card, Image, Table } from "react-bootstrap";

import placeholder from "../../assets/image-placeholder.jpg";

export default function EmployeeTable() {
  let group = [];
  for (let i = 0; i < 10; i++) {
    group.push(
      <tr>
        <td align="center">
          <Image src={placeholder} width="50px" height="50px" roundedCircle />
        </td>
        <td>Domingo, Giselle</td>
        <td> SUBMITTED</td>
        <td> Resume, Info, etc.</td>
      </tr>
    );
  }
  return (
    <Card>
      <Table hover>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Submission Status</th>
            <th> Documents</th>
          </tr>
        </thead>
        <tbody>{group}</tbody>
      </Table>
    </Card>
  );
}
