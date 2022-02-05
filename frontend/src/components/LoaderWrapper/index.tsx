import React, { FunctionComponent } from 'react';
import { Loader } from 'semantic-ui-react';
import styles from './styles.module.scss';

interface ILoaderWrapperProps {
  loading: boolean;
}

const LoaderWrapper: FunctionComponent<ILoaderWrapperProps> = ({ loading, children, ...props }) => (
  loading
    ? (
      <Loader active {...props} className={styles.MainLoader} />
    ) : (
      <>
        {children}
      </>
    )
);

export default LoaderWrapper;
