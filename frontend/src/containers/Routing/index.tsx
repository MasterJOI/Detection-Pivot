import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoaderWrapper from 'components/LoaderWrapper';
import PublicRoute from 'components/PublicRoute';
import SessionPage from 'screens/SessionPage/containers/SessionPage';
import { checkHeaderShown } from '@helpers/headerBlackList.hepler';
import { history } from '@helpers/history.helper';
import Header from '@screens/Header/containers/HeaderPage';
import SessionsList from '@screens/SessionsList/containers/SessionsListPage';
import CreateThreat from '@screens/CreateThreat/containers/CreateThreatPage';
import ThreatsList from "@screens/ThreatsList/containers/ThreatsListPage";

export interface IRoutingProps {
  isLoading: boolean;
}

const Routing: React.FunctionComponent<IRoutingProps> = ({ isLoading }) => {
  const [isHeaderShown, setIsHeaderShown] = useState(checkHeaderShown());
  history.listen(() => {
    setIsHeaderShown(checkHeaderShown());
  });

  return (
    <div style={{ height: '100%' }}>
      {isHeaderShown && <Header />}
      <Switch>
        <PublicRoute exact path="/start" component={SessionPage} />
        <PublicRoute exact path="/sessions" component={SessionsList} />
        <PublicRoute exact path="/create-ioc" component={CreateThreat} />
        <PublicRoute exact path="/ioc-list" component={ThreatsList} />
        {/* <PublicRoute component={Default} isNotFound />*/}
        <div>
          <LoaderWrapper loading={isLoading}>
            <Switch>
              <Route path="/*">
                <Redirect to="/start" />
              </Route>
            </Switch>
          </LoaderWrapper>
        </div>
      </Switch>
    </div>
  );
};

export default Routing;
