import { useState, useEffect } from 'react';
import { API, Storage } from 'aws-amplify';
import { listNotes } from '../graphql/queries';
import { createNote as createNoteMutation, deleteNote as deleteNoteMutation } from '../graphql/mutations';
import { CustomSignIn } from './signin';
import { AmplifySignOut } from '@aws-amplify/ui-react';
import { CardGroup, Card, Button, FormControl, InputGroup } from 'react-bootstrap';

const initialFormState = { name: '', image: '' }

const Home = (props) => {

  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  //useEffect must be used here to prevent errors in fetchNotes; If not used here there will be errors on view but database will function normally CRUD wise
  //however the results of the API fetch request are not being fed into the database, most likely because a spread operator is needed in the setNotes hook, simply 
  //the data is not being populated into the notes state, please address
  useEffect(function effectFunction() {
    async function fetch() {
      const response = await fetch(`https://swapi.dev/api/people/${formData.name}`);
      const json = await response.json();
        setNotes(json.data)
    }
    fetchNotes();
  }, [formData]);

  async function fetchNotes() {
    const apiData = await API.graphql({ query: listNotes });
    const notesFromAPI = apiData.data.listNotes.items;
    await Promise.all(notesFromAPI.map(async note => {
      return note;
    }))
    setNotes(apiData.data.listNotes.items);
  }

  async function createNote() {
    if (!formData.name ) return;    
      fetch(`https://starwars-visualguide.com/assets/img/characters/${formData.name}`)
        .then((res) => res.json())
        .then(
          (resp) => {
            console.log(resp)
            setNotes([ ...notes, resp.image])
          }
        )
      console.log(notes)
    await API.graphql({ query: createNoteMutation, variables: { input: formData } });
    setNotes([ ...notes, formData ]);
    setFormData(initialFormState);
  }

  async function deleteNote({ id }) {
    const newNotesArray = notes.filter(note => note.id !== id);
    setNotes(newNotesArray);
    await API.graphql({ query: deleteNoteMutation, variables: { input: { id } }});
  }

  //private routing should be used to guarantee contexts, this if statement is purely temporary
  //below line 88 should be update to note.title or the name attribute should be updated to display the name and not the number; however the img currently depends on the 
  //number being inside of notes.name
  if (props.authState === 'signedIn') {
    return (
      <div className="Home">

        <h1>My Star Wars List</h1>
        <InputGroup className="mb-3">
          <FormControl
            style={{display:'inline-flex'}}
            onChange={e => setFormData({ ...formData, 'name': e.target.value})}
            placeholder="Enter a number below 82"
            value={formData.name}
          />
          <InputGroup.Append>
            <Button 
              onClick={createNote} 
              style={{display:'inline-flex'}}>
                Add Character
            </Button>
          </InputGroup.Append>
        </InputGroup>

        <CardGroup style={{marginBottom: 30, justifyContent:'center'}}>
        {
          notes.map(note => (
            <div key={note.id || note.name}>
              <Card >
                <Card.Img variant="top"  src={`https://starwars-visualguide.com/assets/img/characters/${note.name}.jpg`}  />
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