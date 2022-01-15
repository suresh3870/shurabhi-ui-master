import { Component } from "react";
import * as React from 'react';

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

type Props = {};

type State = {
  content: [];
  sum: number;
}

export default class Order extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      content: [],
      sum:0
    };
  }

  public deleteCustomer() {
   
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

  public getRowValue(id: any) {
    console.log("value of ID");
    console.log(id);
    var el : any = (document.getElementById("tabId")) as HTMLTableRowElement;
    console.log(el);
    var index = el.rowIndex;
    console.log(el.rowIndex);
    
}


  render() {
    const  products  = this.state.content;
    return(
      
      <div className="container">
      <h2>Order List</h2>

      <br></br>
      <table id="tabId"  className="table table-bordered table-hover">
          <thead>
          <tr id="header">
              <th style={{textAlign:"center"}}>Menu Id</th>
              <th style={{textAlign:"center"}}>Item</th>
              <th style={{textAlign:"center"}}>Price</th>
              <th style={{textAlign:"center"}}>Quantity</th>
              <th style={{textAlign:"center"}}>Select</th>
          </tr>
          </thead>
          <tbody>
          {products.map((item)=>
        <tr id={item["menuId"]}>
       <td style={{textAlign:"center"}}>{item["menuId"]} </td>
       <td style={{textAlign:"center"}}>{item["item"]} </td>
       <td style={{textAlign:"center"}}>{item["price"]} </td>
       <td>
            <select style={{textAlign:"center"}} id="select">
              <option value="0">0 </option>
              <option value="1">1 </option>
              <option value="2"> 2</option>
              <option value="3"> 3</option>
              <option value="4"> 4</option>
              <option value="5"> 5</option>
            </select>                                    
           </td>
           
        <input type="checkbox" onChange={(evt) => this.getRowValue(evt)}    />
    
       </tr>
       )}              
          </tbody>
      </table>
      <p style={{textAlign: "right"}}>Totale: ALL</p>
      <br></br>
      <br></br>
      <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block">Order</button>
                  </div>
  </div>
)
}
}
