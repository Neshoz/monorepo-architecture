import React from "react";
import { useParams } from "react-router-dom";
import { useEntity } from "@mediatool-poc/tools";
import { IParams } from "./types";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Campaign = () => {
  const { campaignId } = useParams<IParams>();

  const { data } = useEntity("campaign", campaignId);

  console.log(data);

  return (
    <DndProvider backend={HTML5Backend}>
      <p>This is actually working</p>
      <p>{JSON.stringify(data, null, 2)}</p>
    </DndProvider>
  );
};

export default Campaign;
