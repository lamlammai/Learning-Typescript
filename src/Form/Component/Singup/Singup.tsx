import React from "react";
import "./Style.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import signup from "../../Assets/Img/signup.png";
import Cookies from "universal-cookie";
const cookies = new Cookies();
interface SignUpProps {
  name?: any;
  value?: any;
}
interface SignUpState {
  name: string;
  email: string;
  password: string;
  errors: {
    name: string;
    email: string;
    password: string;
  };
}
const Regex = RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
class SignUp extends React.Component<SignUpProps, SignUpState> {
  handleChange = (event: any) => {
    event.preventDefault();
    const { name, value } = event.target;
    const { errors } = this.state;
    switch (name) {
      case "name":
        errors.name = value.length < 5 ? "name must be 5 characters long!" : "";
        this.setState({
          name: value,
        });
        break;
      case "email":
        errors.email = Regex.test(value) ? "" : "Email is not valid!";
        this.setState({
          email: value,
        });
        break;
      case "password":
        if (
          !value.match(/\d/) ||
          !value.match(/[a-zA-Z]/) ||
          value.length < 8
        ) {
          errors.password =
            "Password must contain at least one letter and one number or must be eight characters long";
        } else {
          errors.password = "";
        }
        this.setState({
          password: value,
        });
        break;
      default:
        break;
    }

    // console.log(value);
  };

  handleSubmit = (event: any) => {
    event.preventDefault();
    // console.log(this.state);
    let flagname = false;
    let flagPassword = false;
    let flagEmail = false;
    flagname = !(this.state.name.length < 5);
    flagPassword = !(
      this.state.password.length < 8 ||
      !this.state.password.match(/\d/) ||
      !this.state.password.match(/[a-zA-Z]/)
    );
    flagEmail = !!Regex.test(this.state.email);

    if (flagname && flagPassword && flagEmail) {
      // console.log("Login success");
      const data = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      };
      axios
        .post("http://localhost:8000/v1/auth/register", {
          name: data.name,
          email: data.email,
          password: data.password,
        })
        .then((res) => {
          if (res.status == 201) {
            // console.log(res.data);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            // console.log(res.data.user.role);
            cookies.set(
              "access_token",
              JSON.stringify(res.data.tokens.access.token)
            );
            cookies.set(
              "refresh_token",
              JSON.stringify(res.data.tokens.refresh.token)
            );
            window.location.assign("http://localhost:3000/list");
          }
        })
        .catch((err) => {
          if (err.code == 400) {
            alert("Tr??ng email");
          }
        });
    } else {
      const { errors } = this.state;
      errors.name = flagname ? "" : "name must be 5 characters long!";
      errors.password = flagPassword
        ? ""
        : "Password must be eight characters long! or blah lbah";
      errors.email = flagEmail ? "" : "Email is not valid!";
    }
    // console.log(this.state);
  };

  constructor(props: SignUpProps) {
    super(props);
    const initialState = {
      name: "",
      email: "",
      password: "",
      errors: {
        name: "",
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
          <h2>Sign Up</h2>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="username">
              <label htmlFor="name">
                <UserOutlined />
                Full Name
              </label>
              <input type="text" name="name" onChange={this.handleChange} />
              {errors.name.length > 0 && <span>*{errors.name}</span>}
            </div>
            <div className="email">
              <label htmlFor="email">
                <MailOutlined />
                Email
              </label>
              <input type="email" name="email" onChange={this.handleChange} />
              {errors.email.length > 0 && <span>*{errors.email}</span>}
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
              {errors.password.length > 0 && <span>*{errors.password}</span>}
            </div>
            <div className="submit">
              <button type="submit">Sign Up</button>
            </div>
            <p>
              ???? c?? t??i kho???n? <Link to="/signin">Sign In</Link>
            </p>
          </form>
        </div>
      </>
    );
  }
}
export default SignUp;
