import React,{ useEffect, useState } from 'react';
import LogEntry from './LogEntry';
import { logEntryService } from '../services/logEntryService';

const Log = () => {

    const [data, setData] = useState([]);

    useEffect( () => {
        setData(logEntryService.readLogEntries());
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
