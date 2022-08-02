const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;
// const port = process.env.PORT || 3001;
const mysql = require("mysql");
const fs = require("fs")
const dbinfo = fs.readFileSync('./database.json');
const conf = JSON.parse(dbinfo);

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
})

app.use(express.json());
app.use(cors());

// 페이지 불러오기
app.get('/first', async (req, res)=> {
    connection.query(
        "select * from characters where series like '%1%'",
        (err, rows, fields)=> {
            res.send(rows)
        }
    )
})
app.get('/second', async (req, res)=> {
    connection.query(
        "select * from characters where series like '%1%'",
        (err, rows, fields)=> {
            res.send(rows)
        }
    )
})
app.get('/third', async (req, res)=> {
    connection.query(
        "select * from characters where series like '%1%'",
        (err, rows, fields)=> {
            res.send(rows)
        }
    )
})


// 서버실행
app.listen(port, () => {
    console.log("서버가 돌아가고 있습니다.")
})