import React, { useEffect } from 'react';
import { IBindingAction, IBindingCallback1 } from '@models/Callbacks';
import { RootState } from '@root/store';
import { connect } from 'react-redux';
import 'react-virtualized/styles.css';
import { IInterface } from '@screens/SessionPage/models/IInterface';
import LoaderWrapper from '@components/LoaderWrapper';
import {
  fetchInterfacesRoutine,
  sendSessionFormRoutine
} from '@screens/SessionPage/routines';
import SegmentHeader from '@components/SegmentHeader';
import styles from '@components/IntefacesList/styles.module.scss';
import { List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export interface IInterfaceSelectionBlockProps extends IState, IActions {
}

interface IState {
  isInterfacesLoading: boolean;
  interfaces: IInterface[];
}

interface IActions {
  fetchInterfaces: IBindingAction;
  sendSessionForm: IBindingCallback1<object>;
}

const InterfaceSelectionBlock: React.FC<IInterfaceSelectionBlockProps> = (
  {
    isInterfacesLoading,
    interfaces,
    fetchInterfaces,
    sendSessionForm
  }
) => {
  useEffect(() => {
    fetchInterfaces();
  }, []);

  const createSession = hostInterface => {
    const interfaceName = hostInterface.name;
    const interfaceDescription = hostInterface.description;
    sendSessionForm({ interfaceName, interfaceDescription });
  };

  return (
    <main>
      {!isInterfacesLoading ? (
        <div>
          <SegmentHeader
            size="h2"
            iconName="settings"
            content="Choice of interface"
            subheader="Before starting a session, you need to select one of the interfaces for scanning"
          />
          {/* <InterfacesList data={interfaces} />*/}
          <List selection verticalAlign="middle" className={styles.InterfaceList}>
            {interfaces.map(hostInterface => (
              <List.Item>
                <Link to="/start" onClick={() => createSession(hostInterface)}>
                  <List.Content>
                    <List.Header>{hostInterface.description}</List.Header>
                  </List.Content>
                </Link>
              </List.Item>
            ))}
          </List>
        </div>
      )
        : <LoaderWrapper loading={isInterfacesLoading} />}
    </main>
  );
};

const mapStateToProps = (state: RootState) => {
  const { data } = state.sessionPageReducer;
  return (
    {
      isInterfacesLoading: data.isInterfacesLoading,
      interfaces: data.interfaces
    }
  );
};

const mapDispatchToProps: IActions = {
  fetchInterfaces: fetchInterfacesRoutine,
  sendSessionForm: sendSessionFormRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(InterfaceSelectionBlock);
