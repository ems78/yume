import { ObjectId } from 'mongodb';

interface Tag {
    _id: ObjectId;
    name: string;
}

interface DreamLog {
    _id: ObjectId;
    date: Date;
    title: string;
    content: string;
    tags: Tag[];
}

export { Tag, DreamLog };
