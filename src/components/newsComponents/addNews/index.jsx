import React, { Component } from 'react';
import propTypes from 'prop-types';

class AddNewsComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            activ: null,
            image1: null,
            image2: null,
            activfile: null,
            image1file: null,
            image2file: null,
            error: {
                titleError: false,
                descriptionError: false,
            },
        };
        this.handlerChange = this.handlerChange.bind(this);
        this.imageChange = this.imageChange.bind(this);
        this.addNews = this.addNews.bind(this);
    }
    handlerChange(e) {
        const { name, value } = e.target;
        const error = this.validateField(name, value);
        this.setState({ [name]: value, error: Object.assign({}, this.state.error, error) });
    }
    validateField(fieldName, value) {
        let error = {};
        switch (fieldName) {
            case 'title':
                if (value && !(value.length >= 3)) {
                    error.titleError = true;
                } else {
                    error.titleError = false;
                }
                break;
            case 'description':
                if (value && !(value.length >= 3)) {
                    error.descriptionError = true;
                } else {
                    error.descriptionError = false;
                }
                break;
            default:
                throw new Error(`${fieldName} is not defined`);
        }
        return error;
    }
    imageChange(e) {
        const target = e.target;
        const file = target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            if (file) {
                this.setState({ [target.name]: reader.result, [target.name + 'file']: file });
            }
        }
        if (file) {
            reader.readAsDataURL(file);
        }
    }
    addNews() {
        const { error, title, description, activfile, image1file, image2file } = this.state;

        if (Object.keys(error).every(item => !error[item])) {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            activfile && formData.append('activ', activfile);
            image1file && formData.append('image1', image1file);
            image2file && formData.append('image2', image2file);
            this.props.AddNews(formData);
            this.setState({
                title: '',
                description: '',
                activ: null,
                image1: null,
                image2: null,
                activfile: null,
                image1file: null,
                image2file: null,
            })
        } else {
            alert("Incorrect Fields");
        }
    }
    render() {
        const { title, description, error } = this.state;
        let disable = (!error.titleError && !error.descriptionError && title && description) ? false : true;
        return (
            <div className="showNews">
                <div className="showNewsInner">
                    <span>News Title</span>
                    <input
                        className={`valid ${error.titleError ? 'error' : ''}`} placeholder="Title"
                        type='text' name='title' value={title} onChange={this.handlerChange}
                    />
                    <span>News Description</span>
                    <textarea placeholder="Description..."
                        className={`valid ${error.descriptionError ? 'error' : ''}`}
                        onChange={this.handlerChange} name='description' value={description}>
                    </textarea>
                    <span>News Images</span>
                    <div className="imageLoad">
                        <label htmlFor="fileLoad1">
                            <img src={this.state.activ || "/public/images/imageIcon.png"} className="image" alt="img" />
                        </label>
                        <input id="fileLoad1" type="file" name="activ" onChange={this.imageChange} />
                        <label htmlFor="fileLoad2">
                            <img src={this.state.image1 || "/public/images/imageIcon.png"} className="image" alt="img" />
                        </label>
                        <input id="fileLoad2" type="file" name="image1" onChange={this.imageChange} />
                        <label htmlFor="fileLoad3">
                            <img src={this.state.image2 || "/public/images/imageIcon.png"} className="image" alt="img" />
                        </label>
                        <input id="fileLoad3" type="file" name="image2" onChange={this.imageChange} />
                    </div>
                    <button className="btn" disabled={disable} onClick={this.addNews} >Add</button>
                </div>
            </div>
        );
    }
}
AddNewsComp.propTypes = {
    AddNews: propTypes.func.isRequired,
}
export default AddNewsComp;