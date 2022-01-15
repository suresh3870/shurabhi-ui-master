import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import UserService from "../services/user.service";

interface IState {
    users: any[];
}

export default class USERMGT extends React.Component<RouteComponentProps, IState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = { users: [] }
    }

    public componentDidMount(): void {
        UserService.getAllUsers().then(
            response => {
              this.setState({
                users: response.data
              });
            })
            
    }

    public deleteCustomer(id: number) {
        UserService.deleteUser(id).then(data => {
            const index = this.state.users.findIndex(customer => customer.id === id);
            this.state.users.splice(index, 1);
            this.props.history.push('/usermgt');
        })
    }

    public render() {
        const users = this.state.users;
        return (
            <div>
                <h1 style={{textAlign:"center"}}>User Management</h1>
                <h3 style={{textAlign:"right"}}> <Link to={'/register'}> Create User </Link></h3>
                 {users.length === 0 && (
                    <div className="text-center">
                        <h2>No customer found at the moment</h2>
                    </div>
                )}

                <div className="container">
                    <div className="row">
                        <table className="table table-bordered">
                            <thead className="thead-light">
                                <tr>
                                    <th style={{textAlign:"center"}} scope="col">ID</th>
                                    <th style={{textAlign:"center"}} scope="col">User Name</th>                            
                                    <th style={{textAlign:"center"}} scope="col">Email</th>
                                    <th style={{textAlign:"center"}} scope="col">Role</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users && users.map(customer =>
                                    <tr style={{textAlign:"center"}} key={customer.id}>
                                        <td style={{textAlign:"center"}}>{customer.id}</td>
                                        <td style={{textAlign:"center"}}>{customer.username}</td>
                                        <td style={{textAlign:"center"}}>{customer.email}</td>
                                        <td style={{textAlign:"center"}}>{customer.roles[0].name}</td>                               
                                        <td>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="btn-group" style={{ marginBottom: "20px" }}>
                                                    <Link style={{textAlign:"center"}} to={`edit/${customer.id}`} className="btn btn-sm btn-outline-secondary">Edit Customer </Link>
                                                    <button style={{textAlign:"center"}} className="btn btn-sm btn-outline-secondary" onClick={() => this.deleteCustomer(customer.id)}>Delete Customer</button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        )
    }
}
