import React from "react";
import "antd/dist/antd.css";
import "./App.css";
import AppRegister from "./components/AppRegister";
import { Col, Row } from "antd";

function App() {
  return (
    <Row className="App">
      <Col offset={8} span={8}>
        <h3>Omnipresent Onboarding</h3>
        <AppRegister />
      </Col>
    </Row>
  );
}

export default App;
