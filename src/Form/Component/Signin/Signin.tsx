import React from "react";
import { Link, Redirect } from "react-router-dom";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import signup from "../../Assets/Img/signup.png";
// import List from "../ListUser/List";

interface SignInProps {
  name?: any;
  value?: any;
}
interface SignInState {
  email: string;
  password: string;
  errors: {
    email: string;
    password: string;
  };
}
const Regex = RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
);
class SignIn extends React.Component<SignInProps, SignInState> {
  handleChange = (event: any) => {
    event.preventDefault();
    const { name, value } = event.target;
    const { errors } = this.state;
    switch (name) {
      case "email":
        errors.email = Regex.test(value) ? "" : "Email is not valid!";
        this.setState({
          email: value,
        });

        break;
      case "password":
        if (
          !value.match(/\d/)
          || !value.match(/[a-zA-Z]/)
          || value.length < 8
        ) {
          errors.password = "Password must contain at least one letter and one number or must be eight characters long";
        } else {
          errors.password = "";
        }
        this.setState({
          password: value,
        });
        break;
    }
  };

  handleSubmit = (event: any) => {
    event.preventDefault();
    let flagPassword = false;
    let flagEmail = false;
    flagPassword = !(this.state.password.length < 8
      || !this.state.password.match(/\d/)
      || !this.state.password.match(/[a-zA-Z]/));
    flagEmail = !!Regex.test(this.state.email);
    if (flagPassword && flagEmail) {
      // console.log("Login success");
      const data = {
        email: this.state.email,
        password: this.state.password,
      };

      axios
        .post("http://localhost:8000/v1/auth/login", {
          email: data.email,
          password: data.password,
        })
        .then((res) => {
          if (res.status == 200) {
            localStorage.setItem("user", JSON.stringify(res.data.user));
            // console.log(res.data.user.role);
            sessionStorage.setItem("tokens", JSON.stringify(res.data.tokens));
            // Doan nay trong du an thuc te ho se khong xu ly nhu nay, ma ho se dung token de check, nhung minh ga` thi` ta.m nhu na`y truoc
            if (res.data.user.role == "admin") {
              window.location.assign("http://localhost:3000/list");
            } else {
              // Nguoi dung khong co quyen
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const { errors } = this.state;
      console.log("dang nhap that bai");
      errors.password = flagPassword
        ? ""
        : "Password must be eight characters long! or blah lbah";
      errors.email = flagEmail ? "" : "Email is not valid!";
    }
  };

  constructor(props: SignInProps) {
    super(props);
    const initialState = {
      email: "",
      password: "",
      errors: {
        email: "",
        password: "",
      },
    };
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    const { errors } = this.state;
    return (
      <>
        <div className="form-img">
          <img src={signup} alt="logup" />
        </div>
        <div className="form-wrapper">
          <h2>Sign In</h2>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="email">
              <label htmlFor="email">
                <MailOutlined />
                Email
              </label>
              <input type="email" name="email" onChange={this.handleChange} />
              {errors.email.length > 0 && (
              <span>
                *
                {errors.email}
              </span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password">
                <LockOutlined />
                Password
              </label>
              <input
                type="password"
                name="password"
                onChange={this.handleChange}
              />
              {errors.password.length > 0 && (
              <span>
                *
                {errors.password}
              </span>
              )}
            </div>
            <div className="submit">
              <button>Sign In</button>
            </div>
            <p>
              Chưa có tài khoản?
              {" "}
              <Link to="/">Sign Up</Link>
            </p>
          </form>
        </div>
      </>
    );
  }
}
export default SignIn;
