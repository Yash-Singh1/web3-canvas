import React, { useState, useEffect } from 'react';
import { Flex, Box, Text, Button } from '@blockstack/ui';
import { userSession } from '../../../auth';
import FileComponent from '..';
import { fetchFiles, saveFiles } from '../../../storage';
import type { File, FileSystem } from '../../../types/filesystem';
import { v4 as uuid } from 'uuid';

export const FileSystemList = () => {
  const [fileSystem, setFileSystem] = useState<FileSystem>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const username = document.location.pathname.split('/')[2];
    const doFetchTasks = async () => {
      const response = await fetchFiles(userSession, username);
      setFileSystem(response);
      setLoading(false);
    };
    doFetchTasks();
  }, []);

  const saveFile = ({
    file: value,
    index,
    remove,
  }: {
    file: File;
    index: number;
    remove: boolean;
  }) => {
    setFileSystem(currentFileSystem => {
      if (remove) {
        currentFileSystem.splice(index, 1);
        saveFiles(currentFileSystem);
        return currentFileSystem;
      } else {
        currentFileSystem[index] = value;
        saveFiles(currentFileSystem);
        return currentFileSystem;
      }
    });
  };

  const createFile = () => {
    setFileSystem(
      fileSystem.concat([
        { createdOn: new Date().getTime(), filename: '', type: 'canvas', content: '{"started":false}', id: uuid() },
      ])
    );
  };
  const createText = () => {
    setFileSystem(
      fileSystem.concat([
        { createdOn: new Date().getTime(), filename: '', type: 'text', content: '', id: uuid() },
      ])
    );
  };

  const files = fileSystem.length === 0 ? <Text textStyle='display.small' width={'100%'}>Currently no files exist in your filesystem.</Text> : fileSystem.map((file, index) => (
    <FileComponent file={file} index={index} key={index} save={saveFile} create={createFile} />
  ));

  const getHeader = () => {
    if (loading) {
      return 'Loading...';
    }
    return 'My Canvas';
  };

  return (
    <Flex>
      <Box maxWidth="660px" width="100%" mx="auto" mt="75px">
        <Flex width="100%" flexWrap="wrap">
          <Box mb={4} width="100%">
            <Text textStyle="display.large" fontSize={7}>
              {getHeader()}
            </Text>
          </Box>
          {loading ? <span className='loader'></span> : (
            <>
              {files}
              <Button onClick={createFile} style={{ marginTop: '10px', height: '3rem' }}>
                + Create Canvas
              </Button>
              <Button onClick={createText} style={{ marginTop: '10px', height: '3rem', marginLeft: '10px' }}>
                + Create Text
              </Button>
            </>
          )}
        </Flex>
      </Box>
    </Flex>
  );
};
