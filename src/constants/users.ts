import { User, YesNoEnum } from '../types/user';

export const USERS: User[] = [
  {
    name: 'user 1',
    email: 'user1@mail.com',
    address: 'user 2 address',
    company: YesNoEnum.YES,
    entity: 'test',
    taxpayer: YesNoEnum.NO,
    createdAt: '2023-03-27T00:00:00.000Z',
  },
  {
    name: 'user 2',
    email: 'user2@mail.com',
    address: 'user 2 address',
    company: YesNoEnum.YES,
    entity: 'test',
    taxpayer: YesNoEnum.NO,
    createdAt: '2023-03-27T00:00:00.000Z',
  },
  {
    name: 'user 3',
    email: 'user2@mail.com',
    address: 'user 2 address',
    company: YesNoEnum.YES,
    entity: 'test',
    taxpayer: YesNoEnum.NO,
    createdAt: '2023-03-27T00:00:00.000Z',
  },
  {
    name: 'user 4',
    email: 'user4@mail.com',
    address: 'user 2 address',
    company: YesNoEnum.YES,
    entity: 'test',
    taxpayer: YesNoEnum.NO,
    createdAt: '2023-03-27T00:00:00.000Z',
  },
];
