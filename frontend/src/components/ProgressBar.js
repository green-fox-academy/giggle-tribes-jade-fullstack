import React,{ useEffect, useState } from 'react';

const progressPercentage = (meter,range) => {
    const percentage = meter / range * 100;
    return Math.round(percentage);
};

const ProgressBar = ({progress,range}) => {

    const [meter, setMeter] = useState(progress);

    useEffect( () => {
            setMeter(progress);
    },[progress]);

    useEffect(() => {
        const interval = setInterval(() => {
          if (meter < range) setMeter(meter + 100);
        }, 1000);
        return () => clearInterval(interval);
    },[meter,range]);
    
    return (
            <h3>{progressPercentage(meter,range)}%</h3>
    );
};

export default ProgressBar;
