//
// <a href="https://www.flaticon.com/free-icons/emojis" title="emojis icons">Emojis icons created by zafdesign - Flaticon</a>
//

import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import { useState, useEffect } from "react";
import * as React from "react";
import * as FaceDetector from "expo-face-detector";
import * as MediaLibrary from 'expo-media-library';

export default function App() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [faceData, setFaceData] = React.useState([]);
  const [faceDataDetect, setFaceDataDetect] = React.useState([]);
  const [containerColor, setContainerColor] = React.useState("red");

  if (!permission) {
    return <Text>Pas d'accès à la caméra</Text>;
  }

  // set Styles Constance to GETSTYLES function
  const styles = getStyles(containerColor);

  // Change state of CameraType (Front or Back)
  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  // 
  function getFaceDataView() {
    if (faceData.length === 0) {
      return <Text style={styles.faceStatus}>Pas de visage detecté</Text>;
    } else {
      return <Text style={styles.faceStatus}>Visage !</Text>;
    }
  }

  // Display Text near Mouth

  function getFaceTextPosition() {
    if (faceDataDetect.length !== 0) {
      console
      return (
        <Text
          style={{
            position: "absolute",
            left: faceData[0].BOTTOM_MOUTH.x,
            top: faceData[0].BOTTOM_MOUTH.y,
          }}
        >
          Bouche
        </Text>
      );
    } else {
      return <Text></Text>;
    }
  }


  // Display Smiley from face data point (smiling/not smiling, left-wink, right-wing, closed eyes)

  function smiley() {
    let smiling = faceData[0]?.smilingProbability;
    let left = faceData[0]?.leftEyeOpenProbability;
    let right = faceData[0]?.rightEyeOpenProbability;

    if (faceData?.length !== 0) {
      if (smiling < 0.4) {
        if (left < 0.82 && right < 0.82) {
          return (
            <Image
              source={require("./assets/closed-closed.png")}
              style={styles.image}
            />
          );
        } else if (left < 0.82) {
          return (
            <Image
              source={require("./assets/closed-left-wink.png")}
              style={styles.image}
            />
          );
        } else if (right < 0.82) {
          return (
            <Image
              source={require("./assets/closed-right-wink.png")}
              style={styles.image}
            />
          );
        } else {
          return (
            <Image
              source={require("./assets/closed-open.png")}
              style={styles.image}
            />
          );
        }
      }

      if (smiling > 0.4) {
        if (left < 0.82 && right < 0.82) {
          return (
            <Image
              source={require("./assets/teeth-closed.png")}
              style={styles.image}
            />
          );
        } else if (left < 0.82) {
          return (
            <Image
              source={require("./assets/teeth-left-wink.png")}
              style={styles.image}
            />
          );
        } else if (right < 0.82) {
          return (
            <Image
              source={require("./assets/teeth-right-wink.png")}
              style={styles.image}
            />
          );
        } else {
          return (
            <Image
              source={require("./assets/teeth-open.png")}
              style={styles.image}
            />
          );
        }
      }
    }
  }

  // Switch container color to GREEN if a Face is detected

  const handleFacesDetected = ({ faces }) => {
    // console.log(faces);
    setFaceData(faces);
    setFaceDataDetect(faces);
    if (faceData.length === 0) {
      setContainerColor("red");
    } else {
      setContainerColor("green");
    }
    getStyles(containerColor);
  };

  // Change text inside Button to Camera.Type (Front or Back)

  function cameraSide() {
    return <Text style={styles.text}>{type.toUpperCase()}</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        onFacesDetected={handleFacesDetected}
        faceDetectorSettings={{
          mode: FaceDetector.FaceDetectorMode.fast,
          detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
          runClassifications: FaceDetector.FaceDetectorClassifications.all,
          minDetectionInterval: 50,
          tracking: true,
        }}
      >
        {getFaceTextPosition()}
      </Camera>
      <View style={styles.bottomContainer}>
        <View style={styles.buttonContainer}>
          {getFaceDataView()}
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            {cameraSide()}
            <Text style={styles.text}>Appuyer pour changer</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.smileyContainer}>{smiley()}</View>
      </View>
    </View>
  );
}

// GETSTYLES function to pass parameters to STYLE constance
const getStyles = (containerColor) =>
  StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: "rgba(0, 256, 0, 0.452)",
      // borderColor: containerColor,
      // borderWidth: 10,
    },
    button: {
      borderWidth: 5,
      width: 200,
      backgroundColor: "black",
      alignSelf: "center",
      borderRadius: 20,
      margin: 5,
    },
    camera: {
      flex: 3,
      borderColor: "red",
      borderWidth: 3,
      alignContent: "center",
      justifyContent: "flex-end",
    },
    text: { color: "white", alignSelf: "center" },
    faceStatus: {
      justifyContent: "center",
      alignContent: "center",
      alignSelf: "center",
      margin: 10,
      fontSize: 20,
      fontWeight: "bold",
      backgroundColor: "rgba(0, 0, 0, 0.452)",
      color: containerColor,
      padding: 10,
      borderRadius: 20,
    },
    buttonContainer: { flex: 2 },

    smileyContainer: { flex: 1, justifyContent: "center" },

    bottomContainer: {
      backgroundColor: "grey",
      flexDirection: "row",
      flex: 1,
    },
    image: { width: 120, height: 120, alignSelf: "center" },
  });

//
// <a href="https://www.flaticon.com/free-icons/emojis" title="emojis icons">Emojis icons created by zafdesign - Flaticon</a>
//
