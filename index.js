// 1. DEFINICIJA CJENOVNIKA ZA SVE FAZE I OPCIJE
const cjenovnik = {
    faza1: { ime: "FAZA 1: Insta-Web", A: 300, B: 100, B_mjesečno: 30, C: 0, C_mjesečno: 50 },
    faza2: { ime: "FAZA 2: Biznis Start", A: 800, B: 350, B_mjesečno: 50, C: 0, C_mjesečno: 90 },
    faza3: { ime: "FAZA 3: E-Commerce Core", A: 2000, B: 800, B_mjesečno: 120, C: 0, C_mjesečno: 250 },
    faza4: { ime: "FAZA 4: Custom Portal", A: 4000, B: 1500, B_mjesečno: 200, C: 0, C_mjesečno: 450 },
    faza5: { ime: "FAZA 5: Enterprise & Automation", A: 6000, B: 2500, B_mjesečno: 350, C: 0, C_mjesečno: 650 }
};

// 2. FUNKCIJA ZA GLAVNO RAČUNANJE
function izracunajPredracun() {
    // Pokupi selektovanu fazu
    const selektovanaFazaRadio = document.querySelector('input[name="faza"]:checked');
    const fazaKljuc = selektovanaFazaRadio ? selektovanaFazaRadio.value : 'faza1';
    const fazaPodaci = cjenovnik[fazaKljuc];

    // Pokupi selektovanu opciju plaćanja (A, B ili C)
    const selektovanaOpcijaRadio = document.querySelector('input[name="opcija"]:checked');
    const opcija = selektovanaOpcijaRadio ? selektovanaOpcijaRadio.value : 'A';

    // Inicijalizacija nula za sume
    let jednokratno = 0;
    let mjesecno = 0;

    // Postavi osnovnu cijenu na osnovu izabrane opcije
    if (opcija === 'A') {
        jednokratno = fazaPodaci.A;
        mjesecno = 0;
    } else if (opcija === 'B') {
        jednokratno = fazaPodaci.B;
        mjesecno = fazaPodaci.B_mjesečno;
    } else if (opcija === 'C') {
        jednokratno = fazaPodaci.C;
        mjesecno = fazaPodaci.C_mjesečno;
    }

    // 3. PROVJERA DODATNIH INFRASTRUKTURNIH ELEMENTA
    const hostingChecked = document.getElementById('add-hosting').checked;
    const dbChecked = document.getElementById('add-db').checked;
    const seoChecked = document.getElementById('add-seo').checked;
    const langChecked = document.getElementById('add-lang').checked;

    // Dodaj mjesečne troškove
    if (hostingChecked) mjesecno += 10;
    if (dbChecked) mjesecno += 15;

    // Dodaj jednokratne troškove
    if (seoChecked) jednokratno += 150;
    if (langChecked) jednokratno += 100;

    // 4. AŽURIRANJE INTERFEJSA (DOM-a)
    document.getElementById('total-one-time').innerText = jednokratno + ' €';
    document.getElementById('total-monthly').innerText = mjesecno + ' € / mj';

    // Prikaži ili sakrij ljubičasto upozorenje specifično za Opciju C (Renta)
    const rentWarning = document.getElementById('rent-warning');
    if (opcija === 'C') {
        rentWarning.classList.remove('hidden');
    } else {
        rentWarning.classList.add('hidden');
    }
}

// 5. GENERISANJE NASUMIČNOG BROJA PREDRAČUNA (Čisto zbog profesionalnog izgleda)
function generisiBrojPredracuna() {
    const godina = new Date().getFullYear();
    const nasumicniBroj = Math.floor(1000 + Math.random() * 9000);
    document.getElementById('invoice-id').innerText = `#WEB-${godina}-${nasumicniBroj}`;
}

// 6. EVENT LISTENERS - OLUŠKIVANJE PROMJENA NA STRANICI
document.addEventListener('DOMContentLoaded', () => {
    generisiBrojPredracuna();

    // Dodaj osluškivač na sve radio buttone za faze
    document.querySelectorAll('input[name="faza"]').forEach(radio => {
        radio.addEventListener('change', izracunajPredracun);
    });

    // Dodaj osluškivač na sve radio buttone za opcije plaćanja
    document.querySelectorAll('input[name="opcija"]').forEach(radio => {
        radio.addEventListener('change', izracunajPredracun);
    });

    // Dodaj osluškivače na sve checkboxove za dodatke
    document.getElementById('add-hosting').addEventListener('change', izracunajPredracun);
    document.getElementById('add-db').addEventListener('change', izracunajPredracun);
    document.getElementById('add-seo').addEventListener('change', izracunajPredracun);
    document.getElementById('add-lang').addEventListener('change', izracunajPredracun);

    // Pokreni prvo inicijalno računanje pri učitavanju
    izracunajPredracun();
});
