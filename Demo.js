import React, { useState,useRef,useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View,AppState,StatusBar,NativeModules,Image} from 'react-native';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
import muxReactNativeVideo from '@mux/mux-data-react-native-video';
import app from './package.json';


const MuxVideo = muxReactNativeVideo(Video);
const {PipModule} = NativeModules;

const Demo = () => {
  const [appState, setAppState] = useState(AppState.currentState);
  const[pip,setPIP]=useState(false);
  const[fullscreen,setFullScreen]=useState(false)
  const[overlay,setOverlay]=useState(false)
  const[isPlaying,setIsPlaying]=useState(true)
  const videoRef = useRef(null);
  
  
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
      PipModule.checkPlayer(true);
    }else{
      setOverlay(true)
      PipModule.checkPlayer(false)
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
          <MuxVideo source={{
                uri: 'https://cdn.discordapp.com/attachments/803610061002768387/1134060366234661005/Baymax.mp4',
              }}
              style={{
                flex: !pip ? 1 : 0,
                width: '100%',
                height: pip || fullscreen ? '100%' : 300,
                justifyContent: pip ? 'center' : 'flex-start',
                alignItems: pip ? 'center' : 'flex-start',
              }}
              playInBackground={true}
              paused={!isPlaying}
              muxOptions={{
                application_name: app.name,           // (required) the name of your application
                application_version: app.version,      // the version of your application (optional, but encouraged)
                data: {
                  env_key: '1698phtdt3cu586krk2tfedvb',     // (required)
                  video_id: 'MuxTesting1.0',             // (required)
                  video_title: 'My mux testing',
                  player_software_version: '5.0.2',     // (optional, but encouraged) the version of react-native-video that you are using
                  player_name: 'React Native Player',  // See metadata docs for available metadata fields https://docs.mux.com/docs/web-integration-guide#section-5-add-metadata
                },
              }}>
          </MuxVideo>
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
                 <Image source={isPlaying?require('./assets/images/pause.png'):require('./assets/images/play.png')} style={{height:30,width:30}}></Image>
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
