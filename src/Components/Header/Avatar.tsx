import React from 'react';
import { Box } from '@blockstack/ui';

export default function Avatar({ avatar }: { avatar: string }) {
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
}
