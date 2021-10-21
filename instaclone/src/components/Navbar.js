import React from "react";
import navstyle from "../assets/css/navstyle.css";
import { useDispatch } from "react-redux";
import { actionCreators as userAction } from "../redux/modules/user";
import { HiOutlinePaperAirplane } from "react-icons/hi";
import { BiHeart } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FiPlusSquare } from "react-icons/fi";
import { history } from "../redux/configStore";

const Navbar = () => {
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      <div className="navigation">
        {/* outer wrapper */}
        <div className="box">
          {/* left inner, logo */}
          <div className="nav-logo">
            <a className="no-underline" href="#">
              <img src="img/logo.png" alt="logo" 
              onClick={() => history.push("/")}/>
            </a>
          </div>

          {/* center inner, search bar */}
          <div className="navigation-search-container">
            <i className="fa fa-search"></i>
            <input className="search-field" type="text" placeholder="검색" />
            <div className="search-container">
              <div className="search-container-box">
                <div className="search-results"></div>
              </div>
            </div>
          </div>

          {/* right inner, icons */}
          
          <div className="navigation-icons">
            <a className="navigation-link" onClick={() => history.push("/posting")}>
              <i className="far fa-user-circle">
                <FiPlusSquare />
              </i>
            </a>
            <a id="signout" className="navigation-link">
              <i className="fas fa-sign-out-alt">
                <BiHeart />
              </i>
            </a>
            <a className="navigation-link">
              <i className="far fa-user-circle">
                <HiOutlinePaperAirplane />
              </i>
            </a>

            {/* 유저 프로필 이미지 */}
            <a
              onClick={() => {
                dispatch(userAction.logOutDB());
              }}
              id="signout"
              className="navigation-link"
            >
              <i className="fas fa-sign-out-alt">
                <CgProfile />
              </i>
            </a>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Navbar;
