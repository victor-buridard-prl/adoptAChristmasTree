import { useContext } from "react";

export function useContextInProvider(context, contextName) {
  const contextValue = useContext(context);
  if (contextValue === undefined) {
    const contextLabel = contextName || context.displayName || "A context";
    throw new Error(
      `${contextLabel} was used outside its provider, it should only be called inside its provider`
    );
  }
  return contextValue;
}
