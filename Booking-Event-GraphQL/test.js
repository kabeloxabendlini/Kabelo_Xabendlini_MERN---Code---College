const fetch = require('node-fetch');

fetch('http://localhost:8000/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: '{ events { _id title } }' })
})
  .then(res => res.json())
  .then(console.log)
  .catch(console.error);
