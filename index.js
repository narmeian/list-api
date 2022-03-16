const express = require('express');
const app=express();
const pool=require('./db');
const { response, json } = require('express');
const PORT=process.env.PORT || 8080;

app.use(express.urlencoded())

app.listen(
    PORT,
    ()=>{console.log(`Alive on ${PORT}`)
    });

app.get('/sortedList',async(req,res)=>{
    try{
        const allList=await pool.query("SELECT * FROM list WHERE INPUT IS NOT NULL AND INPUT <> '' AND active = 't' ORDER BY created_at DESC;");
        res.json(allList.rows);
    }catch(err){
        console.error(err.message);
    }
});

app.get('/list',async(req,res)=>{
    try{
        const allList=await pool.query("SELECT * FROM list WHERE INPUT IS NOT NULL AND INPUT <> '' AND active = 't';");
        res.json(allList.rows);
    }catch(err){
        console.error(err.message);
    }
});

app.post('/list',async(req,res)=>{
    try{
        const{input}=req.body;
        const newListItem=await pool.query("INSERT INTO list (input) VALUES ($1) RETURNING *",[input]);
        res.json(newListItem.rows[0]);
    }catch(err){
        console.error(err.message);
    }
});

app.put('/delete_list/:input', async(req,res)=>{
    try {
        const{input}=req.params;
        const deleteFrom=await pool.query('UPDATE list SET active=false WHERE input=$1',[input])
        res.json('Deleted')
    } catch (err) {
        console.error(err.message);
    }
});