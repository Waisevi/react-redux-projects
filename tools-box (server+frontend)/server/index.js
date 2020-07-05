const express = require('express');
const fs = require('fs');
const crypto = require('crypto');
const app = express();

const reqData = (function(req,res,next){
    fs.readFile('./notesData.json', 'utf8', function(err,data){
        if (err) throw err;
        req.reqData = data;
        next();
    });
});

app.use('/notes', reqData);
app.use('/login', reqData);

const reqDataLogin = (function(req,res,next){
    fs.readFile('./regData.json', 'utf8', function(err,data){
        if (err) throw err;
        req.reqDataLogin = data;
        next();
    });
});

// REGISTRATION //

app.use('/login', reqDataLogin);
app.use(express.urlencoded({ extended: true }))

app.post('/login/register', function(req,res){
    if(req.body.email && req.body.password !== undefined) {
        const dataJson = JSON.parse(req.reqDataLogin);
        const indexAcc = dataJson.findIndex((seach) => seach.email === req.body.email);
        
        if(indexAcc === -1) {
            let hash = crypto.createHash('sha256').update(req.body.password).digest('hex');

            let dataJson = JSON.parse(req.reqDataLogin);
            const logId = dataJson.length;
            
            const newItem = {
                "id": logId + 1,
                "email": req.body.email,
                "password": hash
            };

            dataJson.push(newItem);
            dataJson = JSON.stringify(dataJson)
            
            fs.writeFile('./regData.json',dataJson,'utf8',function(err){
                if (err) throw err;
                console.log('Write new account');
            });

            //add new user in note json
            let dataNoteService = JSON.parse(req.reqData);
           
            const newNoteSerice = {
                email: req.body.email,
                notes: []
            }

            dataNoteService.push(newNoteSerice);
            dataNoteService = JSON.stringify(dataNoteService)

            fs.writeFile('./notesData.json',dataNoteService,'utf8',function(err){
                if (err) throw err;
            });

            res.header("Access-Control-Allow-Origin", "*");
            res.end();
        } else {
            res.header("Access-Control-Allow-Origin", "*");
            res.status(403).json({ });
        }
    } else {
        res.status(400).json({ });
    };
});

app.post('/login/loginAccount', function(req,res){
    console.log(req.reqDataLogin)
    const dataJson = JSON.parse(req.reqDataLogin);
    let hash = crypto.createHash('sha256').update(req.body.password).digest('hex');
    const indexAcc = dataJson.findIndex((seach) => seach.email === req.body.email && seach.password === hash);
    console.log(indexAcc)

    if(indexAcc !== -1) {
        res.header("Access-Control-Allow-Origin", "*");
        res.end();
    } else {
        res.header("Access-Control-Allow-Origin", "*");
        res.status(403).json({ });
    };
})

// NOTES LIST //

app.get('/notes/del',function(req,res){
    if(req.query.index && req.query.email !== undefined){
      let dataJson = JSON.parse(req.reqData);
      const indexAcc = dataJson.findIndex((seach) => seach.email == req.query.email);
        if(indexAcc != -1) {
            dataJson[indexAcc].notes.splice(req.query.index,1)

            dataJson = JSON.stringify(dataJson)
            fs.writeFile('./notesData.json',dataJson,'utf8',function(err){
                if (err) throw err;
                console.log('Del note index: '+ req.query.index + ' ');
            });
            dataJson = JSON.parse(dataJson);
            res.header("Access-Control-Allow-Origin", "*");
            res.json(dataJson);
        } else {
            res.end();
        }
    } else {
      res.end();
    }
});

app.get('/notes/add',function(req,res){
    if(req.query.email && req.query.title !== undefined) {
        let dataJson = JSON.parse(req.reqData);
        const indexAcc = dataJson.findIndex((seach) => seach.email == req.query.email);
        
        if(indexAcc != -1) {
            let maxId = 1
            
            if(dataJson[indexAcc].notes.length !== 0){
                let max = dataJson[indexAcc].notes.reduce((acc, curr) => acc.id > curr.id ? acc : curr);
                maxId = max.id + 1
            }
            
            const newItem = {
                "id": maxId,
                "title": req.query.title,
                "date": Date.now()
            };

            dataJson[indexAcc].notes.push(newItem);
            dataJson = JSON.stringify(dataJson)
            fs.writeFile('./notesData.json',dataJson,'utf8',function(err){
                if (err) throw err;
                console.log('Write new note');
            });
            dataJson = JSON.parse(dataJson);
            res.header("Access-Control-Allow-Origin", "*");
            res.json(dataJson);
        } else {
            res.end()
        }
    } else {
      res.end();
    };
});

app.get('/request-data',function(req,res){
    fs.readFile('./notesData.json', 'utf8', function(err,data){
        if (err) throw err;
        const dataJson = JSON.parse(data);
        res.header("Access-Control-Allow-Origin", "*");
        res.json(dataJson);
    });
});

app.listen(3001, function(){
    console.log('Server start')
});
