import React, { useEffect } from 'react';
import LogEntry from './LogEntry';
import { connect } from 'react-redux';
import { getTroopsAction } from '../actions/TroopsActions';
import { getBuildingsAction } from '../actions/BuildingsActions';
import './Log.css';

const Log = ({ kingdom, buildings, troops, get }) => {

  useEffect(() => {
    get(kingdom);
  }, [kingdom, get]);

  const processTroopEntry = entry => {
    let data = {
      subject : 'troop',
      action : (entry.level === 1) ? 'build' : 'upgrade',
      level : entry.level,
      started_at : entry.started_at,
      finished_at : entry.finished_at
    };
    data.progress_at = ( new Date(data.finished_at) < new Date() ) ? data.finished_at : data.started_at;
    return data;
  };
  
  return (
    <div className="log">
      <LogEntry header={true} />
      {troops.map((entry, i) => (
        <LogEntry key={i} header={false} data={processTroopEntry(entry)} />
      ))}
    </div>
  );
};

/*
{buildings.map((entry, i) => (
        <LogEntry key={i} header={false} data={entry} />
      ))}*/

const mapStateToProps = ({ kingdom, buildings, troops }) => {
  return { kingdom, buildings, troops };
};

const mapDispatchToProps = dispatch => {
  return {
    get: kingdomId => {
      dispatch(getTroopsAction(kingdomId));
      //dispatch(getBuildingsAction(kingdomId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Log);

