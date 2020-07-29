import React,{ useEffect, useState } from 'react';
import LogEntry from './LogEntry';
import { mockBuildingProgress } from './mockBuildingProgress';

const readLogEntries = () => {
    return mockBuildingProgress.filter( (e,i) => i < 6);
};


const Log = () => {

    const [data, setData] = useState([]);

    useEffect( () => {
        setData(readLogEntries());
    },[]);


    return (
        <>
            <LogEntry header={true}/>
            {data.map( (entry,i) => (
                <LogEntry key={i} header={false} data={entry}/>
            ))}
        </>
    );
};

export default Log;
