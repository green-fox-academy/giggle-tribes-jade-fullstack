import React, { useEffect } from 'react';
import LogEntry from './LogEntry';
import { connect } from 'react-redux';
import './Log.css';

const Log = ({ kingdom, buildings, troops }) => {
  useEffect(() => {}, [kingdom, troops, buildings]);

  const processEntry = entry => {
    let data = {
      subject: entry.type || 'troop',
      action: entry.level === 1 ? 'build' : 'upgrade',
      level: entry.level,
      started_at: entry.started_at,
      finished_at: entry.finished_at,
    };
    data.progress_at =
      new Date(data.finished_at) < new Date()
        ? data.finished_at
        : data.started_at;
    return data;
  };

  return (
    <div className="log">
      <LogEntry header={true} />
      {[...troops, ...buildings]
        .sort((a, b) => a.started_at < b.started_at)
        .map((entry, i) =>
          i < 6 ? (
            <LogEntry key={i} header={false} data={processEntry(entry)} />
          ) : (
            ''
          )
        )}
    </div>
  );
};

const mapStateToProps = ({ kingdom, buildings, troops }) => {
  return { kingdom, buildings, troops };
};

export default connect(mapStateToProps)(Log);
