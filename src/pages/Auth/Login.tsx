import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate} from "react-router-dom";
import handHR from '../../assets/images/handHR.png';


const Login = () => {

  const { login } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  useEffect(() =>
  {
    if(localStorage.getItem('user-info'))
    {
      navigate("/dashboard");
    }
  }, [])

  const onLogin = async () => {
  login({ email, password });
  navigate("/dashboard");

  };

  return (
    <div className="auth-container row w-100 mx-0 auth-page">
      <div className="col-md-8 col-xl-6 mx-auto">
        <div className="card">
          <div className="row">
            <div className="col-md-4 pe-md-0">
              <div
                className="auth-side-wrapper"
                style={{ backgroundImage: `url(${handHR})` }}
              ></div>
            </div>
            <div className="col-md-8 ps-md-0">
              <div className="auth-form-wrapper px-4 py-5">
                <a href="." className="nobleui-logo d-block mb-2">
                  At Hand<span> HR</span>
                </a>
                <h5 className="text-muted fw-normal mb-4">Log in to your account.</h5>
                <form className="forms-sample">
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      placeholder="Type your email"
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
                      placeholder="Type your password"
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
                    <button type="submit" className="btn btn-primary me-2 mb-2 mb-md-0" onClick={onLogin}>
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
