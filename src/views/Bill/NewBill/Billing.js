import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import '../../style.css';
import { Button, Alert } from 'react-bootstrap';


class Billing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: new Date(),
            invoiceno: "",
            customername: "",
            contactno: "",
            address: "",
            gst_number: "",
            trans: "",
            product: "",
            quantity: "",
            category: "",
            size: "",
            price: "",
            total: "",
            dis: "",
            disval: "",
            fright: "",
            gstinsert: "",
            gstvalue: "",
            igstins: "",
            igstinsval: "",
            grandtotal: "",
            products: [],
            split: null,
            multis: "",
            errors: {},
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlegetdata = this.handlegetdata.bind(this);
        this.handleTotal = this.handleTotal.bind(this);
        this.handleSubTotal = this.handleSubTotal.bind(this);

    }

    handleSubTotal(event) {

        const subtotal = document.getElementById("subtotal_id").value;
        var dis = document.getElementById("dis_id").value;
        const fright = document.getElementById("fright_id").value;
        var gstinsert_id = document.getElementById("gstinsert_id").value;
        var igstins_id = document.getElementById("igstins_id").value;

        var disval = (subtotal * dis) / 100;
        var dissub = (subtotal - disval);


        var grandval = dissub;
        var grandtotal = parseFloat(grandval) + parseFloat(fright);
        var gstinsertval = (grandtotal * gstinsert_id) / 100;
        var igstinsval = (grandtotal * igstins_id) / 100;
        var grandtotalval = parseFloat(grandtotal) + parseFloat(gstinsertval) + parseFloat(igstinsval);



        this.setState({
            disval: disval,
            gstvalue: gstinsertval,
            igstinsval: igstinsval,
            grandtotal: grandtotalval,

        });

    }

    handleTotal(event) {
        var quantity_id = document.getElementById("quantity_id").value;
        var size_id = document.getElementById("size_id").value;
        var price_id = document.getElementById("price_id").value;
        if ((quantity_id != null) && (size_id != null) && (price_id != null)) {

            var size = size_id.split("X");
            var multi = (size[0] * size[1]);

            var totl = (quantity_id * multi * price_id);
            this.setState({
                total: totl,
            });
        }

    }




    async handlegetdata(event) {
            
        const prod = event.target.value;
        var siz = prod.split(" - ");
        var sizeofpro = (siz[3])
        var val = sizeofpro.split("X");
        var multi = (val[0] * val[1]);

        var quanti = (siz[4])




        this.setState({
            size: sizeofpro,
            quantity: quanti,
            multis: multi,
            [event.target.name]: event.target.value,

        });

    }

    handleChange(event) {
        
        this.setState({
            [event.target.name]: event.target.value
            
        });
        //console.log(event.target.value)
    }


    componentDidMount() {
        const apiUrl = 'http://localhost/react-demo/crud/product/billprducts';

        fetch(apiUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        products: result
                    });
                    // console.log(result)
                },
                (error) => {
                    this.setState({ error });
                }
            )
    }


    handleValidation() {
        
        let errors = {};
        let formIsValid = true;
        //console.log(this.state);

        if (!this.state.invoiceno) {
            formIsValid = false;
           // errors["invoiceno"] = "*Please enter product name ";
            document.getElementById('invoiceno').style.borderColor = "red";

        } else {
            if (!this.state.invoiceno.match(/^[0-9]/)) {
                formIsValid = false;
                document.getElementById('invoiceno').style.borderColor = "#db7318";
                alert("Please enter only digit in invoice field..!")
            }else{
                formIsValid = true;
                document.getElementById('invoiceno').style.borderColor = "green";
            }
           
        }

        if (!this.state.customername) {
            formIsValid = false;
           // errors["customername"] = "*Please enter product name ";
            document.getElementById('customername').style.borderColor = "red";

        } else {
            if (!this.state.customername.match(/^[a-zA-Z ]+$/)) {
                formIsValid = false;
                document.getElementById('customername').style.borderColor = "#db7318";
                alert("Please enter only alphabets in customer name field..!")
            }else{
                
                document.getElementById('customername').style.borderColor = "green";
            }
        }

        
        


        if (!this.state.contactno) {
            formIsValid = false;
           // errors["contactno"] = "*Please enter product name ";
            document.getElementById('contactno').style.borderColor = "red";

        } else {
            if (!this.state.contactno.match(/^[0-9]{10}$/)) {
                formIsValid = false;
                document.getElementById('contactno').style.borderColor = "#db7318";
                alert("Enter your 10 digit mobile number in contact number field..!")
            }else{
                
                document.getElementById('contactno').style.borderColor = "green";
            }
        }

        if (!this.state.address) {
            formIsValid = false;
           // errors["address"] = "*Please enter product name ";
            document.getElementById('address').style.borderColor = "red";

        }else{
            
            document.getElementById('address').style.borderColor = "green";
        }

        if (!this.state.gst_number) {
            formIsValid = false;
           // errors["gst_number"] = "*Please enter product name ";
            document.getElementById('gst_number').style.borderColor = "red";

        }else{
            
            document.getElementById('gst_number').style.borderColor = "green";
        }

        if (!this.state.trans) {
            formIsValid = false;
           // errors["trans"] = "*Please enter product name ";
            document.getElementById('trans').style.borderColor = "red";

        }else{
            
            document.getElementById('trans').style.borderColor = "green";
        }

        if (!this.state.product) {
            formIsValid = false;
           // errors["product"] = "*Please enter product name ";
            document.getElementById('product').style.borderColor = "red";

        }else{
            
            document.getElementById('product').style.borderColor = "green";
        }


        if (!this.state.grandtotal) {
            formIsValid = false;
           // errors["grandtotal"] = "*Please enter grandtotal name ";
            document.getElementById('grandtotal').style.borderColor = "red";

        }else{
            
            document.getElementById('grandtotal').style.borderColor = "green";
        }
        

        this.setState({ errors: errors });
        return formIsValid;
        
    }


    handleSubmit = async (event) => {
        

        event.preventDefault();
            if(!this.state.price){
                this.state.price = 100
            }else{
        //  alert( 
        //      this.state.invoiceno + 
        //     this.state.customername +
        //     this.state.contactno +
        //     this.state.address +
        //     this.state.gst_number +
        //     this.state.trans +
        //     this.state.product +
        //     this.state.size +
        //     this.state.price 
        //     this.state.total +
        //     this.state.dis +
        //     this.state.disval + 
        //     this.state.fright +
        //     this.state.gstinsert +
        //     this.state.gstvalue +
        //     this.state.igstins + 
        //     this.state.igstinsval + 
        //     this.state.grandtotal +
        //     this.state.quantity
        //     );


        if (this.handleValidation()) {
            fetch(
                "http://localhost/react-demo/crud/product/add_billprduct",
                {
                    method: "POST",
                    body: JSON.stringify({
                        invoiceno: this.state.invoiceno,
                        //date: this.state.date,
                        customername: this.state.customername,
                        contactno: this.state.contactno,
                        address: this.state.address,
                        gst_number: this.state.gst_number,

                        trans: this.state.trans,
                        product: this.state.product,
                        quantity: this.state.quantity,
                        size: this.state.size,
                        price: this.state.price,

                        total: this.state.total,
                        dis: this.state.dis,
                        disval: this.state.disval,
                        fright: this.state.fright,
                        gstinsert: this.state.gstinsert,

                        gstvalue: this.state.gstvalue,
                        igstins: this.state.igstins,
                        igstinsval: this.state.igstinsval,
                        grandtotal: this.state.grandtotal
                    }),

                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                }
            ).then(response => {
                if (response.status === 200) {

                    alert("Your Record saved successfully");
                }
                if (response.status === 500) {
                    alert("Try again...?");
                }
            });
        } else {
            console.log("Form has errors.");
        }
    }
    }


    render() {
        if (sessionStorage.getItem('data') == null) {
            return (<Redirect to={'/login'} />);
        }
        const { error, products } = this.state;
        var date = this.state.date.toLocaleDateString();
        const { size } = this.state;

        return (
            <div className="animated fadeIn">
                <div className="card">
                    <div className="card-header">
                        Billing
                    </div>

                    <div className="card-body">

                        <form onSubmit={this.handleSubmit}  >
                        
                           
                            <div className="form-group row">
                                <div className="col-sm-7">
                                    <input
                                        type="text"
                                        name="invoiceno"
                                        value={this.state.invoiceno}
                                        onChange={this.handleChange}
                                        placeholder="INVOICE NUMBER"
                                        className="form-control "
                                        id="invoiceno"
                                       //onKeyUp={this.handleValidation} 
                                              
                                    />
                                </div>


                                <div className="col-sm-4">
                                    <input
                                        type="text"
                                        name="date"
                                        value={date}
                                        onChange={this.handleChange}
                                        className="form-control"
                                        id="date"
                                        readOnly
                                    />
                                </div>
                            </div>
                            


                            <div className="form-group row">
                                <div className="col-sm-7">
                                    <input
                                        type="text"
                                        name="customername"
                                        value={this.state.customername}
                                        onChange={this.handleChange}
                                        placeholder="CUSTOMER NAME"
                                        className="form-control"
                                        id="customername"
                                       // onKeyUp={this.handleValidation} 
                                    />
                                </div>

                                <div className="col-sm-4">
                                    <input
                                        type="text"
                                        name="contactno"
                                        value={this.state.contactno}
                                        onChange={this.handleChange}
                                        placeholder="CONTACT NUMBER"
                                        className="form-control"
                                        id="contactno"
                                        //onKeyUp={this.handleValidation}
                                    />
                                </div>
                            </div>

                            <div className="form-group row">
                                <div className="col-sm-7 ">
                                    <div >
                                        <textarea rows="4" cols="50"
                                            type="text"
                                            name="address"
                                            value={this.state.address}
                                            onChange={this.handleChange}
                                            className="form-control"
                                            id="address"
                                            placeholder="ADDRESS"
                                            //onKeyUp={this.handleValidation}                                            
                                        />
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div >
                                        <input
                                            type="text"
                                            name="gst_number"
                                            value={this.state.gst_number}
                                            onChange={this.handleChange}
                                            placeholder="PARTY GSTIN NUMBER"
                                            className="form-control"
                                            id="gst_number"
                                           // onKeyUp={this.handleValidation}
                                        />
                                    </div>
                                    <br />
                                    <div >
                                        <input
                                            type="text"
                                            name="trans"
                                            value={this.state.trans}
                                            onChange={this.handleChange}
                                            placeholder="TRANS"
                                            className="form-control"
                                            id="trans"
                                            //onKeyUp={this.handleValidation}
                                        />
                                    </div>
                                </div>
                            </div>


                            <div className="form-group row">
                                <div className="col-sm-3">
                                    <select className="form-control" name="product" value={this.state.product} onInput={this.handlegetdata} onChange={this.handleChange} id="product" defaultValue="" >
                                        <option value="" disabled>Select</option>
                                        {
                                            products.map(function (product) {
                                                return <option key={product.id}
                                                    value={(product.product_name) + " - " + (product.pcode1) + " - " + (product.pcode2) + " - " + (product.category) + " - " + (product.quantity)+ " - " + (product.hsn)} >
                                                    {(product.product_name) + " - " + (product.pcode1) + " - " + (product.pcode2) + " - " + (product.category) }</option>;
                                            })
                                        }
                                    </select>
                                </div>

                                <div className="col-sm-2">
                                    <input
                                        type="text"
                                        name="quantity"
                                        onBlur={this.handleTotal}
                                        value={this.state.quantity}
                                        onChange={this.handleChange}
                                        placeholder="QUANTITY"
                                        className="form-control"
                                        id="quantity_id"


                                    />
                                </div>

                                <div className="col-sm-2">
                                    <input
                                        type="text"
                                        name="size"
                                        onBlur={this.handleTotal}
                                        value={this.state.size}
                                        onChange={this.handleChange}
                                        placeholder="SIZE"
                                        className="form-control"
                                        id="size_id"
                                        readOnly
                                    />
                                </div>

                                <div className="col-sm-2">
                                    <input
                                        type="text"
                                        name="price"
                                        onBlur={this.handleTotal}
                                        //value={this.state.price}
                                        onChange={this.handleChange}
                                        placeholder="PRICE"
                                        className="form-control"
                                        id="price_id"
                                        defaultValue={100}
                                    />
                                </div>

                                <div className="col-sm-2">
                                    <input
                                        type="text"
                                        name="total"
                                        value={this.state.total}
                                        onChange={this.handleChange}
                                        placeholder="TOTAL"
                                        className="form-control"
                                        id="total"
                                        defaultValue={0}
                                        readOnly
                                    />
                                </div>
                            </div>


                            <div className="inputset">
                                <div className="form-group row">
                                    <div className="col-sm-2">
                                        <label htmlFor="subtotal">	SUBTOTAL:</label>
                                    </div>
                                    <div className="col-sm-4"></div>
                                    <div className="col-sm-6">
                                        <input
                                            type="text"
                                            name="subtotal"
                                            //onBlur={this.handleSubTotal}
                                            value={this.state.total}
                                            onChange={this.handleChange}
                                            className="form-control"
                                            id="subtotal_id"
                                            placeholder="SUBTOTAL"
                                            //defaultValue={0}
                                            readOnly
                                        />
                                    </div>
                                </div>


                                <div className="form-group row">
                                    <div className="col-sm-2">
                                        <label htmlFor="dis">	DIS %:</label>
                                    </div>
                                    <div className="col-sm-4">
                                        <input
                                            type="text"
                                            name="dis"
                                            onBlur={this.handleSubTotal}
                                            value={this.state.dis}
                                            onChange={this.handleChange}
                                            className="form-control"
                                            id="dis_id"
                                            placeholder="Enter Discount "
                                            //defaultValue={0}
                                        />
                                    </div>

                                    <div className="col-sm-6">
                                        <input
                                            type="text"
                                            name="disval"

                                            value={this.state.disval}
                                            onChange={this.handleChange}
                                            className="form-control"
                                            id="disval"
                                            placeholder="Discount"
                                            readOnly
                                        />
                                    </div>
                                </div>


                                <div className="form-group row">
                                    <div className="col-sm-2">
                                        <label htmlFor="fright">FRIGHT:</label>
                                    </div>

                                    <div className="col-sm-10">
                                        <input
                                            type="text"
                                            name="fright"
                                            onKeyUp={this.handleSubTotal}
                                           // value={this.state.fright}
                                            onChange={this.handleChange}
                                            className="form-control"
                                            id="fright_id"
                                            placeholder="Enter Fright"
                                            defaultValue={0}
                                        />
                                    </div>
                                </div>


                                <div className="form-group row">
                                    <div className="col-sm-2">
                                        <label htmlFor="gst">	GST %:</label>
                                    </div>

                                    <div className="col-sm-4">
                                        <input
                                            type="text"
                                            name="gstinsert"
                                            onBlur={this.handleSubTotal}
                                            value={this.state.gstinsert}
                                            onChange={this.handleChange}
                                            className="form-control"
                                            id="gstinsert_id"
                                            placeholder="Enter GST Dis"

                                        />
                                    </div>

                                    <div className="col-sm-6">
                                        <input
                                            type="text"
                                            name="disval"
                                            onBlur={this.handleSubTotal}
                                            value={this.state.gstvalue}
                                            onChange={this.handleChange}
                                            className="form-control"
                                            id="disval"
                                            placeholder="GST Discount"
                                            
                                            readOnly
                                        />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <div className="col-sm-2">
                                        <label htmlFor="gstno">	IGST %:</label>
                                    </div>
                                    <div className="col-sm-4">
                                        <input
                                            type="text"
                                            name="igstins"
                                            onBlur={this.handleSubTotal}
                                            value={this.state.igstins}
                                            onChange={this.handleChange}
                                            className="form-control"
                                            id="igstins_id"
                                            placeholder="Enter IGST Dis"
                                            defaultValue={0}
                                        />
                                    </div>

                                    <div className="col-sm-6">
                                        <input
                                            type="text"
                                            name="igstinsval"
                                            value={this.state.igstinsval}
                                            onChange={this.handleChange}
                                            className="form-control"
                                            id="igstinsval"
                                            placeholder="IGST Discount"
                                            readOnly
                                        />
                                    </div>
                                </div>


                                <div className="form-group row">
                                    <div className="col-sm-2">
                                        <label htmlFor="grandtotal">GRAND TOTAL</label>
                                    </div>

                                    <div className="col-sm-10">
                                        <input
                                            type="text"
                                            name="grandtotal"
                                            value={this.state.grandtotal}
                                            onChange={this.handleChange}
                                            className="form-control"
                                            id="grandtotal"
                                            placeholder="GRAND TOTAL"
                                            defaultValue={0}
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>
                            <Button type="submit" >Submit</Button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Billing;
