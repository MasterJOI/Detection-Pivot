import React, { useState } from 'react';
import styles from './styles.module.scss';
import { connect } from 'react-redux';
import { Form, FormTextArea } from 'semantic-ui-react';
import { RootState } from '@root/store';
import { IBindingCallback1 } from '@models/Callbacks';
import InputPopup from '@components/InputPopup';
import BlueButton from '@components/buttons/BlueButton';
import ColorlessButton from '@components/buttons/ColorlessButton';
import SegmentHeader from '@components/SegmentHeader';
import FormButton from '@components/buttons/FormButton';
import { IThreatFormRequest } from '@screens/CreateThreat/models/IThreatFormRequest';
import { sendThreatFormRoutine } from '@screens/CreateThreat/routines';
import {history} from "@helpers/history.helper";
import {
  IPS_MESSAGE,
  isValidIps,
  isValidMacs, isValidPorts,
  isValidTitle,
  MACS_MESSAGE, PORTS_MESSAGE,
  TITLE_MESSAGE
} from '@helpers/validation.helper';

export interface ICreateThreatProps extends IState, IActions {
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IState {
}

interface IActions {
  sendForm: IBindingCallback1<IThreatFormRequest>;
}

const CreateThreat: React.FC<ICreateThreatProps> = (
  {
    sendForm
  }
) => {

  const initialData = {
    title: '',
    macsSrc: '',
    macsDst: '',
    ipsSrc: '',
    ipsDst: '',
    protocol: '',
    portsSrc: '',
    portsDst: '',
    payload: ''
  };
  const validationInitialState = {
    isTitleValid: true,
    isMacsSrcValid: true,
    isMacsDstValid: true,
    isIpsSrcValid: true,
    isIpsDstValid: true,
    isProtocolValid: true,
    isPortsSrcValid: true,
    isPortsDstValid: true,
    isPayloadValid: true
  };

  const [threadForm, setThreadForm] = useState(initialData);
  const [validationData, setValidationData] = useState(validationInitialState);

  const updateForm = (fieldId, val) => {
    if (val === '') {
      setThreadForm(prevState => ({ ...prevState, [fieldId]: '' }));
    } else {
      setThreadForm(prevState => ({ ...prevState, [fieldId]: val }));
    }
  };

  const updateValidationData = (fieldId, val) => {
    if (val === '') {
      setValidationData(prevState => ({
        ...prevState,
        [fieldId]: true
      }));
    } else {
      switch (fieldId) {
        case 'isTitleValid': {
          setValidationData(prevState => ({
            ...prevState,
            [fieldId]: isValidTitle(val)
          }));
          break;
        }
        case 'isMacsSrcValid':
        case 'isMacsDstValid': {
          setValidationData(prevState => ({
            ...prevState,
            [fieldId]: isValidMacs(val)
          }));
          break;
        }
        case 'isIpsSrcValid':
        case 'isIpsDstValid': {
          setValidationData(prevState => ({
            ...prevState,
            [fieldId]: isValidIps(val)
          }));
          break;
        }
        case 'isPortsSrcValid':
        case 'isPortsDstValid': {
          setValidationData(prevState => ({
            ...prevState,
            [fieldId]: isValidPorts(val)
          }));
          break;
        }
        /* case 'isPayloadValid': {
          setValidationData(prevState => ({
            ...prevState,
            [fieldId]: isValidPayload(val)
          }));
          break;
        }*/
        default:
          break;
      }
    }
  };

  const handleCreateClick = e => {
    sendForm(threadForm);
    history.push('/ioc-list');
  };

  return (
    <main>
      <SegmentHeader
        size="h2"
        iconName="fire"
        content="Create new IoC"
        subheader="Specify the principles by which suspicious packets will be searched. Title is required."
      />
      <div className={styles.threadForm}>
        <Form
          onSubmit={handleCreateClick}
        >
          <InputPopup
            id="title"
            type="text"
            label="IoC title"
            placeholder="Enter the title of your IoC"
            setValue={val => updateForm('title', val)}
            validateValue={val => updateValidationData('isTitleValid', val)}
            isValueValid={validationData.isTitleValid}
            required
            errorMessage={TITLE_MESSAGE}
          />
          <InputPopup
            id="macsSrc"
            type="text"
            label="Source MACs"
            placeholder="Enter MAC-addresses of source"
            setValue={val => updateForm('macsSrc', val)}
            validateValue={val => updateValidationData('isMacsSrcValid', val)}
            isValueValid={validationData.isMacsSrcValid}
            errorMessage={MACS_MESSAGE}
          />
          <InputPopup
            id="macsDst"
            type="text"
            label="Destination MACs"
            placeholder="Enter MAC-addresses of destination"
            setValue={val => updateForm('macsDst', val)}
            validateValue={val => updateValidationData('isMacsDstValid', val)}
            isValueValid={validationData.isMacsDstValid}
            errorMessage={MACS_MESSAGE}
          />
          <InputPopup
            id="ipsSrc"
            type="text"
            label="Source IPs"
            placeholder="Enter IP-addresses of source"
            setValue={val => updateForm('ipsSrc', val)}
            validateValue={val => updateValidationData('isIpsSrcValid', val)}
            isValueValid={validationData.isIpsSrcValid}
            errorMessage={IPS_MESSAGE}
          />
          <InputPopup
            id="ipsDst"
            type="text"
            label="Destination IPs"
            placeholder="Enter IP-addresses of destination"
            setValue={val => updateForm('ipsDst', val)}
            validateValue={val => updateValidationData('isIpsDstValid', val)}
            isValueValid={validationData.isIpsDstValid}
            errorMessage={IPS_MESSAGE}
          />
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="image-input-1">Transport layer protocol</label>
          <div className={styles.buttonWrapper}>
            {threadForm.protocol === 'TCP'
              ? (
                <BlueButton
                  content="TCP"
                  onClick={() => updateForm('protocol', '')}
                  className={styles.protocol_button}
                />
              )
              : (
                <ColorlessButton
                  content="TCP"
                  onClick={() => updateForm('protocol', 'TCP')}
                  className={styles.protocol_button}
                />
              )}
            {threadForm.protocol === 'UDP'
              ? (
                <BlueButton
                  content="UDP"
                  onClick={() => updateForm('protocol', '')}
                  className={styles.protocol_button}
                />
              )
              : (
                <ColorlessButton
                  content="UDP"
                  onClick={() => updateForm('protocol', 'UDP')}
                  className={styles.protocol_button}
                />
              )}
          </div>
          <InputPopup
            id="portsSrc"
            type="text"
            label="Source ports"
            placeholder="Enter ports of source"
            setValue={val => updateForm('portsSrc', val)}
            validateValue={val => updateValidationData('isPortsSrcValid', val)}
            isValueValid={validationData.isPortsSrcValid}
            errorMessage={PORTS_MESSAGE}
          />
          <InputPopup
            id="portsDst"
            type="text"
            label="Destination ports"
            placeholder="Enter ports of destination"
            setValue={val => updateForm('portsDst', val)}
            validateValue={val => updateValidationData('isPortsDstValid', val)}
            isValueValid={validationData.isPortsDstValid}
            errorMessage={PORTS_MESSAGE}
          />
          <FormTextArea
            id="payload"
            type="text"
            label="Packet payload"
            placeholder="Enter possible filling of the packet"
            onChange={(e, { value }) => updateForm('payload', value)}
          />
          <FormButton text="Create IoC" inverted />
        </Form>
      </div>
    </main>
  );
};

const mapStateToProps = (state: RootState) => {
  /* const { data } = state.sessionPageReducer;
  return (
    {
      currentDescription: data.session.interfaceDescription
    }
  );*/
};

const mapDispatchToProps: {} = {
  sendForm: sendThreatFormRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateThreat);
