import { json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { getStoreNotes } from '~/data/notes'
import styles from '~/styles/note-details.css'

export default function NoteDetailsPage() {
  const note = useLoaderData()

  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/notes">Back to all Notes</Link>
        </nav>
        <h1>{note.title}</h1>
      </header>
      <p id="note-details-content">{note.content}</p>
    </main>
  )
}

export function meta({ data, params }) {
  return {
    title: data.title,
    description: 'Manage your notes with ease',
  }
}

export async function loader({ params }) {
  const noteId = params.noteId
  const notes = await getStoreNotes()
  const note = notes.find((note) => note.id === noteId)

  if (!note) {
    throw json(
      { message: 'Could not find note for id ' + noteId },
      { status: 404, statusText: 'Not Found' },
    )
  }

  return note
}

export function links() {
  return [{ rel: 'stylesheet', href: styles }]
}
