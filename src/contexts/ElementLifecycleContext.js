/**
 * Manages context of element lifecycle.
 */

import { useState, createContext } from "react";

export const ElementLifecycleContext = createContext();
export const ElementLifecycleContextProvider = ({ init, children }) => {
    const [elementLifecycle, setelementLifecycle] = useState(init);

    return (
        <ElementLifecycleContext.Provider value={{ elementLifecycle, setelementLifecycle }}>
            {children}
        </ElementLifecycleContext.Provider>
    );
};