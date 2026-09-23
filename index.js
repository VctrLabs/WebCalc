// ==========================================
// 1. CJENOVNICI, MAPPING I KONFIGURACIJA
// ==========================================

const cjenovnik = {
    faza1: { ime: "FAZA 1: Insta-Web", A: 300, B: 100, B_mjesečno: 30, C: 0, C_mjesečno: 50 },
    faza2: { ime: "FAZA 2: Biznis Start", A: 800, B: 350, B_mjesečno: 50, C: 0, C_mjesečno: 90 },
    faza3: { ime: "FAZA 3: E-Commerce Core", A: 2000, B: 800, B_mjesečno: 120, C: 0, C_mjesečno: 250 },
    faza4: { ime: "FAZA 4: Custom Portal", A: 4000, B: 1500, B_mjesečno: 200, C: 0, C_mjesečno: 450 },
    faza5: { ime: "FAZA 5: Enterprise & Automation", A: 6000, B: 2500, B_mjesečno: 350, C: 0, C_mjesečno: 650 }
};

const uvjetiPodrske = {
    faza1: {
        A: '<i class="fa-solid fa-check text-emerald-400 mr-1"></i> <span><strong>Opcija A:</strong> 2 kruga besplatnih revizija tokom izrade</span>',
        B: '<i class="fa-solid fa-clock text-amber-400 mr-1"></i> <span><strong>Opcija B:</strong> 2-5 sati mjesečno radnog angažmana na izmjenama</span>',
        C: '<i class="fa-solid fa-shield-halved text-purple-400 mr-1"></i> <span><strong>Opcija C:</strong> Tehnička podrška po pozivu</span>'
    },
    faza2: {
        A: '<i class="fa-solid fa-check text-emerald-400 mr-1"></i> <span><strong>Opcija A:</strong> 3 kruga revizija + 7 dana besplatne podrške</span>',
        B: '<i class="fa-solid fa-clock text-amber-400 mr-1"></i> <span><strong>Opcija B:</strong> 5 sati mjesečno održavanja i ažuriranja</span>',
        C: '<i class="fa-solid fa-shield-halved text-purple-400 mr-1"></i> <span><strong>Opcija C:</strong> Stalan tehnički partner (monitoring 24/7)</span>'
    },
    faza3: {
        A: '<i class="fa-solid fa-check text-emerald-400 mr-1"></i> <span><strong>Opcija A:</strong> 4 kruga revizija + 14 dana tehničke podrške</span>',
        B: '<i class="fa-solid fa-clock text-amber-400 mr-1"></i> <span><strong>Opcija B:</strong> 5-10 sati mjesečno rad na shopu i artiklima</span>',
        C: '<i class="fa-solid fa-shield-halved text-purple-400 mr-1"></i> <span><strong>Opcija C:</strong> Puno tehničko vođenje prodavnice</span>'
    },
    faza4: {
        A: '<i class="fa-solid fa-check text-emerald-400 mr-1"></i> <span><strong>Opcija A:</strong> 30 dana besplatnog nadzora i otklanjanja bugova</span>',
        B: '<i class="fa-solid fa-clock text-amber-400 mr-1"></i> <span><strong>Opcija B:</strong> 10 sati mjesečno razvoja i optimizacije</span>',
        C: '<i class="fa-solid fa-shield-halved text-purple-400 mr-1"></i> <span><strong>Opcija C:</strong> Kontinuirani rad na portalu i backup baze</span>'
    },
    faza5: {
        A: '<i class="fa-solid fa-check text-emerald-400 mr-1"></i> <span><strong>Opcija A:</strong> 60 dana Priority tehničke podrške</span>',
        B: '<i class="fa-solid fa-clock text-amber-400 mr-1"></i> <span><strong>Opcija B:</strong> 15+ sati mjesečno namjenskog rada</span>',
        C: '<i class="fa-solid fa-shield-halved text-purple-400 mr-1"></i> <span><strong>Opcija C:</strong> Kompletno vođenje sistema 24/7</span>'
    }
};

const hostingCijene = {
    none: { cijena: 0, naziv: "Bez hostinga (Klijentov server)" },
    ssd_10: { cijena: 10, naziv: "Premium SSD Hosting (+10 €/mj)" },
    vps_25: { cijena: 25, naziv: "Managed Cloud VPS Server (+25 €/mj)" },
    dedicated_50: { cijena: 50, naziv: "Dedicated High-Performance Node (+50 €/mj)" }
};

const dbCijene = {
    none: { cijena: 0, naziv: "Osnovna lokalna baza" },
    managed_15: { cijena: 15, naziv: "Managed Cloud Database (+15 €/mj)" },
    cluster_40: { cijena: 40, naziv: "Enterprise PostgreSQL Cluster (+40 €/mj)" }
};

const seoCijene = {
    none: { cijena: 0, naziv: "Osnovni On-Page SEO" },
    seo_150: { cijena: 150, naziv: "Napredni SEO Paket (+150 €)" },
    seo_300: { cijena: 300, naziv: "Lokalni + Tehnički SEO Audit & Optim (+300 €)" }
};

const langCijene = {
    none: { cijena: 0, naziv: "1 Primarni jezik" },
    lang_1: { cijena: 100, naziv: "1 Dodatni jezik (+100 €)" },
    lang_2: { cijena: 180, naziv: "2 Dodatna jezika (+180 €)" },
    lang_3: { cijena: 250, naziv: "3+ Dodatna jezika (+250 €)" }
};

// Stanje brojača dodatnih stranica (1 stranica = 40 €)
let brojDodatnihStranica = 0;

// ==========================================
// 2. GLAVNA LOGIKA PRERAČUNA
// ==========================================

function izracunajPredracun() {
    const selektovanaFazaRadio = document.querySelector('input[name="faza"]:checked');
    const fazaKljuc = selektovanaFazaRadio ? selektovanaFazaRadio.value : 'faza1';
    const fazaPodaci = cjenovnik[fazaKljuc];

    const selektovanaOpcijaRadio = document.querySelector('input[name="opcija"]:checked');
    const opcija = selektovanaOpcijaRadio ? selektovanaOpcijaRadio.value : 'A';

    // Ažuriraj dinamiku u listama i uslove podrške
    azurirajUvjetePodrske(opcija);

    let jednokratno = 0;
    let mjesecno = 0;

    // Osnovne cijene iz matrice
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

    // Dodatne stranice
    const cijenaDodatnihStranica = brojDodatnihStranica * 40;
    jednokratno += cijenaDodatnihStranica;

    // Smart Admin Panel logika
    const adminPanelCheckbox = document.getElementById('check-admin-panel');
    const adminPanelBadge = document.getElementById('admin-panel-badge');
    const adminPanelNotice = document.getElementById('admin-panel-notice');
    let adminPanelUracunat = false;

    if (fazaKljuc === 'faza4' || fazaKljuc === 'faza5') {
        // Besplatno uključen u Fazi 4 i 5
        if (adminPanelCheckbox) {
            adminPanelCheckbox.checked = true;
            adminPanelCheckbox.disabled = true;
        }
        if (adminPanelBadge) adminPanelBadge.classList.add('hidden');
        if (adminPanelNotice) adminPanelNotice.classList.remove('hidden');
        adminPanelUracunat = true;
    } else {
        // Naplaćuje se +200 € u Fazama 1, 2, 3 ako je štikliran
        if (adminPanelCheckbox) {
            adminPanelCheckbox.disabled = false;
            if (adminPanelCheckbox.checked) {
                jednokratno += 200;
            }
        }
        if (adminPanelBadge) adminPanelBadge.classList.remove('hidden');
        if (adminPanelNotice) adminPanelNotice.classList.add('hidden');
    }

    // Select opcije (Hosting, Baza, SEO, Jezici)
    const valHosting = document.getElementById('select-hosting')?.value || 'none';
    const valDb = document.getElementById('select-db')?.value || 'none';
    const valSeo = document.getElementById('select-seo')?.value || 'none';
    const valLang = document.getElementById('select-lang')?.value || 'none';

    mjesecno += hostingCijene[valHosting].cijena;
    mjesecno += dbCijene[valDb].cijena;
    jednokratno += seoCijene[valSeo].cijena;
    jednokratno += langCijene[valLang].cijena;

    // Mobilni Ekosistem (PWA, APK, PlayStore, LiveUpdates)
    const idsMobilni = ['extra-pwa', 'extra-apk', 'extra-playstore', 'extra-liveupdates'];
    let odabraniMobilni = [];
    idsMobilni.forEach(id => {
        const el = document.getElementById(id);
        if (el && el.checked) {
            const val = parseInt(el.value, 10);
            jednokratno += val;
            odabraniMobilni.push(el.closest('label').querySelector('.font-bold').innerText);
        }
    });

    // Analytics & Automatizacija
    const idsAnalitika = ['extra-analytics', 'extra-whatsapp', 'extra-push', 'extra-backup'];
    let odabranaAnalitika = [];
    idsAnalitika.forEach(id => {
        const el = document.getElementById(id);
        if (el && el.checked) {
            const val = parseInt(el.value, 10);
            jednokratno += val;
            odabranaAnalitika.push(el.closest('label').querySelector('.font-bold').innerText);
        }
    });

    // Ažuriraj prikaz cjelokupnih iznosa na interfejsu
    const elTotalOneTime = document.getElementById('total-one-time');
    const elTotalMonthly = document.getElementById('total-monthly');
    const elRentWarning = document.getElementById('rent-warning');

    if (elTotalOneTime) elTotalOneTime.innerText = jednokratno + ' €';
    if (elTotalMonthly) elTotalMonthly.innerText = mjesecno + ' € / mj';

    if (elRentWarning) {
        if (opcija === 'C') {
            elRentWarning.classList.remove('hidden');
        } else {
            elRentWarning.classList.add('hidden');
        }
    }

    // Regeneriši pregled stavki u desnom stupcu Predračuna
    azurirajPregledStavki({
        fazaIme: fazaPodaci.ime,
        opcija,
        fazaKljuc,
        valHosting,
        valDb,
        valSeo,
        valLang,
        brojDodatnihStranica,
        cijenaDodatnihStranica,
        adminPanelChecked: adminPanelCheckbox ? adminPanelCheckbox.checked : false,
        adminPanelUracunat,
        odabraniMobilni,
        odabranaAnalitika
    });
}

// ==========================================
// 3. PRIKAZ STAVKI U DESNOM PREDRAČUNU
// ==========================================

function azurirajPregledStavki(podaci) {
    const container = document.getElementById('summary-items');
    if (!container) return;

    let opcijaOpis = "";
    if (podaci.opcija === 'A') opcijaOpis = "Opcija A (Ključ u ruke - jednokratno)";
    if (podaci.opcija === 'B') opcijaOpis = "Opcija B (Hibrid - manji start + održavanje)";
    if (podaci.opcija === 'C') opcijaOpis = "Opcija C (Renta & Dev na poziv)";

    const trenutniSupportText = uvjetiPodrske[podaci.fazaKljuc][podaci.opcija] || '';

    let html = `
        <div class="border-b border-slate-700/60 pb-3">
            <span class="text-[11px] text-slate-400 block">Izabrani paket i model:</span>
            <span class="text-sm font-bold text-white block">${podaci.fazaIme}</span>
            <span class="text-xs text-blue-400 mt-0.5 block font-medium">${opcijaOpis}</span>
        </div>

        <div class="border-b border-slate-700/60 pb-3 text-xs space-y-1 text-slate-300">
            <span class="text-slate-400 block font-medium text-[11px] uppercase">Uključeni uslovi podrške:</span>
            <p class="flex items-start gap-1.5 text-[11px]">
                ${trenutniSupportText}
            </p>
        </div>
    `;

    let dodaciList = [];

    // Dodatne stranice
    if (podaci.brojDodatnihStranica > 0) {
        dodaciList.push(`${podaci.brojDodatnihStranica}x Dodatne stranice (+${podaci.cijenaDodatnihStranica} €)`);
    }

    // Custom Admin Panel
    if (podaci.adminPanelUracunat) {
        dodaciList.push(`Custom Admin Panel (Besplatno u fazi)`);
    } else if (podaci.adminPanelChecked) {
        dodaciList.push(`Custom Admin Panel (+200 €)`);
    }

    // Infrastructure selecti
    if (podaci.valHosting !== 'none') dodaciList.push(hostingCijene[podaci.valHosting].naziv);
    if (podaci.valDb !== 'none') dodaciList.push(dbCijene[podaci.valDb].naziv);
    if (podaci.valSeo !== 'none') dodaciList.push(seoCijene[podaci.valSeo].naziv);
    if (podaci.valLang !== 'none') dodaciList.push(langCijene[podaci.valLang].naziv);

    // Mobilni moduli
    podaci.odabraniMobilni.forEach(m => dodaciList.push(m));

    // Analitika moduli
    podaci.odabranaAnalitika.forEach(a => dodaciList.push(a));

    if (dodaciList.length > 0) {
        html += `
            <div class="border-b border-slate-700/60 pb-3 text-xs">
                <span class="text-slate-400 block mb-1.5 font-medium text-[11px] uppercase">Odabrani moduli i dodaci:</span>
                <ul class="space-y-1 text-slate-300 text-[11px]">
                    ${dodaciList.map(item => `<li class="flex items-center gap-1.5"><i class="fa-solid fa-angle-right text-blue-400 text-[9px]"></i> ${item}</li>`).join('')}
                </ul>
            </div>
        `;
    }

    html += `
        <div class="pt-1 text-[10px] text-slate-400 leading-tight italic">
            * Napomena: Ponuda je informativnog karaktera i prilagođava se konačnoj specifikaciji zahtjeva.
        </div>
    `;

    container.innerHTML = html;
}

// ==========================================
// 4. POMOĆNE FUNKCIJE (Datum & ID)
// ==========================================

function azurirajUvjetePodrske(opcija) {
    Object.keys(uvjetiPodrske).forEach(fazaKljuc => {
        const el = document.getElementById(`support-${fazaKljuc}`);
        if (el && uvjetiPodrske[fazaKljuc][opcija]) {
            el.innerHTML = uvjetiPodrske[fazaKljuc][opcija];
        }
    });
}

function generisiInicijalnePodatke() {
    const danas = new Date();
    const dan = String(danas.getDate()).padStart(2, '0');
    const mjesec = String(danas.getMonth() + 1).padStart(2, '0');
    const godina = danas.getFullYear();

    const elDate = document.getElementById('invoice-date');
    if (elDate) elDate.innerText = `${dan}.${mjesec}.${godina}.`;

    const nasumicniBroj = Math.floor(1000 + Math.random() * 9000);
    const elId = document.getElementById('invoice-id');
    if (elId) elId.innerText = `#WEB-${godina}-${nasumicniBroj}`;
}

// ==========================================
// 5. INICIJALIZACIJA I EVENT LISTENERS
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    generisiInicijalnePodatke();

    // Slušaj promjene na Fazama
    document.querySelectorAll('input[name="faza"]').forEach(radio => {
        radio.addEventListener('change', izracunajPredracun);
    });

    // Slušaj promjene na Opcijama plaćanja
    document.querySelectorAll('input[name="opcija"]').forEach(radio => {
        radio.addEventListener('change', izracunajPredracun);
    });

    // Slušaj promjene na Select padajućim menijima
    ['select-hosting', 'select-db', 'select-seo', 'select-lang'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('change', izracunajPredracun);
    });

    // Slušaj Admin Panel checkbox
    const adminCheck = document.getElementById('check-admin-panel');
    if (adminCheck) adminCheck.addEventListener('change', izracunajPredracun);

    // Slušaj Checkboxove za Mobilni Ekosistem i Analitiku
    const sviCheckboxi = [
        'extra-pwa', 'extra-apk', 'extra-playstore', 'extra-liveupdates',
        'extra-analytics', 'extra-whatsapp', 'extra-push', 'extra-backup'
    ];
    sviCheckboxi.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('change', izracunajPredracun);
    });

    // Event listeneri za Brojač Stranica (+ i -)
    const btnMinus = document.getElementById('btn-page-minus');
    const btnPlus = document.getElementById('btn-page-plus');
    const displayCount = document.getElementById('page-count-display');

    if (btnMinus && btnPlus && displayCount) {
        btnMinus.addEventListener('click', () => {
            if (brojDodatnihStranica > 0) {
                brojDodatnihStranica--;
                displayCount.innerText = brojDodatnihStranica;
                izracunajPredracun();
            }
        });

        btnPlus.addEventListener('click', () => {
            brojDodatnihStranica++;
            displayCount.innerText = brojDodatnihStranica;
            izracunajPredracun();
        });
    }

    // Inicijalni obračun na učitavanju
    izracunajPredracun();
});