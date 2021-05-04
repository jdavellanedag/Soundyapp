import React from "react";
import { Icon, Image } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import firebase from "../../utils/Firebase";
import UserImage from "../../assets/png/user.png";
import "./TopBar.scss";

const TopBar = ({ user, history }) => {
  const handleGoBack = () => {
    history.goBack();
  };

  const handleLogOut = () => {
    firebase.auth().signOut();
  };

  return (
    <div className="top-bar">
      <div className="top-bar__left">
        <Icon name="angle left" onClick={handleGoBack} />
      </div>
      <div className="top-bar__right">
        <Link to="/settings">
          <Image src={user.photoURL ? user.photoURL : UserImage} />
          {user.displayName}
        </Link>
        <Icon name="power off" onClick={handleLogOut} />
      </div>
    </div>
  );
};

export default withRouter(TopBar);
