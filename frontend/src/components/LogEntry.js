import React,{ useEffect, useState } from 'react';
import ProgressBar from './ProgressBar';
import './LogEntry.css';

const constructionStart = (timestamp) => {
    const d = new Date(timestamp);
    const h = d.getHours();
    const m = d.getMinutes();
    return `${ h < 10 ? '0' + h : h }:${ m < 10 ? '0' + m : m }`;
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
            const start = (new Date(data.started_at)).getTime();
            const finish = (new Date(data.finished_at)).getTime();
            const progress = (new Date(data.progress_at)).getTime();
            setProgress(progress-start);
            setRange(finish-start);
            setIsReady(progress === range);
        }
    },[header,data,progress,range]);

    return (
        <div className='logentry'>
            <div className='img'></div>
            {header? <section className="head"><h2>Construction log:</h2></section> :
                <section>
                    <header>
                        <h3>{buildingMessage(data,isReady)}</h3>
                        <h3>{constructionStart(data.started_at)}</h3>
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
