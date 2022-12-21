import React from "react";

import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelectedTreeContext } from "../contexts/selectedTreeContext";

const tableHeaderSx = { fontSize: "16px", fontWeight: "bold" };

const SELECT_TREE_EVENT = "select-tree-event";

const CatalogList = () => {
  const [trees, setTrees] = useState();
  const fetchTrees = () => {
    const token = localStorage.getItem("token");
    return fetch("http://localhost:3000/trees", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.status === 401) {
        window.location.href = "http://localhost:8080/#/login";
      }
      return res.json();
    });
  };

  const { setSelectedTreeId } = useSelectedTreeContext();

  useEffect(() => {
    fetchTrees().then((treesResponse) => {
      setTrees(treesResponse);
    });
  }, []);

  const publishSelectTreeEvent = (treeId) => {
    console.log("publish select tree event");
    const selectPlaceEvent = new CustomEvent(SELECT_TREE_EVENT, {
      detail: { treeId },
    });
    window.dispatchEvent(selectPlaceEvent);
  };

  return (
    <div className="tree-mfe--catalogListContainer">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={tableHeaderSx} align="left">
                Nom
              </TableCell>
              <TableCell sx={tableHeaderSx} align="left">
                Taille&nbsp;(cm)
              </TableCell>
              <TableCell sx={tableHeaderSx} align="left">
                Âge&nbsp;(année)
              </TableCell>
              <TableCell sx={tableHeaderSx} align="right">
                Prix
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trees?.map((tree) => (
              <TableRow
                onClick={() => {
                  setSelectedTreeId(tree.id);
                  publishSelectTreeEvent(tree.id);
                }}
                key={tree.name}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  ":hover": { backgroundColor: "#b7d3b9", cursor: "pointer" },
                }}
              >
                <TableCell component="th" scope="row">
                  {tree.name}
                </TableCell>
                <TableCell align="left">{tree.sizeInCentimeters}</TableCell>
                <TableCell align="left">{tree.age}</TableCell>
                <TableCell align="right">{tree.price} €</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CatalogList;
