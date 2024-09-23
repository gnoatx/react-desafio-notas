import './styles/global.css'
import style from './styles/App.module.css'
import { PencilSimpleLine } from "@phosphor-icons/react"
import { useEffect, useRef, useState } from 'react'
import { nanoid } from 'nanoid'
import { Note } from './components/Note'

function App() {
  const emptyList = {id: 0, title: 'Minha primeira nota', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus commodi nemo itaque possimus nisi esse officia modi alias facilis quae rem, quas adipisci, minima sit accusamus veniam vitae. Est, magni?', color: '#5D0CED'}
  const storedNotes = JSON.parse(localStorage.getItem('notes')) || [emptyList]
  const [notes, setNotes] = useState(storedNotes)
  const [currentNote, setCurrentNote] = useState()
  const titleRef = useRef(null)
  const textRef = useRef(null)
  const [title, setTitle] = useState('')
  

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
    console.log(localStorage)
  }, [notes])

  useEffect(() => {
    if (!!currentNote) {
      titleRef.current.value = currentNote.title
      textRef.current.value = currentNote.text
    }
  }, [currentNote])

  function handleSubmit(event) {
    event.preventDefault()

    let color = '#' + Math.floor(Math.random()*16777215).toString(16)

    if (!!currentNote) {
      color = currentNote.color
      const filteredNotes = notes.splice(notes.indexOf(currentNote), 1)
      setNotes(filteredNotes)
      setCurrentNote()
    }

    setNotes([...notes,
      {
        id: nanoid(),
        title: titleRef.current.value,
        text: textRef.current.value,
        color: color
      }
    ])

    titleRef.current.value = ''
    textRef.current.value = ''
    setTitle('')
  }

  return (
    <div className={style.container}>
      <div style={{position: "absolute", top: 0, right: 0, display: "flex", flexDirection: "column"}}>
        <button onClick={() => {localStorage.clear()}}>Clear</button>
        <button onClick={() => {console.log(localStorage)}}>Log</button>
        <button onClick={() => {window.location.reload()}}>Refresh</button>
      </div>
      <h1 className={style.header}>Neon Notes</h1>
      <form className={style.form} onSubmit={(e) => {handleSubmit(e)}}>
        <div className={style.inputs}>
          <input
            type="text"
            placeholder="Deixe suas ideias fluírem"
            className={style.title}
            onChange={(e) => {setTitle(e.target.value)}}
            ref={titleRef}
          />
          <textarea placeholder="Digite suas notas" className={!!title ? style.showText : style.hideText} ref={textRef}></textarea>
        </div>
        <button type='submit' className={style.button}><PencilSimpleLine className={style.buttonIcon} size={32} weight="bold" /></button>
      </form>
      <ul className={style.list}>
        {/* {!!storedNotes && <Note note={emptyList} currentNote={currentNote} setCurrentNote={setCurrentNote} setTitle={setTitle} notes={notes} setNotes={setNotes} key={emptyList.id}/>} */}
        {notes.map((note) => <Note note={note} currentNote={currentNote} setCurrentNote={setCurrentNote} setTitle={setTitle} notes={notes} setNotes={setNotes} key={note.id}/>)}
      </ul>
    </div>
  )
}

export default App
