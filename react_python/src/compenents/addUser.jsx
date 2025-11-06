import { useState } from "react"

const AddUser = () => {
    const [username, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [error, setError] = useState(false)
    const [message, setMessage] = useState("")

    const createUser = async (e) => {
        e.preventDefault()
        const res = await fetch("http://localhost:8080/user/insert",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    username,
                }
                ),
            }
        )

        const data = await res.json()

        if (!res.ok) {
            setError(true)
            setMessage(`${data.error}` || 'add failed')
            return;
        }

        console.log("add sucessfully");
        setUserName("")
        setEmail("")
    }

    return (
        <>
            <form action="" onSubmit={createUser}>
                <label >user name : </label>
                <input type="text" value={username} onChange={(e) => setUserName(e.target.value)} placeholder="user name" />
                <label >email : </label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
                <button type="submit">add</button>
                {
                    error && <p>{message}</p>
                }
            </form>
        </>
    );
}

export default AddUser;