import { ConnectedRouter } from "connected-react-router";
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { history } from "../redux/configStore";
import PostList from "../pages/PostList";
import Users from "../pages/Users";
import Login from "../pages/Login";
import Favicon from "react-favicon";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import Navbar from "../components/Navbar";
import Posting from "../pages/Posting";


const App = () => {
  const dispatch = useDispatch();

  const is_login = document.cookie;

  // React.useEffect(() => {
  //   dispatch(userActions.loginCheckDB());
  // }, []);

  if (!is_login) {
    return (
      <ConnectedRouter history={history}>
        <Favicon url="img/2000px-instagram_logo_2016svg-2000x2000.png" />
        <Navbar />
        <Route path="/login/" exact component={Login}></Route>
        <Route path="/" exact component={PostList} />
        <Route path="/register/" exact component={Users}></Route>
        <Route path="/posting/" exact component={Posting}></Route>
        {/* <Redirect to="/login" /> */}
      </ConnectedRouter>
    );
  }

  return (
    <>
      <ConnectedRouter history={history}>
        <Favicon url="img/2000px-instagram_logo_2016svg-2000x2000.png" />
        <Navbar />
        <Route path="/" exact component={PostList} />
        <Route path="/posting/" exact component={Posting}></Route>
        <Route path="/login/" exact component={Login}></Route>
        <Route path="/register/" exact component={Users}></Route>
      </ConnectedRouter>
    </>
  );
};

export default App;
