import React from "react";
import { useParams } from "react-router-dom";
import { AppState, useEntity } from "@mediatool-poc/tools";
import { ICampaign, IParams } from "./types";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const selector = (campaignId: string) => (state: AppState) => state.idMap[campaignId]

const Campaign = () => {
  const { campaignId } = useParams<IParams>();

  const { data } = useEntity<ICampaign>("campaign", {}, selector(campaignId));

  console.log(data);

  return (
    <DndProvider backend={HTML5Backend}>
      <p>Created Entity</p>
      {data
        ? (
          <div>
            <p>id: {data._id}</p>
            <p>name: {data.name}</p>
          </div>
        )
        : `Entity with id ${campaignId} not found`
      }
    </DndProvider>
  );
};

export default Campaign;
