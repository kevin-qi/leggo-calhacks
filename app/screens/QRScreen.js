import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class QRScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  };

  render() {
    const { hasCameraPermission, scanned } = this.state;
    const { navigation } = this.props;
    const username = navigation.getParam("name");
    const drink_limit = navigation.getParam("drink_limit"); 

    handleBarCodeScanned = ({ type, data }) => {
        this.setState({ scanned: true });

        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        console.log("QR screen unique key:", data);
        navigation.navigate('Home', {
            drink_limit: 12,
            unique_key: data,
            name: "Henry",
            group_key: data.slice(data.length-6, data.length)});
    };

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }

    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }

    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />

        {scanned && (
          <Button title={'Tap to Scan Again'} onPress={() => this.setState({ scanned: false })} />
        )}
      </View>
    );   
    }
}