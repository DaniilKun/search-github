import React from 'react';
import { observer } from 'mobx-react-lite';
import CopyStore from '../stores/CopyStore';

interface CopyButtonProps {
  text: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {
  const setCopied = () => {
    CopyStore.setCopied(text);
  };

  return (
    <button onClick={setCopied}>
      {CopyStore.copied ? 'Copied' : 'Copy'}
    </button>
  );
};

export default observer(CopyButton);
