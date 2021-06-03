import React from "react";
import { useParams } from "react-router-dom";
import { useEntity } from "@mediatool-poc/tools";
import { api } from "./service";

interface IRandomUser {
  _id: string
  gender: string
  name: {
    title: string
    first: string
    last: string
  }
  email: string
}

const UserProfilePage = () => {
  const { userId } = useParams<{ userId: string }>();
  const { data, loading, error } = useEntity<IRandomUser>(
    'user',
    (state) => state.idMap[userId],
    {
      get: () => api.get('', { seed: userId })
    }
  );

  if (loading) {
    return <p>Loading....</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h1>{data?.name.first}</h1>
      <h3>{data?.email}</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default UserProfilePage;
