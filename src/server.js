import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import homeRouter from './routes/home.js'

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use('/', homeRouter)

app.get('*', (req, res) => {
  res.status(404).json({
    status: 'fail',
    data: {
      resource: 'Not found'
    }
  })
})

export default app
