import React from "react";
import "antd/dist/antd.css";
import "./App.css";
import AppRegister from "./components/AppRegister";
import AppView from "./components/AppView";
import { Tabs } from "antd";

function App() {
  const { TabPane } = Tabs;

  return (
    <section className="App">
      <h1>Welcome to Copenotes</h1>
      <Tabs type="card" destroyInactiveTabPane={true}>
        <TabPane tab="Add Users" key="1">
          <AppRegister />
        </TabPane>
        <TabPane tab="View Users" key="2">
          <AppView />
        </TabPane>
      </Tabs>
    </section>
  );
}

export default App;
