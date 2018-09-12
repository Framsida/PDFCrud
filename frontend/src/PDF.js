import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';
import AddModal from "./Add";

class PDF extends Component {
    state = {
        numPages: 1,
        pageNumber: 1,
    }

    onDocumentLoad = ({ numPages }) => {
        this.setState({ numPages });
    }

    render() {
        const { pageNumber, numPages } = this.state;

        return (
            <Modal>
            <div>
                <Document
                    file="pdf-sample.pdf"
                    onLoadSuccess={this.onDocumentLoad}>
                    <Page pageNumber={pageNumber} />
                </Document>
                <p>Page {pageNumber} of {numPages}</p>
            </div>
            </Modal>
        );
    }
}

export default PDF;