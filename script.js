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
        
        const filteredAndMapUser = users.filter(user => user.email.includes("biz")).map(u => " " + u.id + " / " + u.email + " / " + u.name + " / " + 
                                                                                        u.address.geo.lat + " / " + u.address.geo.lng);
        console.log("String 1 " + filteredAndMapUser);

        let coorArray = [];
        for(let i = 0; i < 3; i++) {
            coorArray[i] = users.filter(user => user.email.includes("biz")).map(u => u.address.geo.lng).toString();
            coorArray[i] = Number(coorArray[i].substring(i*8, (i+1)*8-1));
        }
        const coor = coorArray.reduce(sum);

        function sum(acc, item){ 
            return acc + item;
        }

        console.log("--------------------------------------------------------------------------------------------------------------------------");
        console.log("reduse = " + coor);

 /*       let allUsers = [];
        let i = 0;
        for (user of users) {

            allUsers[i] = ' id: ' + user.id.toString() + ' email: ' + user.email + ' name: ' + user.name + ' lng: ' + user.address.geo.lng + ' lat: ' + user.address.geo.lat;
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
        let emailUsers = allUsers.filter(allUser => allUser.includes('biz')).map(allUser => allUser.substring(allUser.indexOf(' id: '), allUser.indexOf(' lat: ')));
        console.log('Ending ' + emailUsers);*/
    });
}).on('error', err => {
    console.log('Error: ', err.message);
});