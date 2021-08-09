const AstrosUrl = 'http://api.open-notify.org/astros.json';
const WikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
const button = document.querySelector('#getList')
const displayButton = document.querySelector('#displayButton');

function getJSON(url, callback) {
    let request = new XMLHttpRequest;
    request.open ('get', url);
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status == 200) {
                let data = JSON.parse(request.responseText);
                //console.log (data);
                callback(data);
            }
        }
    }
    request.send();
}

function generateHTML(astros) {
    const astronautsList = document.querySelector('#astronauts');
    const astronaut = {
        'h2': astros.title,
        'p': astros.extract,
    }

    const section = document.createElement('section');
    if (astros.type === 'standard') {
        const element = document.createElement('img');
        element.src = astros.thumbnail.source;
        section.appendChild(element);
        astronautsList.appendChild(section);  
        for (const properties in astronaut){
            const element = document.createElement(properties);
            const content = document.createTextNode(astronaut[properties]);
            element.appendChild(content);
            section.appendChild(element);

        }
    } else if (astros.type === 'disambiguation') {
        const h2 = document.createElement('h2');
        let content = document.createTextNode(astronaut.h2);
        h2.appendChild(content);
        section.appendChild(h2);
        const h9 = document.createElement('h9');
        h9.style = 'color:red';
        content = document.createTextNode(`There's no more data about this person`);
        h9.appendChild(content);
        section.appendChild(h9);
        astronautsList.appendChild(section);
    }
}

button.addEventListener('click', (event) => getJSON(AstrosUrl, (astros) => { //<--- tutaj znajduje się rozwiązanie problemu w nawias przekazuję dane astros i wtedy wypisuję surowe dane
    //console.log ( '1: ', astros );
    astros.people.map(astros => {
        getJSON(WikiUrl + astros.name, generateHTML); 
    });
    event.target.style.display = 'none';
    displayButton.style.display = 'block';
 }));

  
 displayButton.addEventListener('click', () => {
    const astronautsList = document.querySelector('#astronauts');
    if (astronautsList.style.display === 'none') {
        astronautsList.style.display = 'block';
        displayButton.innerHTML = 'Hide list';
    } else if (astronautsList.style.display = 'block') {
        astronautsList.style.display = 'none';
        displayButton.innerHTML = 'Show list';
    }
});
