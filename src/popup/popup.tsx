import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import { Box, Grid, InputBase, IconButton, TextField } from "@material-ui/core"
import { Add as AddIcon } from "@material-ui/icons"
import "./popup.css"
import { getDatabase, getPages, addItem } from "../utils/api"
import getDateString from "../utils/helpers"
import { Select, MenuItem } from "@material-ui/core";

const App: React.FC<{}> = () => {
	const [noteInput, setNoteInput] = useState<string>("")
	const [noteInput2, setNoteInput2] = useState<string>("")

	
	const handleButtonClick = () => {
		let data = [noteInput, getDateString()]
		
		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			chrome.tabs.sendMessage(
				tabs[0].id,
				"ask for lc title from pop",
				(problemData) => {
					// console.log('hello')
					// console.log("problemData=", problemData)
					data = [...problemData, ...data]
					console.log(data)
					addItem(data)
				}
			)
		})
	}

	return (
		<div style={{ margin: '16px' }}>
            {/* <textarea
                placeholder="Add labels ..."
                rows={1}
                value={noteInput2}
                onChange={(event) => setNoteInput2(event.target.value)}
            /> */}
            <textarea
                placeholder="Add notes ..."
                rows={10}
                value={noteInput}
                onChange={(event) => setNoteInput(event.target.value)}
            />
            <button onClick={handleButtonClick}>
                Add
            </button>
        </div>
	)
}

const root = document.createElement("div")
document.body.appendChild(root)
ReactDOM.render(<App />, root)