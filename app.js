const express = require('express');
const PORT = 3000;
const app = express();


app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));







app.get('/user/signup', (req, res)=>{



    
})





app.listen(PORT, () => {
    console.log(`Sever running and listening on port ${PORT}`)
})