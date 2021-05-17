import React from "react";
import { useParams } from "react-router-dom";
import { useEntity } from "@mediatool-poc/tools";
import { ICampaign, IParams } from "./types";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Campaign = () => {
  const { campaignId } = useParams<IParams>();

  const { data } = useEntity<ICampaign>("campaign", campaignId);

  console.log(data);

  return (
    <DndProvider backend={HTML5Backend}>
      <p>Created Entity</p>
      <p>{data ? JSON.stringify(data, null, 2) : 'Could not find entity'}</p>
    </DndProvider>
  );
};

export default Campaign;
