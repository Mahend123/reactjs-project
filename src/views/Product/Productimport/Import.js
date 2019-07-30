
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Button } from 'react-bootstrap';
import Pdfsample from './Sample.xls';
import '../../style.css';

class Import extends Component {

  UPLOAD_ENDPOINT1 = "http://localhost/react-demo/crud/UploadImage/uploadexcel";

  constructor(props) {
    super(props);

    this.state = {
      excelfile: undefined,

      id: "",

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImage1 = this.handleImage1.bind(this);
  }

  onResumeClick() {
    window.open(Pdfsample);
  }

  handleChange(event) {

    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleImage1(e) {
    await this.setState({
      excelfile: e.target.files[0],
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

  async handleSubmit(event) {
    event.preventDefault();

    let res1 = await this.uploadFile1(this.state.excelfile);
    let imageName1 = res1.data.name;

    fetch(
      "http://localhost/react-demo/crud/product/excelfile",
      {
        method: "POST",
        body: JSON.stringify({

          imageUrl1: imageName1,

        }),

        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
    ).then(response => {
      if (response.status === 200) {
        this.setState({ successmsga: <div className='alert alert-success'><strong>Success!</strong> Record Saved Successfully..!</div> });
        alert("success")
      }
    });
  }






  render() {
    if (sessionStorage.getItem('data') == null) {
      return (<Redirect to={'/login'} />);
    }
    return (
      <div className="animated fadeIn">
        <div className="card">
          <div className="card-header">
            Import Product
          </div>
          <div className="card-body">
         <div className="col-sm-12 row mainexcel">   
          <div className="col-sm-4">
            <a className="excelsample" onClick={this.onResumeClick}>
              <span>Sample Excel File</span>
            </a>
          </div>
          <div className="col-sm-6">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group row hightdv">
                <div className="col-sm-3">
                  {/* <label htmlFor="file">File Import :</label> */}
                </div>
                {/* <div className="col-sm-8">
                  <input className="excelinput" type="file" onChange={this.handleImage1} />
                </div> */}
                <div class="upload-btn-wrapper">
                  <button class="btnfil">Upload File</button>
                  <input type="file"  name="myfile" onChange={this.handleImage1} />
                </div>
                

              </div>
              <h3 className="textexcel">Choose Microsoft Excel files only</h3>
              <Button className="btnexcel" type="submit" >Submit</Button>
            </form>
            </div>
           </div> 
          </div>
        </div>
      </div>
    );
  }
}

export default Import;
