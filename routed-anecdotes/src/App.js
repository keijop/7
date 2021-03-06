import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useHistory,
} from 'react-router-dom'
import { useField } from './hooks'

const Menu = () => {
  const padding = {
    paddingRight: 5,
  }
  return (
    <div>
      <Link to='/' style={padding}>
        anecdotes
      </Link>
      <Link to='/create' style={padding}>
        create new
      </Link>
      <Link to='/about' style={padding}>
        about
      </Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <Link to={`/${anecdote.id}`}>{anecdote.content}</Link>
        </div>
      ))}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for{' '}
    <a href='https://courses.helsinki.fi/fi/tkt21009'>
      Full Stack -websovelluskehitys
    </a>
    . See{' '}
    <a href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>
      https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js
    </a>{' '}
    for the source code.
  </div>
)

const CreateNew = ({ useField, addNew, displayNotification }) => {
  const history = useHistory()

  const { reset: resetContent, ...content } = useField('content')
  const { reset: resetAuthor, ...author } = useField('author')
  const { reset: resetInfo, ...info } = useField('info')

  const handleSubmit = e => {
    e.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    })
    history.push('/')
    displayNotification(`CREATED: ${content.value}`)
  }

  const resetHandle = () => {
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type='submit'>create</button>
        <button onClick={resetHandle} type='button'>
          reset
        </button>
      </form>
    </div>
  )
}

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find(anecdote => anecdote.id === id)
  return (
    <div>
      <h2>
        {anecdote.content} by {anecdote.author}
      </h2>
      <h4>votes: {anecdote.votes}</h4>
    </div>
  )
}

const Notification = ({ notification }) => {
  return <div style={{ border: 'solid', borderWidth: 3 }}>{notification}</div>
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1',
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2',
    },
  ])

  const [notification, setNotification] = useState('')

  let timerID

  const displayNotification = text => {
    if (timerID) clearTimeout(timerID)
    setNotification(text)
    const newTimerID = setTimeout(() => {
      setNotification('')
    }, 10000)
    timerID = newTimerID
  }

  const addNew = anecdote => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    console.log(`anecdote`, anecdote)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = id => anecdotes.find(a => a.id === id)

  const vote = id => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }

    setAnecdotes(anecdotes.map(a => (a.id === id ? voted : a)))
  }

  return (
    <div>
      <Router>
        <h1>Software anecdotes</h1>
        <Menu />
        <Switch>
          <Route path='/about'>
            <About />
          </Route>
          <Route path='/create'>
            <CreateNew
              useField={useField}
              addNew={addNew}
              displayNotification={displayNotification}
            />
          </Route>
          <Route path='/:id'>
            <Anecdote anecdotes={anecdotes} />
          </Route>
          <Route path='/'>
            {notification ? <Notification notification={notification} /> : ''}
            <AnecdoteList anecdotes={anecdotes} />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  )
}

export default App
