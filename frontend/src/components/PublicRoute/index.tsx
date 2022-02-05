import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import styles from './styles.module.scss';
import { checkSidebarShown } from '@helpers/sidebarBlackList.helper';
import { history } from '@helpers/history.helper';
import Sidebar from '@screens/Sidebar/containers/SidebarPage';

const PublicRoute = ({ component: Component, ...rest }) => {
  const [isSidebarShown, setIsSidebarShown] = useState(checkSidebarShown());
  history.listen(() => {
    setIsSidebarShown(checkSidebarShown());
  });

  return (
    <Route
      {...rest}
      render={props => (isSidebarShown && !rest.isNotFound ? (
        <div className={styles.app}>
          <Sidebar />
          <Component {...props} />
        </div>
      ) : (
        <Component {...props} />
      ))}
    />
  );
};

export default PublicRoute;
