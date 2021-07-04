const AstrosUrl = 'http://api.open-notify.org/astros.json';
const WikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
const button = document.querySelector ( '#getList' )
const displayButton = document.querySelector ( '#displayButton' );
const astronautsList = document.querySelector ( '#astronauts' );

function getJSON ( url, callback )
{
    let request = new XMLHttpRequest;
    request.open ( 'get', url );
    request.onreadystatechange = function () {
        if ( request.readyState === 4 ) {
        if ( request.status == 200  ) {
            let data = JSON.parse ( request.responseText );
            console.log ( data );
            callback ( data );

        }
    }
}
    request.send();
}

function generateHTML ( astros )
{
    let element = document.createElement ( "section" );
    if ( astros.type === 'standard' )
    element.innerHTML = `
    <section>
    <h2>${astros.title}</h2>
    <img src=${astros.thumbnail.source}>
    <p>${astros.extract}</p>
    </section>
    `;
    else 
    element.innerHTML = `
    <section>
    <h2>${astros.title}</h2>
    <h9 style='color:red'>There's no more data about this person</h9>
    </section>
    `;
    astronautsList.appendChild ( element );  
}

button.addEventListener ( 'click', (event) => getJSON ( AstrosUrl, ( astros ) => { //<--- tutaj znajduje się rozwiązanie problemu w nawias przekazuję dane astros i wtedy wypisuję surowe dane
    console.log ( '1: ', astros );
    astros.people.map ( astros => {
        getJSON ( WikiUrl + astros.name, generateHTML ); 
    } );
    event.target.style.display = 'none';
    displayButton.style.display = 'block';

 }));