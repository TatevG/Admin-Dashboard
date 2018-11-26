import React, { PureComponent } from 'react';
import propTypes from 'prop-types';

const PERSONAL_INFO = {
    name: 'text',
    surname: 'text',
    phoneNumber: 'text',
    emailAddress: 'text',
    carNumber: 'text',
    address: 'text',
    passport: 'text',
    idCardNumber: 'text',
    birthDate: 'date',
    driverLicense: 'date',
    contractEndDate: 'date',
    contractName: 'text',
};

class EditUserPersonalInfo extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            statusnote: true,
            card: '',
        };
        Object.keys(PERSONAL_INFO).map(item => { this.state[`status${item}`] = true })
        this.handlerClickEdit = this.handlerClickEdit.bind(this);
        this.handlerClickSave = this.handlerClickSave.bind(this);
    }
    handlerClickEdit(e, item) {
        this.setState({ [`status${item}`]: false });
        const referenc = e.target;
        this.currentFocus = referenc.parentElement.children[0];
    }
    handlerClickSave(e, item) {
        const referenc = e.target
        const input = referenc.parentElement.children[0];
        this.props.UpdateUserField(input.name, input.value);
        this.setState({ [`status${item}`]: true });
    }
    componentDidUpdate() {
        this.currentFocus ? this.currentFocus.focus() : null;
    }
    render() {
        return (
            <div className="userInfo">
                <table>
                    <tbody>
                        {
                            Object.keys(PERSONAL_INFO).map((item, index) => {
                                const temp = this.state[`status${item}`];
                                let tempDate = null;
                                PERSONAL_INFO[item] !== 'text' && (tempDate = new Date(this.props.data[item]));
                                return (
                                    <tr key={index}>
                                        <td className="fieldName">{item}</td>
                                        <td className="fieldInput">
                                            <input type={PERSONAL_INFO[item]}
                                                disabled={temp}
                                                name={item}
                                                defaultValue={PERSONAL_INFO[item] === 'text'? (this.props.data[item]? this.props.data[item] : '') : (`${tempDate.getFullYear()}-${("0" + (tempDate.getMonth() + 1)).slice(-2)}-${("0" + tempDate.getDate()).slice(-2)}`)}
                                            />
                                            <button
                                                className={temp ? '' : 'editButton'}
                                                onClick={temp ? ((e) => { this.handlerClickEdit(e, item) }) : ((e) => { this.handlerClickSave(e, item) })}
                                            >
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                        <tr>
                            <td className="fieldName">note</td>
                            <td className="fieldInput">
                                <textarea name='note' defaultValue={this.props.data.note} disabled={this.state.statusnote} ></textarea>
                                <button
                                    className={this.state.statusnote ? '' : 'editButton'}
                                    onClick={this.state.statusnote ? ((e) => { this.handlerClickEdit(e, 'note') }) : ((e) => { this.handlerClickSave(e, 'note') })}
                                ></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
EditUserPersonalInfo.defaultProps = {
    data: {}
};
EditUserPersonalInfo.propTypes = {
    data: propTypes.objectOf(propTypes.any),
    UpdateUserField: propTypes.func.isRequired,
}

export default EditUserPersonalInfo;
