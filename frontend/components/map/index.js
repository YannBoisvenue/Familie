import React, { Component } from "react";
import { MapView } from "expo";
import { Marker } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      markers: []
    };
  }

  static navigationOptions = {
    header: null
  };

  fetchMarkerData() {
    fetch("https://feeds.citibikenyc.com/stations/stations.json")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          markers: responseJson.stationBeanList
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  displayMarker = () => {
    if (this.state._lat_pos && this.state._lon_pos) {
      return (
        <Marker
          title="hello"
          description="penis"
          coordinate={{
            latitude: this.state._lat_pos,
            longitude: this.state._lon_pos
          }}
        />
      );
    }
  };

  render() {
    return (
      <MapView
        onPress={x => {
          x.preventDefault();
          this.setState({ _lat_pos: x.nativeEvent.coordinate.latitude });
          this.setState({ _lon_pos: x.nativeEvent.coordinate.longitude });
        }}
        style={{ flex: 1 }}
        region={{
          latitude: 40.76727216,
          longitude: -73.99392888,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
        <Marker
          title="Hello"
          description="It is NOT kid friendly"
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324
          }}
        />
        {this.displayMarker()}
        {this.state.isLoading
          ? null
          : this.state.markers.map((marker, index) => {
              const coords = {
                latitude: marker.latitude,
                longitude: marker.longitude
              };

              const metadata = `Status: ${marker.statusValue}`;

              return (
                <MapView.Marker
                  key={index}
                  coordinate={coords}
                  title={marker.stationName}
                  description={metadata}
                />
              );
            })}
      </MapView>
    );
  }
}

export default Map;

/** Original render before taking everything apart
 * 
 *   render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={store}>
          <View style={styles.container}>
            <Map markers={this.state.markers} />
            {Platform.OS === "ios" && <StatusBar barStyle="default" />}
            <AppNavigator />
          </View>
        </Provider>
      );
    }
  }
 */
