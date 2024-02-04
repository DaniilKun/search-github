import styles from './InputField.module.scss';
import CopyButton from '../CopyButton';

const InputField = ({ value, onChange }) => {
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
