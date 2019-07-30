
import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { Button } from 'react-bootstrap';

import '../style.css';



class Deal extends Component {

  UPLOAD_ENDPOINT1 = "http://localhost/react-demo/crud/UploadImage/image_upload1";

  UPLOAD_ENDPOINT2 = "http://localhost/react-demo/crud/UploadImage/image_upload2";

  UPLOAD_ENDPOINT3 = "http://localhost/react-demo/crud/UploadImage/image_upload3";

  UPLOAD_ENDPOINT4 = "http://localhost/react-demo/crud/UploadImage/image_upload4";

  UPLOAD_ENDPOINT5 = "http://localhost/react-demo/crud/UploadImage/image_upload5";

  UPLOAD_ENDPOINT6 = "http://localhost/react-demo/crud/UploadImage/image_upload6";

  constructor(props){
    super(props);

    this.state={
      deal1: undefined,
      deal2: undefined,
      deal3: undefined,
      deal4: undefined,
      deal5: undefined,
      deal6: undefined,
      id: "",
      user_id: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
   
    this.handleImage1 = this.handleImage1.bind(this);
    this.handleImage2 = this.handleImage2.bind(this);
    this.handleImage3 = this.handleImage3.bind(this);
    this.handleImage4 = this.handleImage4.bind(this);
    this.handleImage5 = this.handleImage5.bind(this);
    this.handleImage6 = this.handleImage6.bind(this);

  }

  handleChange(event) {
   
    this.setState({
        [event.target.name]: event.target.value
    });
}


  async handleImage1(e) {
    await this.setState({
      deal1: e.target.files[0],
    });
  }

  async handleImage2(e) {
    await this.setState({
      deal2: e.target.files[0],
    });
  }
  
  async handleImage3(e) {
    await this.setState({
      deal3: e.target.files[0],
    });
  }

  async handleImage4(e) {
    await this.setState({
      deal4: e.target.files[0],
    });
  }

  async handleImage5(e) {
    await this.setState({
      deal5: e.target.files[0],
    });
  }

  async handleImage6(e) {
    await this.setState({
      deal6: e.target.files[0],
    });
  }

  async uploadFile1(file){
    const formData = new FormData();  
    formData.append("avatar", file);
    return await axios.post(this.UPLOAD_ENDPOINT1, formData, {
      headers: {
        "content-type": "multipart/form-data"
      }
    });
  }

  async uploadFile2(file){
    const formData = new FormData();  
    formData.append("avatar", file);
    return await axios.post(this.UPLOAD_ENDPOINT2, formData, {
      headers: {
        "content-type": "multipart/form-data"
      }
    });
  }

  async uploadFile3(file){
    const formData = new FormData();  
    formData.append("avatar", file);
    return await axios.post(this.UPLOAD_ENDPOINT3, formData, {
      headers: {
        "content-type": "multipart/form-data"
      }
    });
  }

  async uploadFile4(file){
    const formData = new FormData();  
    formData.append("avatar", file);
    return await axios.post(this.UPLOAD_ENDPOINT4, formData, {
      headers: {
        "content-type": "multipart/form-data"
      }
    });
  }

  async uploadFile5(file){
    const formData = new FormData();  
    formData.append("avatar", file);
    return await axios.post(this.UPLOAD_ENDPOINT5, formData, {
      headers: {
        "content-type": "multipart/form-data"
      }
    });
  }

  async uploadFile6(file){
    const formData = new FormData();  
    formData.append("avatar", file);
    return await axios.post(this.UPLOAD_ENDPOINT6, formData, {
      headers: {
        "content-type": "multipart/form-data"
      }
    });
  }


  async  componentDidMount() {
    this.testVarible = JSON.parse(sessionStorage.getItem('data'));
    const user_id = (this.testVarible.data.id);
      
    fetch('http://localhost/react-demo/crud/product/photo?user_id=' + user_id)
            .then(response => {
                return response.json();

            }).then(result => {
                    //console.log(result)
                this.setState({
                    id: result.id,
                    user_id: result.user_id,
                    deal1: result.deal1,
                    deal2: result.deal2,
                    deal3: result.deal3,
                    deal4: result.deal4,
                    deal5: result.deal5,
                    deal6: result.deal6
                });
            });
  }  



  async handleSubmit(event){

    this.setState({
      successmsga: true
    });

    setTimeout(() => {
      this.setState({
        successmsga: false
      });
    }, 2500);

    event.preventDefault();

    this.testVarible = JSON.parse(sessionStorage.getItem('data'));
    const userid = (this.testVarible.data.id);
    
    let res1 = await this.uploadFile1(this.state.deal1);
    let imageName1 = res1.data.name;

    let res2 = await this.uploadFile2(this.state.deal2);
    let imageName2 = res2.data.name;
    
    let res3 = await this.uploadFile3(this.state.deal3);
    let imageName3 = res3.data.name;

    let res4 = await this.uploadFile4(this.state.deal4);
    let imageName4 = res4.data.name;

    let res5 = await this.uploadFile5(this.state.deal5);
    let imageName5 = res5.data.name;

    let res6 = await this.uploadFile6(this.state.deal6);
    let imageName6 = res6.data.name;

              var checkid = this.state.id;
            if( checkid != null ){
              
              fetch('http://localhost/react-demo/crud/product/update_photos', {
                method: 'PUT',
                body: JSON.stringify({
                    id: checkid,
                    user_id: this.state.user_id,
                    imageUrl1: imageName1,
                    imageUrl2: imageName2,
                    imageUrl3: imageName3,
                    imageUrl4: imageName4,
                    imageUrl5: imageName5,
                    imageUrl6: imageName6

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

            }else{
    fetch(
      "http://localhost/react-demo/crud/product/add_photos",
      {
        method: "POST",
        body: JSON.stringify({
          user_id : userid,
          imageUrl1: imageName1,
          imageUrl2: imageName2,
          imageUrl3: imageName3,
          imageUrl4: imageName4,
          imageUrl5: imageName5,
          imageUrl6: imageName6
        }),

        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }
    ).then(response => {
      if (response.status === 200) {
        this.setState({ successmsga: <div className='alert alert-success'><strong>Success!</strong> Record Saved Successfully..!</div> });
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
          <div className="card-header">Deal In</div>

          <div className="card-body">
          <div>{this.state.successmsga}</div>
            <form className="frmclss" onSubmit={this.handleSubmit}>

            
            <input type="hidden" name="id" value={this.state.id}  onChange={this.handleChange} />         
            <input type="hidden" name="user_id" value={this.state.user_id}  onChange={this.handleChange} />

           
              <div className="form-group row hightdv">
                <div className="col-sm-2">
                  <label htmlFor="deal1">Deals1 :</label>
                </div>
                <div className="col-sm-3">
                <input type="file"  onChange={this.handleImage1} />
                </div>
                <div className="col-sm-3">
                <img className="Imgbox" src={"http://localhost/react-demo/crud/uploads/"+ this.state.deal1} />
                </div>
              </div>

              <div className="form-group row hightdv">
                <div className="col-sm-2">
                  <label htmlFor="deal2">Deals2 :</label>
                </div>
                <div className="col-sm-3">
                <input type="file"  onChange={this.handleImage2} />
                </div>
                <div className="col-sm-3">
                <img className="Imgbox" src={"http://localhost/react-demo/crud/uploads/"+ this.state.deal2} />
                </div>
              </div>

              <div className="form-group row hightdv">
                <div className="col-sm-2">
                  <label htmlFor="deal3">Deals3 :</label>
                </div>
                <div className="col-sm-3">
                <input type="file"  onChange={this.handleImage3} />
                </div>
                <div className="col-sm-3">
                <img className="Imgbox" src={"http://localhost/react-demo/crud/uploads/"+ this.state.deal3} />
                </div>
              </div>


              <div className="form-group row hightdv">
                <div className="col-sm-2">
                  <label htmlFor="deal4">Deals4 :</label>
                </div>
                <div className="col-sm-3">
                <input type="file"  onChange={this.handleImage4} />
                </div>
                <div className="col-sm-3">
                <img className="Imgbox" src={"http://localhost/react-demo/crud/uploads/"+ this.state.deal4} />
                </div>
              </div>

              <div className="form-group row hightdv">
                <div className="col-sm-2">
                  <label htmlFor="deal5">Deals5 :</label>
                </div>
                <div className="col-sm-3">
                <input type="file"  onChange={this.handleImage5} />
                </div>
                <div className="col-sm-3">
                <img className="Imgbox" src={"http://localhost/react-demo/crud/uploads/"+ this.state.deal5} />
                </div>
              </div>

              <div className="form-group row hightdv">
                <div className="col-sm-2">
                  <label htmlFor="deal6">Deals6 :</label>
                </div>
                <div className="col-sm-3">
                <input type="file"  onChange={this.handleImage6} />
                </div>
                <div className="col-sm-3">
                <img className="Imgbox" src={"http://localhost/react-demo/crud/uploads/"+ this.state.deal6} />
                </div>
              </div>

              <Button  className="buttclss" type="submit" >Submit</Button>
            </form>

          </div>
        </div>
      </div>
    );
  }
}

export default Deal;
