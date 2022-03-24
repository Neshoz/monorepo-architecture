import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { LazyPage, useEntity } from "@mediatool-poc/tools";
import { Button } from '@mediatool-poc/ui'

import { id } from "./util";
import { ICampaign } from "./types";

const Hub = () => {
  const history = useHistory();
  const { createEntity } = useEntity("campaign", {});

  const handleClick = () => {
    const _id = id();
    createEntity<ICampaign>({ _id, name: "Created test campaign" });
    history.push(`/hub/${_id}`);
  };

  return (
    <>
      <p>This is hub</p>
      <Button
        variant="solid"
        colorScheme="purple"
        onClick={handleClick}
      >
        Create Test Entity
      </Button>
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
