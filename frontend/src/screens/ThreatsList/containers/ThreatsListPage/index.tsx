import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { IBindingCallback1 } from '@models/Callbacks';
import LoaderWrapper from '@components/LoaderWrapper';
import { isEmptyArray } from 'formik';
import InfiniteScroll from 'react-infinite-scroll-component';
import NotFoundContent from '@components/NotFoundContent';
import { extractFetchThreatsLoading } from '@screens/ThreatsList/reducers';
import SegmentHeader from '@components/SegmentHeader';
import { IThreatCard } from '@screens/ThreatsList/models/IThreatCard';
import ThreatCard from '@components/ThreatCard';
import {
  addThreatToSessionRoutine,
  deleteThreatRoutine,
  fetchThreatsRoutine, removeThreatFromSessionRoutine,
  setLoadMoreThreatsRoutine
} from '@screens/ThreatsList/routines';
import { RootState } from '@root/store';

export interface IThreatListPageProps extends IState, IActions {
  currentSessionId: string;
}

interface IState {
  threats: IThreatCard[];
  dataLoading: boolean;
  loadMore: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IActions {
  fetchThreats: IBindingCallback1<object>;
  setLoadMoreThreats: IBindingCallback1<boolean>;
  deleteThreat: IBindingCallback1<object>;
  addThreatToSession: IBindingCallback1<object>;
  removeThreatFromSession: IBindingCallback1<object>;
}

const params = {
  sessionId: '',
  from: 0,
  count: 10
};

const ThreatsList: React.FC<IThreatListPageProps> = (
  {
    threats,
    currentSessionId,
    dataLoading,
    loadMore,
    fetchThreats,
    setLoadMoreThreats,
    deleteThreat,
    addThreatToSession,
    removeThreatFromSession
  }
) => {
  useEffect(() => {
    setLoadMoreThreats(false);
    params.from = 0;
    fetchThreats({ from: 0, count: 10 });
  }, []);

  const deleteAction = threat => {
    deleteThreat({ threatId: threat.id });
  };

  const toggleAction = threat => {
    if (!threat.active) {
      addThreatToSession({ sessionId: currentSessionId, threatId: threat.id });
    } else {
      removeThreatFromSession({ sessionId: currentSessionId, threatId: threat.id });
    }
  };

  const handleLoadMoreThreats = filtersPayload => {
    fetchThreats(filtersPayload);
  };

  const getMoreThreats = () => {
    if (!dataLoading) {
      setLoadMoreThreats(true);
      const { from, count } = params;
      params.from = from + count;
      /* params.id = currentUser.id;*/
      handleLoadMoreThreats(params);
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
      {!isEmptyArray(threats) && threats
      && (
      <SegmentHeader
        size="h2"
        iconName="list"
        content="Saved IoC"
        subheader="You can delete all data about the IoC and captured packets by clicking the button 'Delete'"
      />
      )}
      <InfiniteScroll
        style={{ overflow: 'none' }}
        next={getMoreThreats}
        hasMore
        loader={' '}
        dataLength={threats ? threats.length : 0}
        scrollableTarget="scrollWrapper"
        scrollThreshold={0.9}
      >
        {!isEmptyArray(threats) && threats ? (
          threats.map(threat => (
            <ThreatCard
              dataLoading={dataLoading && !loadMore}
              key={threat.id}
              threat={threat}
              deleteAction={deleteAction}
              toggleAction={toggleAction}
            />
          ))
        ) : (
          <NotFoundContent description="IoC list is empty" />
        )}
      </InfiniteScroll>
    </main>
  );
};

const mapStateToProps = (state: RootState) => {
  const { data } = state.threatsListPageReducer;

  return (
    {
      threats: data.threats,
      dataLoading: extractFetchThreatsLoading(state),
      loadMore: data.loadMore,
      currentSessionId: state.sessionPageReducer.data.session.id
    }
  );
};

const mapDispatchToProps: IActions = {
  fetchThreats: fetchThreatsRoutine,
  setLoadMoreThreats: setLoadMoreThreatsRoutine,
  deleteThreat: deleteThreatRoutine,
  addThreatToSession: addThreatToSessionRoutine,
  removeThreatFromSession: removeThreatFromSessionRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(ThreatsList);
