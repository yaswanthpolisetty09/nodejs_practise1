const express = require('express')
const path = require('path')

const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const app = express()
app.use(express.json())

const dbPath = path.join(__dirname, 'moviesData.db')
let db = null

const initialize = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('server is running ')
    })
  } catch (e) {
    console.log(`Error is ${e.message}`)
    process.exit(1)
  }
}
initialize()

app.get('/movies/', async (request, response) => {
  const dd = `
    select movie_name
    from 
    movie;
    `
  const ss = await db.all(dd)
  response.send(ss)
})

app.post('/movies/', async (request, response) => {
  const q2 = request.body
  const {director_id, movie_name, lead_actor} = q2
  const abc = `
  insert into movie(director_id,movie_name,lead_actor)
  values(
    '${director_id}',
    '${movie_name}',
    '${lead_actor}'
  );
  `
  const yashh = await db.run(abc)
  response.send('Movie Successfully Added')
})

app.get('/movies/:movieId/', async (request, response) => {
  const {movieId} = request.params
  const q3 = `
  select
   * 
  from 
  movie
  where 
  movie_id= ${movieId};
  `
  const divy = await db.get(q3)
  console.log(divy)
  response.send(divy)
})

app.put('/movies/:movieId/', async (request, response) => {
  const {movieId} = request.params
  const movd = request.body
  const {director_id, movie_name, lead_actor} = movd
  const q4 = `
  update 
  movie 
  set 
  director_id='${director_id}',
  movie_name='${movie_name}',
  lead_actor='${lead_actor}'
  where 
  movie_id=${movieId};
  `
  const opp = await db.run(q4)
  response.send('Movie Details Updated')
})

app.delete('/movies/:movieId/', async (request, response) => {
  const {movieId} = request.params
  const delq = `
  delete from movie 
  where 
  movie_id=${movieId};
  `
  const ghj = await db.run(delq)
  response.send('Movie Removed')
})
