// dependencies
import React from 'react';
import FacebookLogin from 'react-facebook-login';


const Login = ({ getUserInfo }) => {

  const componentClicked = () => {
    console.log("Button is clicked")

  }

  const responseFacebook = (response) => {
    // console.log(response)

    if (response.accessToken) {
      let { accessToken, name, email, id } = response
      let userInfo = { accessToken, name, email, id }
      getUserInfo(userInfo)
    }
  }


  return (
    <div className="facebook-button">
      <FacebookLogin
        appId="781703812199034"
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook}
        icon="fa fa-facebook" />
    </div>
  );
};


export default Login;