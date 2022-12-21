import { Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelectedTreeContext } from "../contexts/selectedTreeContext";
import genericTreeImg from "../../public/generic-tree.png";
import { fetchTree } from "../tree-shared/api";
import "./CatalogItem.css";

const treeDetailsConfig = [
  { label: "Age", value: "age", unit: "an(s)" },
  { label: "Taille", value: "sizeInCentimeters", unit: "centimètres" },
];

const CatalogItem = () => {
  const { selectedTreeId } = useSelectedTreeContext();
  const [tree, setTree] = useState();

  useEffect(() => {
    if (selectedTreeId) {
      fetchTree(selectedTreeId).then((responseData) => setTree(responseData));
    }
  }, [selectedTreeId]);
  if (!tree) {
    return <div>Choisis un arbre de la liste pour voir ses détails ici !</div>;
  }

  return (
    <Paper sx={{ padding: "16px" }}>
      <Typography variant="h4">{tree?.name}</Typography>
      <div className="tree-mfe--catalogItemImageContainer">
        <img src={genericTreeImg} />
      </div>
      {treeDetailsConfig.map((configItem) => (
        <div key={configItem.value}>
          <span>{`${configItem.label}: `}</span>
          <span>{`${tree[configItem.value]} ${configItem.unit}`}</span>
        </div>
      ))}
    </Paper>
  );
};

export default CatalogItem;
