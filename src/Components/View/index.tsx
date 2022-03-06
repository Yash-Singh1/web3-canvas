import React, { useEffect, useState } from 'react';
import { Box, Text, Flex } from '@blockstack/ui';
import { useParams } from 'react-router-dom';
import { fetchFiles, saveFiles } from '../../storage';
import { userSession } from '../../auth';
import type { FileSystem } from '../../types/filesystem';
import Canvas from '../Canvas/index.jsx';

export default function View() {
  const { id } = useParams() as { id: string };
  const [fileSystem, setFileSystem] = useState<FileSystem>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const doFetchTasks = async () => {
      const response = await fetchFiles(userSession, '');
      setFileSystem(response);
      setLoading(false);
    };
    doFetchTasks();
  }, []);
  if (loading) {
    return (
      <Box maxWidth="660px" width="100%" mx="auto" mt="75px">
        <Flex width="100%" flexWrap="wrap">
          <Box mb={4} width="100%">
            <Text textStyle="display.large" fontSize={7}>
              Loading...
            </Text>
          </Box>
        </Flex>
      </Box>
    );
  }
  const fileIndex = fileSystem.findIndex(file => file.id === id) as number;
  const file = fileSystem[fileIndex];
  function save(saveString: string): void {
    setFileSystem(currentFileSystem => {
      currentFileSystem[fileIndex].content = saveString;
      saveFiles(currentFileSystem);
      return currentFileSystem;
    });
  }
  if (file.type === 'canvas') {
    return <Canvas save={save} file={JSON.parse(file.content)} />;
  } else {
    return (
      <textarea
        value={file.content}
        style={{ width: '100%', height: '100%' }}
        onChange={e => {
          file.content = e.target.value;
          save(e.target.value);
        }}
      ></textarea>
    );
  }
}
