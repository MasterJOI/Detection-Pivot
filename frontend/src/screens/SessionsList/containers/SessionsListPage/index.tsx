import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import { ISessionCard } from '@screens/SessionsList/models/ISessionCard';
import { IBindingCallback1 } from '@models/Callbacks';
import LoaderWrapper from '@components/LoaderWrapper';
import { isEmptyArray } from 'formik';
import InfiniteScroll from 'react-infinite-scroll-component';
import SessionCard from '@components/SessionCard';
import NotFoundContent from '@components/NotFoundContent';
import {
  deleteSessionRoutine,
  fetchSessionsRoutine,
  setLoadMoreSessionsRoutine
} from '@screens/SessionsList/routines';
import SegmentHeader from '@components/SegmentHeader';
import { extractFetchSessionsLoading } from '@screens/SessionsList/reducers';
import { RootState } from '@root/store';

export interface ISessionsListPageProps extends IState, IActions {
}

interface IState {
  sessions: ISessionCard[];
  dataLoading: boolean;
  loadMore: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IActions {
  fetchSessions: IBindingCallback1<object>;
  setLoadMoreSessions: IBindingCallback1<boolean>;
  deleteSession: IBindingCallback1<object>;
}

const params = {
  from: 0,
  count: 10,
  id: ''
};

const SessionsList: React.FC<ISessionsListPageProps> = (
  {
    sessions,
    dataLoading,
    loadMore,
    fetchSessions,
    setLoadMoreSessions,
    deleteSession
  }
) => {
  useEffect(() => {
    setLoadMoreSessions(false);
    params.from = 0;
    fetchSessions({ from: 0, count: 10 });
  }, []);

  const deleteAction = session => {
    deleteSession({ sessionId: session.id });
  };

  const handleLoadMoreSessions = filtersPayload => {
    fetchSessions(filtersPayload);
  };

  const getMoreSessions = () => {
    if (!dataLoading) {
      setLoadMoreSessions(true);
      const { from, count } = params;
      params.from = from + count;
      /* params.id = currentUser.id;*/
      handleLoadMoreSessions(params);
    }
  };

  if (dataLoading && !loadMore) {
    return (
      <main>
        <LoaderWrapper loading={dataLoading} />
      </main>
    );
  }

  return (
    <main id="scrollWrapper">
      <SegmentHeader
        size="h2"
        iconName="list"
        content="Saved sessions"
        subheader="You can delete all data about the session by clicking the button 'Delete'"
      />
      <InfiniteScroll
        style={{ overflow: 'none' }}
        next={getMoreSessions}
        hasMore
        loader={' '}
        dataLength={sessions ? sessions.length : 0}
        scrollableTarget="scrollWrapper"
        scrollThreshold={0.9}
      >
        {!isEmptyArray(sessions) && sessions ? (
          sessions.map(session => (
            <SessionCard
              dataLoading={dataLoading && !loadMore}
              key={session.id}
              session={session}
              deleteAction={deleteAction}
            />
          ))
        ) : (
          <NotFoundContent description="Sessions list is empty" />
        )}
      </InfiniteScroll>
    </main>
  );
};

const mapStateToProps = (state: RootState) => {
  const { data } = state.sessionsListPageReducer;

  return (
    {
      sessions: data.sessions,
      dataLoading: extractFetchSessionsLoading(state),
      loadMore: data.loadMore
    }
  );
};

const mapDispatchToProps: IActions = {
  fetchSessions: fetchSessionsRoutine,
  setLoadMoreSessions: setLoadMoreSessionsRoutine,
  deleteSession: deleteSessionRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionsList);
