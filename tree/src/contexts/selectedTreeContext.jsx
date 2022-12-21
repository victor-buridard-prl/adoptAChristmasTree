import React, { createContext, useState } from "react";

import { useContextInProvider } from "./context.helper";

const SelectedTreeIdContext = createContext(undefined);

const SelectedTreeProvider = (props) => {
  const [selectedTreeId, setSelectedTreeId] = useState();

  return (
    <SelectedTreeIdContext.Provider
      value={{
        selectedTreeId,
        setSelectedTreeId,
      }}
    >
      {props.children}
    </SelectedTreeIdContext.Provider>
  );
};

const useSelectedTreeContext = () =>
  useContextInProvider(SelectedTreeIdContext, "SelectedTreeIdContext");

export { SelectedTreeProvider, SelectedTreeIdContext, useSelectedTreeContext };
