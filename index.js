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


    let allUsers = [];
    let i = 0;
    for(user of users) {

      allUsers[i] = ' id: '+user.id.toString()+' email: '+user.email+' name: '+user.name+' lng: '+user.address.geo.lng+' lat: '+user.address.geo.lat;
      console.log(`----------------------------------------------------------------------------------------------------------------------------------`);
//      mailEnding = Object.entries(user).filter(([key, value]) => key == 'email' && value.includes('biz')).toString();
//      console.log(mailEnding);
//      if(mailEnding.includes('biz')) {
      console.log(`----------------------------------------------------------------------------------------------------------------------------------`);
      let sub = allUsers[i].substring(allUsers[i].indexOf('@'), allUsers[i].indexOf('@') + 20);
        console.log(`Porsen: ` + sub);
        console.log(`-----------------------------------------------------------`); 
//      }
      i++;
    }
  let emailUsers = allUsers.filter(allUser => allUser.includes('biz'))
  .map(allUser => allUser.substring(allUser.indexOf(' id: '), allUser.indexOf(' lat: ')))
  .reduce(allUser => allUser.substring(allUser.indexOf(' lng: ') ,allUser.indexOf(' lng: ')+14) +
                     allUser.substring(allUser.indexOf(' lng: ') ,allUser.indexOf(' lng: ')+14));
  console.log('Ending '+emailUsers);
  });
}).on('error', err => {
  console.log('Error: ', err.message);
});