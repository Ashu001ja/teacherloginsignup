const express=require('express');

const PORT=process.env.PORT || 4000
const routuer=require('./router/router');
const cnn=require('./db/database')
const app=express();
app.use(express.json());

app.use(routuer);

const START=async()=>{
    try {
        await cnn();
        app.listen(PORT,()=>{
            console.log(`Server is running on port ${PORT}`);
        })
    } catch (error) {
       console.log(error);
    }
};
START();