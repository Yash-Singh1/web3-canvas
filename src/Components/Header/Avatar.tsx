import React, { FC } from 'react';
import { Box } from '@blockstack/ui';

const Avatar: FC<{ avatar: string }> = function Avatar({ avatar }) {
  return (
    <Box
      borderRadius="50%"
      width="24px"
      height="24px"
      display="inline-block"
      overflow="hidden"
      mr={2}
      style={{ position: 'relative', top: '6px' }}
    >
      {/* @ts-ignore */}
      <Box as="img" src={avatar} maxWidth="100%" minHeight="24px" minWidth="24px" />
    </Box>
  );
};

export default Avatar;
