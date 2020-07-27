import React,{ useEffect, useState } from 'react';
import ProgressBar from './ProgressBar';
import './LogEntry.css';

const constructionTime = (range) => {
    return range;
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
                    <body>
                        <ProgressBar progress={progress} range={range} />
                    </body>
                </section>
            }
        </div>
    );
};

export default LogEntry;
