export enum YesNoEnum {
  YES = 'yes',
  NO = 'no',
}

export type User = {
  email: string;
  name: string;
  address: string;
  entity: string;
  company: YesNoEnum;
  taxpayer?: YesNoEnum;
  taxNumber?: string;
  createdAt: string;
};

export type CreateUser = {
  email: string;
  name: string;
  address: string;
  entity: string;
  company: YesNoEnum;
  // taxpayer?: YesNoEnum;
  taxpayer?: YesNoEnum;
  taxNumber?: string;
  terms_of_service: boolean;
};
