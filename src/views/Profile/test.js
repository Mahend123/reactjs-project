import React, { Component } from "react";
import csc from "country-state-city";
import Select from "react-select";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isCountrySelected: false,
      isStateSelected: false,
      countries: null,
      states: null,
      cities: null
    };
  }

  componentDidMount() {
    let countries = [];
    countries = csc.getAllCountries().map(country => {
      return { value: country.id, label: country.name };
    });
    
    this.setState({
      countries
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
    console.log("selectedOptionCity", selectedOptionCity);
    alert(selectedOptionCity.label)
  };

  handleChangeCountry = selectedOptionCountry => {
    this.setState({isCountrySelected: true });
    this.updateState(selectedOptionCountry.value);
        let countryvalue = selectedOptionCountry.label;
    alert(countryvalue)
  };

  handleChangeState = selectedOptionState => {
    this.setState({isStateSelected: true });
    this.upadteCities(selectedOptionState.value);
     let statevalue  =  selectedOptionState.label;
     alert(statevalue)
    };

  renderStates = () => {
    //getStatesOfCountry
  };

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            <label htmlFor="country">Select Country</label>
            <Select
              onChange={this.handleChangeCountry}
              options={this.state.countries}
              placeholder="Select country"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="states">States</label>
            <Select
              onChange={this.handleChangeState}
              options={this.state.states}
              isDisabled={!this.state.isCountrySelected}
              placeholder="Select States"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="cities">Cities</label>
            <Select
              onChange={this.handleChangeCity}
              options={this.state.cities}
              isDisabled={!this.state.isStateSelected}
              placeholder="Select Cities"
            />
          </div>
        </div>
      </div>
    );
  }
}









// import React, { Component } from "react";
// import { Link, Redirect } from "react-router-dom";
// import { Button } from 'react-bootstrap';
// // import $ from 'jquery';
// // import csc from 'country-state-city';
// import "../style.css";
// import axios from "axios";
// import csc from "country-state-city";
// import Select from "react-select";



// class Profile extends Component {

//   UPLOAD_ENDPOINT1 = "http://localhost/react-demo/crud/UploadImage/profile_image";


//   constructor (props) {
//     super(props);
//     this.state = { 
//       id: "",
//       name: "",
//       mobile: "",
//       shopName: "",
//       email: "",
//       password: "",
//       cpwd: "",
//       address: "",
//       image1: undefined,
//       isCountrySelected: false,
//       isStateSelected: false,
//       countries: null,
//       states: null,
//       cities: null,
      
      


//      };
//      this.handleChange = this.handleChange.bind(this);
//      this.handleSubmit = this.handleSubmit.bind(this);

//      this.handleImage1 = this.handleImage1.bind(this);
     
//   }


//   handleChange(event) {
//     console.log(event)
//     this.setState({
//         [event.target.name]: event.target.value,
        
       
//     });
// }
 
// async handleImage1(e) {
//   await this.setState({
//     image1: e.target.files[0],
//   });
// }

// async uploadFile1(file){
//   const formData = new FormData();  
//   formData.append("avatar", file);
//   return await axios.post(this.UPLOAD_ENDPOINT1, formData, {
//     headers: {
//       "content-type": "multipart/form-data"
//     }
//   });
// }

//   async  componentDidMount() {

//     let countries = [];
//     countries = csc.getAllCountries().map(country => {
//       return { value: country.id, label: country.name };
//     });
    
//     this.setState({
//       countries
//     });


//     this.testVarible = JSON.parse(sessionStorage.getItem('data'));
//     const id = (this.testVarible.data.id);


//     fetch('http://localhost/react-demo/crud/user/userprofile?id=' + id)
//     .then(response => {
//         return response.json();

//     }).then(result => {
//            // console.log(result)
//         this.setState({
//             id: result.id,
//             name: result.name,
//             mobile: result.mobile,
//             shopName: result.shopName,
//             email: result.email,
//             image1: result.image1,
//         });
//     });
//   }

//   upadteCities = stateID => {
//     let cities = [];
//     cities = csc.getCitiesOfState(stateID).map(city => {
//       return { value: city.id, label: city.name };
//     });
//     this.setState({
//       cities
//     });
//   };

//   updateState = countryID => {
//     let states = [];
//     states = csc.getStatesOfCountry(countryID).map(state => {
//       return { value: state.id, label: state.name };
//     });
//     this.setState({
//       states
//     });
//   };

//   handleChangeCity = selectedOptionCity => {
//     //console.log("selectedOptionCity", selectedOptionCity);
     
//     };

//   handleChangeCountry = selectedOptionCountry => {
//     this.setState({isCountrySelected: true });
//     this.updateState(selectedOptionCountry.value);
    
//   };

//   handleChangeState = selectedOptionState => {
//     this.setState({isStateSelected: true });
//     this.upadteCities(selectedOptionState.value);
          
          
//   };

//   renderStates = () => {
//     //getStatesOfCountry
//   };

 
// handleSubmit = async (event) => {
                  
//     event.preventDefault();


//            // alert(this.state.countries)
//                 // alert(
//                 //   this.state.countries+
//                 //   this.state.states+
//                 //   this.state.cities
//                 // )
                
                       
//                 let res1 = await this.uploadFile1(this.state.image1);
//                 let imageName1 = res1.data.name;

//         fetch('http://localhost/react-demo/crud/user/update_userprofile', {
//             method: 'PUT',
//             body: JSON.stringify({
//                 id: this.state.id,
//                 name: this.state.name ,
//                 mobile: this.state.mobile ,
//                 shopName: this.state.shopName ,
//                 email: this.state.email ,
//                 password: this.state.password ,
//                 address: this.state.address,
//                 imageUrl1: imageName1,
//             }),
//             headers: {
//                 "Content-type": "application/json; charset=UTF-8"
//             }
//         }).then(response => {
//             if (response.status === 200) {
//                 this.setState({ successmsga: <div className='alert alert-success'><strong>Success!</strong> Your Update successfully..!</div> });
//                 alert("Success")
//               }
//             if (response.status === 500) {
//                 alert("Try again...?");
//             }
//         });
//     }

   

  
//   render() {
//     if (sessionStorage.getItem('data') == null) {
//       return (<Redirect to={'/login'} />);
//     }
           

//     return (

      
//       <div className="animated fadeIn">
//         <div className="card">
//           <div className="card-header">Profile Page</div>
//           <div className="card-body">

//             <form onSubmit={this.handleSubmit}>
//               <div className="row">
//                 <div className="col-sm-3">
                      
//                     <div className="profiledv">
//                     <img className="profileimagecls" src={"http://localhost/react-demo/crud/uploads/"+ this.state.image1} />
//                     </div>
//                     <input type="file"  onChange={this.handleImage1} />
//               </div>
//                 <div className="col-sm-9 row" >
//                   <div className="col-sm-6">

//                   <div className="form-group row">
//                       <div className="col-sm-4">
//                         <label htmlFor="id">Id :</label>
//                       </div>
//                       <div className="col-sm-8">
//                         <input
//                           type="text"
//                           name="id"
//                            value={this.state.id}
//                           onChange={this.handleChange}
//                           placeholder="Enter Id"
//                           className="form-control"
//                           id="id"
//                         />
//                       </div>
//                     </div>


//                     <div className="form-group row">
//                       <div className="col-sm-4">
//                         <label htmlFor="name">Name :</label>
//                       </div>
//                       <div className="col-sm-8">
//                         <input
//                           type="text"
//                           name="name"
//                           value={this.state.name}
//                           onChange={this.handleChange}
//                           placeholder="Enter name"
//                           className="form-control"
//                           id="name"
//                         />
//                       </div>
//                     </div>

//                     <div className="form-group row">
//                       <div className="col-sm-4">
//                         <label htmlFor="mobile">Mobile No :</label>
//                       </div>
//                       <div className="col-sm-8">
//                         <input
//                           type="text"
//                           name="mobile"
//                           value={this.state.mobile}
//                           onChange={this.handleChange}
//                           placeholder="Enter Mobile Number"
//                           className="form-control"
//                           id="mobile"
//                         />
//                       </div>
//                     </div>
                    
//                     <div className="form-group row">
//                       <div className="col-sm-4">
//                         <label htmlFor="password">Change Password :</label>
//                       </div>
//                       <div className="col-sm-8">
//                         <input
//                           type="text"
//                           name="password"
//                           value={this.state.password}
//                           onChange={this.handleChange}
//                           placeholder="Enter Password"
//                           className="form-control"
//                           id="password"
//                         />
//                       </div>
//                     </div>

//                     <div className="form-group row">
//                       <div className="col-sm-4">
//                         <label htmlFor="cpwd">Confirm Password :</label>
//                       </div>
//                       <div className="col-sm-8">
//                         <input
//                           type="text"
//                           name="cpwd"
//                           value={this.state.cpwd}
//                           onChange={this.handleChange}
//                           placeholder="Enter Confirm Password"
//                           className="form-control"
//                           id="cpwd"
//                         />
//                       </div>
//                     </div>

//                     <div className="form-group row">
//                       <div className="col-sm-4">
//                         <label htmlFor="address">Address :</label>
//                       </div>
//                       <div className="col-sm-8">
//                       <textarea className="form-control" rows="3" id="address"
//                       type="text"
//                       name="address"
//                       value={this.state.address}
//                        onChange={this.handleChange}

//                        placeholder="Enter Address"
//                       ></textarea>
//                       </div>
//                     </div>
                    


//                   </div>
//                   <div className="col-sm-6">
//                     <div className="form-group row">
//                       <div className="col-sm-4">
//                         <label htmlFor="shopName">Company Name:</label>
//                       </div>
//                       <div className="col-sm-8">
//                         <input
//                           type="text"
//                           name="shopName"
//                           value={this.state.shopName}
//                           onChange={this.handleChange}
//                           placeholder="Enter shopName"
//                           className="form-control"
//                           id="shopName"
//                         />
//                       </div>
//                     </div>

//                     <div className="form-group row">
//                       <div className="col-sm-4">
//                         <label htmlFor="email">Email Id:</label>
//                       </div>
//                       <div className="col-sm-8">
//                         <input
//                           type="text"
//                           name="email"
//                           value={this.state.email}
//                           onChange={this.handleChange}
//                           placeholder="Enter email"
//                           className="form-control"
//                           id="email"
//                         />
//                       </div>
//                     </div>

//                     <div className="form-group row">
//                       <div className="col-sm-4">
//                         <label htmlFor="country">Country :</label>
//                       </div>
//                       <div className="col-sm-8">
//                       <Select
//                         onChange={this.handleChangeCountry}
//                         options={this.state.countries}
                        
//                         onSelect={this.handleChange}
//                         placeholder="Select country"
                        
//                       />
//                       </div>
//                     </div>

//                     <div className="form-group row">
//                       <div className="col-sm-4">
//                         <label htmlFor="states">States :</label>
//                       </div>
//                       <div className="col-sm-8">
//                       <Select
//                         onChange={this.handleChangeState}
//                         options={this.state.states}
//                         isDisabled={!this.state.isCountrySelected}
//                         onSelect={this.handleChange}
//                         placeholder="Select States"
                       
                        
//                       />
//                       </div>
//                     </div>

//                     <div className="form-group row">
//                       <div className="col-sm-4">
//                         <label htmlFor="cities" >Cities :</label>
//                       </div>
//                       <div className="col-sm-8">
//                       <Select
//                         onChange={this.handleChangeCity}
//                         options={this.state.cities}
//                         isDisabled={!this.state.isStateSelected}
//                         placeholder="Select Cities"
//                         onSelect={this.handleChange}
                       
//                       />
//                       </div>
//                     </div>

//                   </div>
//                 </div>
//               </div>
//               <Button type="submit" >Submit</Button>
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default Profile;








































// one by on country state city

// import React, { Component } from "react";
// import { Link, Redirect } from "react-router-dom";
// import { Button } from 'react-bootstrap';
// import "../style.css";
// import axios from "axios";
// import csc from "country-state-city";
// import Select from "react-select";



// class Profile extends Component {



//   constructor (props) {
//     super(props);
//     this.state = {
//       isCountrySelected: false,
//       isStateSelected: false,
//       countries: null,
//       selected: {
//         state: "",
//         country: "",
//         city: ""
//       },
//       states: null,
//       cities: null,
//       name: "",
      
     
//     };
   
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange = (event) =>{ 
//         alert(event.target.value)
//     this.setState({
//       [event.target.name]: event.target.value,
//   });
//   }


//   componentDidMount() {
//     let countries = [];
//     countries = csc.getAllCountries().map(country => {
//       return { value: country.id, label: country.name };
//     });
      
//     this.setState({
//       countries
//     });
//   }

//   upadteCities = stateID => {
//     let cities = [];
//     cities = csc.getCitiesOfState(stateID).map(city => {
//       return { value: city.id, label: city.name };
//     });
//     this.setState({
//       cities
//     });
//   };

//   updateState = countryID => {
//     let states = [];
//     states = csc.getStatesOfCountry(countryID).map(state => {
//       return { value: state.id, label: state.name };
//     });
//     this.setState({
//       states
//     });
//   };

//   handleChangeCity = selectedOptionCity => {
//     let currentSelected = this.state.selected;
//     currentSelected.city = selectedOptionCity.label;

//     this.setState({
//       selected: currentSelected
//     });
//   };

//   handleChangeCountry = selectedOptionCountry => {
//     this.setState({ isCountrySelected: true });
//     this.updateState(selectedOptionCountry.value);

//     let currentSelected = this.state.selected;
//     currentSelected.country = selectedOptionCountry.label;

//     this.setState({
//       selected: currentSelected
//     });
//   };

//   handleChangeState = selectedOptionState => {
//     this.setState({ isStateSelected: true });
//     this.upadteCities(selectedOptionState.value);

//     let currentSelected = this.state.selected;
//     currentSelected.state = selectedOptionState.label;

//     this.setState({
//       selected: currentSelected
//     });
//   };

//   renderStates = () => {
//     //getStatesOfCountry
//   };

//    handleSubmit = async event => {
//     event.preventDefault();
//        let allvalue = this.state.selected;
       
//        console.log(allvalue['country'])
//        console.log(allvalue['state'])
//        console.log(allvalue['city'])
//   };


//   render() {
//     if (sessionStorage.getItem('data') == null) {
//       return (<Redirect to={'/login'} />);
//     }
    
//     return (
//       <div className="container mt-5">
//         <form onSubmit={this.handleSubmit}>
//         <div className="row">

          

//         <div className="form-group row">
//                        <div className="col-sm-4">
//                          <label htmlFor="name">Name :</label>
//                        </div>
//                        <div className="col-sm-8">
//                          <input
//                            type="text"
//                            name="name"
//                            value={this.state.name}
//                            onChange={this.handleChange}
//                            placeholder="Enter name"
//                            className="form-control"
//                            id="name"
//                          />
//                        </div>
//                      </div>




//           <div className="col-md-4">
//             <label htmlFor="country">Select Country</label>
//             <Select
//               onChange={this.handleChangeCountry}
//               options={this.state.countries}
//               onSelect={this.handleChange}
//               placeholder="Select country"
//               name="countries"
            
//             />
//           </div>
//           <div className="col-md-4">
//             <label htmlFor="states">States</label>
//             <Select
//               onChange={(this.handleChangeState)}
              
//               options={this.state.states}
//               isDisabled={!this.state.isCountrySelected}
//               placeholder="Select States"
//               name="states"
//               onSelect={this.handleChange}
//             />
//           </div>
//           <div className="col-md-4">
//             <label htmlFor="cities">Cities</label>
//             <Select
//               onChange={(this.handleChangeCity)}
//               options={this.state.cities}
//               isDisabled={!this.state.isStateSelected}
//               placeholder="Select Cities"
//               name="cities"
//               onSelect={this.handleChange}
//             />
//           </div>
//         </div>
//         <Button type="submit" >Submit</Button>
//         </form> 
//       </div>
//     );
//   }
// }

// export default Profile;