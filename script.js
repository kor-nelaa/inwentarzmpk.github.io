document.getElementById('dataForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nrb = document.getElementById('nrb').value;
    const prod = document.getElementById('prod').value;
    const model = document.getElementById('model').value;
    const mod = document.getElementById('mod').value;
    const photo = document.getElementById('photo').value;
    const info = document.getElementById('info').value;
    
    const data = { nrb, prod, model, mod, photo, info };

    // Zapisz lub nadpisz dane w localStorage
    localStorage.setItem(nrb, JSON.stringify(data));
    
    // Informacja o zapisaniu danych
    document.getElementById('message').textContent = 'Dane zapisane!';
    
    // Wyświetl zapisane dane
    displayData(nrb);

    // Czyszczenie pól formularza po zapisaniu danych
    document.getElementById('dataForm').reset();
});

document.getElementById('searchBtn').addEventListener('click', function() {
    const searchNrb = document.getElementById('searchNrb').value;
    if (localStorage.getItem(searchNrb)) {
        displayData(searchNrb);
    } else {
        document.getElementById('output').innerHTML = '<p>Dane dla tego numeru bocznego nie zostały znalezione.</p>';
    }
});

function displayData(nrb) {
    const data = JSON.parse(localStorage.getItem(nrb));
    let output = '<h2>Dane dla numeru boczengo: ' + nrb + '</h2>';
    output += '<p>Producent: ' + data.prod + '</p>';
    output += '<p>Typ: ' + data.model + '</p>';
    output += '<p>Modernizacje: ' + (data.mod || 'Brak') + '</p>';
    output += '<p>Zdjęcia: ' + (data.photo ? `<a href="${data.photo}" target="_blank">Link</a>` : 'Brak') + '</p>';
    output += '<p>Informacje dodatkowe: ' + (data.info ? '<br>' + data.info.replace(/\n/g, '<br>') : 'Brak') + '</p>';
    document.getElementById('output').innerHTML = output;
}

