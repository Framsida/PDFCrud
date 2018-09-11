import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';

class EditModal  extends  React.Component {
    constructor(props){
        super(props);
        this.state = {
            modal: false
        };
        this.toggle = this.toggle.bind(this);

        this.title = props.title;

        this.id = props.pdfId;

    }

    toggle(){
        this.setState({
            modal: !this.state.modal
        });
    }

    postForm() {
        axios({
            method: 'put',
            url: '/api/edit',
            data: {id: this.id, title: this.title},
            config: {headers: {'Content-Type': 'multipart/form-data'}}
        })
    }



    render(){
        return(
        <div>
            <Button color="primary" onClick={this.toggle}>Edit PDF</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Edit PDF</ModalHeader>
                <ModalBody>
                    <form>
                        <FormGroup>
                            <Label for="pdfTitle">Title</Label>
                            <Input type="text" name="title" id="pdfTitle" defaultValue={this.title} onChange={t => this.title = t.target.value} />
                        </FormGroup>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.postForm}>Edit PDF</Button>
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
        );
    }
}

export  default EditModal;