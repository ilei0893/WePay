import axios from "axios";
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