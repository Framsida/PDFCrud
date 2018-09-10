import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }
    buttonFormatter(){
        return '<button type="button">Edit</button><button type="button" >Delete</button>';
    }
    createCustomInsertButton = (openModal) => {
        return (
            <button style={ { color: 'red' } } onClick={ openModal }>Add rows</button>
        );
    }
    componentDidMount() {
        fetch("http://demo5512929.mockable.io/something")
            .then(res => res.json())
            .then(
            (result) => {
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
        <BootstrapTable options={options} hover={true} data = {this.state.items} insertRow>
                <TableHeaderColumn width={"200"} dataField='Title' isKey>Title</TableHeaderColumn>
                <TableHeaderColumn width={"200"} dataField='Data'>Data</TableHeaderColumn>
                <TableHeaderColumn width={"200"} dataField='Tags'>Tags</TableHeaderColumn>
            <TableHeaderColumn width={"200"} dataField='Date'>DateAdded</TableHeaderColumn>
            <TableHeaderColumn width={"200"} dataField="button" dataFormat={this.buttonFormatter}>Buttons</TableHeaderColumn>

        </BootstrapTable>
    );
  }
}

export default App;
