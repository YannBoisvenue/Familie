import { MapView } from "expo";
import { Marker } from "react-native-maps";
import React, { Component } from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import { Constants, Location, Permissions } from "expo";
import LocationClass from "./getLocTest";
import { connect } from "react-redux";

class UnconnectedMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      markers: [],
      location: {
        coords: {
          latitude: 0,
          longitude: 0
        }
      },
      errorMessage: null,
      getLoc: new LocationClass()
    };
  }

  static navigationOptions = {
    header: null
  };

  //
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
          title="Test title"
          description="Test description"
          coordinate={{
            latitude: this.state._lat_pos,
            longitude: this.state._lon_pos
          }}
        />
      );
    }
  };

  getLon = () => {
    return this.state.getLoc.state.curLon;
  };

  getLat = () => {
    return this.state.getLoc.state.curLat;
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
          // RICHORE: redux state au lieu de this.state
          latitude: this.props.location.coordinates.latitude,
          longitude: this.props.location.coordinates.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
        <Marker
          title="Test title"
          description="Test description"
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
//  RICHORE: Map state to pros

const mapStateToProps = state => {
  return { location: state.location }; //maploc = moi qui decide le nom. => .location, faut ca match le nom dans le state global (dans le reducer, voir *k1)
};

export default connect(mapStateToProps)(UnconnectedMap);

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
