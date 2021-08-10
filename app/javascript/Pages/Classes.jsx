import React, { Component } from "react";
import Layout from "./Layout";
import "../stylesheets/body.css";

class Classes extends Component {
  render() {
    return (
      <Layout current_user={this.props.current_user}>
        <p>Hello, welcome to your first class!</p>
      </Layout>
    );
  }
}

export default Classes;