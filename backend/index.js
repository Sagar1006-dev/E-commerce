const express = require("express")

const app = express();

app.get("/",(req,res)=>{
    res.send("App is running on Port 5000")
})

app.listen(5000)