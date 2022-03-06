export interface File {
    filename: string;
    type: 'canvas' | 'text';
    content: any;
    createdOn: number;
    id: string;
}

export type FileSystem = File[];
