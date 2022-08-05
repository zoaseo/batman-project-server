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

// 캐릭터 페이지 불러오기
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
        "select * from characters where series like '%2%'",
        (err, rows, fields)=> {
            res.send(rows)
        }
    )
})
app.get('/third', async (req, res)=> {
    connection.query(
        "select * from characters where series like '%3%'",
        (err, rows, fields)=> {
            res.send(rows)
        }
    )
})

// 캐릭터 상세보기
app.get('/detailview/:id', async (req,res)=>{
    const params = req.params;
    const { id } = params;
    connection.query(
        `select imgsrc2, actor, role, description from characters where id=${id}`,
        (err, rows, fields)=>{
            res.send(rows[0]);
        }
    )
})

// 캐릭터 삭제
app.delete('/delCharacter/:id', async (req,res)=>{
    const params = req.params;
    const { id } = params;
    console.log("삭제");
    connection.query(
        `delete from characters where id=${id}`,
        (err, rows, fields)=>{
            res.send(rows);
        }
    )
})

// 로그인
app.get('/getId/:id', async (req,res)=>{
    const params = req.params;
    const { id } = params;
    connection.query(
        `select userId from users where userId='${id}'`,
        (err, rows, fields)=>{
            res.send(rows);
        }
    )
})
app.get('/getPw/:id', async (req,res)=>{
    const params = req.params;
    const { id } = params;
    connection.query(
        `select password from users where userId='${id}'`,
        (err, rows, fields)=>{
            res.send(rows);
        }
    )
})

// 로그인 id 중복확인
app.get('/idCh', async (req,res)=>{
    connection.query(
        "select userId from users",
        (err, rows, fields)=> {
            res.send(rows)
        }
    )
})

// 회원가입
app.post('/join', async (req,res)=>{
    const body = req.body;
    const { id, name, phone, email, add, adddetail, password } = body;
    const query = "INSERT INTO users(userId, userName, phone, email, address, adddetail, password) values(?,?,?,?,?,?,?)";
    connection.query(
                    query, 
                    [id, name, phone, email, add, adddetail, password], 
                    (err, rows, fields) => {
                        res.send(err);
                    });

})

// 굿즈 페이지 불러오기
app.get('/goods1', async (req, res)=> {
    connection.query(
        "select * from goods where part = '1'",
        (err, rows, fields)=> {
            res.send(rows)
        }
    )
})
app.get('/goods2', async (req, res)=> {
    connection.query(
        "select * from goods where part = '2'",
        (err, rows, fields)=> {
            res.send(rows)
        }
    )
})
app.get('/goods3', async (req, res)=> {
    connection.query(
        "select * from goods where part = '3'",
        (err, rows, fields)=> {
            res.send(rows)
        }
    )
})

// 굿즈 상세보기
app.get('/detailview2/:id', async (req,res)=>{
    const params = req.params;
    const { id } = params;
    connection.query(
        `select * from goods where id=${id}`,
        (err, rows, fields)=>{
            res.send(rows[0]);
        }
    )
})

// 굿즈 삭제
app.delete('/delGoods/:id', async (req,res)=>{
    const params = req.params;
    const { id } = params;
    console.log("삭제");
    connection.query(
        `delete from goods where id=${id}`,
        (err, rows, fields)=>{
            res.send(rows);
        }
    )
})

// 굿즈 수정
app.put('/editgoods/:id', async (req,res)=>{
    // 파라미터 값을 가지고 있는 객체
    const params = req.params;
    const { id } = params;
    const body = req.body;
    const { c_proimgsrc, c_proname, c_prodescript, c_price, c_part } = body;
    connection.query(
        `update goods
        set proimgsrc='${c_proimgsrc}', proname='${c_proname}', prodescript='${c_prodescript}', price='${c_price}', part='${c_part}'
        where id = ${id}`,
        (err, rows, fields)=>{
            res.send(rows);
        }
    )
})

// 장바구니
app.get('/mypage/:idid', async (req,res)=>{
    const params = req.params;
    const { idid } = params;
    connection.query(
        `select * from pack where user_id='${idid}'`,
        (err, rows, fields)=>{
            res.send(rows);
        }
    )
})

// 장바구니에 추가
app.put('/addReservation', async (req,res)=>{
    const body = req.body;
    const {c_user_id, c_user_name, c_user_imgsrc, c_user_count, c_user_price} = body;
    connection.query(
        "insert into pack( user_id, user_name, user_imgsrc, user_count, user_price) values(?,?,?,?,?)",
        [c_user_id, c_user_name, c_user_imgsrc, c_user_count, c_user_price],
        (err, rows, fields)=>{
            res.send(rows);
        }
    )
})

// 장바구니에 삭제
app.delete('/delReservation/:id', async (req,res)=>{
    const params = req.params;
    const { id } = params;
    console.log("삭제");
    connection.query(
        `delete from pack where id=${id}`,
        (err, rows, fields)=>{
            res.send(rows);
        }
    )
})

// 서버실행
app.listen(port, () => {
    console.log("서버가 돌아가고 있습니다.")
})