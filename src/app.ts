import express from "express"
import router from "./routes.js"

const app = express()

app.use(express.json())
app.use("/api", router);

app.get("/health",(_req, res)=>{
    res.status(200).json({status: "ok"})
})

export default app;