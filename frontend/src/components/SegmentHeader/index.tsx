import React, { FunctionComponent } from 'react';
import { Header, Icon, SemanticICONS } from 'semantic-ui-react';

interface ISegmentHeaderProps {
  size: string;
  iconName: SemanticICONS;
  content: string;
  subheader: string;
}

const SegmentHeader: FunctionComponent<ISegmentHeaderProps> = ({ size, iconName, content, subheader }) => (
  <Header as={size}>
    <Icon name={iconName} />
    <Header.Content>
      {content}
      <Header.Subheader>{subheader}</Header.Subheader>
    </Header.Content>
  </Header>
);

export default SegmentHeader;
