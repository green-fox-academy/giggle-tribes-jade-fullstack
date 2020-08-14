import React,{ useEffect, useState } from 'react';

const progressPercentage = (meter,range) => {
    const percentage = meter / range * 100;
    return Math.round(percentage);
};

const ProgressBar = ({progress,range,setIsReady}) => {

    const [meter, setMeter] = useState(progress);

    useEffect( () => {
            setMeter(progress);
    },[progress]);

    useEffect(() => {
        const interval = setInterval(() => {
          if (meter <= range) setMeter(meter + 1000);
          if (meter >= range) setIsReady(true);
        }, 1000);
        return () => clearInterval(interval);
    },[meter,range,setIsReady]);
    
    return (
        <progress id="subjectProgress" value={progressPercentage(meter,range) || 0} max="100"></progress>
    );
};

export default ProgressBar;
