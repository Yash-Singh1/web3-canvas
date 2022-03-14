import React, { useState } from 'react';
import type { FC } from 'react';
import { Button } from '@blockstack/ui';
import './index.css';

const Text: FC<{
  content: string;
  save: (writing: string) => void;
}> = function Text({ content, save }) {
  const [writing, setContent] = useState(content);
  return (
    <>
      <textarea
        value={writing}
        style={{ width: '100%', height: '50vh', marginTop: '20px' }}
        onChange={e => {
          setContent(e.target.value);
        }}
      ></textarea>
      <Button onClick={() => save(writing)}>Save</Button>
    </>
  );
};

export default Text;
