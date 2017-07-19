import React, { Component } from 'react';
import { Button, Input, InputGroup, InputGroupButton } from 'reactstrap';


class SubmitEmailForm extends Component {
    constructor(props) {
        super(props);
        this.state = { emailInput: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        const value = event.target.value;
        this.setState({ emailInput: value });
    }
    handleSubmit(event) {
        event.preventDefault();
        const { emailInput } = this.state;
        if (emailInput !== '') {
            this.props.checkBlacklist(emailInput);
        }
    }
    render() {
        const emailRegExp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const emailIsValid = emailRegExp.test(this.state.emailInput);
        const color = emailIsValid ?
            'success' :
            'secondary';

        return (
            <form onSubmit={this.props.handleSubmit}>
                <InputGroup>
                    <Input type='email' placeholder='Email for price alert' onChange={this.handleChange} value={this.state.emailInput} />
                    <InputGroupButton>
                        <Button type='submit' onClick={this.handleSubmit} disabled={!emailIsValid} color={color}>Submit</Button>
                    </InputGroupButton>
                </InputGroup>
            </form>
        );
    }
}

export default SubmitEmailForm;
