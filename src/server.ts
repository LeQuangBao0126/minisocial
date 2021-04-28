import express, { Request, Response } from 'express'

const app = express();
const port = process.env.PORT || 5000

app.get('/', (req: Request, res: Response) => {
    res.send("a");
})

app.listen(port, () => {
    console.log("server is running")
})