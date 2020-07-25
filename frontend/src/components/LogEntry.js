import React,{ useEffect, useState } from 'react';
import './LogEntry.css';

const constructionTime = (range) => {
    return range;
};

const progressPercentage = (progress,range) => {
    const percentage = progress / range * 100;
    return Math.round(percentage);
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

    useEffect(() => {
        const interval = setInterval(() => {
          if (progress < range) setProgress(progress + 100);
        }, 1000);
        return () => clearInterval(interval);
    },[progress,range]);

    
    return (
        <div className='logentry'>
            <div className='img'></div>
            {header? <h2>Construction log:</h2> :
                <>
                    <section className='data'>
                        <h3>{data.subject}</h3>
                        <h3>{constructionTime(range)}</h3>
                    </section>
                    <section className='meter'>
                        <h3>{progressPercentage(progress,range)}%</h3>
                    </section>
                </>
            }
        </div>
    );
};

export default LogEntry;
