import React, { Component } from 'react';
import { Row, Input } from 'react-materialize';

export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = { term: '' };
    }

    onInputChange = (event) => {
        let term = event.target.value;

        this.setState({ term });

        this.props.handleSearch(term);
    }


    render() {
        return (
            <Row>
                <Input style={{ fontSize: '1.5em' }} placeholder="Search show" s={12}
                    value={this.state.term}
                    onChange={this.onInputChange}
                />
            </Row>
        );
    }
}