
AOS.init({
    duration: 800,
    once: true,
    easing: 'ease-out-cubic'
});

document.getElementById('year').textContent = new Date().getFullYear();


const phrases = [
    "Mạng máy tính • Bảo mật • Hệ thống",
    "Thiết kế & quản trị LAN/WAN",
    "Cisco Packet Tracer • GNS3",
    "Đang hướng tới CCNA & Cloud"
];
let idx = 0, char = 0;
const typedEl = document.getElementById('typed');

function typeLoop() {
    if (idx >= phrases.length) idx = 0;
    const current = phrases[idx];
    if (char <= current.length) {
        typedEl.textContent = current.slice(0, char);
        char++;
        setTimeout(typeLoop, 60);
    } else {
        setTimeout(() => {

            const delInterval = setInterval(() => {
                if (char >= 0) {
                    typedEl.textContent = current.slice(0, char);
                    char--;
                } else {
                    clearInterval(delInterval);
                    idx++;
                    setTimeout(typeLoop, 300);
                }
            }, 30);
        }, 1000);
    }
}
typeLoop();

document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});


const skills = document.querySelectorAll('.skill');
const options = { threshold: 0.4 };

const skillObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const percent = Number(el.getAttribute('data-percent')) || 0;
            const bar = el.querySelector('.progress-bar');
            bar.style.width = percent + '%';
            obs.unobserve(el);
        }
    });
}, options);

skills.forEach(s => skillObserver.observe(s));

const form = document.getElementById('contactForm');
const formResp = document.getElementById('formResponse');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    if (!name) {
        formResp.textContent = 'Vui lòng nhập tên của bạn.';
        return;
    }
    formResp.textContent = `Cảm ơn ${name}! Mình đã nhận được lời nhắn — mình sẽ phản hồi sớm.`;
    form.reset();
});

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    AOS.init({ disable: true });
    document.querySelectorAll('.progress-bar').forEach(b => b.style.transition = 'none');
}
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        document.body.classList.add("scrolled");
    } else {
        document.body.classList.remove("scrolled");
    }
});

(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const btn = document.getElementById('sendBtn');
  const resp = document.getElementById('formResponse');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    // chặn double-click
    btn.disabled = true;
    btn.textContent = 'Đang gửi...';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      });

      if (res.ok) {
        // thành công
        resp.style.display = 'block';
        resp.style.color = 'var(--primary)';
        resp.textContent = 'Cảm ơn bạn! Mình đã nhận được lời nhắn — sẽ phản hồi sớm.';
        form.reset();
      } else {
        // lỗi server/trường bắt buộc
        resp.style.display = 'block';
        resp.style.color = '#d93025';
        resp.textContent = 'Xin lỗi, gửi chưa thành công. Bạn thử lại sau nhé.';
      }
    } catch (err) {
      resp.style.display = 'block';
      resp.style.color = '#d93025';
      resp.textContent = 'Có lỗi kết nối. Kiểm tra mạng rồi gửi lại giúp mình.';
    } finally {
      btn.disabled = false;
      btn.textContent = 'Gửi tin nhắn';
    }
  });
})();

