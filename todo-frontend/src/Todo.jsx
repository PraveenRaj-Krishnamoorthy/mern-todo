import { useState } from "react"

export const Todo = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [todos, setTodos] = useState([])
    const apiURL = "http://localhost:8081"
    const handleSubmit = () => {
        if (title.trim() && description.trim()) {
            fetch(apiURL + "/todos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, description })
            }).then((res) => {
                if (res.ok) {
                    setTodos([...todos, { title, description }])
                    alert('Added')
                } else {
                    console.log("Unable to create todo item");
                }
            })
        }
    }
    return (
        <>
            <h1>This is the app</h1>
            <input type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} placeholder="title.." />
            <input type="text" value={description} onChange={(e) => { setDescription(e.target.value) }} placeholder="description.." />
            <button onClick={handleSubmit}>Submit</button>
        </>
    )
}