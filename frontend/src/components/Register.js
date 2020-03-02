import React from "react";
import axios from "axios";
import headers from "../lib/headers";
import Select from "react-select";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class Register extends React.Component {
  state = {
    data: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      gender: "",
      height: 100,
      weight: 30,
      dob: new Date()
    }
  };

  numberIncrease = (start, stop, step) => {
    return Array.from(
      { length: (stop - start) / step + 1 },
      (_, i) => start + i * step
    );
  };

  heightOpitons = this.numberIncrease(100, 200, 1);
  weightOptions = this.numberIncrease(30, 150, 1);

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    const data = { ...this.state.data, [name]: value };
    this.setState({ data });
  };

  handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("/api/register/", this.state.data, headers);
      this.props.history.push("/api/login/");
    } catch (error) {
      console.log(error.response);
    }
  };

  render() {
    return (
      <>
        <section className="section">
          <div className="container">
            <div className="columns is-mobile is-centered">
              <div className="column is-6 is-offset-3">
                <form onSubmit={this.handleSubmit}>
                  <h2>Create your account</h2>
                  <div>
                    <input
                      className="input"
                      onChange={this.handleChange}
                      placeholder="username"
                      name="username"
                      required
                    />
                  </div>
                  <div>
                    <input
                      className="input"
                      onChange={this.handleChange}
                      type="email"
                      placeholder="email"
                      name="email"
                      required
                    />
                  </div>
                  <div>
                    <input
                      className="input"
                      onChange={this.handleChange}
                      type="password"
                      placeholder="password"
                      name="password"
                      required
                    />
                  </div>
                  <div>
                    <input
                      className="input"
                      onChange={this.handleChange}
                      type="password"
                      placeholder="confirm password"
                      name="password_confirmation"
                      required
                    />
                  </div>
                  <div>
                    <h2>Tell us a little bit about yourself</h2>
                  </div>
                  <div className="control">
                    <label className="label">Gender</label>
                    <label className="radio">
                      <input
                        type="radio"
                        name="gender"
                        value="M"
                        onChange={this.handleChange}
                      />
                      Male
                    </label>
                    <label className="radio">
                      <input
                        type="radio"
                        name="gender"
                        value="F"
                        onChange={this.handleChange}
                      />
                      Female
                    </label>

                    <div className="field">
                      <label className="label">Height</label>
                      <div className="control">
                        <Select
                          options={this.heightOpitons}
                          onChange={this.handleChange}
                          name="height"
                          className="basic-multi-select"
                          classNamePrefix="select"
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Weight</label>
                      <div className="control">
                        <Select
                          options={this.heightOpitons}
                          onChange={this.handleChange}
                          name="weight"
                          className="basic-multi-select"
                          classNamePrefix="select"
                        />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Date of Birth</label>
                      <div className="control">
                        <DatePicker
                          selected={this.state.startDate}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      className="button is-primary is-fullwidth"
                      type="submit"
                    >
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Register;
