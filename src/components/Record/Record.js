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
    const [isRecording, setIsRecording] = useState(false);

    let timeS = 0;
    let timeout = null;

    const listAudio = useRef(null);
    const recordingBtn = useRef(null);

    useEffect(() => {
        if(!audio) return;

        //Create MediaRecord
        let mediaRecord = new MediaRecorder(audio);

        //Set mediaRecord
        setMediaRecord(mediaRecord);

        //Start recording
        mediaRecord.start();

        let count = 1;
        let time = setInterval(() => {
            if(count > 10 && isMode == 2){
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

            setIsRecording(false);
            recordingBtn.current.classList.remove("recording");

            clearInterval(time);
            setTimeCount(0);

            //Add audio to HTML Element
            const liHTML = document.createElement("li");
            const audioHTML = new Audio();
            audioHTML.setAttribute("src", url);
            audioHTML.setAttribute("controls", "1");
            liHTML.prepend(audioHTML);
            listAudio.current.prepend(liHTML);

            //Create File MP3
            let file = new File(chunks, makeid(10), {
                type: "audio/mpeg",
            });

            //Save file
            let mp3Ref = storageRef.child(file.name + ".mp3");
            mp3Ref.put(file);
        });
    }, [audio]);


    //Function to get list audio recorded
    const getList = async () => {

        const res = await storageRef.listAll();
        for(let i=0;i<res.items.length;i++){
            const url = await res.items[i].getDownloadURL();

            //Add audio to HTML Element
            const liHTML = document.createElement("li");
            const audioHTML = new Audio();
            audioHTML.setAttribute("src", url);
            audioHTML.setAttribute("controls", "1");
            liHTML.prepend(audioHTML);
            listAudio.current.prepend(liHTML);
        }
    }

    //Get list after start loading page
    useEffect(() => {
        listAudio.current.innerHTML = "";
        getList();
    }, [])

    //Function to toggle record mode
    const toggleRecording = (e) => {
        if (!audio && !isRecording) {

            if(isMode == 2) timeS = 5; 
            setIsRecording(true);
            recordingBtn.current.classList.add("recording");

            setTimeout(() => {
                startRecording();
            }, timeS * 1000);
        }else if(audio){
            stopRecording(mediaRecord);
        }
    }

    //Function to start recording
    const startRecording = async () => {
        const audioToggle = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false
        });

        setAudio(audioToggle);
    }

    //Function to stop recording
    const stopRecording = (mediaRecord) => {
        mediaRecord.stop();
        setAudio(null);
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

    //Function to changeMode when selecting mode
    const changeMode = (e) => {
        const value = e.target.value;

        setIsMode(value);
    }

    return (
        <div>
            <main>
                <div className="options">
                    <select onChange={changeMode}>
                        <option value="1">Default</option>
                        <option value="2">Record audio within 10s after 5s</option>
                    </select>
                </div>
                <div className="btn-control" onClick={toggleRecording} ref={recordingBtn}>
                    {(isRecording) ? <box-icon color="white" size="md" name='pause'></box-icon> : <box-icon color="white" size="md" name='play' ></box-icon>}
                </div>
                <div className="time">Recoding Time: {timeCount}s</div>
                {(isMode == 2) ? "Start recording after 5s" : ""}
                <h1>List File Recorded</h1>
                <ul className="list-file" ref={listAudio}></ul>
            </main>
        </div>
    )
}
