import React,{ useEffect, useState } from 'react';
import ProgressBar from './ProgressBar';
import './LogEntry.css';

const constructionTime = (range) => {
    const h = Math.floor(range / 3600);
    const m = Math.floor( (range-h*3600) / 60);
    const s = range - h * 3600 - m * 60;
    return `${ h < 10 ? '0'+h : h }:${ m < 10 ? '0'+m : m }:${ s < 10 ? '0'+s : s }`;
};

const buildingMessage = (data,ready) => {
    const subject = data.subject.charAt(0).toUpperCase() + data.subject.slice(1);
    let message = data.action === 'build' ?
        `Building ${subject} Level ${data.level}`
        :
        `Upgrading ${subject} to Level ${data.level}`;
    message = ready ? 'My Kingdom' : message;
    return message;
}

const readyMessage = (data) => {
    const subject = data.subject.charAt(0).toUpperCase() + data.subject.slice(1);
    return data.action === 'build' ?
        `You have a new ${subject}!`
        :
        `${subject} upgraded!`;
}

const LogEntry = ({header,data}) => {

    const [progress, setProgress] = useState(0);
    const [range, setRange] = useState(0);
    const [isReady, setIsReady] = useState(false);

    useEffect( () => {
        if (!header) {
            setProgress(data.progress_at-data.started_at);
            setRange(data.finished_at-data.started_at);
            setIsReady(progress === range);
        }
    },[header,data,progress,range]);

    return (
        <div className='logentry'>
            <div className='img'></div>
            {header? <h2>Construction log:</h2> :
                <section>
                    <header>
                        <h3>{buildingMessage(data,isReady)}</h3>
                        <h3>{constructionTime(range)}</h3>
                    </header>
                    { isReady ? <p>{readyMessage(data)}</p> : 
                        <ProgressBar progress={progress} range={range} setIsReady={setIsReady}/>
                    }
                </section>
            }
        </div>
    );
};

export default LogEntry;
