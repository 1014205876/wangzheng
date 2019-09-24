const express=require("express");
const app=express();

app.get("/",(req,res)=>{
    res.json({msg:'hello'})
});

const port=process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(port);
});