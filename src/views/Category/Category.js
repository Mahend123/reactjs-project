
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { Button, Table } from 'react-bootstrap';
import Modal from "react-responsive-modal";
import '../style.css';

class Category extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user_id: "",
            category: "",
            cate: [],
            response: {},
            id_edit: "",
            user_idEdit: "",
            category_edit: "",

        };
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.handleShowEdit = this.handleShowEdit.bind(this);
        this.handleCloseEdit = this.handleCloseEdit.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.handleChangeEdit = this.handleChangeEdit.bind(this);
        this.handleSubmitEdit = this.handleSubmitEdit.bind(this);

    }

    handleChange(event) {
        this.testVarible = JSON.parse(sessionStorage.getItem('data'));
        this.state.user_id = (this.testVarible.data.id);
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleChangeEdit(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
        // console.log(event.target.value)
    }

    handleCloseEdit(event) {
        this.setState({ showEdit: false });
    }

    handleShowEdit(event) {
        this.setState({ showEdit: true });
    }

    handleClose(event) {
        this.setState({ show: false });
    }

    handleShow(event) {
        this.setState({ show: true });
    }

    componentDidMount() {
        const apiUrl = 'http://localhost/react-demo/crud/product/categorys';

        fetch(apiUrl)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        cate: result
                    });
                },
                (error) => {
                    this.setState({ error });
                }
            )
    }


    editCategory(catId) {

        fetch('http://localhost/react-demo/crud/product/category?id=' + catId)
            .then(response => {
                return response.json();

            }).then(result => {

                this.setState({

                    id_edit: result.id,
                    user_idEdit: result.user_id,
                    category_edit: result.category,
                });
            });
    }


    deleteCategory(catId) {
        const { cate } = this.state;

        const apiUrl = 'http://localhost/react-demo/crud/product/deleteCategory';
        const formData = new FormData();
        formData.append('catId', catId);

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
                        cate: cate.filter(cat => cat.id !== catId)
                    });
                },
                (error) => {
                    this.setState({ error });
                }
            )
    }


    handleSubmitEdit = async (event) => {

        this.setState({
            updatesuccessmsga: true
        });

        setTimeout(() => {
            this.setState({
                updatesuccessmsga: false
            });
        }, 2500);

        event.preventDefault();

        //alert(this.state.id_edit + this.state.user_idEdit + this.state.category_edit)

        fetch('http://localhost/react-demo/crud/product/update_category', {
            method: 'PUT',
            body: JSON.stringify({
                id: this.state.id_edit,
                user_id: this.state.user_idEdit,
                category: this.state.category_edit,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => {
            if (response.status === 200) {
                this.setState({ updatesuccessmsga: <div className='alert alert-success'><strong>Success!</strong> Your Category Update successfully..!</div> });
                //alert("Website update successfully.");
            }
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

        //alert(this.state.user_id + this.state.category + this.state.hsn + this.state.pcode1 +  this.state.pcode2 + this.state.size +      this.state.price + this.state.quantity +this.state.description + this.state.status);

        fetch(
            "http://localhost/react-demo/crud/product/add_category",
            {
                method: "POST",
                body: JSON.stringify({
                    user_id: this.state.user_id,
                    category: this.state.category,
                }),

                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }
        ).then(response => {
            if (response.status === 200) {
                this.setState({ successmsga: <div className='alert alert-success'><strong>Success!</strong> Your Category Add Successfully..!</div> });
                // alert("Your Record saved successfully");
            }
            if (response.status === 500) {
                alert("Try again...?");
            }
        });
    }


    render() {
        if (sessionStorage.getItem('data') == null) {
            return (<Redirect to={'/login'} />);
        }
        const { error, cate } = this.state;
        return (
            <div className="animated fadeIn">
                <div className="card">
                    <div className="card-header">
                        Add Category
                        &nbsp;&nbsp;&nbsp;<i className="fa fa-plus-square" aria-hidden="true" onClick={this.handleShow}></i>

                    </div>
                    {/* ==============Add section================= */}
                    {/* <Button className="buttadd" variant="primary" onClick={this.handleShow}>
                        Add
                        </Button> */}
                    <Modal classNames="modclas" open={this.state.show} onClose={this.handleClose}>
                        <div className="moddv">
                            <form className="frm" onSubmit={this.handleSubmit}>
                                <h2>Add Category </h2>
                                <hr />
                                <div className="form-group row">
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
                                <div className="form-group row">
                                    <input
                                        type="text"
                                        name="category"
                                        value={this.state.category}
                                        onChange={this.handleChange}
                                        className="form-control"
                                        id="category"
                                        placeholder="Enter category"
                                    />
                                </div>
                                <hr />
                                <div className="buttclas">
                                    <Button variant="success" name="save" type="submit" onClick={this.handleClose}>Save</Button>
                                    &nbsp;&nbsp;
                                    <Button variant="danger" onClick={this.handleClose}>Close</Button>
                                </div>
                            </form>
                        </div>
                    </Modal>

                    {/* ==============Edit section================= */}
                    <Modal classNames="modclas" open={this.state.showEdit} onClose={this.handleCloseEdit}>
                        <div className="moddv">
                            <form className="frm" onSubmit={this.handleSubmitEdit}>
                                <h2>Edit Category</h2>
                                <hr />
                                <input
                                    type="hidden"
                                    name="id_edit"
                                    value={this.state.id_edit}
                                    onChange={this.handleChangeEdit}
                                    placeholder="Enter user_id"
                                    className="form-control"
                                    id="id_edit"
                                />

                                <div className="form-group row">
                                    <input
                                        type="hidden"
                                        name="user_idEdit"
                                        value={this.state.user_idEdit}
                                        onChange={this.handleChangeEdit}
                                        placeholder="Enter user_id"
                                        className="form-control"
                                        id="user_idEdit"
                                    />
                                </div>
                                <div className="form-group row">
                                    <input
                                        type="text"
                                        name="category_edit"
                                        value={this.state.category_edit}
                                        onChange={this.handleChangeEdit}
                                        className="form-control"
                                        id="category_edit"
                                        placeholder="Enter category"
                                    />
                                </div>
                                <hr />
                                <div className="buttclas">
                                    <Button variant="success" name="save" type="submit" onClick={this.handleCloseEdit} >Save</Button>
                                    &nbsp;&nbsp;
                                    <Button variant="danger" onClick={this.handleCloseEdit}>Close</Button>
                                </div>
                            </form>
                        </div>
                    </Modal>

                    {/* ==============Table section================= */}
                    <div className="card-body">
                        <div className="tblclss">
                            <div>{this.state.updatesuccessmsga}</div>
                            <div>{this.state.successmsga}</div>
                            <Table responsive striped>
                                <thead>
                                    <tr>
                                        <th>#ID</th>
                                        <th>category</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cate.map(cat => (
                                        <tr key={cat.id}>
                                            <td>{cat.id}</td>
                                            <td>{cat.category}</td>
                                            <td>
                                                {/* <Link className="icon-pencil bttn" to="CategoryEdit" /> */}
                                                {/* <Button variant="info" onClick={() => (this.handleShowEdit)(this.editCategory(cat.id))}  >Edit</Button> */}
                                                <i className="icon-pencil" onClick={() => (this.handleShowEdit)(this.editCategory(cat.id))}></i>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                {/* <i className="fa fa-trash" aria-hidden="true" onClick={() => this.deleteCategory(cat.id)} ></i> */}
                                                <i className="fa fa-trash" aria-hidden="true" onClick={() => { if (window.confirm('Are you sure to delete this record?')) { this.deleteCategory(cat.id) }; }} ></i>
                                                {/* &nbsp;<Button variant="danger" onClick={() => this.deleteProduct(cat.id)}>Delete</Button>  */}
                                                {/* <Link className="icon-pencil bttn" to="kycedit" /> */}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Category;
