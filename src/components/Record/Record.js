import React, { useState, useEffect, useRef } from 'react';
import 'boxicons';
import './style.css';
import { storageRef } from '../../firebase/firebase';


export default function Record() {

    const [audio, setAudio] = useState(null);
    const [mediaRecord, setMediaRecord] = useState(null);
    const [audioURL, setAudioURL] = useState([]);
    const [timeCount, setTimeCount] = useState(0);
    const [isMode, setIsMode] = useState(1);

    const listAudio = useRef();
    const timeDuring = useRef();
    const timeStart = useRef();

    useEffect(() => {
        if (!audio || isMode == 2) return;

        //Create MediaRecord
        let mediaRecord = new MediaRecorder(audio);

        let timeD = (timeDuring !== "") ? timeDuring.current.value : 0;   

        if(timeD > 0) setIsMode(2);

        //Set mediaRecord
        setMediaRecord(mediaRecord);

        //Start recording
        mediaRecord.start();

        let count = 1;
        let time = setInterval(() => {
            if(count > timeD && timeD > 0){
                clearInterval(time);
                stopRecording(mediaRecord);
            }
            setTimeCount(count++);
        }, 1000);

        //Array to store data record
        let chunks = [];

        //List recording event mediaRecorder
        mediaRecord.addEventListener("dataavailable", (e) => {
            chunks.push(e.data);
        });

        //Listen stop event mediaRecorder
        mediaRecord.addEventListener("stop", (e) => {
            let blob = new Blob(chunks);
            let url = URL.createObjectURL(blob);

            clearInterval(time);
            setTimeCount(0);

            listAudio.current.innerHTML += `<li><audio src=${url} controls="1"></audio></li>`;

            //Create File MP3
            let file = new File(chunks, makeid(10), {
                type: "audio/mpeg",
            });

            //Save file
            let mp3Ref = storageRef.child(file.name + ".mp3");
            mp3Ref.put(file);
        });
    }, [audio]);

    const getList = async () => {

        const res = await storageRef.listAll();
        for(let i=0;i<res.items.length;i++){
            const url = await res.items[i].getDownloadURL();
            listAudio.current.innerHTML += `<li><audio src=${url} controls="1"></audio></li>`;
        }
    }

    useEffect(() => {
        listAudio.current.innerHTML = "";
        getList();
    }, [])

    //Function to toggle record mode
    const toggleRecording = () => {
        if (!audio) {

            let timeS = (timeStart !== "") ? timeStart.current.value : 0; 

            setTimeout(() => {
                startRecording();
            }, timeS * 1000);

        } else {
            stopRecording(mediaRecord);
        }
    }

    const startRecording = async () => {
        const audioToggle = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false
        });

        setAudio(audioToggle);
    }

    const stopRecording = (mediaRecord) => {
        if(isMode == 2) return;
        mediaRecord.stop();
        setAudio(null);
        setIsMode(1);
    }

    //Function to generate name file
    const makeid = (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    return (
        <div>
            <main>
                <div className="options">
                    <div className="form-input">
                        <label>Start recording after: </label>
                        <input type="text" name="timeStart" ref={timeStart} />                        
                    </div>
                    <div className="form-input">
                        <label>During time recording: </label>
                        <input type="text" name="timeDuring" ref={timeDuring} />                        
                    </div>
                </div>
                <div className="btn-control" onClick={toggleRecording}>
                    {(audio) ? <box-icon color="white" size="md" name='pause'></box-icon> : <box-icon color="white" size="md" name='play' ></box-icon>}
                </div>
                <div className="time">Recoding Time: {timeCount}s</div>
                <h1>List File Recorded</h1>
                <ul className="list-file" ref={listAudio}></ul>
            </main>
        </div>
    )
}
