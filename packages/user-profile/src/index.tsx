import React from "react";
import { useParams } from "react-router-dom";
import { IApi, Query, useEntity } from "@mediatool-poc/tools";
import { api } from "./service";
import { useSelector } from "react-redux";

interface IOverrides {
  getEndpoint?: string;
  postEndpoint?: string;
  putEndpoint?: string;
  delEndpoint?: string;
}

class ApiClass {
  private baseUrl: string;
  private overrides?: IOverrides;

  constructor(baseUrl: string, overrides?: IOverrides) {
    this.baseUrl = baseUrl;
    this.overrides = overrides;
  }

  async get<T>(endpoint: string, query?: Query): Promise<T> {
    return fetch(`${this.baseUrl}${this.overrides?.getEndpoint ?? endpoint}`)
      .then((res) => res.json())
      .then((json) => json as T);
  }
}

type IRandomUser = {
  _id: string;
  login: any;
};

const user: IRandomUser = {
  _id: "",
  login: {},
};

const mockedApi: Partial<IApi> = {
  get: () => Promise.resolve(user),
};

const UserProfilePage = () => {
  const { userId } = useParams<{ userId: string }>();
  const { data, loading, error } = useEntity("user", api, userId, {
    seed: userId,
  });

  if (loading) {
    return <p>Loading....</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  console.log(data);

  return (
    <div>
      <p>{JSON.stringify(data, null, 2)}</p>
    </div>
  );
};

export default UserProfilePage;
