import React, { Component, lazy, Suspense } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Bar, Line } from 'react-chartjs-2';
import {
  Col,
  Row,
  Card,
  CardBody,
  ButtonGroup
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'
import './style.css';


const Widget03 = lazy(() => import('../../views/Widgets/Widget03'));

const brandPrimary = getStyle('--primary')
const brandSuccess = getStyle('--success')
const brandInfo = getStyle('--info')
const brandWarning = getStyle('--warning')
const brandDanger = getStyle('--danger')


// Social Box Chart




class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  componentDidMount() {
    const apiUrl = 'http://localhost/react-demo/crud/product/products';
    fetch(apiUrl)
      .then(res => res.json())

      .then(
        (result) => {
          
          this.setState({
            products: result.length

          });
        },
        (error) => {
          this.setState({ error });
        }
      )
      
      fetch("http://localhost/react-demo/crud/product/allbill_list")
      .then(res => res.json())

      .then(
        result => {
          this.setState({
            bills: result.length 
          });
        },
        error => {
          this.setState({ error });
        }
      )
    
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {
    if (sessionStorage.getItem('data') == null) {
      return (<Redirect to={'/login'} />)
    }
    var {products}  = this.state;
    
       
    

    return (
      <div className="animated fadeIn">
      
        <Row>
          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-info">
              <CardBody className="pb-0">
              <Link className="linkstyle" to="/product/list">
                <div className="text-value">{this.state.products}</div>
                <div>Total Products</div>
                </Link>  
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-primary">
              <CardBody className="pb-0">
                <ButtonGroup className="float-right">
                  
                </ButtonGroup>
                <div className="text-value">9.823</div>
                <div>Members online</div>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
                
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-warning">
              <CardBody className="pb-0">
                
                <div className="text-value">9.823</div>
                <div>Members online</div>
              </CardBody>
              <div className="chart-wrapper" style={{ height: '70px' }}>
                
              </div>
            </Card>
          </Col>

          <Col xs="12" sm="6" lg="3">
            <Card className="text-white bg-danger">
              <CardBody className="pb-0">
              <Link className="linkstyle" to="/bill/billinglist">
                <div className="text-value">{this.state.bills}</div>
                <div>Total Sales</div>
                </Link>
              </CardBody>
              <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
               
              </div>
            </Card>
          </Col>
        </Row>



        <Row>
          <Col>
            <Card>
              <CardBody>
                
                <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
                 
                </div>
              </CardBody>
              
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
