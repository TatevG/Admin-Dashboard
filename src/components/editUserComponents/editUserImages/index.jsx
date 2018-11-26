import React, { PureComponent } from 'react';
import propTypes from 'prop-types';

const BASE_URL_IMG = `${process.env.BASE_URL}/assets/`;

class EditUserImages extends PureComponent {
    constructor(props) {
        super(props);
        this.imageChange = this.imageChange.bind(this);
    }
    imageChange(e){
        const target = e.target;
        const file = target.files[0];
        const reader = new FileReader();
        const formData = new FormData();
        reader.onloadend = () => {
            if(file){
                formData.append(target.name, file);
                this.props.AddImageToUser(formData);
            }
        }
        if (file) {
            reader.readAsDataURL(file);
        }
    }
    render() {
        let { passportImgUrl, idCardImageUrl, driverLicenseImgUrl } = this.props.data;
        const passportfirst = (passportImgUrl && passportImgUrl.firstPage && (BASE_URL_IMG +passportImgUrl.firstPage)) || '/public/images/imageIcon.png';
        const passportsecond =  (passportImgUrl && passportImgUrl.secondPage && (BASE_URL_IMG +passportImgUrl.secondPage)) || '/public/images/imageIcon.png';
        const idcardfirst = (idCardImageUrl && idCardImageUrl.firstPage && (BASE_URL_IMG +idCardImageUrl.firstPage)) || '/public/images/imageIcon.png';
        const idcardsecond = (idCardImageUrl && idCardImageUrl.secondPage && (BASE_URL_IMG +idCardImageUrl.secondPage)) || '/public/images/imageIcon.png';
        const driver = (driverLicenseImgUrl && (BASE_URL_IMG +driverLicenseImgUrl)) || '/public/images/imageIcon.png';
        return (
            <div className="userImages">
                <div className="imageCategory">
                    <div className="imageInfo">
                        <span>Passport First Page</span>
                        <div className="imageIcon">
                            <label htmlFor="passportImgUrlFirst">
                                <img src={passportfirst}/>
                            </label>
                            <input onChange={this.imageChange} id="passportImgUrlFirst" type="file" name="passportImgUrlFirst" />
                        </div>
                    </div>
                    <div className="imageInfo">
                        <span>Passport Second Page</span>
                        <div className="imageIcon">
                            <label htmlFor="passportImgUrlSecond">
                            <img src={passportsecond}/>
                            </label>
                            <input onChange={this.imageChange} id="passportImgUrlSecond" type="file" name="passportImgUrlSecond" />
                        </div>
                    </div>
                </div>
                <div className="imageCategory">
                    <div className="imageInfo">
                        <span>ID Card First Page</span>
                        <div className="imageIcon">
                            <label htmlFor="idCardImageUrlFirst">
                            <img src={idcardfirst}/>
                            </label>
                            <input onChange={this.imageChange} id="idCardImageUrlFirst" type="file" name="idCardImageUrlFirst" />
                        </div>
                    </div>
                    <div className="imageInfo">
                        <span>ID Card Second Page</span>
                        <div className="imageIcon">
                            <label htmlFor="idCardImageUrlSecond">
                            <img src={idcardsecond}/>
                            </label>
                            <input onChange={this.imageChange} id="idCardImageUrlSecond" type="file" name="idCardImageUrlSecond" />
                        </div>
                    </div>
                </div>
                <div className="imageCategory">
                    <div className="imageInfo">
                        <span>Driver License</span>
                        <div className="imageIcon">
                            <label htmlFor="driverLicenseImg">
                            <img src={driver}/>
                            </label>
                            <input onChange={this.imageChange} id="driverLicenseImg" type="file" name="driverLicenseImg" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
EditUserImages.propTypes = {
    AddImageToUser: propTypes.func.isRequired,
    data: propTypes.objectOf(propTypes.any),
}

export default EditUserImages;
