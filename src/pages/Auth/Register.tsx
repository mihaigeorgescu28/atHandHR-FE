import React, { useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuthContext();

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onRegister = () => {
    if (username?.length && email?.length && password?.length) {
      login({ username, email, password });
      navigate("/dashboard");
    }
  };

  return (
    <div className="auth-container row w-100 mx-0 auth-page">
      <div className="col-md-8 col-xl-6 mx-auto">
        <div className="card">
          <div className="row">
            <div className="col-md-4 pe-md-0">
              <div
                className="auth-side-wrapper"
                style={{ backgroundImage: "url(https://via.placeholder.com/219x452)" }}
              ></div>
            </div>
            <div className="col-md-8 ps-md-0">
              <div className="auth-form-wrapper px-4 py-5">
                <a href="." className="nobleui-logo d-block mb-2">
                  Noble<span>UI</span>
                </a>
                <h5 className="text-muted fw-normal mb-4">Create a free account.</h5>
                <form className="forms-sample">
                  <div className="mb-3">
                    <label htmlFor="exampleInputUsername1" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputUsername1"
                      autoComplete="Username"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                      autoComplete="current-password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-check mb-3">
                    <input type="checkbox" className="form-check-input" id="authCheck" />
                    <label className="form-check-label" htmlFor="authCheck">
                      Remember me
                    </label>
                  </div>
                  <div>
                    <button type="submit" className="btn btn-primary me-2 mb-2 mb-md-0" onClick={onRegister}>
                      Sign up
                    </button>
                    <button type="button" className="btn btn-outline-primary btn-icon-text mb-2 mb-md-0">
                      <i className="feather icon-twitter btn-icon-prepend"></i>
                      Sign up with twitter
                    </button>
                  </div>
                  <a href="/auth/login" className="d-block mt-3 text-muted">
                    Already a user? Sign in
                  </a>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
