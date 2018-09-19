import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';
import {NavLink, Nav, Modal,Button} from 'reactstrap'

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
    handlePrevious = () => {
        this.setState({ pageNumber: this.state.pageNumber - 1 });
        this.setState({ pageNumber: this.state.pageNumber - 1 });
    }

    handleNext = () => {
        this.setState({ pageNumber: this.state.pageNumber + 1 });
    }

    renderPagination = (pageNumber, numPages) => {
        let previousButton = <li className="previous" onClick={this.handlePrevious}><a><i className="fa fa-arrow-left"></i> Previous</a></li>;
        if (pageNumber === 1) {
            previousButton = <li className="previous disabled"><a><i className="fa fa-arrow-left"></i> Previous</a></li>;
        }
        let nextButton = <li className="next" onClick={this.handleNext}><a>Next <i className="fa fa-arrow-right"></i></a></li>;
        if (pageNumber === numPages) {
            nextButton = <li className="next disabled"><a>Next <i className="fa fa-arrow-right"></i></a></li>;
        }
        return (
            <Nav color="light">
                <NavLink><button class="btn btn-danger">{previousButton}</button></NavLink>
                <NavLink> <button class="btn btn-success"> {nextButton}</button></NavLink>
            </Nav>
        );
    }

                render() {
                let pagination = null;
                if (this.state.numPages) {
                pagination = this.renderPagination(this.state.pageNumber, this.state.numPages);
            }
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
                {pagination}
                <p>Page {pageNumber} of {numPages}</p>
            </div>
            </Modal>
            </div>
        );
    }
}

export default PDF;