const mongoose=require('mongoose')

const dbconection=()=>{mongoose.connect(process.env.DB_URL).then(conn => {
    console.log(`Database connected ${conn.connection.host}`)
})}
module.exports=dbconection