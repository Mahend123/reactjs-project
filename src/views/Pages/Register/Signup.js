import React, { Component } from 'react';
import axios from 'axios';
import '../../ViewsStyle.css';
import {   Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { emptyStatement } from '@babel/types';
import {Link} from 'react-router-dom';

class signup extends Component {

  constructor(props){
    super(props);
    this.state = {
      action: 'signup',
      name: '',
      email: '',
      password: '',
      re_pass: '',
      mobile: '',
      shopName: '',
      redirectToReferrer: false,
      errors: {},
      
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(e){
    this.setState({[e.target.name]:e.target.value});
  }

  handleValidation(){
    //let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;
    console.log(this.state);
    //Name

   

    if(!this.state.name){
       formIsValid = false;
       errors["name"] = "* Please enter your name";
       
      } 

    if(typeof this.state.name !== "undefined"){
       if(!this.state.name.match(/^[a-zA-Z ]+$/)){
          formIsValid = false;
          errors["name"] = "* Please enter your name";
          
       }        
    }

    //Email
    if(!this.state.email){
       formIsValid = false;
       errors["email"] = "*Please enter your email-ID.";
    }

    if(typeof this.state.email !== "undefined"){
      //  let lastAtPos = this.state.email.lastIndexOf('@');
      //  let lastDotPos = this.state.email.lastIndexOf('.');
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

      //  if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') === -1 && lastDotPos > 2 && (this.state.email.length - lastDotPos) > 2)) {
      //     formIsValid = false;
      //     errors["email"] = "Please enter valid email";
      //   }
        if (!pattern.test(this.state.email)) {
          formIsValid = false;
          errors["email"] = "*Please enter valid email-ID.";
        }
        
    }  

    if(!this.state.mobile){
       formIsValid = false;
       errors["mobile"] = "*Please enter your mobile no.";
    }

    if(typeof this.state.mobile !== "undefined"){
       if(!this.state.mobile.match(/^[0-9]{10}$/)){
          formIsValid = false;
          errors["mobile"] = "*Enter your 10 digit mobile number";
       }        
    }

    if(!this.state.password){
       formIsValid = false;
       errors["password"] = "*Please enter password";
    }

    if(!this.state.re_pass){
      formIsValid = false;
      errors["re_pass"] = "*Please enter again password";
   }else{
     if(this.state.re_pass !== this.state.password){
      formIsValid = false;
      errors["re_pass"] = "*The passwords doesn't match";
     }
   }

   if(!this.state.shopName){
    formIsValid = false;
    errors["shopName"] = "*Please enter Company Name";
 }

 

   this.setState({errors: errors});
   return formIsValid;
}


  handleSubmit = async (event) => {

    this.setState({
      successmsga: true
    });

    setTimeout(() => {
      this.setState({
        successmsga: false
      });
    }, 2000);

    event.preventDefault();

       if(this.handleValidation()){
     
       const resp = await axios.get(`http://localhost/react-demo/api/api.php?action=signup&name=${this.state.name}&email=${this.state.email}&password=${this.state.password}&mobile=${this.state.mobile}&shopName=${this.state.shopName}&status=active`);
       //this.props.onSubmit(resp);
       this.setState({ suggestion: resp.data.error })
        console.log(resp.data.error)
       this.setState({ action: 'login', name: '', email: '', password: '', mobile: '', shopName: '', status: '' });
       //this.login(resp);
       if(resp.data.success === 1){
        this.setState({ successmsga: <div className='alert alert-success'><strong>Success!</strong> Your registration successfully..!</div> });
       // alert(resp.data.success);
         //sessionStorage.setItem('data',JSON.stringify(resp));		
       this.setState({redirectToReferrer: true});
     }else if(resp.data.success === 0){
       //sessionStorage.removeItem('data');		
       
       this.setState({redirectToReferrer: false});
     }
   }else{
          console.log("Form has errors.");
       }		
 };

 
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          
         <div>{this.state.successmsga}</div>
        {/* <div className="alert alert-success">
          <strong>Success!</strong> Thank you for subscribing!
        </div> */}
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form method="POST" className="register-form" id="register-form" name="userRegistrationForm"  onSubmit={this.handleSubmit}>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon >
                      <Input type="text"  id="name" name="name" placeholder="Your Name" value={this.state.name} onChange={event => this.setState({ name: event.target.value })}  />
                      <div className="errorMsg">{this.state.errors["name"]}</div>
                    </InputGroup>
                    
                    
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text"  name="email" placeholder="Enter your email" value={this.state.email} onChange={event => this.setState({ email: event.target.value })} />
                      <div className="errorMsg">{this.state.errors["email"]}</div>
                      <div className="errorMsg">{this.state.suggestion} </div>
                    </InputGroup>

                         
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" name="password" id="password" placeholder="Enter your password" autoComplete="new-password" value={this.state.password} onChange={event => this.setState({ password: event.target.value })} />
                      <div className="errorMsg">{this.state.errors["password"]}</div>
                    </InputGroup>
                   
                    
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" name="re_pass" id="re_pass" placeholder="Repeat password" autoComplete="new-password" value={this.state.re_pass} onChange={event => this.setState({ re_pass: event.target.value })} />
                      <div className="errorMsg">{this.state.errors["re_pass"]}</div>
                    </InputGroup>

                    
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-phone"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" id="mobile" placeholder="Enter your mobile number" value={this.state.mobile} onChange={event => this.setState({ mobile: event.target.value })} />
                      <div className="errorMsg">{this.state.errors["mobile"]}</div>
                    </InputGroup>

                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="far fa-building"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" id="shopName" placeholder="Enter your Company/Shop Name" value={this.state.shopName} onChange={event => this.setState({ shopName: event.target.value })} />
                      <div className="errorMsg">{this.state.errors["shopName"]}</div>
                    </InputGroup>


                    {/* <Input  type="submit" name="signup" id="signup" className="btn btn-success form-submit" value="Register"/> */}
                    <Button color="success" type="submit" name="signup" block>Create Account</Button>
                  </Form>
                </CardBody>
                <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" >
                    <Button color="info" block><Link className=" noHover"  to='/login'>Login</Link></Button>
                    
                    </Col>
                    {/* <Col xs="12" sm="6">
                      <Button className="btn-twitter mb-1" block><span>twitter</span></Button>
                    </Col> */}
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>

       
      </div>
    );
  }
}

export default signup;











