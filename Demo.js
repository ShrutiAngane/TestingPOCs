import React, { useState,useRef,useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View,AppState,StatusBar } from 'react-native';
import Video from 'react-native-video';
import MyCustomModule from './MyCustomModule'
import Orientation from 'react-native-orientation-locker';



const Demo = () => {
  const [appState, setAppState] = useState(AppState.currentState);
  const[pip,setPIP]=useState(false);
  const[fullscreen,setFullScreen]=useState(false)
  const videoRef = useRef(null);
  useEffect(() => {

    AppState.addEventListener('change', handleAppStateChange);
    // const myCustomPIPModule = new NativeEventEmitter(NativeModules.PipModule);

    // const subscription = myCustomPIPModule.addListener('pauseVideo', onPauseVideo);
    Orientation.addOrientationListener(handleOrientation);

  }, []);

  

  const handleAppStateChange = (nextAppState) => {

    setAppState(nextAppState);
    if (nextAppState === 'background') {
      console.log('background')
      setPIP(true)  
    }else{
      setPIP(false)
      console.log('active')
    }
  };

  const handleFullScreen=()=>{
    if(fullscreen){
      Orientation.unlockAllOrientations();
    }else{
      Orientation.lockToLandscapeLeft();
    }
  }

  const handleOrientation=(orientation)=>{
    if(orientation=='LANDSCAPE-LEFT'|| orientation=='LANDSCAPE-RIGHT'){
      setFullScreen(true);
      StatusBar.setHidden(true);
    }else{
      setFullScreen(false);
      StatusBar.setHidden(false);
    }
  }

  const styles=StyleSheet.create({
    videoplayer:{width:'100%',height:300},
    container:{flex:1,backgroundColor:'#000000',gap:60,justifyContent:pip?'center':'flex-start'},
    button:{width:'100%',height:70,display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'green'},
    text:{color:'#FFFFFF',fontSize:18},
  })


  return (
    <View style={styles.container}>
      <Video
        style={styles.videoplayer}
        source={{uri : 'https://cdn.discordapp.com/attachments/803610061002768387/1134060366234661005/Baymax.mp4'}}
        controls={true}
        ref={videoRef}
        playInBackground={true}
        />
        {!pip && !fullscreen && <TouchableOpacity style={styles.button} onPress={handleFullScreen}>
          <Text style={styles.text}>Play Video</Text>
        </TouchableOpacity>}
    </View>
    
  )
}



export default Demo