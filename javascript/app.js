let titolo=document.getElementById('h1');
titolo.textContent='titolo';

// come creare un nuovo elemento 
let newElement = document.createElement('a');
newElement.href = 'https://music.youtube.com/watch?v=dj86haGuI8w&list=RDAMVM3a-q7vPa-UU';
newElement.textContent= 'PIGIAMI';
// come inserire un elemento in una data posizione
let firstP = document.querySelector('p');
firstP.append(newElement);

// elemento da rimuovere
let elimina = document.getElementById('elimina');
elimina.remove();

// muovere gli elementi
let h1 = document.querySelector('h1');
h1.parentElement.append(firstP);
sws