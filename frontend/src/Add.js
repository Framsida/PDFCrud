import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import FormData from 'form-data'

class AddModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            file: null
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
        formData.append('fileName', this.title);
        formData.append('author', this.author);
        formData.append('tags', this.tags);
        formData.append('file', this.uploadFile);
        console.log(Object.values(formData));

        axios.post('http://localhost:3002/api/add', formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
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
                                <Input type="file" name="file" id="pdfFile" onChange={f => this.uploadFile = f.target.files[0]}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="pdfAuthor">Enter author</Label>
                                <Input type="text" name="file" id="pdfAuthor" onChange={f => this.author = f.target.value}/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="pdfAuthor">Enter tags</Label>
                                <Input type="text" name="tags" id="pdfTags" onChange={f => this.tags = f.target.value}/>
                            </FormGroup>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => {this.postForm()}}>Add PDF</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default AddModal;