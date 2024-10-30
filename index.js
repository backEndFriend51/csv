console.log(5*2);

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


const https = require('https');

https.get('https://jsonplaceholder.typicode.com/users', res => {
  let data = [];
  const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
  console.log('Status Code:', res.statusCode);
  console.log('Date in Response header:', headerDate);

  res.on('data', chunk => {
    data.push(chunk);
  });

  res.on('end', () => {
    console.log('Response ended: ');
    const users = JSON.parse(Buffer.concat(data).toString());
    console.log("Users / " + users);
    console.log(`----------------------------------------------------------------------------------------------------------------------------------`);
    for(user of users) {
      mailEnding = Object.entries(user).filter(([key, value]) => key == 'email' && value.includes('biz')).toString();
      console.log(mailEnding);
      if(mailEnding.includes('biz')) {
      console.log(`----------------------------------------------------------------------------------------------------------------------------------`);
      
        console.log(`Got user with id: ${user.id}, email: ${user.email}, name: ${user.name}, lat: ${user.address.geo.lat}, lng: ${user.address.geo.lng}`);
        console.log(`-----------------------------------------------------------`);
        let mapUser = users.map(user => user.id);
        console.log(`Porsen: ` + mapUser);
        console.log(`-----------------------------------------------------------`); 
      }
    }

  });
}).on('error', err => {
  console.log('Error: ', err.message);
});