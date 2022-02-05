import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import MenuSidebar from '@components/MenuSidebar';
import { RootState } from '@root/store';
import { IBindingCallback1 } from '@models/Callbacks';
import { handleToggleSidebarRoutine } from '@screens/Header/routines';

export interface ISidebarProps extends IState, IActions {

}

interface IState {
  toggled: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IActions {
  handleToggleSidebar: IBindingCallback1<boolean>;
}

const Sidebar: React.FC<ISidebarProps> = (
  // eslint-disable-next-line no-empty-pattern
  {
    toggled,
    handleToggleSidebar
  }
) => {
  const [isToggled, setIsToggled] = useState(toggled);

  useEffect(() => {
    setIsToggled(toggled);
  }, [toggled]);

  const toggleSidebar = value => {
    handleToggleSidebar(value);
  };

  return (
    <div className={`app ${toggled ? 'toggled' : ''}`}>
      <MenuSidebar
        toggled={isToggled}
        toggleSidebar={toggleSidebar}
      />
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  const { data } = state.headerReducer;

  return (
    {
      toggled: data.isSidebarToggled
    }
  );
};

const mapDispatchToProps: IActions = {
  handleToggleSidebar: handleToggleSidebarRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
