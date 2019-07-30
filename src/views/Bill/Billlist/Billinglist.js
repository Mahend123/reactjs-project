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

  handlePDF(billId){
    alert(billId)
    let id = billId-1;
    let customers = this.state.bills[id];
   
    let doc = new jsPDF();
    //picsum.photos/id/110/200/300
    
    //doc.setTextColor("red");
    // doc.text(customers.customername, 30, 10);
    // doc.text(customers.invoiceno, 40, 15);
    // doc.text(customers.contactno, 50,  21);
    // doc.text(customers.address, 175,  21);
    // doc.setLineWidth(0.1);
    // doc.line(100, 20, 100, 60);
    
   // doc.save(`${customers.customername}-bill.pdf`);
  };
  
 





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

  // handlePDF = () => {
  //   let customers = this.state.bills[0];
  //   let doc = new jsPDF();
  //   //picsum.photos/id/110/200/300
    
  //   doc.setTextColor("red");
  //   doc.text(customers.customername, 10, 10);
  //   doc.save(`${customers.customername}-bill.pdf`);
  // };

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
      this.testVarible = JSON.parse(sessionStorage.getItem('data'));
      this.state.user_id = (this.testVarible.data.id);
        const user_id = this.state.user_id;
  }
  render() {
    if (sessionStorage.getItem('data') == null) {
      return (<Redirect to={'/login'} />);
  }
    const { bills } = this.state;
    const { user_id } = this.state;

    return (
      <div className="animated fadeIn">
        <div className="card">
          <div className="card-header">Billing List</div>
          <div className="card-body">
          {/* <button onClick={this.handlePDF}>Activate Lasers</button> */}
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
                      <a href={"http://localhost/react-demo/crud/pdf/generate/" + bill.id + "/" + user_id  } className="fa fa-file-pdf-o pdficon"></a>

                        
                      {/* <i className="fa fa-pencil" aria-hidden="true" onClick={() =>  {this.handlePDF(bill.id);} }/> */}
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



