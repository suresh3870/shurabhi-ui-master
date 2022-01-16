import { Component } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";


type Props = {};

type State = {
  content: [];
}

export default class MenuList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      content: []
    };
  }

  componentDidMount() {
    UserService.getItem().then(
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
      <h2>Menu List</h2>
      <table className="table table-bordered">
          <thead>
          <tr>
              <th style={{textAlign:"center"}}>Menu Id</th>
              <th style={{textAlign:"center"}}>Item</th>
              <th style={{textAlign:"center"}}>Price</th>
          </tr>
          </thead>
          <tbody>
          {products.map((item)=>
        <tr>
       <td style={{textAlign:"center"}}>{item["menuId"]} </td>
       <td style={{textAlign:"center"}}>{item["item"]} </td>
       <td style={{textAlign:"center"}}>{item["price"]} </td>
       </tr>
       )}              
          </tbody>
      </table>
  </div>
)
}
}
