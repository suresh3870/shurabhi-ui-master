import { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import IUser from './types/user.type';

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";

import EventBus from "./common/EventBus";
import MenuList from "./components/menu-user.component";
import Create from './components/customer/Create';
import EditCustomer from './components/customer/Edit';
import USERMGT from './components/USERMGT';
import Order from "./components/order";
import Bill from "./components/Bill";
import Sales from "./components/Sales";
import UserBill from "./components/UserBill";
import FoodOrder from "./components/Order/FoodOrder";
import Nav from "./components/Order/Navbar/Nav";
import Cart from "./components/Order/Cart";
import Shop from "./components/Order/Shop";

type Props = {};

interface Items {
  cartItems: never[];
}


type State = {
  showModeratorBoard: boolean,
  showAdminBoard: boolean,
  showUserBoard: boolean,
  currentUser: IUser | undefined
}

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      showUserBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showUserBoard: user.roles.includes("ROLE_USER"),
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }

    EventBus.on("logout", this.logOut);
  }

  componentWillUnmount() {
    EventBus.remove("logout", this.logOut);
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard,  showUserBoard } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Shurabhi Restaurant
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}
            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/usermgt"} className="nav-link">
                  User Management 
                </Link>
              </li>
            )}
            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/Bill"} className="nav-link">
                  View Bills
                </Link>
              </li>
            )}
            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/Sales"} className="nav-link">
                  Sale Report
                </Link>
              </li>
            )}

            {showUserBoard && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User Board
                </Link>
              </li>
            )}
            {showUserBoard && (
              <li className="nav-item">
                <Link to={"/user-menu"} className="nav-link">
                  View Item
                </Link>
              </li>
            )}
            {showUserBoard && (
              <li className="nav-item">
                <Link to={"/Order2"} className="nav-link">
                  Order
                </Link>
              </li>
            )}
            {showUserBoard && (
              <li className="nav-item">
                <Link to={"/UserBill"} className="nav-link">
                  View Bill
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/cart"} className="nav-link">
                  Cart
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}

        </nav>

        <div className="container mt-3">
        <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route path="/user-menu" component={MenuList} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
            <Route path={'/usermgt'} exact component={USERMGT} />
            <Route path={'/create'} exact component={Create} />
            <Route path={'/edit/:id'} exact component={EditCustomer} />
            <Route path={'/Order'} exact component={Order} />
            <Route path={'/Order2'} exact component={FoodOrder} />
            <Route path={'/Bill'} exact component={Bill} />
            <Route path={'/UserBill'} exact component={UserBill} />
            <Route path={'/Sales'} exact component={Sales} />
            <Route path="/cart" exact component={Cart} >
          
        </Route>
          </Switch>
        </div>

        { /*<AuthVerify logOut={this.logOut}/> */}
      </div>
    );
  }
}


export default App;