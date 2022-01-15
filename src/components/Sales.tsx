import { Component } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

type Props = {};

type State = {
  content: [];
}

export default class Sales extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      content: []
    };
  }

  componentDidMount() {
    UserService.getSales().then(
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
              <th style={{textAlign:"center"}}>Month</th>
              <th style={{textAlign:"center"}}>Year</th>
              <th style={{textAlign:"center"}}>Total Amount</th>
              
          </tr>
          </thead>
          <tbody>
          {products.map((item)=>
        <tr>
       <td style={{textAlign:"center"}}>{item["month"]} </td>
       <td style={{textAlign:"center"}}>{item["day"]} </td>
       <td style={{textAlign:"center"}}>{item["amount"]} </td>
       </tr>
       )}              
          </tbody>
      </table>
  </div>
)
}
}
