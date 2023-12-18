import { createPool } from "mysql";

const pool = createPool({
    host : "localhost",
    user: "root",
    password : "",
    database : "cognKitchen",
    connectionLimit : 10,
    autocommit : true
})

pool.query("Select * from cognKitchen.fav",(error, result) => {
    console.log(result); 
})

export default pool;