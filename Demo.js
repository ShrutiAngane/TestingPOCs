import React, { useState,useRef,useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View,AppState,StatusBar,NativeModules} from 'react-native';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
import muxReactNativeVideo from '@mux/mux-data-react-native-video';




const Demo = () => {
  const {PipModule} = NativeModules;
  const [appState, setAppState] = useState(AppState.currentState);
  const[pip,setPIP]=useState(false);
  const[fullscreen,setFullScreen]=useState(false)
  const[overlay,setOverlay]=useState(false)
  const[isPlaying,setIsPlaying]=useState(true)
  const videoRef = useRef(null);
  const MuxVideo = muxReactNativeVideo(Video);
  
  useEffect(() => {

    PipModule.checkPlayer(true);  //because here the video autoplays onload of application
    AppState.addEventListener('change', handleAppStateChange);
    // const myCustomPIPModule = new NativeEventEmitter(NativeModules.PipModule);

    // const subscription = myCustomPIPModule.addListener('pauseVideo', onPauseVideo);
    Orientation.addOrientationListener(handleOrientation);

  }, []);

  

  const handleAppStateChange = (nextAppState) => {

    setAppState(nextAppState);
    if (nextAppState === 'background') {
      setPIP(true)  
    }else{
      setPIP(false)
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

  const handleOverlay=()=>{
    if(overlay){
      setOverlay(false)
    }else{
      setOverlay(true)
    }
  }

  const handleControls=()=>{
    if(isPlaying){
      setIsPlaying(false)
      PipModule.checkPlayer(false)
    }else
    {
      setIsPlaying(true)
      PipModule.checkPlayer(true);
    }
  }

  const styles=StyleSheet.create({
    videoplayer:{width:'100%',height:fullscreen?'100%':300},
    container:{flex:1,backgroundColor:'#000000',gap:60,justifyContent:pip?'center':'flex-start'},
    button:{width:'100%',height:70,display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'green'},
    text:{color:'#FFFFFF',fontSize:18},
  })


  return (
    <View style={{backgroundColor: '#000000', flex: 1}}>
      <TouchableOpacity onPress={handleOverlay}>
        <View style={{width: '100%', height: pip || fullscreen ? '100%' : 300}}>
            <Video
              source={{
                uri: 'https://cdn.discordapp.com/attachments/803610061002768387/1134060366234661005/Baymax.mp4',
              }}
              paused={!isPlaying}
              playInBackground={true}
              ref={videoRef}
              controls={false}
              style={{
                flex: !pip ? 1 : 0,
                width: '100%',
                height: pip || fullscreen ? '100%' : 300,
                justifyContent: pip ? 'center' : 'flex-start',
                
                alignItems: pip ? 'center' : 'flex-start',
              }}
            />
          {overlay && (
            <TouchableOpacity
              style={{position: 'absolute', width: '100%', height: '100%'}}
              onPress={handleOverlay}>
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity onPress={() => handleControls()}>
                  <Text style={styles.text}>
                    {isPlaying ? 'Pause' : 'Play'}
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
      <View
        style={{
          width: '100%',
          height: 500,
          backgroundColor: 'yellow',
          flex: 1,
          gap: 30,
        }}>
        <Text style={{color: '#000000', fontSize: 20}}>
          Hello I am another component !
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleFullScreen}>
          <Text style={styles.text}>Play Video!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default Demo
