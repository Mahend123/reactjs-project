import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Table } from 'react-bootstrap';
import '../../style.css';

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      products: [],
      response: {},
      id: "",

    };
  }

  deleteProduct(productId) {
    //alert(productId)
    const { products } = this.state;

    const apiUrl = 'http://localhost/react-demo/crud/product/deleteProduct';
    const formData = new FormData();
    formData.append('productId', productId);

    const options = {
      method: 'POST',
      body: formData
    }

    fetch(apiUrl, options)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            response: result,
            products: products.filter(product => product.id !== productId)
          });
        },
        (error) => {
          this.setState({ error });
        }
      )
  }

  componentDidMount() {
    const apiUrl = 'http://localhost/react-demo/crud/product/products';
    fetch(apiUrl)
      .then(res => res.json())

      .then(
        (result) => {
          this.setState({
            products: result
          });
        },
        (error) => {
          this.setState({ error });
        }
      )
  }

  render() {
    if (sessionStorage.getItem('data') == null) {
      return (<Redirect to={'/login'} />);
    }
    const { products } = this.state;

    return (
      <div className="animated fadeIn">
        <div className="card">
          <div className="card-header">
            Product List
          </div>
          <div className="card-body">
         
            <Table responsive striped>
              <thead>
                <tr>
                  <th>S NO.</th>
                  <th>Product Name</th>
                  <th>Product Code</th>
                  <th>Product Code(s)</th>
                  <th>Product Size</th>
                  <th>Product Price</th>
                  <th>Sell Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>

                    <td>{product.id}</td>
                    <td>{product.product_name}</td>
                    <td>{product.pcode1}</td>
                    <td>{product.pcode2}</td>
                    <td>{product.category}</td>
                    <td>{product.price}</td>
                    <td>{product.quantity}</td>
                    <td>
                      {/* <Link to="/product/edit?id=1" params={{ productId: product.id }} >Edit Page </Link> */}
                      {/* <Button variant="info" onClick={() => this.props.editProduct(product.id)}>Edit</Button> */}

                      <Link to={"/product/edit?id=" + product.id} className="fa fa-pencil"></Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {/* <i className="fa fa-trash" aria-hidden="true" onClick={() => this.deleteProduct(product.id)} ></i> */}
                      <i className="fa fa-trash" aria-hidden="true" onClick={() => { if (window.confirm('Are you sure to delete this record?')) { this.deleteProduct(product.id) }; }} ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

export default List;
