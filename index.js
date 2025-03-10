const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());

let persons =
[
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    { 
        "id": "2",
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
    },
    { 
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
];

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
});

app.get('/info', (request, response) => {
    const currentDate = new Date();
    const nounUsed = persons.length === 1 ? "person" : "people";
    response.send(`<p>Phonebook has info for ${persons.length} ${nounUsed}<br/><br/>${currentDate}</p>`)
});

app.get('/api/persons', (request, response) => {
    response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
});

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
});

const generateId = () => {
    const newId = persons.length > 0
      ? Math.floor(Math.random() * 1000000)
      : 0;
    return String(newId);
};

app.post('/api/persons', (request, response) => {
    const body = request.body;

    personIsDuplicated = persons.find(person => person.name === body.name);
    
    if (!body.name || !body.number) {
            return response.status(400).json({
                error: 'content missing'
            });
    } else if(personIsDuplicated){
            return response.status(400).json({
                error: 'name already exists in phonebook'
            });
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    };

    persons = persons.concat(person);

    response.json(note)
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});