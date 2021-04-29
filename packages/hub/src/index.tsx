import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { LazyPage, useEntity } from "@mediatool-poc/tools";
import { id } from "./util";
import { ICampaign } from "./types";
// import Campaign from "./campaign";

const Hub = () => {
  const history = useHistory();
  const { createEntity } = useEntity("campaign");

  const handleClick = () => {
    const _id = id();
    createEntity<ICampaign>({ _id, name: "Created test campaign" });
    history.push(`/hub/${_id}`);
  };

  return (
    <>
      <p>This is hub</p>
      <button onClick={handleClick}>Create entity</button>
      <Switch>
        <Route
          exact
          path="/hub/:campaignId"
          render={(props) => (
            <LazyPage {...props} loader={() => import("./campaign")} />
          )}
        />
      </Switch>
    </>
  );
};

export default Hub;
