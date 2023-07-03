import { compare, hash } from 'bcrypt';

export type Bcrypt = {
    hash: typeof hash;
    compare: typeof compare;
};
