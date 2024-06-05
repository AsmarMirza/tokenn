import express from "express"
import jwt from "jsonwebtoken"
import { v4 as uuidv4 } from 'uuid';
import { uuid } from "uuidv4";

const app = express()
const port = 3000

app.use(express.json())
const key="ehwiur346e"
const users=[{
    id:1,
    email:"salam",   
    password:"salam" ,
    role:"user"
}]
app.get('/user', (req, res) => {
    try {
       const token=req.headers.authorization 
       if (!token) {
        return res.status(401).send("gdyf")
       }
    const decoded=  jwt.verify(token, key)
        if (decoded.role==="admin") {
          return  res.send(users)
        }
      
      
    } catch (error) {
        res.send(error)
    }
 
})

app.post('/login', (req, res) => {

try {
    const {email,password}=req.body
    const user=users.find((x)=>x.email===email)
    if (!user) {
      return  res.status(404).json("user not found") 
    }
    if (user.password!==password) {
        return  res.status(401).json("wrong password") 
      }
      const token = jwt.sign({ email: user.email,role:user.role,id:user.id },key,{ expiresIn: 60 * 60 });
      res.status(200).json(token)
} catch (error) {
   res.send(error) 
}
  })



app.post('/register', (req, res) => {

    try {
        const {email,password}=req.body
        const user=users.find((x)=>x.email===email)
        if (user) {
          return  res.status(400).json("email used ") 
        }
       users.push({id:uuid(),email,password,role:"user"})
          res.status(200).json(users)
    } catch (error) {
       res.send(error) 
    }
      })
  


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})