import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import './App.css';
import Edit from "./Edit";
import Delete from "./Delete";
import Add from "./Add.js";
import PDF from "./PDF.js";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }
    buttonFormatter(cell, row){
        console.log(this.state);
        return (<div><Edit title={row.Title} tags={row.Tags}>Edit</Edit><Delete title={row.Title} pdfId={row.id}>Delete</Delete></div>);

    }
    PDFlink(cell,row){
        return (<div><PDF id={row.id}>PDF</PDF></div>);
    }
    createCustomInsertButton() {
        return (
            <Add>Add</Add>
        );
    }
    componentDidMount() {
        fetch(`http://localhost:3002/api/getDetails/`)
            .then(res => res.json())
            .then(
            (result) => {
                console.log(result);
                this.setState({
                    items:result.items
                }
            );
            },
                (error) => {
                    this.setState({
                        error
                    });
            }
         )
    }
  render() {
      const options = {
          insertBtn: this.createCustomInsertButton
      };
    return (
        <BootstrapTable ref='table' options={options} hover={true} data = {this.state.items} insertRow>
                <TableHeaderColumn width={"200"} dataField='Title' isKey>Title</TableHeaderColumn>
                <TableHeaderColumn width={"200"} dataField='Data' dataFormat={this.PDFlink}>Data</TableHeaderColumn>
                <TableHeaderColumn width={"200"} dataField='Tags'>Tags</TableHeaderColumn>
                <TableHeaderColumn width={"200"} dataField='Date'>DateAdded</TableHeaderColumn>
                <TableHeaderColumn width={"200"} dataField="button" dataFormat={this.buttonFormatter}>Buttons</TableHeaderColumn>
        </BootstrapTable>
    );
  }
}
export default App;
