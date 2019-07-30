import React, { Component } from 'react';
import { Link,Redirect } from 'react-router-dom';
import '../../ViewsStyle.css';
import axios from 'axios';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class Login extends Component {
  
  constructor(props){
		super(props);
		this.state = {
			action: 'login',
			email: '',
			password: '',
      redirectToReferrer: false,
      errors: {}
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
            errors["email"] = "*Please enter your email-ID";
          }
      }  

     
      if(!this.state.password){
         formIsValid = false;
         errors["password"] = "Please enter your password";
      }


     this.setState({errors: errors});
     return formIsValid;
 }



    handleSubmit = async (event) => {
      event.preventDefault();

      if(this.handleValidation()){

      const resp = await axios.get(`http://localhost/react-demo/api/api.php?action=login&email=${this.state.email}&password=${this.state.password}`);
      //this.props.onSubmit(resp);
      this.setState({ action: 'login', email: '', password: '' });
      //this.login(resp);
      console.log(resp.data.success);
      if(resp.data.success === 1){
          sessionStorage.setItem('data',JSON.stringify(resp));
          //console.log("userData");
          //console.log(sessionStorage.getItem('data'));
          this.setState({redirectToReferrer: true});
      }else if(resp.data.success === 0){
          sessionStorage.removeItem('data');
          this.setState({redirectToReferrer: false});
      }
    }else{
      console.log("Form has errors.");
  }
};

  render() {
    if (this.state.redirectToReferrer || sessionStorage.getItem('data')){
      return (<Redirect to={'/home'}/>)
  }
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form method="POST"  onSubmit={this.handleSubmit} className="register-form" id="login-form">
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <div id="dv" className="errorMsg">{this.state.errors["email"]}</div>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text"  placeholder="Username" autoComplete="username" value={this.state.email} onChange={event => this.setState({ email: event.target.value })} />
                      </InputGroup>
                      
                      <div className="errorMsg">{this.state.errors["password"]}</div>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" autoComplete="current-password"value={this.state.password} onChange={event => this.setState({ password: event.target.value })} />
                      </InputGroup>
                      
                      <Row>
                        <Col xs="6">
                          <Button color="primary" type="submit" className="px-4">Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Link to="/signup">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
