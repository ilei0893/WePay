import axios from "axios";

export function getEmployees() {
  return axios.get("http://localhost:3001/employees").then((response) => {
    let group = [];
    response.data.map((list) => {
      console.log(list)
      group.push({
        name: list.Name,
        image: 'https://i1.wp.com/www.natureswaycolonic.co.uk/wp-content/uploads/2018/10/avatar-anonymous-300x300.png',
        salary: list.Salary,
        livingState: list.LivingState
      });
      //=======DOES NOT WORK CURRENTLY=========
      // //flip array so we can show a descending order
      // let temp = [];
      // for(let i = group.length-1; i >= 0; i--){
      //   temp.push(group[i]);
      // }
      // this.setState({
      //   data: temp,
      // });
    });
    return group;
  });
}

// get response from employee table
export function getEmployee(fullName, SSN) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    let data = {
      name: fullName,
      SSN: SSN,
    };

    return axios
      .post("http://localhost:3001/findemployee", data, config)
      .then((response) => {
        this.response = response;
        return this.response;
      });
  }

//get response from employee
export function getBenefits(fullName){
    const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      let data = {
        name: fullName,
      };
  
      return axios
        .post("http://localhost:3001/getemployeebenefit", data, config)
        .then((response) => {
          this.response = response;
          return this.response;
        });
}

export function getEmployeePaychecks(fullName){
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let data = {
    name: fullName,
  };

  return axios
  .post("http://localhost:3001/getEmployeePaychecks", data, config)
  .then((response) => {
    this.response = response;
    return this.response;
  });
}


export function getEmployeeByName(fullName){
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let data = {
    name: fullName,
  };

  return axios
  .post("http://localhost:3001/findemployeebyname", data, config)
  .then((response) => {
    this.response = response;
    return this.response;
  });
}