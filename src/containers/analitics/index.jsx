import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import 'react-select/dist/react-select.css';

class Analitics extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <div className="analitics">
            </div>
        )
    }
}

const mapStateToProps = store => {
    return {

    };
}
const mapDispatchToProps = dispatch => {
    return {

    };
};

Analitics.propTypes = {

}
export default connect(mapStateToProps, mapDispatchToProps)(Analitics);