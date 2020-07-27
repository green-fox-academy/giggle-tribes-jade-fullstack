import React,{ useEffect, useState } from 'react';
import ProgressBar from './ProgressBar';
import './LogEntry.css';

const constructionTime = (range) => {
    const h = Math.floor(range / 3600);
    const m = Math.floor( (range-h*3600) / 60);
    const s = range - h * 3600 - m * 60;
    return `${ h < 10 ? '0'+h : h }:${ m < 10 ? '0'+m : m }:${ s < 10 ? '0'+s : s }`;
};

const LogEntry = ({header,data}) => {

    const [progress, setProgress] = useState(0);
    const [range, setRange] = useState(0);

    useEffect( () => {
        if (!header) {
            setProgress(data.progress_at-data.started_at);
            setRange(data.finished_at-data.started_at);
        }
    },[header,data]);

    return (
        <div className='logentry'>
            <div className='img'></div>
            {header? <h2>Construction log:</h2> :
                <section>
                    <header>
                        <h3>{data.subject}</h3>
                        <h3>{constructionTime(range)}</h3>
                    </header>
                    <ProgressBar progress={progress} range={range} />
                </section>
            }
        </div>
    );
};

export default LogEntry;
