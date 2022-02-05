import React, { useEffect, useState } from 'react';
import { IBindingCallback1 } from '@models/Callbacks';
import SockJsClient from 'react-stomp';
import { Button } from 'semantic-ui-react';
import { RootState } from '@root/store';
import {
  closeSessionRoutine,
  toggleSnifferStateRoutine
} from '@screens/SessionPage/routines';
import { connect } from 'react-redux';
import { Column, Table, AutoSizer } from 'react-virtualized';
import 'react-virtualized/styles.css';
import styles from './styles.module.scss';
import { ISession } from '@screens/SessionPage/models/ISession';
import LoaderWrapper from '@components/LoaderWrapper';

export interface ISnifferBlockProps extends IState, IActions {
}

interface IState {
  currentSession: ISession;
}

interface IActions {
  sendIsSnifferOn: IBindingCallback1<object>;
  closeSession: IBindingCallback1<object>;
}

const SOCKET_URL = 'http://localhost:5000/ws-packet';

const SnifferBlock: React.FC<ISnifferBlockProps> = (
  {
    currentSession,
    sendIsSnifferOn,
    closeSession
  }
) => {
  const [data, setData] = useState([]);
  const [session, setSession] = useState(currentSession);

  useEffect(() => {
    setSession(currentSession);
    if (currentSession.packets && data.length === 0) {
      setData(currentSession.packets);
    }
  }, [currentSession]);

  const onConnected = () => {
    console.log('Connected!!');
  };

  const onPacketReceived = pkt => {
    setData(oldData => [...oldData, pkt]);
  };

  const toggleSniffingState = () => {
    sendIsSnifferOn({ isSnifferOn: !session.snifferOn, sessionId: session.id });
  };

  const closeCurrentSession = () => {
    closeSession({ sessionId: session.id });
  };

  return (
    <main>
      { session ? (
        <div>
          <div className={styles.buttonsWrapper}>
            <Button
              primary
              content="Close session"
              onClick={closeCurrentSession}
            />
            <Button
              negative={session.snifferOn}
              positive={!session.snifferOn}
              content={(session.snifferOn ? 'Stop sniffer' : 'Launch sniffer')}
              onClick={toggleSniffingState}
            />
          </div>
          <SockJsClient
            url={SOCKET_URL}
            topics={['/topic/packet']}
            onConnect={onConnected}
            onDisconnect={console.log('Disconnected!')}
            onMessage={pkt => onPacketReceived(pkt)}
            debug={false}
            onClose={sendIsSnifferOn}
          />
          <AutoSizer>
            {({ width }) => (
              <Table
                width={width}
                height={560}
                headerHeight={30}
                rowHeight={30}
                rowCount={data.length}
                rowGetter={({ index }) => data[index]}
                rowStyle={({ index }) => (data[index] && data[index].suspicious
                  ? { backgroundColor: 'rgba(229, 131, 131, 0.56)' } : null)}
              >
                <Column
                  label="Interception time"
                  dataKey="interceptedAt"
                  width={200}
                />
                <Column
                  width={200}
                  label="Source MAC"
                  dataKey="macSrc"
                />
                <Column
                  width={200}
                  label="Destination MAC"
                  dataKey="macDst"
                />
                <Column
                  width={200}
                  label="Source IP"
                  dataKey="ipSrc"
                />
                <Column
                  width={200}
                  label="Destination IP"
                  dataKey="ipDst"
                />
                <Column
                  width={200}
                  label="Transport protocol"
                  dataKey="protocol"
                />
                <Column
                  width={200}
                  label="Source port"
                  dataKey="portSrc"
                />
                <Column
                  width={200}
                  label="Destination port"
                  dataKey="portDst"
                />
                <Column
                  width={200}
                  label="DNS"
                  dataKey="dnsName"
                />
              </Table>
            )}
          </AutoSizer>
        </div>
      ) : <LoaderWrapper loading />}
    </main>
  );
};

const mapStateToProps = (state: RootState) => {
  const { data } = state.sessionPageReducer;
  return (
    {
    }
  );
};

const mapDispatchToProps: IActions = {
  sendIsSnifferOn: toggleSnifferStateRoutine,
  closeSession: closeSessionRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(SnifferBlock);
