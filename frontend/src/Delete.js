import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import axios from 'axios';


class DeleteModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false
        };
        this.toggle = this.toggle.bind(this);

        this.id = props.pdfId;
        this.title = props.title;


    }

    toggle(){
        this.setState({
            modal: !this.state.modal
        });
    }

    deletePDF() {
        axios.delete('/api/delete', {
            data: {id: this.id}
            config: {

            }
        })
            .then(function () {
                console.log("Success");
                this.toggle;
            })
            .catch(e => {
                console.log(e)
            })
    }

    render() {
        return (
            <div>
                <Button onClick={this.toggle}>Delete</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader>Confirm Delete</ModalHeader>
                    <ModalBody>
                        Please confirm deletion of {this.title}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.deletePDF}>Delete</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>

                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default DeleteModal;