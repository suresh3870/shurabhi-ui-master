import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import axios from 'axios';
const NEW_API_URL = 'http://localhost:9990/api/test/';
const UPDATE_USER = 'http://localhost:9990/api/auth/update';


export interface IValues {
    [key: string]: any;
}

export interface IFormState {
    id: number,
    users: any;
    email: any;
    role: any;
    nwpassword: any;
    values: IValues[];
    submitSuccess: boolean;
    loading: boolean;
}

class EditCustomer extends React.Component<RouteComponentProps<any>, IFormState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            users: {},
            values: [],
            nwpassword: "",
            email: "",
            role: "",
            loading: false,
            submitSuccess: false,
        }
    }

    public getauthHeader() {
        const userStr = localStorage.getItem("user");
        let user = null;
        if (userStr)
          user = JSON.parse(userStr);
      
        if (user && user.accessToken) {
           return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
          //return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
        } else {
          return {};
        }
      }
      
    public  getUser() {
        return axios.get(NEW_API_URL + 'getUser?userID=' +this.state.id, { headers: this.getauthHeader() });
      }

      public  updateUser() {
        return axios.post(UPDATE_USER ,{}, { headers: this.getauthHeader() });
      }
    
    
    public componentDidMount(): void {
         this.getUser().then(data => {
            this.setState({ users: data.data });
        })
    }

    private processFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        this.setState({ loading: true });
        const userStr = localStorage.getItem("user");
        let user = null;
        if (userStr)
            user = JSON.parse(userStr);
        //const dt = JSON.stringify({"data":{userid:"14",username:"mskumar1",password:"password",email:"mskumar1@gmail.com",role:"admin"}});
        //{userid:"14",username:"mskumar1",password:"password",email:"mskumar1@gmail.com",role:["admin"]}
        console.log("print state values");
        //console.log(this.state.users.id);
        //console.log(this.state.users.username);
        //console.log(this.state.nwpassword);
        //console.log(this.state.users.id,this.state.users.username,"password",this.state.users.username.email,[this.state.users.username.roles])
        console.log("Calling API...........");
        axios.post(UPDATE_USER, {userid:this.state.users.id,username:this.state.users.username,password:this.state.nwpassword,email:this.state.email,role:[this.state.role]},{ headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + user.accessToken,
          },}).then(data => {
            this.setState({ submitSuccess: true, loading: false })
            setTimeout(() => {
                this.props.history.push('/usermgt');
            }, 1500)
        })
    }


    private setValues = (values: IValues) => {
        this.setState({ values: { ...this.state.values, ...values } });
    }

    private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.setValues({ [e.currentTarget.id]: e.currentTarget.value })
    }
    private handleInputChangespassword = (evt: React.FormEvent<HTMLInputElement> ) => {
        this.setState({nwpassword: evt.currentTarget.value});
    }
    private handleInputChangesemail = (evt: React.FormEvent<HTMLInputElement> ) => {
        this.setState({email: evt.currentTarget.value});
    }
    private handleInputChangesrole = (evt: React.FormEvent<HTMLInputElement> ) => {
        this.setState({role: evt.currentTarget.value});
    }


    public render() {
        const { submitSuccess, loading } = this.state;
        return (
            <div className="App">
                {this.state.users &&
                    <div>
                        < h1 > User List Management App</h1>
                        <div>
                            <div className={"col-md-12 form-wrapper"}>
                                <h2> Edit User </h2>

                                {submitSuccess && (
                                    <div className="alert alert-info" role="alert">
                                        Users's details has been edited successfully </div>
                                )}

                                <form id={"create-post-form"} onSubmit={this.processFormSubmission} noValidate={true}>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="id"> User ID </label>
                                        <input type="text" id="id" defaultValue={this.state.users.id }  disabled onChange={(e) => this.handleInputChanges(e) }   name="User ID" className="form-control" placeholder="Enter User ID" />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="username"> User Name </label>
                                        <input type="text" id="username" defaultValue={this.state.users.username} disabled onChange={(e) => this.handleInputChanges(e)} name="User Name" className="form-control" placeholder="Enter User Name" />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label htmlFor="password"> password </label>
                                        <input type="text" id="password" defaultValue="minimum 6 char" onChange={(evt) => this.handleInputChangespassword(evt)} name="password" className="form-control" placeholder="Enter User password" />
                                    </div>


                                    <div className="form-group col-md-12">
                                        <label htmlFor="email"> Email </label>
                                        <input type="email" id="email" defaultValue="unique email address" onChange={(e) => this.handleInputChangesemail(e)} name="email" className="form-control" placeholder="Enter users's email address" />
                                    </div>

                                    <div className="form-group col-md-12">
                                        <label htmlFor="roles"> Role </label>
                                        <input type="text" id="roles" defaultValue="user OR admin" onChange={(e) => this.handleInputChangesrole(e)} name="roles" className="form-control" placeholder="Enter Users's role" />
                                    </div>

                                    <div className="form-group col-md-4 pull-right">
                                        <button className="btn btn-success" type="submit">
                                            Edit User </button>
                                        {loading &&
                                            <span className="fa fa-circle-o-notch fa-spin" />
                                        }
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default withRouter(EditCustomer)
