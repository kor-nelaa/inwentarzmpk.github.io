const dataFileUrl = 'https://backend-sigma-rose.vercel.app/data';

document.getElementById('dataForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const nrb = document.getElementById('nrb').value;
    const prod = document.getElementById('prod').value;
    const model = document.getElementById('model').value;
    const mod = document.getElementById('mod').value || '';
    const photo = document.getElementById('photo').value || '';
    const info = document.getElementById('info').value || '';

    const data = { nrb, prod, model, mod, photo, info };
    
    console.log('Sending data:', data);

    fetch(dataFileUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(message => {
        console.log('Response from server:', message);
        document.getElementById('message').textContent = message;
        document.getElementById('message').style.color = 'green';
        document.getElementById('dataForm').reset();
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('message').textContent = 'Error saving data.';
        document.getElementById('message').style.color = 'red';
    });
});

document.getElementById('searchBtn').addEventListener('click', function() {
    const searchNrb = document.getElementById('searchNrb').value;

    fetch(`${dataFileUrl}/${searchNrb}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            let output = `<h2>Dane dla wagonu o numerze: ${searchNrb}</h2>`;
            output += `<p>Producent: ${data.prod}</p>`;
            output += `<p>Typ: ${data.model}</p>`;
            output += `<p>Modernizacje: ${data.mod || 'Brak'}</p>`;
            output += `<p>Zdjęcie: ${data.photo ? `<a href="${data.photo}">Zdjęcie</a>` : 'Brak'}</p>`;
            output += `<p>Informacje dodatkowe: ${data.info ? `<pre>${data.info}</pre>` : 'Brak'}</p>`;
            document.getElementById('searchResult').innerHTML = output;
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('searchResult').innerHTML = `<p style="color: red;">Danych dla numeru bocznego: ${searchNrb} nie znaleziono.</p>`;
        });
});

