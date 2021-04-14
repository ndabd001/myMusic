import { useState, useEffect } from 'react';
import { API, Storage } from 'aws-amplify';
import { listNotes } from '../graphql/queries';
import { createNote as createNoteMutation, deleteNote as deleteNoteMutation } from '../graphql/mutations';
import { CustomSignIn } from './signin';
import { AmplifySignOut } from '@aws-amplify/ui-react';
import { CardGroup, Card, Button, FormControl, InputGroup } from 'react-bootstrap';

const initialFormState = { name: '', description: '' }

const Home = (props) => {

  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchNotes();
  }

  async function fetchNotes() {
    const apiData = await API.graphql({ query: listNotes });
    const notesFromAPI = apiData.data.listNotes.items;
    await Promise.all(notesFromAPI.map(async note => {
      if (note.image) {
        const image = await Storage.get(note.image);
        note.image = image;
      }
      return note;
    }))
    setNotes(apiData.data.listNotes.items);
  }

  async function createNote() {
    if (!formData.name ) return;
    await API.graphql({ query: createNoteMutation, variables: { input: formData } });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    setNotes([ ...notes, formData ]);
    setFormData(initialFormState);
  }

  async function deleteNote({ id }) {
    const newNotesArray = notes.filter(note => note.id !== id);
    setNotes(newNotesArray);
    await API.graphql({ query: deleteNoteMutation, variables: { input: { id } }});
  }

  if (props.authState === 'signedIn') {
    return (
      <div className="Home">

        <h1>My Music</h1>
        <InputGroup className="mb-3">
          <FormControl
            style={{display:'inline-flex'}}
            onChange={e => setFormData({ ...formData, 'name': e.target.value})}
            placeholder="Song name"
            value={formData.name}
          />
          <InputGroup.Append>
            <Button 
              onClick={createNote} 
              style={{display:'inline-flex'}}>
                Add Song
            </Button>
          </InputGroup.Append>
        </InputGroup>

        <CardGroup style={{marginBottom: 30, justifyContent:'center'}}>
        {
          notes.map(note => (
            <div key={note.id || note.name}>
              <Card style={{width: 400, height:300}}>
                <Card.Img variant="top" src={note.image}  />
                <Card.Title>{note.name}</Card.Title>
                <Button className="float-right" style={{textAlign:'center'}} variant="secondary"  onClick={() => deleteNote(note)}>Delete</Button>
              </Card>
            </div>
          ))
        }
        </CardGroup>
        <AmplifySignOut />
      </div>
    );
  }
  else {
    return (
      <CustomSignIn />
    )
  }
}

export default Home;