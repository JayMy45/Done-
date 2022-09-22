import { Repairs } from "./components/Repairs"
import { createRoot } from "react-dom/client"
import "./index.css"
import { BrowserRouter } from "react-router-dom"

/*
React Bootstrap Configurations
 */


// import '../node_modules/react-bootstrap@next/dist/react-bootstrap.min.js'



const container = document.getElementById("root")
const root = createRoot(container)
root.render(
    <BrowserRouter>
        <Repairs />
    </BrowserRouter>
)

