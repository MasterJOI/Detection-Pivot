import React, { FunctionComponent } from 'react';
import { Button, Card, Icon } from 'semantic-ui-react';
import { ISessionCard } from '@screens/SessionsList/models/ISessionCard';
import styles from './styles.module.scss';
import moment from 'moment/moment';

interface ISessionCardProps {
  session: ISessionCard;
  dataLoading: boolean;
  deleteAction: any;
}

const SessionCard: FunctionComponent<ISessionCardProps> = ({
  session,
  dataLoading,
  deleteAction
}) => {
  const getDeleteAction = () => {
    deleteAction(session);
  };

  return (
    <Card className={styles.sessionCard}>
      <Card.Content>
        {!dataLoading ? (
          <div className={styles.cardInfo}>
            <span>{moment(session.createdAt).format('DD-MM-YYYY, h:mm:ss')}</span>
            <span>{session.interfaceDescription}</span>
            <span>
              Status:
              {' '}
              {session.state}
            </span>
            <Button
              icon
              onClick={getDeleteAction}
            >
              <Icon name="trash alternate" />
            </Button>
          </div>
        ) : (
          <div>
            <span>Placeholder</span>
          </div>
        )}
      </Card.Content>
    </Card>
  );
};

export default SessionCard;
