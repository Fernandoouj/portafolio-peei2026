/* ── Navigation ─────────────────────────────────────────────── */
function navigate(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById('page-' + pageId);
    if (target) {
        target.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    document.querySelectorAll('.nav-links button').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.page === pageId);
    });
}

/* ── Profile photo ───────────────────────────────────────────── */
function loadProfilePhoto(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = document.getElementById('profileImg');
        img.src = e.target.result;
        img.style.display = 'block';
        document.getElementById('profilePlaceholder').style.display = 'none';
    };
    reader.readAsDataURL(file);
}

/* ── Biography photo ─────────────────────────────────────────── */
function loadBioPhoto(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = document.getElementById('bioPhotoImg');
        img.src = e.target.result;
        img.style.display = 'block';
        img.parentElement.querySelectorAll(':not(img)').forEach(el => el.style.display = 'none');
    };
    reader.readAsDataURL(file);
}

/* ── Video embed ─────────────────────────────────────────────── */
function embedVideo() {
    const url = document.getElementById('videoUrl').value.trim();
    if (!url) return;
    document.getElementById('videoPlaceholder').innerHTML =
        `<iframe src="${url}" allowfullscreen allow="autoplay; encrypted-media"></iframe>`;
}

/* ── School photo ────────────────────────────────────────────── */
function loadSchoolPhoto(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = document.getElementById('schoolPhotoImg');
        img.src = e.target.result;
        img.style.display = 'block';
        img.parentElement.querySelectorAll(':not(img)').forEach(el => el.style.display = 'none');
    };
    reader.readAsDataURL(file);
}

/* ── School Video embed ──────────────────────────────────────── */
function embedSchoolVideo() {
    const url = document.getElementById('schoolVideoUrl').value.trim();
    if (!url) return;
    document.getElementById('schoolVideoPlaceholder').innerHTML =
        `<iframe src="${url}" allowfullscreen allow="autoplay; encrypted-media"></iframe>`;
}

/* ── UDL Video embed ─────────────────────────────────────────── */
function embedUdlVideo() {
    const url = document.getElementById('udlVideoUrl').value.trim();
    if (!url) return;
    document.getElementById('udlVideoPlaceholder').innerHTML =
        `<iframe src="${url}" allowfullscreen allow="autoplay; encrypted-media"></iframe>`;
}

/* ── Diversity Photos ────────────────────────────────────────── */
function loadDivPhoto(event, imgId) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = document.getElementById(imgId);
        img.src = e.target.result;
        img.style.display = 'block';
        img.parentElement.querySelectorAll(':not(img)').forEach(el => el.style.display = 'none');
    };
    reader.readAsDataURL(file);
}

/* ── Diversity Video embed ───────────────────────────────────── */
function embedDiversityVideo() {
    const url = document.getElementById('diversityVideoUrl').value.trim();
    if (!url) return;
    document.getElementById('diversityVideoPlaceholder').innerHTML =
        `<iframe src="${url}" allowfullscreen allow="autoplay; encrypted-media"></iframe>`;
}

/* ── Generic Photo Loader for Classroom Mgmt ─────────────────── */
function loadGenericPhoto(event, imgId) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = document.getElementById(imgId);
        img.src = e.target.result;
        img.style.display = 'block';
        img.parentElement.querySelectorAll(':not(img)').forEach(el => el.style.display = 'none');
    };
    reader.readAsDataURL(file);
}

/* ── Counselor Video embed ─────────────────────────────────────── */
function embedCounselorVideo() {
    const url = document.getElementById('counselorVideoUrl').value.trim();
    if (!url) return;
    document.getElementById('counselorVideoPlaceholder').innerHTML =
        `<iframe src="${url}" allowfullscreen allow="autoplay; encrypted-media"></iframe>`;
}

/* ── Final Reflection Video embed ──────────────────────────────── */
function embedFinalVideo() {
    const url = document.getElementById('finalVideoUrl').value.trim();
    if (!url) return;
    document.getElementById('finalVideoPlaceholder').innerHTML =
        `<iframe src="${url}" allowfullscreen allow="autoplay; encrypted-media"></iframe>`;
}



/* ── Evidence Logic (Filters & Dynamic Addition) ─────────────── */
const evModal = document.getElementById('evModalOverlay');
const evGrid = document.getElementById('evGrid');
const evEmptyState = document.getElementById('evEmptyState');
const evFilters = document.querySelectorAll('.ev-filter-btn');

function openEvModal() {
    evModal.classList.add('active');
}

function closeEvModal() {
    evModal.classList.remove('active');
    // Limpiar campos
    document.getElementById('evTitleInput').value = '';
    document.getElementById('evFileInput').value = '';
    document.getElementById('evLinkInput').value = '';
}

function submitEvidence() {
    const type = document.getElementById('evTypeInput').value;
    const title = document.getElementById('evTitleInput').value || 'Untitled Evidence';
    const fileInput = document.getElementById('evFileInput');
    const linkInput = document.getElementById('evLinkInput').value;

    // Ícono por defecto (para documentos/materiales sin foto)
    let mediaHtml = `<div style="color: var(--green-mid);"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div>`;

    if (type === 'Video' && linkInput) {
        // Si es un video y pegó el link
        mediaHtml = `<iframe src="${linkInput}" allowfullscreen></iframe>`;
        createEvidenceCard(type, title, mediaHtml);
    } else if (fileInput.files && fileInput.files[0]) {
        // Si subió una imagen
        const reader = new FileReader();
        reader.onload = (e) => {
            mediaHtml = `<img src="${e.target.result}" alt="${title}" />`;
            createEvidenceCard(type, title, mediaHtml);
        };
        reader.readAsDataURL(fileInput.files[0]);
    } else {
        // Si no subió nada, usa el ícono por defecto
        createEvidenceCard(type, title, mediaHtml);
    }
}

function createEvidenceCard(type, title, mediaHtml) {
    // Ocultar el cuadro punteado de "vacío"
    evEmptyState.style.display = 'none';

    // Crear la tarjeta en el HTML
    const card = document.createElement('div');
    card.className = 'ev-card';
    card.setAttribute('data-type', type);
    card.innerHTML = `
      <div class="ev-card-thumb">${mediaHtml}</div>
      <div class="ev-card-info">
        <div class="ev-card-type">${type}</div>
        <div class="ev-card-title">${title}</div>
      </div>
    `;

    // Agregar la tarjeta al grid y cerrar modal
    evGrid.appendChild(card);
    closeEvModal();

    // Reaplicar el filtro que esté seleccionado actualmente
    const activeFilter = document.querySelector('.ev-filter-btn.active').getAttribute('data-filter');
    applyEvFilter(activeFilter);
}

function applyEvFilter(filterValue) {
    const cards = document.querySelectorAll('.ev-card');
    let visibleCount = 0;

    cards.forEach(card => {
        if (filterValue === 'All' || card.getAttribute('data-type') === filterValue) {
            card.style.display = 'flex';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    // Mostrar el empty state si un filtro no tiene elementos (opcional, pero buena práctica)
    if (cards.length > 0) {
        evEmptyState.style.display = visibleCount === 0 ? 'flex' : 'none';
        if (visibleCount === 0) {
            evEmptyState.querySelector('h4').textContent = "No items in this category";
            evEmptyState.querySelector('p').textContent = "Try selecting a different filter.";
        }
    }
}

// Activar botones de filtro
evFilters.forEach(btn => {
    btn.addEventListener('click', (e) => {
        evFilters.forEach(f => f.classList.remove('active'));
        e.target.classList.add('active');
        applyEvFilter(e.target.getAttribute('data-filter'));
    });
});

/* ── Animate home section cards ──────────────────────────────── */
const homeCards = document.querySelectorAll('#page-home .section-card');
const cardObs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `fadeUp 0.5s ${i * 0.07}s ease both`;
            cardObs.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });
homeCards.forEach(c => { c.style.opacity = '0'; cardObs.observe(c); });