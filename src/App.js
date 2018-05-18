import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import Footer from './Footer';
import './App.css';

class App extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1>If I had Invested</h1>
          </Col>
        </Row>

        <Row>
          <Col sm={3}>
            $ <input type="number" className="amount" value="1000" />
          </Col>
          <Col sm={1}>in</Col>
          <Col sm={3}>
            <input type="text" className="amount" value="Bitcoin" />
          </Col>
          <Col sm={1}>on</Col>
          <Col sm={4}>
            <input type="number" className="amount" value="1000" />
          </Col>
        </Row>

        <Footer />
      </Container>
    );
  }
}

export default App;
