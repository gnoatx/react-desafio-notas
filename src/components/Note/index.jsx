import style from './Note.module.css'
import { NotePencil, Trash } from "@phosphor-icons/react"

export function Note({note, currentNote, setCurrentNote, setTitle, notes, setNotes}) {
  const glow = `0 0 10px 1px ${note.color}, inset 0 0 2px #999`
  const boostGlow = `0 0 10px 10px ${note.color}`

  function handleEdit(n) {
    setCurrentNote(n)
    setTitle(n.title)
  }

  function handleDelete(n) {
    if (confirm('Deseja mesmo deletar esta nota?')) {
      setNotes(notes.filter((item) => item != n))
    }
  }

  return(
    <li className={style.note} style={{boxShadow: note == currentNote ? boostGlow : glow }}>
      <div className={style.content}>
        <strong className={style.title}>{note.title}</strong>
        <p className={style.text}>{note.text}</p>
      </div>
      <div className={style.controls}>
        <button className={style.button} onClick={() => handleEdit(note)}><NotePencil className={style.buttonIcon} size={24} weight="bold" /></button>
        <button className={style.button} onClick={() => handleDelete(note)}><Trash className={style.buttonIcon} size={24} weight="bold" /></button>
      </div>
    </li>
  )
}