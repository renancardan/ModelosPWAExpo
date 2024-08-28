import React, { useState, useEffect } from 'react';
import { Button, PermissionsAndroid, Platform, SafeAreaView, StyleSheet, Switch, Text, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { Player, Recorder, MediaStates } from '@react-native-community/audio-toolkit';
import { request, PERMISSIONS } from 'react-native-permissions';

const filename = 'test.mp4';

export default () => {
    const [disabled, setdisabled] = useState(false);

    const escutar = ()=>{
    setdisabled(true);
      

      // Start recording
      let rec = new Recorder("filename.mp4", 
      {
        bitrate: 256000,
        channels: 2,
        sampleRate: 44100,
        quality: 'max'
      }).prepare((err, fsPath)=>{
        console.log(fsPath);
      });

        rec.record();

      setTimeout(() => {
        rec.stop((err) => {
          // NOTE: In a real situation, handle possible errors here
    
          // Play the file after recording has stopped
          new Player("filename.mp4")
          .play()
          .on('ended', () => {
            // Enable button again after playback finishes
            setdisabled(false);
          });
        });
      }, 3000);

     
    }

    const parar = ()=>{
      new Recorder('test.mp4').record().stop((err) => {
        new Player('test.mp4')
        .play()
        .on('ended', () => {
          setdisabled(false);
         
        });

        
      });
    }


    const ouvir = ()=>{
      new Player("/data/user/0/com.cityhand/files/filename.mp4")
      .play()
      .on('ended', () => {
        
       
      });
    }
    

    // useEffect(() => {
    //     setplayer(null);
    //     setrecorder(null);
    //     setlastSeek(0);

    //     reloadPlayer();
    //     reloadRecorder();
    // }, [])

    // const reloadPlayer = ()=>{
    //     if (player) {
    //         player.destroy();
    //     }
    //     player = new Player(filename, {
    //         autoDestroy: false
    //       }).prepare((err) => {
    //         if (err) {
    //           console.log('error at _reloadPlayer():');
    //           console.log(err);
    //         } else {
    //           player.looping = loopButtonStatus;
    //         }
      
    //         updateState();
    //       });
      
    //       updateState();
      
    //       this.player.on('ended', () => {
    //         this._updateState();
    //       });
    //       this.player.on('pause', () => {
    //         this._updateState();
    //       });

    // }

    // const reloadRecorder= ()=>{
    //     if (recorder) {
    //         recorder.destroy();
    //       }
    // }

    // const updateState = (err)=>{
    //     setplayPauseButton( player && player.isPlaying ? 'Pause' : 'Play');
    //     setrecordButton(recorder && recorder.isRecording ? 'Stop' : 'Record');
       

    // }

    return(
        <>
        <View>
          <Text style={styles.title}>
            Playback
          </Text>
        </View>
        <View >
          <Button title={'Play'}  onPress={() => ouvir()} />
          <Button title={'Stop'}  onPress={null} />
        </View>
        <View style={styles.settingsContainer}>
          <Switch
            onValueChange={null}
            value={false} />
          <Text>Toggle Looping</Text>
        </View>
        <View style={styles.slider}>
          <Slider step={0.0001}  onValueChange={null} value={10} />
        </View>
        <View>
          <Text style={styles.title}>
            Recording
          </Text>
        </View>
        <View>
          <Button title={'Stop'}  onPress={() => parar()} />
        </View>
        <View>
          <Button title={'Gravar'} disabled={disabled} onPress={() =>escutar()} />
        </View>
        <View>
          <Text style={styles.errorMessage}>Texte</Text>
        </View>
        </>
    )
};

const styles = StyleSheet.create({
    slider: {
      height: 10,
      margin: 10,
      marginBottom: 50,
    },
    settingsContainer: {
      alignItems: 'center',
    },
    container: {
      borderRadius: 4,
      borderWidth: 0.5,
      borderColor: '#d6d7da',
    },
    title: {
      fontSize: 19,
      fontWeight: 'bold',
      textAlign: 'center',
      padding: 20,
    },
    errorMessage: {
      fontSize: 15,
      textAlign: 'center',
      padding: 10,
      color: 'red'
    }
  });
  