import React from 'react';
import styles from './styles.module.scss';
import { Link, useHistory } from 'react-router-dom';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IProfileSidebarProps {
}

function MenuSidebar({ toggled, toggleSidebar }) {
  return (
    <ProSidebar
      toggled={toggled}
      breakPoint="md"
      onToggle={toggleSidebar}
    >
      <Menu iconShape="square">
        <MenuItem>
          Start session
          <Link to="/start" />
        </MenuItem>
        <MenuItem>
          Saved sessions
          <Link to="/sessions" />
        </MenuItem>
        <SubMenu title="Indicators of Compromise ">
          <MenuItem>
            Create new IoC
            <Link to="/create-ioc" />
          </MenuItem>
          <MenuItem>
            IoC overview
            <Link to="/ioc-list" />
          </MenuItem>
        </SubMenu>
      </Menu>
    </ProSidebar>
  );
}

export default MenuSidebar;
