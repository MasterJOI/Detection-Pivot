import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import sidebarStyles from '../../../../components/PublicRoute/styles.module.scss';
import { Link, useHistory } from 'react-router-dom';
import Logo from '@components/Logo/Logo';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { RootState } from '@root/store';
import { FaBars } from 'react-icons/all';
import { IBindingAction, IBindingCallback1 } from '@models/Callbacks';
import { handleToggleSidebarRoutine } from '@screens/Header/routines';
import { ISession } from '@screens/SessionPage/models/ISession';
import { loadCurrentSessionRoutine } from '@screens/SessionPage/routines';

export interface IHeaderProps extends IState, IActions {
}

interface IState {
  currentSession: ISession;
  isSessionPresent: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IActions {
  handleToggleSidebar: IBindingCallback1<boolean>;
  loadCurrentSession: IBindingAction;
}

const Header: React.FC<IHeaderProps> = (
  {
    handleToggleSidebar,
    currentSession,
    isSessionPresent,
    loadCurrentSession
  }
) => {
  const history = useHistory();

  const [description, setDescription] = useState('');

  useEffect(() => {
    if (localStorage.getItem('CURRENT_SESSION_ID') && currentSession.id === '') {
      loadCurrentSession();
    }
  }, [currentSession, loadCurrentSession]);

  useEffect(() => {
    if (currentSession.interfaceDescription !== '') {
      setDescription(currentSession.interfaceDescription);
    } else {
      setDescription('No interface selected');
    }
  }, [currentSession.interfaceDescription]);

  const goToInterfaces = () => {
    history.push('/interfaces');
  };

  return (
    <div className={styles.header_container}>
      <div className={styles.left}>
        <div className={sidebarStyles.btnToggle} onClick={() => handleToggleSidebar(true)}>
          <FaBars />
        </div>
        <Link to="/">
          <Logo width={50} height={34} />
        </Link>
        <span>Detection Pivot</span>
      </div>
      <div className={styles.right}>
        <Button
          className={styles.InterfaceButton}
          content={description}
          icon="right arrow"
          labelPosition="right"
          onClick={goToInterfaces}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  const { data } = state.sessionPageReducer;
  return (
    {
      currentSession: data.session,
      isSessionPresent: data.isSessionPresent
    }
  );
};

const mapDispatchToProps: IActions = {
  handleToggleSidebar: handleToggleSidebarRoutine,
  loadCurrentSession: loadCurrentSessionRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
