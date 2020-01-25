import React from "react";
import './NameCli.css'

export class NameCli extends React.Component {

  componentDidMount(): void {
  }

  render() {
    return (
        <div className="container-fluid blast-root justify-content-center vertical-center">
          <h1 className="d-flex">
            Hi, I am Miguel.
          </h1>
        </div>
    );
  }
}