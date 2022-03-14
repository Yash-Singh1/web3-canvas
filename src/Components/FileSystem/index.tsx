import React, { useState, useEffect, FC } from 'react';
import { Flex, Box, Input, Text } from '@blockstack/ui';
import './FileSystem.css';
import type { File } from '../../types/filesystem';
import { Redirect } from 'react-router-dom';

interface FileProps {
  file: File;
  index: number;
  save(value: { file: File; index: number; remove: boolean }): void;
  create: () => void;
}

const FileSystem: FC<FileProps> = function ({ file, index, save, create }) {
  const [redirectToView, setRedirectToView] = useState<boolean>(false);
  const [input, setInput] = useState<string>(file.filename);
  const [focused, setFocused] = useState<boolean>(false);
  const [removing, remove] = useState<boolean>(false);
  useEffect(() => {
    if (removing === true) {
      doSave();
    }
  }, [removing]);
  if (redirectToView) {
    return <Redirect to={'/view/' + file.id} />;
  }
  const doSave = () => {
    if (file.filename === input && !removing) return;
    save({
      file: {
        ...file,
        filename: input,
      },
      index,
      remove: input.length === 0 || removing,
    });
  };
  return (
    <Box
      width="100%"
      backgroundColor={focused ? '#FAFAFC' : 'white'}
      px={3}
      py={0}
      _hover={{ backgroundColor: '#FAFAFC' }}
    >
      <Flex>
        <Box flexGrow={1}>
          <Box
            as={'img'}
            /*
            // @ts-ignore */
            src={
              'data:image/svg+xml;utf8,<svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(1.009239, 0, 0, 1.050813, 304.395081, 236.033218)"><ellipse rx="29.998" ry="60.004" transform="matrix(0.999178, 0.040543, -0.043945, 0.99904, 0, 0)" fill="black"/></g><g transform="matrix(0, 1, -1, 0, 228.574707, 280.21283)"><ellipse rx="30" ry="95" fill="black"/></g><g transform="matrix(1.147735, -0.013885, 0.011427, 0.944502, 153.031464, 208.27269)"><ellipse rx="30" ry="95" fill="black"/></g><g transform="matrix(0, 1, -1, 0, 195.248764, 132.984436)"><ellipse rx="30" ry="60" fill="black"/></g><rect x="50" y="264" width="130" height="35" transform="matrix(0.707107, -0.707107, 0.707107, 0.707107, -9.533949, 46.081997)" rx="10.191" ry="10.191" fill="black"/><rect/><path d="M 315.725 76.166 Q 324.833 60.39 333.942 76.166 L 354.157 111.179 Q 363.265 126.955 345.048 126.955 L 304.619 126.955 Q 286.402 126.955 295.51 111.179 Z" fill="black" transform="matrix(0.771317, 0.636451, -0.636451, 0.771317, 141.723785, -180.325623)" bx="triangle 286.402 60.39 76.863 66.565 0.5 0.237 1@9b429a91"/></svg>'
            }
            maxWidth={10}
            maxHeight={10}
            style={{ display: 'inline-block' }}
            className="open-filename"
            onClick={() => setRedirectToView(true)}
          />
          <Text textStyle="display.large" style={{ marginRight: '5px', verticalAlign: 'middle' }}>
            {file.type === 'text' ? '📜' : '🎨'}
          </Text>
          <Input
            placeholder={'Enter your filename...'}
            fontSize={2}
            value={input}
            onBlur={() => {
              setFocused(false);
              doSave();
            }}
            autoFocus={input === ''}
            onFocus={() => setFocused(true)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                create();
                // @ts-ignore
                e.target.blur();
              }
            }}
            onChange={e => {
              // @ts-ignore
              setInput(e.target.value);
            }}
            className="filename-input"
          />
          <Text
            onClick={() => {
              remove(true);
            }}
            fontSize={2}
            ml={5}
            cursor={'pointer'}
          >
            ×
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default FileSystem;
