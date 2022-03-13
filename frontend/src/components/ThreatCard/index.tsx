import React, { FunctionComponent } from 'react';
import { Button, Card, Checkbox, Icon } from 'semantic-ui-react';
import styles from './styles.module.scss';
import moment from 'moment/moment';
import { IThreatCard } from '@screens/ThreatsList/models/IThreatCard';

interface IThreatCardProps {
  threat: IThreatCard;
  dataLoading: boolean;
  deleteAction: any;
  toggleAction: any;
}

const ThreatCard: FunctionComponent<IThreatCardProps> = ({
  threat,
  dataLoading,
  deleteAction,
  toggleAction
}) => {
  const getDeleteAction = () => {
    deleteAction(threat);
  };

  const getToggleAction = () => {
    toggleAction(threat);
  };

  return (
    <Card className={styles.sessionCard}>
      <Card.Content>
        {!dataLoading ? (
          <div className={styles.cardInfo}>
            <span>{moment(threat.createdAt).format('DD-MM-YYYY, h:mm:ss')}</span>
            <span>{threat.title}</span>
            <div className={styles.toggleDelWrp}>
              <Checkbox
                className={styles.toggleBtn}
                toggle
                onChange={getToggleAction}
                checked={threat.active}
              />
              <Button
                icon
                onClick={getDeleteAction}
              >
                <Icon name="trash alternate" />
              </Button>
            </div>
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

export default ThreatCard;
