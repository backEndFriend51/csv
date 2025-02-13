const https = require('https');


https.get('https://jsonplaceholder.typicode.com/users', res => {
    let data = [];
    const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
    console.log('Status Code:', res.statusCode);
    console.log('Date in Response header:', headerDate);

    res.on('data', chunk => {
        data.push(chunk);
    });

    let filteredAndMapUser = [];
    res.on('end', () => {
        console.log('Response ended: ');
        const users = JSON.parse(Buffer.concat(data).toString());
        
        filteredAndMapUser = users.filter(user => user.email.includes("biz")).map(u => u.id + ", " + u.email + ", " + u.name + "/");
        console.log("String 1 " + filteredAndMapUser);

        let coorArray = [];
        for(let i = 0; i < filteredAndMapUser.length; i++) {
            coorArray[i] = users.filter(user => user.email.includes("biz")).map(u => u.address.geo.lng).toString();
            coorArray[i] = Number(coorArray[i].substring(i*8, (i+1)*8-1));
        }
        const coor = coorArray.reduce(sum);

        function sum(acc, item){ 
            return acc + item;
        }
        console.log("Array 1 " + coorArray);
        let filterArray = filteredAndMapUser.toString().split("/,");
        for(let n = 0; n < filteredAndMapUser.length; n++) {
            console.log(n + ".B - " + filterArray[n]);
            filterArray[n] = filterArray[n].replace("/", "") + ", " + (coor/filteredAndMapUser.length);
            console.log(n + ".A - " + filterArray[n]);
        }

        console.log("ID,EMAIL,NAME,GEO");
        console.log(filterArray);


    });
}).on('error', err => {
    console.log('Error: ', err.message);
});