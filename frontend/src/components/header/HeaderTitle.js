import React from 'react';
import { Link } from 'react-router-dom';
export default function ({ name, route }) {
  if (name && route) {
    return (
      <Link className="header" to={route}>
        <h1 className="header">{name}</h1>
      </Link>
    );
  } else {
    return <h1 className="header">{'Tribes of Vulpes'}</h1>;
  }
}
