import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { GetRootTypes, GetTypes, AddType, UpdateType, DeleteType } from '../../action/shop';
import EditTypePopup from '../../components/addShopTypeComponents/editTypePopup';

class AddShopType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameen: '',
            nameru: '',
            nameam: '',
            icon: null,
            file: null,
            bonuseType: 'CUBES',
            rootType: '',
            popupContent: '',
        }
        this.handlerChange = this.handlerChange.bind(this);
        this.imageChange = this.imageChange.bind(this);
        this.handlerOpenPopup = this.handlerOpenPopup.bind(this);
        this.handlerClosePopup = this.handlerClosePopup.bind(this);
        this.addType = this.addType.bind(this);
        this.deleteType = this.deleteType.bind(this);
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            rootType: nextProps.rootTypes && nextProps.rootTypes[0] && nextProps.rootTypes[0]._id,
        });
    }
    componentDidMount() {
        this.props.GetRootTypes();
        if (this.props.types.length === 0) {
            this.props.GetTypes();
        }
    }
    handlerChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }
    imageChange(e){
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            this.setState({ icon: reader.result, file });
        }
        if (file) {
            reader.readAsDataURL(file);
        }
    }
    handlerOpenPopup(rowId) {
        const data = this.props.types.find((itemType) => itemType._id === rowId);
        this.setState({
            popupContent: (
                <EditTypePopup
                    closePopup={ this.handlerClosePopup }
                    data={data}
                    rootTypes = { this.props.rootTypes }
                    UpdateType={ this.props.UpdateType }
                />
            )
        });
    }
    handlerClosePopup() {
        this.setState({popupContent : ''});
    }
    addType(){
        const formData = new FormData();
        const { nameen, nameam, nameru, file, bonuseType, rootType } = this.state;
        if(nameen.length >=2 && nameam.length >=2 && nameru.length >=2 && bonuseType.length > 0 && rootType.length > 0 ){
            formData.append('nameen', nameen);
            formData.append('nameam', nameam);
            formData.append('nameru', nameru);
            formData.append('icon', file);
            formData.append('bonuseType', bonuseType);
            formData.append('rootType', rootType);
            this.props.AddType(formData);
            this.setState({
                nameen: '',
                nameru: '',
                nameam: '',
                icon: null,
                file: null,
                bonuseType: 'CUBES',
                rootType: '',
                popupContent: '',
            });
        }else{
            alert("Incorrect Fields");
        }
    }
    async deleteType(typeId){
        if(await window.modal.confirm('Are you sure?', 'Do you want to delete this type?')){
            this.props.DeleteType(typeId);
        }
    }
    render() {
        const { nameen, nameru, nameam, icon, bonuseType, rootType, popupContent } = this.state;
        const { rootTypes, types } = this.props;
        return (
            <div className="addShopType">
                <table>
                    <thead>
                        <tr>
                            <th>Name EN</th>
                            <th>Name AM</th>
                            <th>Name RU</th>
                            <th>Icon</th>
                            <th>Bonus Type</th>
                            <th>Root Type</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            types.map( (typeItem) =>(
                                <tr key= {typeItem._id}>
                                    <td>{typeItem.name.en}</td>
                                    <td>{typeItem.name.am}</td>
                                    <td>{typeItem.name.ru}</td>
                                    <td><img src={`${process.env.BASE_URL}/assets/${typeItem.imageUrl}?${Date.now()}`} className="icon" /></td>
                                    <td>{typeItem.bonuseType}</td>
                                    <td>{typeItem.rootType.name.en}</td>
                                    <td><img src="/public/images/edit.png" onClick={() => { this.handlerOpenPopup(typeItem._id) }} /></td>
                                    <td><img src="/public/images/delete.png" onClick={() => { this.deleteType(typeItem._id) }} /></td>
                                </tr>
                            ))
                        }
                        
                        <tr className="addRow">
                            <td>
                                <input name="nameen" value={nameen} onChange={this.handlerChange}/>
                            </td>
                            <td>
                                <input name="nameam" value={nameam} onChange={this.handlerChange} />
                            </td>
                            <td>
                                <input name="nameru" value={nameru} onChange={this.handlerChange} />
                            </td>
                            <td>
                                <label htmlFor="fileLoad"> <img src={icon ? icon : '/public/images/choose.png'} className="icon" /></label>
                                <input id="fileLoad" type="file" name="icon" accept=".png" onChange={this.imageChange} />
                            </td>
                            <td>
                                <select name="bonuseType" value={bonuseType} onChange={this.handlerChange}>
                                    <option value="CUBES">CUBES</option>
                                    <option value="LITER">LITER</option>
                                    <option value="PERCENT">PERCENT</option>
                                </select>
                            </td>
                            <td>
                                <select name="rootType" value={rootType} onChange={this.handlerChange}>
                                    {/* <option selected disabled value=''>Select</option> */}
                                    {
                                        rootTypes.map((rootTypeItem) => {
                                            return (
                                                <option key={rootTypeItem._id} value={rootTypeItem._id}>
                                                    {rootTypeItem.name.en}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </td>
                            <td colSpan="2">
                                <img src="/public/images/addRow.png" onClick={this.addType} />

                            </td>
                        </tr>
                    </tbody>

                </table>
                { popupContent }
            </div>
        )
    }
};

const mapStateToProps = store => {
    return {
        rootTypes: store.shop.rootTypes,
        types: store.shop.types,
    };
}
const mapDispatchToProps = dispatch => {
    return {
        GetRootTypes: () => dispatch(GetRootTypes()),
        AddType: (formData) => dispatch(AddType(formData)),
        UpdateType: (formData) => dispatch(UpdateType(formData)),
        DeleteType: (typeId) => dispatch(DeleteType(typeId)),
        GetTypes: () => dispatch(GetTypes()),
    };
};

AddShopType.propTypes = {
    GetRootTypes: propTypes.func.isRequired,
    GetTypes: propTypes.func.isRequired,
    AddType: propTypes.func.isRequired,
    UpdateType: propTypes.func.isRequired,
    DeleteType: propTypes.func.isRequired,
    types: propTypes.arrayOf(propTypes.any).isRequired,
    rootTypes: propTypes.arrayOf(propTypes.any).isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(AddShopType);