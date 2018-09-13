import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';
import {Modal,Button} from 'reactstrap'

class PDF extends Component {
    constructor(props){
        super(props);
        this.state = {
            modal: false,
            numPages: null,
            pageNumber: 1
        };
        this.toggle = this.toggle.bind(this);
        this.id=props.id
        this.file = null;
    }
    
    onDocumentLoad = ({ numPages }) => {
        this.setState({ numPages });
    }

    toggle(){
        this.setState({
            modal: !this.state.modal
        });
    }



    render() {
        const { pageNumber, numPages } = this.state;

        return (
            <div>
            <Button color="primary" onClick={this.toggle}>PDF</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <div>
                <Document
                    file={`http://localhost:3002/api/viewFileWithID/${this.id}`}
                    onLoadSuccess={this.onDocumentLoad}>
                    <Page pageNumber={pageNumber} />
                </Document>
                <p>Page {pageNumber} of {numPages}</p>
            </div>
            </Modal>
            </div>
        );
    }
}

export default PDF;