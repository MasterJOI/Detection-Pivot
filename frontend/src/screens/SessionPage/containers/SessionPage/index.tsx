import React, { useEffect } from 'react';
import { IBindingAction } from '@models/Callbacks';
import { RootState } from '@root/store';
import { loadCurrentSessionRoutine } from '@screens/SessionPage/routines';
import { connect } from 'react-redux';
import 'react-virtualized/styles.css';
import { ISession } from '@screens/SessionPage/models/ISession';
import InterfaceSelectionBlock from '@screens/SessionPage/components/InterfaceSelectionBlock';
import SnifferBlock from '@screens/SessionPage/components/SnifferBlock';
import LoaderWrapper from '@components/LoaderWrapper';

export interface ISessionPageProps extends IState, IActions {
}

interface IState {
  isSessionPresent: boolean;
  currentSession: ISession;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IActions {
}

const SessionPage: React.FC<ISessionPageProps> = (
  {
    isSessionPresent,
    currentSession
  }
) => {
  if (localStorage.getItem('CURRENT_SESSION_ID')) {
    return isSessionPresent ? (
      <SnifferBlock
        currentSession={currentSession}
      />
    )
      : (
        <main>
          <LoaderWrapper loading />
        </main>
      );
  }
  return <InterfaceSelectionBlock />;
};

const mapStateToProps = (state: RootState) => {
  const { data } = state.sessionPageReducer;
  return (
    {
      isSessionPresent: data.isSessionPresent,
      currentSession: data.session
    }
  );
};

const mapDispatchToProps: IActions = {
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionPage);
