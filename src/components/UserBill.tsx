import { Component } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import AuthService from "../services/auth.service";
type Props = {};

type State = {
  content: [];
}

export default class UserBill extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      content: []
    };
  }

  getCurrentUserName() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    console.log("current user is"+currentUser.username);
    UserService.getmybill(currentUser.username).then(
        response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }

  render() {
    const  products  = this.state.content;
    return(
      
      <div className="container">
      <h2>Bill List</h2>
      <table className="table table-bordered">
          <thead>
          <tr>
              <th style={{textAlign:"center"}}>Bill ID</th>
              <th style={{textAlign:"center"}}>UserName</th>
              <th style={{textAlign:"center"}}>Bill Date</th>
              <th style={{textAlign:"center"}}>Bill Amount</th>
          </tr>
          </thead>
          <tbody>
          {products.map((item)=>
        <tr>
       <td style={{textAlign:"center"}}>{item["bill_ID"]} </td>
       <td style={{textAlign:"center"}}>{item["username"]} </td>
       <td style={{textAlign:"center"}}>{item["bill_DATE"]} </td>
       <td style={{textAlign:"center"}}>{item["bill_AMOUNT"]} </td>
       </tr>
       )}              
          </tbody>
      </table>
  </div>
)
}
}
