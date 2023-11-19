import { Form, useActionData, useNavigation } from '@remix-run/react'
import newNoteStyle from './NewNote.css'

export default function NewNote() {
  const navigation = useNavigation()
  const data = useActionData()

  const isSubmitting = navigation.state === 'submitting'

  return (
    <Form method="post" id="note-form">
      {data?.message && <p>{data.message}</p>}
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <input type="text" id="content" name="content" required />
      </p>
      <div className="form-actions">
        <button disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Note'}
        </button>
      </div>
    </Form>
  )
}

export function links() {
  return [{ rel: 'stylesheet', href: newNoteStyle }]
}
