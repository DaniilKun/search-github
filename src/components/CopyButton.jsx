import { observer } from 'mobx-react-lite';
import CopyStore from '../stores/CopyStore';

const CopyButton = ({ text }) => {
  const setCopied = () => {
    CopyStore.setCopied(text);
  };

  return (
    <button onClick={setCopied} >
      {CopyStore.copied ? 'Copied' : 'Copy'}
    </button>
  );
};

export default observer(CopyButton);
