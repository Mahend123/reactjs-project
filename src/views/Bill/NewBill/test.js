import React, { Component } from "react";
import { Button } from "react-dom";
import { Link, Redirect } from "react-router-dom";
import { Table } from "react-bootstrap";
import { Helmet } from "react-helmet";
import * as jsPDF from "jspdf";

class Billinglist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      bills: [],
      response: {},
      id: "",
      billings: [],
    };
  }

  GeneratePDF(billId){
    const id = billId;
    fetch('http://localhost/react-demo/crud/product/getbillone?id=' + id)

      .then(response => {
        return response.json();

      }).then(result => {
            console.log(result)
        this.setState({
               resp: result,
          //     id: result.id,
          //invoiceno: result.invoiceno,
         
        });
       
      });
     
  }

 





  deleteProduct(billId) {
    //alert(billId)
    const { bills } = this.state;

    const apiUrl = "http://localhost/react-demo/crud/product/deletebill";
    const formData = new FormData();
    formData.append("billId", billId);

    const options = {
      method: "POST",
      body: formData
    };

    fetch(apiUrl, options)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            response: result,
            bills: bills.filter(bill => bill.id !== billId)
          });
        },
        error => {
          this.setState({ error });
        }
      );
  }

  handlePDF = () => {
    let customers = this.state.bills[0];
    let doc = new jsPDF();
    //picsum.photos/id/110/200/300
    
    doc.setTextColor("red");
    doc.text(customers.customername, 10, 10);
    doc.save(`${customers.customername}-bill.pdf`);
  };

  componentDidMount() {
    const apiUrl = "http://localhost/react-demo/crud/product/allbill_list";
    fetch(apiUrl)
      .then(res => res.json())

      .then(
        result => {
          this.setState({
            bills: result 
          });
        },
        error => {
          this.setState({ error });
        }
      );
  }
  render() {
    const { bills } = this.state;

    return (
      <div className="animated fadeIn">
        <div className="card">
          <div className="card-header">Billing List</div>
          <div className="card-body">
          <button onClick={this.handlePDF}>Activate Lasers</button>
            <Table responsive striped>
              <thead>
                <tr>
                  <th>S NO.</th>
                  <th>Customer Name</th>
                  <th>Total Amount</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bills.map(bill => (
                  <tr key={bill.id}>
                    <td>{bill.id}</td>
                    <td>{bill.customername}</td>
                    <td>{bill.grandtotal}</td>
                    <td>{bill.create_date}</td>
                    <td>
                      <i
                        className="fa fa-trash"
                        aria-hidden="true"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure to delete this record?"
                            )
                          ) {
                            this.deleteProduct(bill.id);
                          }
                        }}
                      />&nbsp;&nbsp; &nbsp;
                      <Link to={"/bill/gpdf?id=" + bill.id} className="fa fa-pencil"></Link>


                      <i className="fa fa-pencil" aria-hidden="true" onClick={() =>  {this.GeneratePDF(bill.id);} }/>
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

export default Billinglist;



