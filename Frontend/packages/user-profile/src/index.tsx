import React from "react";
import { useParams } from "react-router-dom";
import { HTTPApi, useEntity } from "@mediatool-poc/tools";

const userApi = new HTTPApi('http://localhost:5001')

interface IRandomUser {
  _id: string
  gender: string
  name: {
    title: string
    first: string
    last: string
  }
  email: string
  picture: {
    large: string
    medium: string
    thumbnail: string
  }
}

/*
const resolver = {
  select: (userId: string) => (state: AppState) => state.idMap[userId],
  fetch: (userId: string) => api.get('', { seed: userId }),
}
*/

const UserProfilePage = () => {
  const { userId } = useParams<{ userId: string }>();
  const { data, loading, error } = useEntity<IRandomUser>(
    'user',
    {
      get: () => userApi.get(`/user/${userId}`)
    },
    (state) => state.idMap[userId],
  );

  if (loading) {
    return <p>Loading....</p>
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }

  if (!data) {
    return <p>User not found</p>
  }

  return (
    <div>
      <h1 data-test="user-firstname">{data.name.first}</h1>
      <h3 data-test="user-email">{data.email}</h3>
      <img src={data.picture.medium} />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default UserProfilePage;
