// 1. Системна інформація для LocalStorage
function initSystemInfo() {
  const info = `ОС: ${navigator.platform} | Браузер: ${navigator.userAgent.split(' ').pop()}`;
  localStorage.setItem("userSystemInfo", info);

  const footerElement = document.getElementById('os-browserinfo');
  if (footerElement) {
    footerElement.innerText = info;
  }
}

// 2. Завантаження відгуків для Варіанту №27
async function loadV27Comments() {
  const container = document.getElementById('comments-container');
  if (!container) return;
  
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/27/comments');
    const data = await res.json();

    container.innerHTML = data.slice(0, 3).map(c => `
      <div class="comment-item">
        <strong style="font-size: 0.7rem; color: #2de2ff;">${c.email}</strong>
        <p style="font-size: 0.85rem; font-style: italic; margin-top: 5px;">"${c.body.substring(0, 80)}..."</p>
      </div>
    `).join('');
  } catch (e) {
    container.innerHTML = "<p>Помилка завантаження даних API</p>";
  }
}

// 3. Керування темою
const themeBtn = document.getElementById('theme-toggle');
if (themeBtn) {
  // Виправив назву класу на 'light-theme', щоб вона збігалася з твоїм CSS
  themeBtn.onclick = () => document.body.classList.toggle('light-theme');
}

// 4. Модальне вікно (З'ЯВЛЯЄТЬСЯ РІВНО ЧЕРЕЗ 60 СЕКУНД)
const modal = document.getElementById('feedback-modal');
const closeBtn = document.getElementById('close-modal');

if (modal) {
  setTimeout(() => {
    modal.style.display = 'flex';
  }, 60000); // 60 000 мілісекунд = 1 хвилина

  if (closeBtn) {
    closeBtn.onclick = () => {
      modal.style.display = 'none';
    };
  }

  // Закриття при кліку поза вікном
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
}

// Запуск при завантаженні сторінки
window.addEventListener('load', () => {
  initSystemInfo();
  loadV27Comments();
});