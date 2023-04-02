import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

import Navbar from "./scenes/global/Navbar";
import Editor from "./scenes/editor";
import Settings from "./scenes/settings";
import { Routes, Route } from "react-router-dom";

function App() {
	const [theme, colorMode] = useMode();

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<div className="app"
					onContextMenu={(e) => {
						//e.preventDefault(); 
						console.log("Right Click");
					}}>
					<main className="content">
						<Navbar />

						<Routes>
							<Route path="/" element={<Editor />} />
							<Route path="/editor" element={<Editor />} />
							<Route path="/settings" element={<Settings />} />
						</Routes>
					</main>
				</div>
			</ThemeProvider>

		</ColorModeContext.Provider>
	);
}

export default App;
