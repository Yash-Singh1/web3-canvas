import { v4 as uuid } from 'uuid';
import { userSession } from './auth';
import { Storage } from '@stacks/storage';
import type { UserSession } from '@stacks/connect';
import type { UserSession as UserSessionAuth } from '@stacks/auth';
import type { FileSystem } from './types/filesystem';

const storage = new Storage({ userSession });
const FILESYSTEM_JSON = 'filesystem.json';

export interface Task {
  complete: boolean;
  value: string;
  id: string;
}

export const saveFiles = async (fileSystem: FileSystem) => {
  await storage.putFile(FILESYSTEM_JSON, JSON.stringify(fileSystem), {
    encrypt: true,
  });
};

export const fetchFiles = async function (
  userSession: UserSessionAuth,
  username: string
): Promise<FileSystem> {
  try {
    let fileSystemJSON: string = (await storage.getFile(FILESYSTEM_JSON, {
      decrypt: false,
      username: username || undefined,
    })) as string;
    if (fileSystemJSON) {
      const decrypted = JSON.parse((await userSession.decryptContent(fileSystemJSON)) as string);
      return decrypted;
    } else {
      return [];
    }
  } catch (error) {
    if (username) {
      return [];
    } else {
      return [];
    }
  }
  return [];
};
