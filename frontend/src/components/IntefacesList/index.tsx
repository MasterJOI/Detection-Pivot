import React from 'react';
import { List } from 'semantic-ui-react';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';

const InterfacesList = data => {
  const saveInterface = hostInterface => {
    localStorage.setItem('currentInterface', hostInterface.name);
    localStorage.setItem('currentInterfaceDescription', hostInterface.description);
  };

  return (
    <List selection verticalAlign="middle" className={styles.InterfaceList}>
      {/* eslint-disable-next-line react/destructuring-assignment */}
      {data.data.map(hostInterface => (
        <List.Item>
          <Link to="/start" onClick={() => saveInterface(hostInterface)}>
            <List.Content>
              <List.Header>{hostInterface.description}</List.Header>
            </List.Content>
          </Link>
        </List.Item>
      ))}
    </List>
  );
};

export default InterfacesList;
