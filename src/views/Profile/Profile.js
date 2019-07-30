import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Button } from 'react-bootstrap';
import "../style.css";
import axios from "axios";
import csc from "country-state-city";
import Select from "react-select";



class Profile extends Component {

  UPLOAD_ENDPOINT1 = "http://localhost/react-demo/crud/UploadImage/profile_image";

  UPLOAD_ENDPOINT2 = "http://localhost/react-demo/crud/UploadImage/logo_image";


  constructor(props) {
    super(props);
    this.state = {
      isCountrySelected: false,
      isStateSelected: false,
      countries: null,
      selected: {
        state: "",
        country: "",
        city: ""
      },
      states: null,
      cities: null,


      id: "",
      name: "",
      mobile: "",
      shopName: "",
      email: "",
      password: "",
      cpwd: "",
      address: "",
      image1: undefined,
      image2: undefined,
      errors: {},

    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImage1 = this.handleImage1.bind(this);
    this.handleImage2 = this.handleImage2.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }


  async handleImage1(e) {
    await this.setState({
      image1: e.target.files[0],
    });
  }

  async handleImage2(e) {
    await this.setState({
      image2: e.target.files[0],
    });
  }

  async uploadFile1(file) {
    const formData = new FormData();
    formData.append("avatar", file);
    return await axios.post(this.UPLOAD_ENDPOINT1, formData, {
      headers: {
        "content-type": "multipart/form-data"
      }
    });
  }

  async uploadFile2(file) {
    const formData = new FormData();
    formData.append("avatar", file);
    return await axios.post(this.UPLOAD_ENDPOINT2, formData, {
      headers: {
        "content-type": "multipart/form-data"
      }
    });
  }

  componentDidMount() {
    let countries = [];
    countries = csc.getAllCountries().map(country => {
      return { value: country.id, label: country.name };
    });

    this.setState({
      countries
    });

    this.testVarible = JSON.parse(sessionStorage.getItem('data'));
    const id = (this.testVarible.data.id);

    fetch('http://localhost/react-demo/crud/user/userprofile?id=' + id)
      .then(response => {
        return response.json();

      }).then(result => {
        //console.log(result)
        this.setState({
          id: result.id,
          name: result.name,
          mobile: result.mobile,
          shopName: result.shopName,
          email: result.email,
          image1: result.image1,
          image2: result.image2,
          address: result.address,
          country: result.country,
          state: result.state,
          city: result.city
        });
      });
  }

  upadteCities = stateID => {
    let cities = [];
    cities = csc.getCitiesOfState(stateID).map(city => {
      return { value: city.id, label: city.name };
    });
    this.setState({
      cities
    });
  };

  updateState = countryID => {
    let states = [];
    states = csc.getStatesOfCountry(countryID).map(state => {
      return { value: state.id, label: state.name };
    });
    this.setState({
      states
    });
  };

  handleChangeCity = selectedOptionCity => {
    let currentSelected = this.state.selected;
    currentSelected.city = selectedOptionCity.label;

    this.setState({
      selected: currentSelected
    });
  };

  handleChangeCountry = selectedOptionCountry => {
    this.setState({ isCountrySelected: true });
    this.updateState(selectedOptionCountry.value);

    let currentSelected = this.state.selected;
    currentSelected.country = selectedOptionCountry.label;

    this.setState({
      selected: currentSelected
    });
  };

  handleChangeState = selectedOptionState => {
    this.setState({ isStateSelected: true });
    this.upadteCities(selectedOptionState.value);

    let currentSelected = this.state.selected;
    currentSelected.state = selectedOptionState.label;

    this.setState({
      selected: currentSelected
    });
  };

  renderStates = () => {
    //getStatesOfCountry
  };

  handleValidation() {
    let errors = {};
    let formIsValid = true;

    if (!this.state.name) {
      formIsValid = false;
      document.getElementById('name').style.borderColor = "red";
      document.getElementById("name").style.boxShadow = "0.1px 0.1px 1px 1px red";
    } else {
      if (!this.state.name.match(/^[a-zA-Z ]+$/)) {
        formIsValid = false;
        document.getElementById('name').style.borderColor = "#db7318";
        document.getElementById("name").style.boxShadow = "0.1px 0.1px 1px 1px #db7318";
      } else {
        document.getElementById('name').style.borderColor = "green";
        document.getElementById("name").style.boxShadow = "0.1px 0.1px 1px 1px green";
      }
    }

    if (!this.state.mobile) {
      formIsValid = false;
      document.getElementById('mobile').style.borderColor = "red";
      document.getElementById("mobile").style.boxShadow = "0.1px 0.1px 1px 1px red";
    }
    else {
      if (!this.state.mobile.match(/^\d{10}$/)) {
        formIsValid = false;
        document.getElementById('mobile').style.borderColor = "#db7318";
        document.getElementById("mobile").style.boxShadow = "0.1px 0.1px 1px 1px #db7318";
      } else {
        document.getElementById('mobile').style.borderColor = "green";
        document.getElementById("mobile").style.boxShadow = "0.1px 0.1px 1px 1px green";
      }
    }

    // if(!this.state.password){
    //   formIsValid = false;
    //   document.getElementById('password').style.borderColor= "red";
    //   document.getElementById("password").style.boxShadow = "0.1px 0.1px 1px 1px red";
    // }

    if (!this.state.password) {
      // formIsValid = false;
      // document.getElementById('cpwd').style.borderColor= "red";
      // document.getElementById("cpwd").style.boxShadow = "0.1px 0.1px 1px 1px red";
    // } else {
      if (this.state.password !== this.state.cpwd) {
        formIsValid = false;
        document.getElementById('cpwd').style.borderColor = "#db7318";
        document.getElementById("cpwd").style.boxShadow = "0.1px 0.1px 1px 1px #db7318";
      }
    }

    if (!this.state.address) {
      formIsValid = false;
      document.getElementById('address').style.borderColor = "red";
      document.getElementById("address").style.boxShadow = "0.1px 0.1px 1px 1px red";
    } else {
      document.getElementById('address').style.borderColor = "green";
      document.getElementById("address").style.boxShadow = "0.1px 0.1px 1px 1px green";
    }

    if (!this.state.shopName) {
      formIsValid = false;
      document.getElementById('shopName').style.borderColor = "red";
      document.getElementById("shopName").style.boxShadow = "0.1px 0.1px 1px 1px red";
    } else {
      document.getElementById('shopName').style.borderColor = "green";
      document.getElementById("shopName").style.boxShadow = "0.1px 0.1px 1px 1px green";
    }


    if (!this.state.email) {
      formIsValid = false;
      document.getElementById('email').style.borderColor = "red";
      document.getElementById("email").style.boxShadow = "0.1px 0.1px 1px 1px red";
    }
    else {
      if (!this.state.email.match(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/)) {
        formIsValid = false;
        document.getElementById('email').style.borderColor = "#db7318";
        document.getElementById("email").style.boxShadow = "0.1px 0.1px 1px 1px #db7318";
      } else {
        document.getElementById('email').style.borderColor = "green";
        document.getElementById("email").style.boxShadow = "0.1px 0.1px 1px 1px green";
      }
    }




    this.setState({ errors: errors })
    return formIsValid;
  }

  handleSubmit = async event => {

    this.setState({
      successmsga: true
    });
    setTimeout(() => {
      this.setState({
        successmsga: false
      });
    }, 2500);

    event.preventDefault();
    let allvalue = this.state.selected;

    let country = (allvalue['country']);
    let state = (allvalue['state']);
    let city = (allvalue['city']);
    //  alert(
    //   this.state.id  +
    //   this.state.name +
    //   this.state.mobile +
    //   this.state.shopName +
    //   this.state.email +
    //   this.state.password +
    //   this.state.address +
    //   country+
    //   state+
    //   city 
    //  )

    let res1 = await this.uploadFile1(this.state.image1);
    let imageName1 = res1.data.name;

    let res2 = await this.uploadFile2(this.state.image2);
    let imageName2 = res2.data.name;


    //alert(imageName1)

    if (this.handleValidation()) {

      fetch('http://localhost/react-demo/crud/user/update_userprofile', {
        method: 'PUT',
        body: JSON.stringify({
          id: this.state.id,
          name: this.state.name,
          mobile: this.state.mobile,
          shopName: this.state.shopName,
          email: this.state.email,
          password: this.state.password,
          address: this.state.address,
          imageUrl1: imageName1,
          imageUrl2: imageName2,
          country: country,
          state: state,
          city: city
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }).then(response => {
        if (response.status === 200) {
          this.setState({ successmsga: <div className='alert alert-success'><strong>Success!</strong> Your Update successfully..!</div> });

        }
        if (response.status === 500) {
          alert("Try again...?");
        }
      });
    }
  }


  render() {
    if (sessionStorage.getItem('data') == null) {
      return (<Redirect to={'/login'} />);
    }

    return (


      <div className="animated fadeIn">
        <div className="card">
          <div className="card-header"><b> MIKE MORROW </b></div>
          <div className="card-body">

            <form onSubmit={this.handleSubmit}>
              <div>{this.state.successmsga}</div>
              <div className="row">
                <div className="col-sm-4">
                  <b>Upload Your Profile Picture</b> <br /><br />
                  <div className="profiledv">

                    <img className="profileimagecls" src={"http://localhost/react-demo/crud/uploads/" + (this.state.image1)} />
                  </div>  <br />
                  <input type="file" onChange={this.handleImage1} />
                  <br /><br />
                  <b>Upload Your Company Logo</b> <br />
                  <div className="profiledv">

                    <img className="profileimagecls" src={"http://localhost/react-demo/crud/uploads/" + (this.state.image2)} />
                  </div>  <br />
                  <input type="file" onChange={this.handleImage2} />
                </div>
                <div className="col-sm-8 row" >
                  <div className="form-group row">
                    {/* <div className="col-sm-4">
                        <label htmlFor="id">Id :</label>
                      </div> */}
                    <div className="col-sm-8">
                      <input
                        type="hidden"
                        name="id"
                        value={this.state.id}
                        onChange={this.handleChange}
                        placeholder="Enter Id"
                        className="form-control"
                        id="id"
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">

                    <div className="form-group row">
                      <div className="col-sm-4">
                        <label htmlFor="name">Name :</label>
                      </div>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          name="name"
                          value={this.state.name}
                          onChange={this.handleChange}
                          placeholder="Enter name"
                          className="form-control"
                          id="name"
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-sm-4">
                        <label htmlFor="mobile">Mobile No :</label>
                      </div>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          name="mobile"
                          value={this.state.mobile}
                          onChange={this.handleChange}
                          placeholder="Enter Mobile Number"
                          className="form-control"
                          id="mobile"
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-sm-4">
                        <label htmlFor="password">Change Password :</label>
                      </div>
                      <div className="col-sm-8">
                        <input
                          type="password"
                          name="password"
                          value={this.state.password}
                          onChange={this.handleChange}
                          placeholder="Enter Password"
                          className="form-control"
                          id="password"
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-sm-4">
                        <label htmlFor="cpwd">Confirm Password :</label>
                      </div>
                      <div className="col-sm-8">
                        <input
                          type="password"
                          name="cpwd"
                          value={this.state.cpwd}
                          onChange={this.handleChange}
                          placeholder="Enter Confirm Password"
                          className="form-control"
                          id="cpwd"
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-sm-4">
                        <label htmlFor="address">Address :</label>
                      </div>
                      <div className="col-sm-8">
                        <textarea className="form-control" rows="3" id="address"
                          type="text"
                          name="address"
                          value={this.state.address}
                          onChange={this.handleChange}

                          placeholder="Enter Address"
                        ></textarea>
                      </div>
                    </div>



                  </div>
                  <div className="col-sm-6">
                    <div className="form-group row">
                      <div className="col-sm-4">
                        <label htmlFor="shopName">Company Name:</label>
                      </div>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          name="shopName"
                          value={this.state.shopName}
                          onChange={this.handleChange}
                          placeholder="Enter shopName"
                          className="form-control"
                          id="shopName"
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-sm-4">
                        <label htmlFor="email">Email Id:</label>
                      </div>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          name="email"
                          value={this.state.email}
                          onChange={this.handleChange}
                          placeholder="Enter email"
                          className="form-control"
                          id="email"
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-sm-4">
                        <label htmlFor="country">Country :</label>
                      </div>
                      <div className="col-sm-8">
                        <Select
                          onChange={this.handleChangeCountry}
                          options={this.state.countries}
                          onSelect={this.handleChange}
                          placeholder="Select country"
                          name="countries"
                          id="countries"
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-sm-4">
                        <label htmlFor="states">States :</label>
                      </div>
                      <div className="col-sm-8">
                        <Select
                          onChange={(this.handleChangeState)}

                          options={this.state.states}
                          isDisabled={!this.state.isCountrySelected}
                          placeholder="Select States"
                          name="states"
                          onSelect={this.handleChange}
                        />
                      </div>
                    </div>

                    <div className="form-group row">
                      <div className="col-sm-4">
                        <label htmlFor="cities" >Cities :</label>
                      </div>
                      <div className="col-sm-8">
                        <Select
                          onChange={(this.handleChangeCity)}
                          options={this.state.cities}
                          isDisabled={!this.state.isStateSelected}
                          placeholder="Select Cities"
                          name="cities"
                          onSelect={this.handleChange}
                        />
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <Button className="profilebtn" type="submit" >Submit</Button>
            </form>
          </div>
        </div>
      </div>

    );
  }
}

export default Profile;