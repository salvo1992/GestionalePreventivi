// === Storage Keys ===
const STORAGE_KEYS = {
  preventivi: 'viking_preventivi',
  clienti: 'viking_clienti',
  note: 'viking_note',
  preziario: 'viking_preziario'
};

// === Utility per localStorage ===
function loadData(key) {
  return JSON.parse(localStorage.getItem(key) || '[]');
}
function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// === MODELLI DI DATI ===
let preventivi = loadData(STORAGE_KEYS.preventivi);
let clienti = loadData(STORAGE_KEYS.clienti);
let note = loadData(STORAGE_KEYS.note);
let preziario = loadData(STORAGE_KEYS.preziario);
// --- Tipi progetto disponibili ---
const tipiProgetto = [
  "Web App", 
  "App Mobile", 
  "E-commerce", 
  "Landing Page", 
  "Gestionale", 
  "Altro"
];
// Se è la prima volta, popola un preziario base:
if (!preziario.length) {
  preziario = [
  {
    nome: "Front-end",
    sottovoci: [
      { nome: "HTML5", prezzo: 300 },
      { nome: "CSS3", prezzo: 150 },
      { nome: "JavaScript", prezzo: 250 },
      { nome: "TypeScript", prezzo: 250 },
      { nome: "React.js", prezzo: 400 },
      { nome: "Vue.js", prezzo: 350 },
      { nome: "Angular", prezzo: 350 },
      { nome: "Bootstrap/Tailwind", prezzo: 120 },
      { nome: "Animazioni/UI", prezzo: 80 },
      { nome: "Responsive/mobile-first", prezzo: 100 },
      { nome: "Accessibilità (WCAG)", prezzo: 80 },
      { nome: "Gestione stato (Redux/MobX)", prezzo: 90 }
    ]
  },
  {
    nome: "Back-end",
    sottovoci: [
      { nome: "Node.js", prezzo: 400 },
      { nome: "Express.js", prezzo: 200 },
      { nome: "Python/Django/Flask", prezzo: 500 },
      { nome: "PHP/Laravel/Symfony", prezzo: 400 },
      { nome: "Java/Spring", prezzo: 500 },
      { nome: "API REST", prezzo: 300 },
      { nome: "API GraphQL", prezzo: 350 },
      { nome: "Autenticazione JWT", prezzo: 120 },
      { nome: "File Upload/Storage", prezzo: 110 }
    ]
  },
  {
    nome: "Database",
    sottovoci: [
      { nome: "MySQL", prezzo: 150 },
      { nome: "PostgreSQL", prezzo: 180 },
      { nome: "MongoDB", prezzo: 170 },
      { nome: "SQLite", prezzo: 100 },
      { nome: "Firebase/Firestore", prezzo: 130 },
      { nome: "Progettazione Schema DB", prezzo: 140 },
      { nome: "Backup/Restore DB", prezzo: 60 }
    ]
  },
  {
    nome: "Design & UX/UI",
    sottovoci: [
      { nome: "Prototipo Figma", prezzo: 120 },
      { nome: "Logo/Brand", prezzo: 180 },
      { nome: "Wireframe", prezzo: 60 },
      { nome: "Palette colori", prezzo: 50 },
      { nome: "Design System", prezzo: 100 },
      { nome: "Microinterazioni", prezzo: 60 },
      { nome: "Icon set personalizzato", prezzo: 60 }
    ]
  },
  {
    nome: "SEO & Performance",
    sottovoci: [
      { nome: "SEO base", prezzo: 120 },
      { nome: "SEO avanzata", prezzo: 220 },
      { nome: "Performance (Lighthouse)", prezzo: 80 },
      { nome: "Ottimizzazione immagini", prezzo: 70 },
      { nome: "Microdati/Schema.org", prezzo: 70 }
    ]
  },
  {
    nome: "Sicurezza",
    sottovoci: [
      { nome: "HTTPS/SSL", prezzo: 50 },
      { nome: "Autenticazione 2FA", prezzo: 70 },
      { nome: "Cifratura dati sensibili", prezzo: 110 },
      { nome: "Gestione permessi/ACL", prezzo: 100 },
      { nome: "Protezione XSS/CSRF", prezzo: 100 },
      { nome: "Privacy e GDPR", prezzo: 80 }
    ]
  },
  {
    nome: "Testing & Qualità",
    sottovoci: [
      { nome: "Test Unitari (Jest/JUnit)", prezzo: 70 },
      { nome: "Test End-to-End (Cypress/Selenium)", prezzo: 100 },
      { nome: "Code Review", prezzo: 80 },
      { nome: "Documentazione API", prezzo: 60 }
    ]
  },
  {
    nome: "Mobile/Native",
    sottovoci: [
      { nome: "App Android (Java/Kotlin)", prezzo: 600 },
      { nome: "App iOS (Swift)", prezzo: 700 },
      { nome: "Ibrida (React Native/Flutter)", prezzo: 450 },
      { nome: "Push Notification", prezzo: 150 },
      { nome: "Geolocalizzazione", prezzo: 130 },
      { nome: "Accesso camera/media", prezzo: 120 }
    ]
  },
  {
    nome: "E-commerce",
    sottovoci: [
      { nome: "Catalogo prodotti", prezzo: 800 },
      { nome: "Pagamenti online", prezzo: 400 },
      { nome: "Carrello", prezzo: 250 },
      { nome: "Gestione ordini", prezzo: 300 },
      { nome: "Dashboard amministratore", prezzo: 400 },
      { nome: "Coupon/sconti", prezzo: 110 },
      { nome: "Integrazione spedizioni", prezzo: 130 }
    ]
  },
  {
    nome: "Integrazioni & Extra",
    sottovoci: [
      { nome: "Google Maps", prezzo: 100 },
      { nome: "Social login (Google, Facebook)", prezzo: 120 },
      { nome: "Newsletter/Mailchimp", prezzo: 100 },
      { nome: "Chat online/WhatsApp", prezzo: 90 },
      { nome: "Servizi esterni/API", prezzo: 140 },
      { nome: "PWA/Installabile", prezzo: 80 }
    ]
  },
  {
    nome: "DevOps & Deploy",
    sottovoci: [
      { nome: "Deploy su Netlify/Vercel", prezzo: 90 },
      { nome: "Deploy su VPS/Cloud", prezzo: 130 },
      { nome: "Automazione CI/CD", prezzo: 110 },
      { nome: "Dockerizzazione", prezzo: 110 },
      { nome: "Backup automatico", prezzo: 90 }
    ]
  }
];
saveData(STORAGE_KEYS.preziario, preziario); // Così aggiorni subito anche il localStorage
}
// === Utility DOM ===
function el(tag, opts = {}, ...children) {
  const e = document.createElement(tag);
  Object.entries(opts).forEach(([k, v]) => e[k] = v);
  children.forEach(child => {
    if (typeof child === 'string') e.appendChild(document.createTextNode(child));
    else if (child) e.appendChild(child);
  });
  return e;
}
function formatDate(ts) {
  if (!ts) return '';
  const d = new Date(ts);
  return d.toLocaleDateString();
}

// === Navigation ===
function show(view) {
  document.getElementById('app').innerHTML = '';
  view();
}

// === BOTTONI con icona ===
function btnHome() {
  return el('button', {
    className: "btn btn-home",
    onclick: () => show(homeView)
  }, "🏠 Torna Home");
}
function btnNuovoCliente() {
  return el('button', {
    className: "btn btn-nuovo-cliente",
    onclick: () => show(creaClienteView)
  }, "➕ Nuovo Cliente");
}
function btnNuovoPreventivo() {
  return el('button', {
    className: "btn btn-new-preventivo",
    onclick: () => show(creaPreventivoView)
  }, "📝 Nuovo Preventivo");
}
function btnSalvaNote(action) {
  return el('button', {
    className: "btn btn-salva-note",
    onclick: action
  }, "💾 Salva Note");
}

// === HOME ===
function homeView() {
  const app = document.getElementById('app');
  app.appendChild(el('div', { className: 'logo-header' },
    el('img', { src: 'logo-vikingo-verde.png', alt: 'Logo Vikingo' }),
    el('h1', {}, 'The Viking of the Web')
  ));
  app.appendChild(el('p', {
    style: 'font-size:1.1rem; color: var(--white); text-align:center; margin-bottom:26px; letter-spacing:1px;'
  }, 'Ciao Salvatore! Benvenuto nel tuo gestionale preventivi vichingo ⚔️'));

  // Dashboard ordini
  app.appendChild(el('h2', { className: 'section-title' }, 'Dashboard ordini'));
  const ordiniDaFare = preventivi.filter(p => p.status === 'approvato').length;
  const ordiniAttesa = preventivi.filter(p => p.status === 'in_attesa').length;
  const ordiniEseguiti = preventivi.filter(p => p.status === 'eseguito').length;
  const ordiniScartati = preventivi.filter(p => p.status === 'scartato').length;
  const dash = el('div', { className: 'dashboard' },
    el('div', { className: 'card' },
      el('h3', {}, 'Da fare'),
      el('span', { className: 'status' }, `${ordiniDaFare} approvati`),
      el('div', { className: 'actions' },
        el('button', { onclick: () => { _filtroSel = "approvato"; show(preventiviView); } }, "Vedi")
      )
    ),
    el('div', { className: 'card' },
      el('h3', {}, 'In attesa'),
      el('span', { className: 'status' }, `${ordiniAttesa} in attesa`),
      el('div', { className: 'actions' },
        el('button', { onclick: () => { _filtroSel = "in_attesa"; show(preventiviView); } }, "Vedi")
      )
    ),
    el('div', { className: 'card' },
      el('h3', {}, 'Eseguiti'),
      el('span', { className: 'status' }, `${ordiniEseguiti} eseguiti`),
      el('div', { className: 'actions' },
        el('button', { onclick: () => { _filtroSel = "eseguito"; show(preventiviView); } }, "Vedi")
      )
    ),
    el('div', { className: 'card' },
      el('h3', {}, 'Scartati'),
      el('span', { className: 'status' }, `${ordiniScartati} scartati`),
      el('div', { className: 'actions' },
        el('button', { onclick: () => { _filtroSel = "scartato"; show(preventiviView); } }, "Vedi")
      )
    )
  );
  app.appendChild(dash);

  app.appendChild(el('hr', { className: 'section-divider' }));

  // Sezioni principali
  app.appendChild(el('h2', { className: 'section-title' }, 'Sezioni principali'));
  const dash2 = el('div', { className: 'dashboard' },
    el('div', { className: 'card' },
      el('h3', {}, 'Preventivi'),
      el('span', { className: 'status' }, 'Gestisci, approva o scarta'),
      el('div', { className: 'actions' },
        btnNuovoPreventivo(),
        el('button', { onclick: () => { _filtroSel = "tutti"; show(preventiviView); } }, 'Gestisci preventivi')
      )
    ),
    el('div', { className: 'card' },
      el('h3', {}, 'Clienti'),
      el('span', { className: 'status' }, 'Schede clienti, preventivi, acconti'),
      el('div', { className: 'actions' },
        btnNuovoCliente(),
        el('button', { onclick: () => show(clientiView) }, 'Vedi clienti')
      )
    ),
    el('div', { className: 'card' },
      el('h3', {}, 'Note & Agenda'),
      el('span', { className: 'status' }, 'Appunti e promemoria lavori'),
      el('div', { className: 'actions' },
        el('button', { onclick: () => show(noteView) }, 'Vai alle note')
      )
    ),
    el('div', { className: 'card' },
      el('h3', {}, 'Preziario'),
      el('span', { className: 'status' }, 'Gestione voci e prezzi'),
      el('div', { className: 'actions' },
        el('button', { onclick: () => show(preziarioView) }, 'Gestisci preziario')
      )
    )
  );
  app.appendChild(dash2);

 const backupBar = el('div', { style: "margin:32px 0 16px 0; text-align:center;" },
  el('button', {
    className: 'btn btn-salva-note',
    style: "margin-right:18px;",
    onclick: () => exportBackup()
  }, "⬇️ Esporta Backup"),
  el('button', {
    className: 'btn btn-salva-note',
    onclick: () => importBackup()
  }, "⬆️ Importa Backup")
);
app.appendChild(backupBar);
 
}

// === PREZIARIO DINAMICO ===
function preziarioView() {
  const app = document.getElementById('app');
  app.innerHTML = '';
  app.appendChild(btnHome());
  app.appendChild(el('h2', { className: 'section-title' }, "Preziario – Voci e prezzi personalizzati"));

  // Lista macro-voci (categorie)
  preziario.forEach((cat, i) => {
    const box = el('div', { className: "card", style: "margin-bottom:15px;" },
      el('div', { style: "display:flex;align-items:center;gap:12px;" },
        el('input', {
          type: 'text', value: cat.nome, style: "font-size:1.08rem;width:150px;font-weight:bold;",
          onchange: e => {
            preziario[i].nome = e.target.value;
            saveData(STORAGE_KEYS.preziario, preziario);
            show(preziarioView);
          }
        }),
        el('button', {
          style: "background:#d32f2f;color:#fff;padding:4px 11px;border-radius:7px;",
          onclick: () => {
            if (confirm('Eliminare tutta la categoria?')) {
              preziario.splice(i, 1);
              saveData(STORAGE_KEYS.preziario, preziario);
              show(preziarioView);
            }
          }
        }, "🗑")
      ),
      el('div', { style: "margin-left:9px;" },
        ...cat.sottovoci.map((sv, j) =>
          el('div', { style: "display:flex;align-items:center;gap:7px;margin-bottom:5px;" },
            el('input', {
              type: 'text', value: sv.nome, style: "width:140px;",
              onchange: e => {
                preziario[i].sottovoci[j].nome = e.target.value;
                saveData(STORAGE_KEYS.preziario, preziario);
              }
            }),
            el('input', {
              type: 'number', value: sv.prezzo, min: 0, style: "width:75px;",
              onchange: e => {
                preziario[i].sottovoci[j].prezzo = parseFloat(e.target.value) || 0;
                saveData(STORAGE_KEYS.preziario, preziario);
                show(preziarioView);
              }
            }),
            el('span', {}, "€"),
            el('button', {
              style: "background:#b47b32;color:#fff;padding:3px 8px;border-radius:7px;",
              onclick: () => {
                preziario[i].sottovoci.splice(j, 1);
                saveData(STORAGE_KEYS.preziario, preziario);
                show(preziarioView);
              }
            }, "–")
          )
        ),
        el('button', {
          style: "background:var(--viking-green);color:#fff;margin:9px 0 0 0;border-radius:7px;",
          onclick: () => {
            preziario[i].sottovoci.push({ nome: "Nuova sottovoce", prezzo: 0 });
            saveData(STORAGE_KEYS.preziario, preziario);
            show(preziarioView);
          }
        }, "+ Aggiungi sottovoce")
      )
    );
    app.appendChild(box);
  });
  // Aggiungi nuova categoria
  app.appendChild(el('button', {
    style: "background:var(--viking-green);color:#fff;font-weight:700;border-radius:10px;padding:8px 20px;margin-top:15px;",
    onclick: () => {
      preziario.push({ nome: "Nuova categoria", sottovoci: [] });
      saveData(STORAGE_KEYS.preziario, preziario);
      show(preziarioView);
    }
  }, "+ Aggiungi categoria"));
}

// === PREVENTIVI (Lista + Azioni) ===
let _filtroSel = 'tutti';
function preventiviView() {
  const app = document.getElementById('app');
  app.innerHTML = '';
  app.appendChild(btnHome());
  app.appendChild(btnNuovoPreventivo());

  app.appendChild(el('h2', { className: 'section-title' }, 'Tutti i preventivi'));

  // Filtro status
  const statusFiltro = ['tutti', 'in_attesa', 'approvato', 'eseguito', 'scartato'];
  let filtroSel = _filtroSel || 'tutti';
  const filtro = el('div', { style: "margin: 14px 0 16px 0;" }, ...statusFiltro.map(st =>
    el('button', {
      style: `margin:0 8px 0 0;padding:6px 12px;border-radius:7px;background:${filtroSel===st?'var(--viking-green)':'#2d6a4f15'};color:var(--white);border:none;cursor:pointer;`,
      onclick: () => {
        _filtroSel = st;
        show(preventiviView);
      }
    }, st === 'tutti' ? 'Tutti' : st.replace('_', ' ').toUpperCase())
  ));
  app.appendChild(filtro);

  // Lista preventivi
  let lista = (filtroSel === 'tutti') ? preventivi : preventivi.filter(p => p.status === filtroSel);
  if (!lista.length) {
    app.appendChild(el('div', { style: "color:#bbb;margin:20px;font-size:1.2rem;" }, "Nessun preventivo trovato."));
    return;
  }
  lista.forEach(p => {
    const cl = clienti.find(c => c.id === p.clienteId);
    app.appendChild(el('div', { className: 'card', style: "margin-bottom:15px;" },
      el('h3', {}, `Cliente: ${cl ? cl.nome : '-'}`),
      el('div', {}, `Categoria: ${p.categoria || '-'}`),
      el('div', {}, `Componenti: ${p.scelte.map(sv => sv.nome).join(', ')}`),
      el('div', { className: 'status' }, `Stato: ${p.status.replace('_', ' ').toUpperCase()}`),
      el('div', { className: 'date' }, `Inizio: ${formatDate(p.data)}`),
      el('div', { className: 'date' }, p.dataFine ? `Fine: ${formatDate(p.dataFine)}` : ''),
      el('div', { className: 'date' }, `Prezzo: €${p.prezzoTotale}`),
      el('div', { className: 'actions' },
        el('button', { onclick: () => show(() => preventivoDetailView(p.id)) }, 'Dettaglio'),
        el('button', {
          onclick: () => {
            if (confirm('Sicuro di eliminare il preventivo?')) {
              preventivi = preventivi.filter(x => x.id !== p.id);
              saveData(STORAGE_KEYS.preventivi, preventivi);
              show(preventiviView);
            }
          }
        }, 'Elimina')
      )
    ));
  });
}

// === CREAZIONE PREVENTIVO ===
function creaPreventivoView() {
  const app = document.getElementById('app');
  app.innerHTML = '';
  app.appendChild(btnHome());
  app.appendChild(el('h2', { className: 'section-title' }, "Nuovo Preventivo"));

  // Wrapper form per layout migliore
  const formWrap = el('div', { style: "background:rgba(45,106,79,0.10);border-radius:20px;padding:32px 22px 22px 22px;max-width:540px;margin:0 auto;box-shadow:0 0 20px 0 #1730293a;" });

  // Cliente
  const clienteSel = el('select', { style: "margin-bottom:18px;font-size:1.13rem;border-radius:9px;padding:5px 10px;" },
    el('option', { value: '' }, "Seleziona cliente..."),
    ...clienti.map(c => el('option', { value: c.id }, c.nome))
  );

  // Tipo progetto (solo etichetta)
  const tipiProgetto = [
    "Web App", "App Mobile", "E-commerce", "Landing Page", "Gestionale", "Altro"
  ];
  const tipoProjSel = el('select', { style: "margin-bottom:18px;font-size:1.13rem;border-radius:9px;padding:5px 10px;" },
    el('option', { value: '' }, "Tipo progetto..."),
    ...tipiProgetto.map(t => el('option', { value: t }, t))
  );

  // Accordion macro/micro-categorie
  const boxSottovoci = el('div', { style: "margin-bottom:24px;" });
  let scelte = [];
  // Mostra sempre tutto il preziario (accordion con open/close)
  preziario.forEach((cat, idxCat) => {
    // Accordion "macro" con apri/chiudi
    const macroHeader = el('div', {
      style: "font-weight:700;font-size:1.15rem;margin-top:13px;margin-bottom:5px;color:var(--viking-bronze);cursor:pointer;user-select:none;display:flex;align-items:center;gap:8px;",
      onclick: () => {
        macroBody.style.display = (macroBody.style.display === "none" ? "" : "none");
        macroHeader.querySelector('span').textContent = macroBody.style.display === "none" ? "►" : "▼";
      }
    }, el('span', {}, "▼"), cat.nome);

    const macroBody = el('div', { style: "margin-left:15px;margin-bottom:4px;" });
    cat.sottovoci.forEach((sv, idx) => {
      const check = el('input', { type: 'checkbox', id: `sv_${idxCat}_${idx}` });
      check.onchange = () => {
        if (check.checked) {
          scelte.push({ ...sv, macro: cat.nome });
        } else {
          scelte = scelte.filter(x => !(x.nome === sv.nome && x.macro === cat.nome));
        }
        calcTotale();
      };
      macroBody.appendChild(
        el('div', { style: "margin-bottom:6px;display:flex;align-items:center;gap:7px;" },
          check,
          el('label', { for: `sv_${idxCat}_${idx}`, style: "margin-left:7px;font-size:1.04rem;" },
            `${sv.nome} (${cat.nome}) – €${sv.prezzo}`)
        )
      );
    });
    boxSottovoci.appendChild(macroHeader);
    boxSottovoci.appendChild(macroBody);
  });

  // Altri campi (ben separati)
  const inizio = el('input', { type: 'date', style: "margin-bottom:13px;font-size:1.1rem;padding:5px 9px;border-radius:7px;border:1px solid #2d6a4f44;" });
  const fine = el('input', { type: 'date', style: "margin-bottom:13px;font-size:1.1rem;padding:5px 9px;border-radius:7px;border:1px solid #2d6a4f44;" });
  const acconto = el('input', { type: 'number', style: "margin-bottom:13px;font-size:1.1rem;padding:5px 9px;border-radius:7px;border:1px solid #2d6a4f44;", placeholder: "Acconto €" });
  const noteCliente = el('textarea', { placeholder: "Note per il cliente", style: "margin-bottom:13px;width:100%;min-height:48px;font-size:1.1rem;padding:8px 11px;border-radius:7px;border:1px solid #2d6a4f44;" });

  // Totale in grande evidenza
  const totaleBox = el('div', { style: "margin-bottom:14px;font-weight:700;font-size:1.33rem;color:var(--viking-bronze);" }, "Totale: €0");
  function calcTotale() {
    const tot = scelte.reduce((a, sv) => a + Number(sv.prezzo), 0);
    totaleBox.textContent = "Totale: €" + tot;
    return tot;
  }

  // Salva
  const btnSalva = el('button', {
    className: "btn btn-salva-note",
    style: "margin-top:14px;margin-right:14px;font-size:1.1rem;",
    onclick: () => {
      if (!clienteSel.value) return alert("Seleziona un cliente.");
      if (!tipoProjSel.value) return alert("Seleziona tipo progetto.");
      if (!scelte.length) return alert("Seleziona almeno una componente.");
      const prezzoTotale = calcTotale();
      const nuovo = {
        id: Math.random().toString(36).slice(2),
        clienteId: clienteSel.value,
        categoria: tipoProjSel.value,
        scelte: scelte,
        data: inizio.value ? new Date(inizio.value).getTime() : Date.now(),
        dataFine: fine.value ? new Date(fine.value).getTime() : null,
        acconto: parseFloat(acconto.value || 0),
        prezzoTotale,
        noteCliente: noteCliente.value,
        status: 'in_attesa'
      };
      preventivi.push(nuovo);
      saveData(STORAGE_KEYS.preventivi, preventivi);
      show(preventiviView);
    }
  }, "💾 Salva preventivo");

  // Ricomponi form
  formWrap.appendChild(el('div', { style: "margin-bottom:10px;font-size:1.15rem;font-weight:600;" }, "Cliente: ", clienteSel));
  formWrap.appendChild(el('div', { style: "margin-bottom:10px;font-size:1.15rem;font-weight:600;" }, "Tipo progetto: ", tipoProjSel));
  formWrap.appendChild(el('div', { style: "margin-bottom:6px;font-size:1.13rem;font-weight:600;" }, "Componenti selezionabili:"));
  formWrap.appendChild(boxSottovoci);
  formWrap.appendChild(totaleBox);
  formWrap.appendChild(el('div', {}, "Data inizio: ", inizio));
  formWrap.appendChild(el('div', {}, "Data fine: ", fine));
  formWrap.appendChild(el('div', {}, "Acconto: ", acconto));
  formWrap.appendChild(el('div', {}, "Note cliente: ", noteCliente));
  formWrap.appendChild(btnSalva);
  formWrap.appendChild(el('button', { className: "btn", style: "margin-left:16px;", onclick: () => show(preventiviView) }, "Annulla"));

  app.appendChild(formWrap);
}



// === DETTAGLIO PREVENTIVO ===
function preventivoDetailView(pid) {
  const app = document.getElementById('app');
  const p = preventivi.find(x => x.id === pid);
  if (!p) return show(preventiviView);

  const cl = clienti.find(c => c.id === p.clienteId);

  app.innerHTML = '';
  app.appendChild(btnHome());
  app.appendChild(el('h2', { className: 'section-title' }, `Dettaglio Preventivo per ${cl ? cl.nome : '-'}`));
  app.appendChild(el('div', {}, `Categoria: ${p.categoria || '-'}`));
  app.appendChild(el('div', {}, `Componenti: ${p.scelte.map(sv => sv.nome).join(', ')}`));
  app.appendChild(el('div', {}, `Prezzo totale: €${p.prezzoTotale}`));
  app.appendChild(el('div', {}, `Stato: ${p.status}`));
  app.appendChild(el('div', {}, `Data inizio: ${formatDate(p.data)}`));
  app.appendChild(el('div', {}, `Data fine: ${p.dataFine ? formatDate(p.dataFine) : '-'}`));
  app.appendChild(el('div', {}, `Acconto: €${p.acconto || 0}`));
  app.appendChild(el('div', {}, `Rimanenza: €${p.prezzoTotale - (p.acconto || 0)}`));
  app.appendChild(el('div', {}, `Note cliente: ${p.noteCliente || ''}`));
  app.appendChild(el('hr', { className: 'section-divider' }));

  const actions = [];
  if (p.status === "in_attesa") {
    actions.push(el('button', {
      onclick: () => { p.status = 'approvato'; saveData(STORAGE_KEYS.preventivi, preventivi); show(preventiviView); }
    }, 'Approva'));
    actions.push(el('button', {
      onclick: () => { p.status = 'scartato'; saveData(STORAGE_KEYS.preventivi, preventivi); show(preventiviView); }
    }, 'Scarta'));
  } else if (p.status === "approvato") {
    actions.push(el('button', {
      onclick: () => { p.status = 'eseguito'; saveData(STORAGE_KEYS.preventivi, preventivi); show(preventiviView); }
    }, 'Segna come eseguito'));
  }
  actions.push(el('button', { onclick: () => show(preventiviView) }, 'Torna ai preventivi'));
  actions.push(el('button', { onclick: () => exportPreventivoPDF(p) }, 'Scarica PDF'));

  app.appendChild(el('div', { className: 'actions' }, ...actions));
  // Invia tramite WhatsApp, email
  app.appendChild(el('div', { style: "margin-top:25px;" },
    el('button', { onclick: () => shareWhatsApp(p) }, 'Invia via WhatsApp'),
    el('button', { onclick: () => shareEmail(p) }, 'Invia via Email')
  ));
}

// === CLIENTI ===
function clientiView() {
  const app = document.getElementById('app');
  app.innerHTML = '';
  app.appendChild(btnHome());
  app.appendChild(btnNuovoCliente());
  app.appendChild(el('h2', { className: 'section-title' }, 'Clienti'));

  if (!clienti.length) {
    app.appendChild(el('div', { style: "color:#bbb;margin:20px;" }, "Nessun cliente registrato."));
    return;
  }
  clienti.forEach(c => {
    app.appendChild(el('div', { className: 'card', style: "margin-bottom:15px;" },
      el('h3', {}, c.nome),
      el('div', {}, `Email: ${c.email || '-'}`),
      el('div', {}, `Telefono: ${c.tel || '-'}`),
      el('div', { className: 'actions' },
        el('button', { onclick: () => show(() => clienteDetailView(c.id)) }, 'Dettaglio'),
        el('button', {
          onclick: () => {
            if (confirm('Eliminare il cliente?')) {
              clienti = clienti.filter(x => x.id !== c.id);
              saveData(STORAGE_KEYS.clienti, clienti);
              show(clientiView);
            }
          }
        }, 'Elimina')
      )
    ));
  });
}

function creaClienteView() {
  const app = document.getElementById('app');
  app.innerHTML = '';
  app.appendChild(btnHome());
  app.appendChild(el('h2', { className: 'section-title' }, "Nuovo Cliente"));
  const nome = el('input', { type: 'text', placeholder: "Nome completo", style: "margin-bottom:8px;width:100%;" });
  const email = el('input', { type: 'email', placeholder: "Email", style: "margin-bottom:8px;width:100%;" });
  const tel = el('input', { type: 'text', placeholder: "Telefono", style: "margin-bottom:8px;width:100%;" });
  app.appendChild(el('div', {},
    nome, email, tel,
    el('button', {
      className: "btn btn-salva-note",
      style: "margin-top:8px;",
      onclick: () => {
        if (!nome.value) return alert("Inserisci il nome.");
        const nuovo = {
          id: Math.random().toString(36).slice(2),
          nome: nome.value,
          email: email.value,
          tel: tel.value
        };
        clienti.push(nuovo);
        saveData(STORAGE_KEYS.clienti, clienti);
        show(clientiView);
      }
    }, "💾 Salva cliente"),
    el('button', { style: "margin-left:16px;", onclick: () => show(clientiView) }, "Annulla")
  ));
}

function clienteDetailView(cid) {
  const app = document.getElementById('app');
  const c = clienti.find(x => x.id === cid);
  if (!c) return show(clientiView);

  app.appendChild(btnHome());
  app.appendChild(el('h2', { className: 'section-title' }, c.nome));
  app.appendChild(el('div', {}, `Email: ${c.email || '-'}`));
  app.appendChild(el('div', {}, `Telefono: ${c.tel || '-'}`));
  // Preventivi collegati
  const collegati = preventivi.filter(p => p.clienteId === c.id);
  app.appendChild(el('h3', {}, "Preventivi di questo cliente:"));
  if (!collegati.length)
    app.appendChild(el('div', { style: "color:#bbb;margin-bottom:15px;" }, "Nessun preventivo."));
  else collegati.forEach(p => {
    app.appendChild(el('div', { className: 'card', style: "margin-bottom:11px;" },
      el('div', {}, `Categoria: ${p.categoria || '-'}`),
      el('div', {}, `Componenti: ${p.scelte.map(sv => sv.nome).join(', ')}`),
      el('div', {}, `Prezzo: €${p.prezzoTotale}`),
      el('div', {}, `Stato: ${p.status}`),
      el('div', {}, `Acconto: €${p.acconto || 0}`),
      el('div', {}, `Rimanenza: €${p.prezzoTotale - (p.acconto || 0)}`),
      el('div', {}, `Data inizio: ${formatDate(p.data)}`),
      el('div', {}, `Data fine: ${p.dataFine ? formatDate(p.dataFine) : '-'}`),
      el('div', {}, `Note: ${p.noteCliente || ''}`)
    ));
  });
  // Note cliente
  const noteBox = el('textarea', { style: "width:100%;min-height:60px;margin-top:14px;", placeholder: "Note/Promemoria" }, c.note || '');
  app.appendChild(el('div', { style: "margin:13px 0 7px 0;" }, "Note cliente:", noteBox));
  app.appendChild(btnSalvaNote(() => {
    c.note = noteBox.value;
    saveData(STORAGE_KEYS.clienti, clienti);
    alert("Note salvate.");
  }));
  app.appendChild(el('button', { style: "margin-left:16px;", onclick: () => show(clientiView) }, "Torna ai clienti"));
}

// === NOTE & AGENDA ===
function noteView() {
  const app = document.getElementById('app');
  app.innerHTML = '';
  app.appendChild(btnHome());
  app.appendChild(el('h2', { className: 'section-title' }, 'Note & Agenda'));
  const notes = el('textarea', { style: "width:100%;min-height:100px;", placeholder: "Scrivi le tue note qui..." }, note.join('\n'));
  app.appendChild(notes);
  app.appendChild(btnSalvaNote(() => {
    note = [notes.value];
    saveData(STORAGE_KEYS.note, note);
    alert("Note salvate!");
  }));
}

// === PDF, Whatsapp, Email ===
function exportPreventivoPDF(p) {
  const cl = clienti.find(c => c.id === p.clienteId);
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.setFont('helvetica','bold');
  doc.setFontSize(22);
  doc.text("Preventivo - The Viking of the Web", 12, 18);
  doc.setFontSize(14);
  doc.setFont('helvetica','normal');
  doc.text(`Cliente: ${cl ? cl.nome : '-'}`, 12, 30);
  doc.text(`Email: ${cl ? cl.email : '-'}`, 12, 38);
  doc.text(`Telefono: ${cl ? cl.tel : '-'}`, 12, 46);
  doc.setDrawColor(45,106,79);
  doc.line(10, 50, 200, 50);
  doc.text(`Categoria: ${p.categoria || '-'}`, 12, 60);
  const componentiText = `Componenti: ${p.scelte.map(sv => sv.nome).join(', ')}`;
  const wrapped = doc.splitTextToSize(componentiText, 180); // 180mm, lascia margine destro
  doc.text(wrapped, 12, 70);
 // Calcola l'altezza dinamica
  const baseY = 70 + wrapped.length * 8 + 5; // 8 = spazio per ogni riga, +5 per extra margine

  doc.text(`Prezzo totale: €${p.prezzoTotale}`, 12, baseY);
doc.text(`Stato: ${p.status}`, 12, baseY + 10);
doc.text(`Data inizio: ${formatDate(p.data)}`, 12, baseY + 20);
doc.text(`Data fine: ${p.dataFine ? formatDate(p.dataFine) : '-'}`, 12, baseY + 30);
doc.text(`Acconto: €${p.acconto || 0}`, 12, baseY + 40);
doc.text(`Rimanenza: €${p.prezzoTotale - (p.acconto || 0)}`, 12, baseY + 50);
doc.text(`Note cliente: ${p.noteCliente || '-'}`, 12, baseY + 60);
doc.setFontSize(11);
doc.text("Gestito da The Viking of the Web", 12, baseY + 75);
doc.text("email: thevikingoftheweb@gmail.com", 12, baseY + 85);
doc.text("telefono: 3287423771", 12, baseY + 95);
  doc.save(`preventivo_${cl ? cl.nome : 'cliente'}.pdf`);
}
function shareWhatsApp(p) {
  const cl = clienti.find(c => c.id === p.clienteId);
  const text = `Preventivo per ${cl ? cl.nome : '-'}\nCategoria: ${p.categoria || '-'}\nComponenti: ${p.scelte.map(sv => sv.nome).join(', ')}\nPrezzo: €${p.prezzoTotale}\nNote: ${p.noteCliente || ''}`;
  window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
}
function shareEmail(p) {
  const cl = clienti.find(c => c.id === p.clienteId);
  const subject = `Preventivo per ${cl ? cl.nome : '-'}`;
  const body = `Categoria: ${p.categoria || '-'}\nComponenti: ${p.scelte.map(sv => sv.nome).join(', ')}\nPrezzo: €${p.prezzoTotale}\nNote: ${p.noteCliente || ''}`;
  window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
}
function exportBackup() {
  const data = {
    preventivi,
    clienti,
    preziario,
    note
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `viking-backup-${new Date().toISOString().slice(0,10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function importBackup() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json,application/json';
  input.onchange = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = event => {
      try {
        const data = JSON.parse(event.target.result);
        if (!data.preventivi || !data.clienti) throw "Backup non valido";
        preventivi = data.preventivi;
        clienti = data.clienti;
        preziario = data.preziario || [];
        note = data.note || [];
        saveData(STORAGE_KEYS.preventivi, preventivi);
        saveData(STORAGE_KEYS.clienti, clienti);
        saveData(STORAGE_KEYS.preziario, preziario);
        saveData(STORAGE_KEYS.note, note);
        alert("Backup importato correttamente!");
        show(homeView);
      } catch (err) {
        alert("Backup non valido!");
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

// === START ===
show(homeView);
