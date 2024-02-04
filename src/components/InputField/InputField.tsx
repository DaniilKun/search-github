import React, { ChangeEvent } from 'react';
import styles from './InputField.module.scss';
import CopyButton from '../CopyButton';

interface InputFieldProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ value, onChange }) => {
  return (
    <div>
      <input 
        className={styles.input}
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Поиск ..."
      />
      <CopyButton text={value} />
    </div>
  );
};

export default InputField;
