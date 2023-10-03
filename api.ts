
import type {
  Credentials,
  GetContentOptions,
  PostContentOptions,
  GetFeedOptions,
  PostRoleOptions,
  DeleteTopicOptions,
  GetTopicOptions,
  PostTopicOptions,
  PostUserOptions
} from './types.ts';

/*
 * A client for the common-storage API.
 *
 * @param endpoint the common-storage endpoint to use.
 * @param credentials the credentials to use when authenticating with the common-storage API.
 */
export class CommonStorageClient {
  endpoint: string;
  credentials: Credentials;

  constructor(endpoint: string, credentials: Credentials) {
    this.endpoint = endpoint;
    this.credentials = credentials;
  }

  #headers() {
    const { username, password } = this.credentials;
    const encoded = btoa(`${username}:${password}`);

    return new Headers({
      "authorization": `Basic ${encoded}`,
      "content-type": "application/json",
    });
  }

  #body(body: any) {
    return JSON.stringify(body);
  }

  async getContent(opts: GetContentOptions) {
    const { topic } = opts;
    return fetch(`${this.endpoint}/content/${topic}`, {
      method: "get",
      headers: this.#headers(),
    });
  }

  async postContent(opts: PostContentOptions) {
    const { topic, batchId, content } = opts;
    return fetch(`${this.endpoint}/content/${topic}`, {
      method: "post",
      headers: this.#headers(),
      body: this.#body({
        batchId,
        content,
      }),
    });
  }

  async getFeed(_: GetFeedOptions) {
    return fetch(`${this.endpoint}/feed`, {
      method: "get",
      headers: this.#headers(),
    });
  }

  async postRole(opts: PostRoleOptions) {
    const { role, permissions } = opts;
    return fetch(`${this.endpoint}/role/${role}`, {
      method: "post",
      headers: this.#headers(),
      body: this.#body({
        permissions,
      }),
    });
  }

  async deleteTopic(opts: DeleteTopicOptions) {
    const { topic } = opts;
    return fetch(`${this.endpoint}/topic/${topic}`, {
      method: "delete",
      headers: this.#headers(),
    });
  }

  async getTopic(opts: GetTopicOptions) {
    const { topic } = opts;
    return fetch(`${this.endpoint}/topic/${topic}`, {
      method: "get",
      headers: this.#headers(),
    });
  }

  async postTopic(opts: PostTopicOptions) {
    const { topic, description, schema } = opts;
    return fetch(`${this.endpoint}/topic/${topic}`, {
      method: "post",
      headers: this.#headers(),
      body: this.#body({
        description,
        schema,
      }),
    });
  }

  async postUser(opts: PostUserOptions) {
    const { role, name, password } = opts;
    return fetch(`${this.endpoint}/user/${name}`, {
      method: "post",
      headers: this.#headers(),
      body: this.#body({
        role,
        password,
      }),
    });
  }
}
