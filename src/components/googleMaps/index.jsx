import React from "react"
import { compose, withProps, lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import Geocode from 'react-geocode';
Geocode.setApiKey("AIzaSyDclY0B4jjzuRk1q1d0zQwINwhVOf6iqlo");
 
const GoogleMapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDclY0B4jjzuRk1q1d0zQwINwhVOf6iqlo&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px`, width: `650px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    lifecycle({
        componentWillReceiveProps(nextProps){
            this.setState({value: nextProps.value});
        },
        shouldComponentUpdate(nextState, nextProps){
            if(nextProps.value){
                return true;
            }
            return false;
        },
        componentWillMount() {
            const refs = {}
            let position = null;
            this.setState({
                position: null,
                places: [],
                value: this.props.value, 
                onMarkerMounted: ref => {
                    refs.marker = ref;
                },
                onPositionChanged: () => {
                    position = refs.marker.getPosition();
                    this.props.getMarkerPosition({lat: position.lat(), long: position.lng(), });
                },
                onDragEnd: () => {
                    Geocode.fromLatLng(position.lat(), position.lng()).then(
                        response => {
                            const address = response.results[0].formatted_address;
                            this.props.getAddress(address);
                        },
                        error => {
                            console.error(error);
                        }
                    );
                }
            })
        },
    }),
    withScriptjs,
    withGoogleMap
)((props) =>
    <GoogleMap defaultZoom={8} defaultCenter={ props.value? { lat: parseFloat(props.value.lat), lng: parseFloat(props.value.long) } : { lat: 40.177200, lng: 44.503490 }}>
    <Marker position={ props.value? { lat: parseFloat(props.value.lat), lng: parseFloat(props.value.long) } : { lat: 40.177200, lng: 44.503490 }}
        draggable={true}
        ref={props.onMarkerMounted}
        onPositionChanged={props.onPositionChanged}  
        onDragEnd={props.onDragEnd}
    />
    </GoogleMap>
)

class GoogleMapComponentWrapper extends React.PureComponent {

    render() {
        return (
            <div>
                <GoogleMapComponent getMarkerPosition={this.props.getMarkerPosition} getAddress={this.props.getAddress} value={this.props.value} />
            </div>
        )
    }
}

export default GoogleMapComponentWrapper;
