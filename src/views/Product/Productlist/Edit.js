
import React, { Component } from "react";
import { Link, Redirect, } from "react-router-dom";
import { Button } from 'react-bootstrap';



class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {

      id: "",
      user_id: "",
      product_name: "",
      hsn: "",
      pcode1: "",
      pcode2: "",
      category: "",
      price: "",
      quantity: "",
      description: "",
      cates: [],
      errors: {}
      //redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {

    this.setState({
      [event.target.name]: event.target.value
    });
  }


  async  componentDidMount() {
    // const id = this.product.id
    const query = new URLSearchParams(this.props.location.search);
    const id = (query.get('id'));
    //console.log(id)

    fetch('http://localhost/react-demo/crud/product/product?id=' + id)
      .then(response => {
        return response.json();

      }).then(result => {

        this.setState({

          id: result.id,
          user_id: result.user_id,
          product_name: result.product_name,
          hsn: result.hsn,
          pcode1: result.pcode1,
          pcode2: result.pcode2,
          category: result.category,
          price: result.price,
          quantity: result.quantity,
          description: result.description,
        });
      });
    const apiUrl = 'http://localhost/react-demo/crud/product/categorys';

    fetch(apiUrl)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            cates: result
          });
          //console.log(result)
        },
        (error) => {
          this.setState({ error });
        }
      )

  }

  // *****************update section*******************************



  handleValidation() {
    let errors = {};
    let formIsValid = true;
    //console.log(this.state);

    if (!this.state.product_name) {
      formIsValid = false;
      errors["product_name"] = "*Please enter product name ";
    } else {
      if (!this.state.product_name.match(/^[a-zA-Z ]+$/)) {
        formIsValid = false;
        errors["product_name"] = "* Please enter only later";
      }
    }
    if (!this.state.hsn) {
      formIsValid = false;
      errors["hsn"] = "*Please enter HNS";
    }
    if (!this.state.pcode1) {
      formIsValid = false;
      errors["pcode1"] = "*Please enter pin code";
    } else {
      if (!this.state.pcode1.match(/^[0-9]/)) {
        formIsValid = false;
        errors["pcode1"] = "*Please enter only digit";
      }
    }




    if (!this.state.pcode2) {
      formIsValid = false;
      errors["pcode2"] = "*Please enter pin code";
    } else {
      if (!this.state.pcode2.match(/^[0-9]/)) {
        formIsValid = false;
        errors["pcode2"] = "*Please enter only digit";
      }
    }


    if (!this.state.category) {
      formIsValid = false;
      errors["category"] = "*Please select category";
    }


    // if(!this.state.price){
    //   formIsValid = false;
    //   errors["price"] = "*Please enter price";
    // } 
    if (!this.state.price) {
      formIsValid = false;
      errors["price"] = "*Please enter price";
    } else {
      if (!this.state.price.match(/^[0-9]/)) {
        formIsValid = false;
        errors["price"] = "*Please enter only digit";
      }
    }

    if (!this.state.quantity) {
      formIsValid = false;
      errors["quantity"] = "*Please enter quantity";
    } else {
      if (!this.state.quantity.match(/^[0-9]/)) {
        formIsValid = false;
        errors["quantity"] = "*Please enter only digit";
      }
    }

    // if(!this.state.quantity){
    //   formIsValid = false;
    //   errors["quantity"] = "*Please enter quantity";
    // }  
    if (!this.state.description) {
      formIsValid = false;
      errors["description"] = "*Please enter description";
    }



    this.setState({ errors: errors });
    return formIsValid;
  }



  async handleSubmit(event) {

    event.preventDefault();

    // alert(this.state.id+
    //   this.state.user_id+
    //   this.state.product_name+
    //   this.state.hsn+
    //   this.state.pcode1+
    //   this.state.pcode2+
    //   this.state.category+
    //   this.state.price+
    //   this.state.quantity+
    //   this.state.description)
    if (this.handleValidation()) {
      fetch('http://localhost/react-demo/crud/product/update_product', {
        method: 'PUT',
        body: JSON.stringify({
          id: this.state.id,
          user_id: this.state.user_id,
          product_name: this.state.product_name,
          hsn: this.state.hsn,
          pcode1: this.state.pcode1,
          pcode2: this.state.pcode2,
          category: this.state.category,
          price: this.state.price,
          quantity: this.state.quantity,
          description: this.state.description

        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      }).then(response => {
        if (response.status === 200) {
          this.setState({ redirect: true })
        }
        if (response.status === 500) {
          alert("Try again...?");
        }
      });
    } else {
      console.log("Form has errors.");
    }
  }



  render() {
    if (sessionStorage.getItem('data') == null) {
      return (<Redirect to={'/login'} />);
    }
    const { error, cates } = this.state;
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/product/list" />;
    }
    return (
      <div className="animated fadeIn">
        <div className="card">
          <div className="card-header">
            Edit Product
          </div>
          <div className="card-body">

            <form onSubmit={this.handleSubmit}>
              <div className="form-group row">
                {/* <div className="col-sm-2">
                  <label for="id">id:</label>
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
                  <label for="user_id">User_id:</label>
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
                  <label for="product_name">Product_name:</label>
                </div>
                <div className="col-sm-6">
                  <input
                    type="text"
                    name="product_name"
                    value={this.state.product_name}
                    onChange={this.handleChange}
                    className="form-control"
                    id="product_name"
                    placeholder="Enter product_name"
                  />
                </div>
                <div className="errorMsg">{this.state.errors["product_name"]}</div>
              </div>

              <div className="form-group row">
                <div className="col-sm-2">
                  <label for="hsn">HSN:</label>
                </div>
                <div className="col-sm-6">
                  <input
                    type="text"
                    name="hsn"
                    value={this.state.hsn}
                    onChange={this.handleChange}
                    className="form-control"
                    id="hsn"
                    placeholder="Enter hsn"
                  />
                </div>
                <div className="errorMsg">{this.state.errors["hsn"]}</div>
              </div>

              <div className="form-group row">
                <div className="col-sm-2">
                  <label for="pcode1">Pcode1:</label>
                </div>
                <div className="col-sm-6">
                  <input
                    type="text"
                    name="pcode1"
                    value={this.state.pcode1}
                    onChange={this.handleChange}
                    className="form-control"
                    id="pcode1"
                    placeholder="Enter pcode1"
                  />
                </div>
                <div className="errorMsg">{this.state.errors["pcode1"]}</div>
              </div>

              <div className="form-group row">
                <div className="col-sm-2">
                  <label for="pcode2">Pcode2:</label>
                </div>
                <div className="col-sm-6">
                  <input
                    type="text"
                    name="pcode2"
                    value={this.state.pcode2}
                    onChange={this.handleChange}
                    className="form-control"
                    id="pcode2"
                    placeholder="Enter pcode2"
                  />
                </div>
                <div className="errorMsg">{this.state.errors["pcode2"]}</div>
              </div>

              <div className="form-group row">
                <div className="col-sm-2">
                  <label for="category">category:</label>
                </div>
                <div className="col-sm-6">
                  <select className="form-control" name="category" value={this.state.category} onChange={this.handleChange} ref="cateInput" defaultValue="" >
                    <option value="" disabled>Select</option>
                    {
                      cates.map(function (cate) {
                        return <option key={cate._id}
                          value={cate.category}>{cate.category}</option>;
                      })
                    }
                  </select>
                </div>
                <div className="col-sm-2"><Link to="/category">Add New Category </Link></div>
                <div className="errorMsg">{this.state.errors["category"]}</div>
              </div>

              <div className="form-group row">
                <div className="col-sm-2">
                  <label for="price">Price:</label>
                </div>
                <div className="col-sm-6">
                  <input
                    type="text"
                    name="price"
                    value={this.state.price}
                    onChange={this.handleChange}
                    className="form-control"
                    id="price"
                    placeholder="Enter price"
                  />
                </div>
                <div className="errorMsg">{this.state.errors["price"]}</div>
              </div>


              <div className="form-group row">
                <div className="col-sm-2">
                  <label for="quantity">Quantity:</label>
                </div>
                <div className="col-sm-6">
                  <input
                    type="text"
                    value={this.state.quantity}
                    onChange={this.handleChange}
                    className="form-control"
                    id="quantity"
                    placeholder="Enter quantity"
                    name="quantity" />
                </div>
                <div className="errorMsg">{this.state.errors["quantity"]}</div>
              </div>


              <div className="form-group row">
                <div className="col-sm-2">
                  <label for="description">Description:</label>
                </div>
                <div className="col-sm-6">
                  <textarea rows="3" cols="50"
                    type="text"
                    value={this.state.description}
                    onChange={this.handleChange}
                    className="form-control"
                    id="description"
                    placeholder="Enter description"
                    name="description" />
                </div>
                <div className="errorMsg">{this.state.errors["description"]}</div>
              </div>

              <Button type="submit" color="success"> Update</Button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
