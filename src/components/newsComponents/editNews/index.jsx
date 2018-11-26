import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

const BASE_URL_IMG = process.env.BASE_URL + '/assets/'

class EditNews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activ: null,
            image1: null,
            image2: null,
            activfile: null,
            image1file: null,
            image2file: null,
            error: {
                titleError: false,
                descriptionError: false,
            }
        };
        this.handlerChange = this.handlerChange.bind(this);
        this.updateNews = this.updateNews.bind(this);
        this.imageChange = this.imageChange.bind(this);
    }
    componentDidMount() {

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
                if (value && value.length < 3) {
                    error.titleError = true;
                } else {
                    error.titleError = false;
                }
                break;
            case 'description':
                if (value && value.length < 3) {
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
    updateNews() {
        const { error, title, description, activfile, image1file, image2file } = this.state;
        if (Object.keys(error).every(item => !error[item])) {
            const formData = new FormData();
            let edited = false;
            (title && !error.titleError) && (edited = true) && formData.append('title', title);
            (description && !error.descriptionError) && (edited = true) && formData.append('description', description);
            activfile && (edited = true) && formData.append('activ', activfile);
            image1file && (edited = true) && formData.append('image1', image1file);
            image2file && (edited = true) && formData.append('image2', image2file);
            edited && this.props.UpdateNews(formData);
            edited && this.setState({
                activfile: null,
                image1file: null,
                image2file: null,
                title: undefined,
                description: undefined,
            })
        } else {
            alert("Incorrect Fields");
        }
    }
    render() {
        const { loading, news } = this.props;
        const { error, title, description, activ, image1, image2, activfile, image1file, image2file } = this.state;
        const tempArray = ['', ''];
        news.imagesUrl && news.imagesUrl.forEach(element => {
            const index = element.slice(element.indexOf('.') - 1, element.indexOf('.'));
            tempArray[parseInt(index, 10) - 1] = BASE_URL_IMG + element;
        });
        let disable = ((title && !error.titleError) || (description && !error.descriptionError) || activfile || image1file || image2file) ? false : true;
        if (loading) {
            return (
                <div className="newsLoading">
                    <img src="/public/images/newsLoading.gif" />
                </div>
            )
        }
        return (
            <div className="showNews">
                <div className="showNewsInner">
                    <span>News Title</span>
                    <input
                        className={`valid ${error.titleError ? 'error' : ''}`}
                        placeholder="Title"
                        type='text'
                        name='title'
                        value={title === undefined ? news.title : title}
                        onChange={this.handlerChange}
                    />
                    <span>News Description</span>
                    <textarea
                        className={`valid ${error.descriptionError ? 'error' : ''}`}
                        placeholder="Description..."
                        name='description'
                        value={description === undefined ? news.body : description}
                        onChange={this.handlerChange}
                    />
                    <span>News Images</span>
                    <div className="imageLoad">
                        <label htmlFor="fileLoad1">
                            <img src={activ || `${BASE_URL_IMG}${news.activImagesUrl}` || '/public/images/imageIcon.png'} className="image" alt="img" />
                        </label>
                        <input id="fileLoad1" type="file" name="activ" onChange={this.imageChange} />
                        <label htmlFor="fileLoad2">
                            <img src={image1 || tempArray[0] || "/public/images/imageIcon.png"} className="image" alt="img" />
                        </label>
                        <input id="fileLoad2" type="file" name="image1" onChange={this.imageChange} />
                        <label htmlFor="fileLoad3">
                            <img src={image2 || tempArray[1] || "/public/images/imageIcon.png"} className="image" alt="img" />
                        </label>
                        <input id="fileLoad3" type="file" name="image2" onChange={this.imageChange} />
                    </div>
                    <div className="buttons">
                        <button className="btn" ><Link to="/news">Cancel</Link></button>
                        <button className="btn" disabled={disable} onClick={this.updateNews}>Update</button>
                    </div>
                </div>
            </div>
        );
    }
}
EditNews.propTypes = {
    loading: propTypes.bool.isRequired,
    news: propTypes.objectOf(propTypes.any).isRequired,
    UpdateNews: propTypes.func.isRequired,
}
export default EditNews;