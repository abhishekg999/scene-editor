/**
 * Manages context of timeline. Later will change to store project in its entirely.
 * Exports Context, which is the context to use this global variable
 * Exports ContextProvider which just wraps in Editor
 */

import { useState, createContext } from "react";

export const ProjectContext = createContext();
export const ProjectContextProvider = ({ init, children }) => {
    const [project, setProject] = useState(init);

    return (
        <ProjectContext.Provider value={{ project, setProject }}>
            {children}
        </ProjectContext.Provider>
    );
};