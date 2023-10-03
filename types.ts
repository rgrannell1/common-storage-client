
export type Credentials = {
  username: string;
  password: string;
};

export type GetContentOptions = {
  topic: string;
};

export type PostContentOptions = {
  topic: string;
  batchId?: string;
  content: any[];
};

export type GetFeedOptions = {};

export type PostRoleOptions = {
  role: string;
  permissions: any[];
};

export type DeleteTopicOptions = {
  topic: string;
};

export type GetTopicOptions = {
  topic: string;
};

export type PostTopicOptions = {
  topic: string;
  description: string;
  schema: Record<string, any>;
};

export type PostUserOptions = {
  role: string;
  name: string;
  password: string;
};
