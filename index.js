// 1. DEFINICIJA CJENOVNIKA ZA SVE FAZE I OPCIJE
const cjenovnik = {
    faza1: { ime: "FAZA 1: Insta-Web", A: 300, B: 100, B_mjesečno: 30, C: 0, C_mjesečno: 50 },
    faza2: { ime: "FAZA 2: Biznis Start", A: 800, B: 350, B_mjesečno: 50, C: 0, C_mjesečno: 90 },
    faza3: { ime: "FAZA 3: E-Commerce Core", A: 2000, B: 800, B_mjesečno: 120, C: 0, C_mjesečno: 250 },
    faza4: { ime: "FAZA 4: Custom Portal", A: 4000, B: 1500, B_mjesečno: 200, C: 0, C_mjesečno: 450 },
    faza5: { ime: "FAZA 5: Enterprise & Automation", A: 6000, B: 2500, B_mjesečno: 350, C: 0, C_mjesečno: 650 }
};

// 2. FUNKCIJA ZA GLAVNO RAČUNANJE I OSVJEŽAVANJE INTERFEJSA
function izracunajPredracun() {
    // Pokupi selektovanu fazu
    const selektovanaFazaRadio = document.querySelector('input[name="faza"]:checked');
    const fazaKljuc = selektovanaFazaRadio ? selektovanaFazaRadio.value : 'faza1';
    const fazaPodaci = cjenovnik[fazaKljuc];

    // Pokupi selektovanu opciju plaćanja (A, B ili C)
    const selektovanaOpcijaRadio = document.querySelector('input[name="opcija"]:checked');
    const opcija = selektovanaOpcijaRadio ? selektovanaOpcijaRadio.value : 'A';

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
    const hostingChecked = document.getElementById('add-hosting')?.checked || false;
    const dbChecked = document.getElementById('add-db')?.checked || false;
    const seoChecked = document.getElementById('add-seo')?.checked || false;
    const langChecked = document.getElementById('add-lang')?.checked || false;

    // Dodaj mjesečne troškove
    if (hostingChecked) mjesecno += 10;
    if (dbChecked) mjesecno += 15;

    // Dodaj jednokratne troškove
    if (seoChecked) jednokratno += 150;
    if (langChecked) jednokratno += 100;

    // 4. AŽURIRANJE INTERFEJSA (DOM-a)
    const elTotalOneTime = document.getElementById('total-one-time');
    const elTotalMonthly = document.getElementById('total-monthly');
    const elRentWarning = document.getElementById('rent-warning');

    if (elTotalOneTime) elTotalOneTime.innerText = jednokratno + ' €';
    if (elTotalMonthly) elTotalMonthly.innerText = mjesecno + ' € / mj';

    // Prikaži ili sakrij upozorenje za Opciju C (Renta)
    if (elRentWarning) {
        if (opcija === 'C') {
            elRentWarning.classList.remove('hidden');
        } else {
            elRentWarning.classList.add('hidden');
        }
    }

    // Ažuriraj tekstualni pregled stavki u predračunu
    azurirajPregledStavki(fazaPodaci.ime, opcija, { hostingChecked, dbChecked, seoChecked, langChecked });
}

// FUNKCIJA ZA PRIKAZ DETAIL STAVKI U PREDRAČUNU
function azurirajPregledStavki(fazaIme, opcija, dodaci) {
    const container = document.getElementById('summary-items');
    if (!container) return;

    let opcijaNaziv = "";
    if (opcija === 'A') opcijaNaziv = "Opcija A (Ključ u ruke)";
    if (opcija === 'B') opcijaNaziv = "Opcija B (Hibrid)";
    if (opcija === 'C') opcijaNaziv = "Opcija C (Renta)";

    let html = `
        <div class="border-b border-slate-700/60 pb-2">
            <span class="text-xs text-slate-400 block">Izabrana faza:</span>
            <span class="text-sm font-semibold text-white block">${fazaIme}</span>
            <span class="text-xs text-blue-400 mt-1 block font-medium">${opcijaNaziv}</span>
        </div>
    `;

    let dodaciList = [];
    if (dodaci.hostingChecked) dodaciList.push("Premium Hosting (+10 €/mj)");
    if (dodaci.dbChecked) dodaciList.push("Cloud Baza (+15 €/mj)");
    if (dodaci.seoChecked) dodaciList.push("SEO Paket (+150 €)");
    if (dodaci.langChecked) dodaciList.push("Višejezičnost (+100 €)");

    if (dodaciList.length > 0) {
        html += `
            <div class="pt-2 text-xs">
                <span class="text-slate-400 block mb-1">Izabrani dodaci:</span>
                <ul class="list-disc list-inside space-y-1 text-slate-300">
                    ${dodaciList.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    container.innerHTML = html;
}

// 5. GENERISANJE NASUMIČNOG BROJA PREDRAČUNA
function generisiBrojPredracuna() {
    const godina = new Date().getFullYear();
    const nasumicniBroj = Math.floor(1000 + Math.random() * 9000);
    const el = document.getElementById('invoice-id');
    if (el) el.innerText = `#WEB-${godina}-${nasumicniBroj}`;
}

// 6. EVENT LISTENERS
document.addEventListener('DOMContentLoaded', () => {
    generisiBrojPredracuna();

    // Slušaj promjene na fazama
    document.querySelectorAll('input[name="faza"]').forEach(radio => {
        radio.addEventListener('change', izracunajPredracun);
    });

    // Slušaj promjene na opcijama plaćanja
    document.querySelectorAll('input[name="opcija"]').forEach(radio => {
        radio.addEventListener('change', izracunajPredracun);
    });

    // Slušaj promjene na checkboxovima
    ['add-hosting', 'add-db', 'add-seo', 'add-lang'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('change', izracunajPredracun);
    });

    // Inicijalno pokretanje računanja
    izracunajPredracun();
});