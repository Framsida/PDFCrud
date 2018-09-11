import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import FormData from 'form-data'

class AddModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
        this.toggle = this.toggle.bind(this);
        this.uploadFile = '';
        this.title = '';
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    postForm() {
        let formData = new FormData();
        formData.append('file', this.uploadFile);
        formData.append('title', this.title);

        axios.post('/api/add', formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(function() {
                console.log('It worked');
            })
            .catch(function() {
                console.log('It failed');
            });
    }

    render() {
        return (
            <div>
                <Button color="primary" onClick={this.toggle}>Add PDF</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Add PDF</ModalHeader>
                    <ModalBody>
                        <form>
                            <FormGroup>
                                <Label for="pdfTitle">Title</Label>
                                <Input type="text" name="title" id="pdfTitle" placeholder="Enter Title" onChange={t => this.title = t.target.value}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="pdfFile">Choose a pdf</Label>
                                <Input type="file" name="file" id="pdfFile" onChange={f => this.uploadFile = f.target.value}/>
                            </FormGroup>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Add PDF</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default AddModal;