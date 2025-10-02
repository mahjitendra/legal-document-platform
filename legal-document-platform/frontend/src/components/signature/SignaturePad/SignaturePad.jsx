import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import Button from '../../common/Button/Button';
import styles from './SignaturePad.module.css';

const SignaturePad = ({ onSave }) => {
  const sigPad = useRef({});

  const clear = () => {
    sigPad.current.clear();
  };

  const save = () => {
    onSave(sigPad.current.toDataURL());
  };

  return (
    <div className={styles.container}>
      <SignatureCanvas
        ref={sigPad}
        penColor="black"
        canvasProps={{ className: styles.sigPad }}
      />
      <div>
        <Button onClick={clear}>Clear</Button>
        <Button onClick={save}>Save Signature</Button>
      </div>
    </div>
  );
};

export default SignaturePad;