import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { emptyStatement, isEmptyStatement } from "@babel/types";
import Pdfsample from './bill.pdf';
import "../style.css";

class Pdf extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            user_id: "",
            address: "",
            telephone: "",
            gstno: "",
            bankdetail: "",
            acno: "",
            ifsc: "",
            branch: "",
            distributor: "",
            terms: "",
            errors: {},
           

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    onResumeClick() {
        window.open(Pdfsample);
      }


    handleChange(event) {
        this.testVarible = JSON.parse(sessionStorage.getItem('data'));
        this.state.user_id = (this.testVarible.data.id);
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleValidation() {
        let errors = {};
        let formIsValid = true;
        //console.log(this.state);

        if (!this.state.address) {
            formIsValid = false;
            errors["address"] = "*Please enter address ";
          } 

          if (!this.state.telephone) {
            formIsValid = false;
            errors["telephone"] = "*Please enter Telephone No";
          } else {
            if (!this.state.telephone.match(/^[0-9]{10}$/)) {
              formIsValid = false;
              errors["telephone"] = "*Please enter only 10 digit";
            }
          }

          if (!this.state.gstno) {
            formIsValid = false;
            errors["gstno"] = "*Please enter GST number ";
          }   

          if (!this.state.bankdetail) {
            formIsValid = false;
            errors["bankdetail"] = "*Please enter bank detail ";
          }   

          if (!this.state.acno) {
            formIsValid = false;
            errors["acno"] = "*Please enter account number";
          } else {
            if (!this.state.acno.match(/^[0-9]/)) {
              formIsValid = false;
              errors["acno"] = "*Please enter only digit";
            }
          }

          if (!this.state.ifsc) {
            formIsValid = false;
            errors["ifsc"] = "*Please enter IFSC code ";
          } 
          
          if (!this.state.branch) {
            formIsValid = false;
            errors["branch"] = "*Please enter branch ";
          }
          
          if (!this.state.distributor) {
            formIsValid = false;
            errors["distributor"] = "*Please enter distributor name";
          } 
          if (!this.state.terms) {
            formIsValid = false;
            errors["terms"] = "*Please enter Terms & Conditions";
          } 
          

        this.setState({ errors: errors });
        return formIsValid;
      }
        

    async  componentDidMount() {
        this.testVarible = JSON.parse(sessionStorage.getItem('data'));
        const user_id = (this.testVarible.data.id);

        fetch('http://localhost/react-demo/crud/product/pdfpage?user_id=' + user_id)
            .then(response => {
                return response.json();

            }).then(result => {

                this.setState({
                    id: result.id,
                    user_id: result.user_id,
                    address: result.address,
                    telephone: result.telephone,
                    gstno: result.gstno,
                    bankdetail: result.bankdetail,
                    acno: result.acno,
                    ifsc: result.ifsc,
                    branch: result.branch,
                    distributor: result.distributor,
                    terms: result.terms,
                });
            });
    }

    handleSubmit = async (event) => {

        this.setState({
            successmsga: true
          });
      
          setTimeout(() => {
            this.setState({
              successmsga: false
            });
          }, 2500);
          
        event.preventDefault();

        // alert(this.state.id +
        //     this.state.user_id +
        //     this.state.address +
        //     this.state.telephone +
        //     this.state.gstno +
        //     this.state.bankdetail +
        //     this.state.acno +
        //     this.state.ifsc +
        //     this.state.branch +
        //     this.state.distributor +
        //     this.state.terms )
        if (this.handleValidation()) {   
        var checkid = this.state.id;

        if (checkid != null) {

            fetch('http://localhost/react-demo/crud/product/update_pdfpage', {
                method: 'PUT',
                body: JSON.stringify({
                    id: this.state.id,
                    user_id: this.state.user_id,
                    address: this.state.address,
                    telephone: this.state.telephone,
                    gstno: this.state.gstno,
                    bankdetail: this.state.bankdetail,
                    acno: this.state.acno,
                    ifsc: this.state.ifsc,
                    branch: this.state.branch,
                    distributor: this.state.distributor,
                    terms: this.state.terms,

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
        } else {
            fetch(
                "http://localhost/react-demo/crud/product/add_pdfpage",
                {
                    method: "POST",
                    body: JSON.stringify({
                        id: this.state.id,
                        user_id: this.state.user_id,
                        address: this.state.address,
                        telephone: this.state.telephone,
                        gstno: this.state.gstno,
                        bankdetail: this.state.bankdetail,
                        acno: this.state.acno,
                        ifsc: this.state.ifsc,
                        branch: this.state.branch,
                        distributor: this.state.distributor,
                        terms: this.state.terms,
                    }),

                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                }
            ).then(response => {
                if (response.status === 200) {
                     this.setState({ successmsga: <div className='alert alert-success'><strong>Success!</strong> Your Product Add successfully..!</div> });
                    
                }
                if (response.status === 500) {
                    alert("Try again...?");
                }
            });
        }
    } 
    }

    render() {
        if (sessionStorage.getItem('data') == null) {
            return (<Redirect to={'/login'} />);
        }
        return (
            <div className="animated fadeIn">
                <div className="card">
                    <div className="card-header">
                        Generate PDF
                        <a className="sample" onClick={this.onResumeClick}>
                           <span>Sample PDF</span> 
                        </a>
          </div>
         
                    <div className="card-body">
                    <div>{this.state.successmsga}</div>
                        <form onSubmit={this.handleSubmit}>

                            <div className="form-group row">
                                {/* <div className="col-sm-2">
                                    <label htmlFor="id">Id:</label>
                                </div> */}
                                <div className="col-sm-6">
                                    <input
                                        type="hidden"
                                        name="id"
                                        value={this.state.id}
                                        onChange={this.handleChange}
                                        placeholder="Enter id"
                                        className="form-control"
                                        id="id"
                                    />
                                </div>
                            </div>


                            <div className="form-group row">
                                {/* <div className="col-sm-2">
                                    <label htmlFor="user_id">User_id:</label>
                                </div> */}
                                <div className="col-sm-6">
                                    <input
                                        type="hidden"
                                        name="user_id"
                                        value={this.state.user_id}
                                        onChange={this.handleChange}
                                        placeholder="Enter user_id"
                                        className="form-control"
                                        id="user_id"
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-sm-2">
                                    <label htmlFor="address">Address:</label>
                                </div>
                                <div className="col-sm-6">
                                    <input
                                        type="text"
                                        name="address"
                                        value={this.state.address}
                                        onChange={this.handleChange}
                                        className="form-control"
                                        id="address"
                                        placeholder="Enter Address"
                                    />
                                </div>
                                <div className="errorMsg">{this.state.errors["address"]}</div>
                            </div>

                            <div className="form-group row">
                                <div className="col-sm-2">
                                    <label htmlFor="telephone">Telephone:</label>
                                </div>
                                <div className="col-sm-6">
                                    <input
                                        type="text"
                                        name="telephone"
                                        value={this.state.telephone}
                                        onChange={this.handleChange}
                                        className="form-control"
                                        id="telephone"
                                        placeholder="Enter Telephone Number"
                                    />
                                </div>
                                <div className="errorMsg">{this.state.errors["telephone"]}</div>
                            </div>

                            <div className="form-group row">
                                <div className="col-sm-2">
                                    <label htmlFor="gstno">	GST Number:</label>
                                </div>
                                <div className="col-sm-6">
                                    <input
                                        type="text"
                                        name="gstno"
                                        value={this.state.gstno}
                                        onChange={this.handleChange}
                                        className="form-control"
                                        id="gstno"
                                        placeholder="Enter GST Number"
                                    />
                                </div>
                                <div className="errorMsg">{this.state.errors["gstno"]}</div>
                            </div>

                            <div className="form-group row">
                                <div className="col-sm-2">
                                    <label htmlFor="bankdetail">Bank Detail:</label>
                                </div>
                                <div className="col-sm-6">
                                    <input
                                        type="text"
                                        name="bankdetail"
                                        value={this.state.bankdetail}
                                        onChange={this.handleChange}
                                        className="form-control"
                                        id="bankdetail"
                                        placeholder="Enter Bank Name"
                                    />
                                </div>
                                <div className="errorMsg">{this.state.errors["bankdetail"]}</div>
                            </div>



                            <div className="form-group row">
                                <div className="col-sm-2">
                                    <label htmlFor="acno">Account Number:</label>
                                </div>
                                <div className="col-sm-6">
                                    <input
                                        type="text"
                                        name="acno"
                                        value={this.state.acno}
                                        onChange={this.handleChange}
                                        className="form-control"
                                        id="acno"
                                        placeholder="Enter Account Number"

                                    />
                                </div>
                                <div className="errorMsg">{this.state.errors["acno"]}</div>
                            </div>

                            <div className="form-group row">
                                <div className="col-sm-2">
                                    <label htmlFor="ifsc">IFSC Code:</label>
                                </div>
                                <div className="col-sm-6">
                                    <input
                                        type="text"
                                        value={this.state.ifsc}
                                        onChange={this.handleChange}
                                        className="form-control"
                                        id="ifsc"
                                        placeholder="Enter IFSC Code"
                                        name="ifsc" />
                                </div>
                                <div className="errorMsg">{this.state.errors["ifsc"]}</div>
                            </div>

                            <div className="form-group row">
                                <div className="col-sm-2">
                                    <label htmlFor="branch">Branch:</label>
                                </div>
                                <div className="col-sm-6">
                                    <input
                                        type="text"
                                        value={this.state.branch}
                                        onChange={this.handleChange}
                                        className="form-control"
                                        id="branch"
                                        placeholder="Enter Branch"
                                        name="branch" />
                                </div>
                                <div className="errorMsg">{this.state.errors["branch"]}</div>
                            </div>


                            <div className="form-group row">
                                <div className="col-sm-2">
                                    <label htmlFor="distributor">Auth. Distributor:</label>
                                </div>
                                <div className="col-sm-6">
                                    <input
                                        type="text"
                                        value={this.state.distributor}
                                        onChange={this.handleChange}
                                        className="form-control"
                                        id="distributor"
                                        placeholder="Enter Distributor Name"
                                        name="distributor" />
                                </div>
                                <div className="errorMsg">{this.state.errors["distributor"]}</div>
                            </div>



                            <div className="form-group row">
                                <div className="col-sm-2">
                                    <label htmlFor="terms">Terms & Conditions:</label>
                                </div>
                                <div className="col-sm-6">
                                    <textarea rows="3" cols="50"
                                        type="text"
                                        value={this.state.terms}
                                        onChange={this.handleChange}
                                        className="form-control"
                                        id="terms"
                                        placeholder="Enter Terms & Conditions"
                                        name="terms" />
                                </div>
                                <div className="errorMsg">{this.state.errors["terms"]}</div>
                            </div>

                            <Button type="submit" >Submit</Button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Pdf;
