import React, { Component } from 'react';

class EditTypePopup extends Component {
    constructor(props){
        super(props);
        this.state = {
            nameen: props.data.name.en,
            nameru: props.data.name.ru,
            nameam: props.data.name.am,
            icon: props.data.imageUrl,
            file: null,
            bonuseType: props.data.bonuseType,
            rootType: props.data.rootType._id,
        }
        this.closePopup = this.closePopup.bind(this);
        this.handlerChange = this.handlerChange.bind(this);
        this.imageChange = this.imageChange.bind(this);
        this.UpdateType = this.UpdateType.bind(this);
    }
    closePopup(e){
        if (e.target.id === "editTypePopupId"){
             this.props.closePopup();
        }
    }
    handlerChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }
    imageChange(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            this.setState({ icon: reader.result, file });
        }
        if (file) {
            reader.readAsDataURL(file);
        }
    }
    UpdateType(){
        const formData = new FormData();
        const { nameen, nameam, nameru, file, bonuseType, rootType } = this.state;
        if (nameen.length >= 2 && nameam.length >= 2 && nameru.length >= 2 && bonuseType.length > 0 && rootType.length > 0) {
            formData.append('nameen', nameen);
            formData.append('nameam', nameam);
            formData.append('nameru', nameru);
            formData.append('icon', file);
            formData.append('bonuseType', bonuseType);
            formData.append('rootType', rootType);
            formData.append('typeId',  this.props.data._id );
            this.props.UpdateType(formData);
            this.props.closePopup();
        } else {
            alert("Incorrect Fields");
        }
    }
    render() {
        const { nameam, nameen, nameru, icon, file, bonuseType, rootType } = this.state;
        return (
            <div className='editTypePopup'id="editTypePopupId" onClick={this.closePopup}>
                <div className='popup_inner'>
                    <h3>Add new Row</h3>
                    <input type="text" name="nameen" value={nameen} onChange={this.handlerChange}/>
                    <input type="text" name="nameam" value={nameam} onChange={this.handlerChange} />
                    <input type="text" name="nameru" value={nameru} onChange={this.handlerChange}/>
                    <label htmlFor="fileLoadPopup"> <img src={file ? icon : icon ? `${process.env.BASE_URL}/assets/${icon}` : '/public/images/choose.png'} className="icon" /></label>
                    <input id="fileLoadPopup" type="file" name="icon" accept=".png" onChange={this.imageChange} />
                    <select name="bonuseType" value={bonuseType} onChange={this.handlerChange}>
                        <option value="CUBES">CUBES</option>
                        <option value="LITER">LITER</option>
                        <option value="PERCENT">PERCENT</option>
                    </select>
                    <select name="rootType" value={rootType} onChange={this.handlerChange}>
                        {
                            this.props.rootTypes.map((rootTypeItem) => {
                                return (
                                    <option key={rootTypeItem._id} value={rootTypeItem._id}>
                                        {rootTypeItem.name.en}
                                    </option>
                                )
                            })
                        }
                    </select>
                    <div className="buttons">
                    <button className="btn" onClick={this.props.closePopup}>Cancel</button>
                    <button className="btn" onClick={this.UpdateType}>Update</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default EditTypePopup;