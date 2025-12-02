(() => {
    const init = () => {
        const STYLE_ID = 'login-modal-styles';
        if (!document.getElementById(STYLE_ID)) {
            const style = document.createElement('style');
            style.id = STYLE_ID;
            style.textContent = `
                .login-modal { position: fixed; inset: 0; display: flex; align-items: center; justify-content: center; padding: 24px; background: rgba(15,23,42,0.55); backdrop-filter: blur(4px); opacity: 0; pointer-events: none; transition: opacity 0.25s ease; z-index: 12000; }
                .login-modal.open { opacity: 1; pointer-events: auto; }
                .login-modal__backdrop { position: absolute; inset: 0; }
                .login-modal__panel { position: relative; width: min(480px, 92vw); background: var(--surface, #ffffff); color: var(--ink, #1a1612); border-radius: 16px; padding: 26px; box-shadow: 0 24px 60px rgba(15, 23, 42, 0.25); border: 1px solid rgba(0,0,0,0.06); animation: loginModalSlide 0.3s ease; }
                .login-modal__close { position: absolute; top: 12px; right: 12px; border: none; background: rgba(15,23,42,0.05); width: 34px; height: 34px; border-radius: 50%; font-size: 18px; cursor: pointer; color: inherit; transition: background 0.2s ease, transform 0.2s ease; }
                .login-modal__close:hover { background: rgba(15,23,42,0.1); transform: translateY(-1px); }
                .login-modal__header { margin-bottom: 14px; }
                .login-modal__eyebrow { letter-spacing: 0.12em; text-transform: uppercase; font-size: 12px; color: var(--gold, #b8956e); margin: 0 0 6px; }
                .login-modal__header h3 { margin: 0 0 6px; font-size: 26px; font-weight: 600; }
                .login-modal__subtitle { margin: 0; color: var(--text-light, #5d6470); font-size: 15px; line-height: 1.6; }
                .login-modal__form { display: grid; gap: 12px; }
                .login-modal__field { display: grid; gap: 6px; font-weight: 600; color: var(--ink, #1a1612); }
                .login-modal__field input { width: 100%; padding: 12px 14px; border-radius: 10px; border: 1px solid var(--outline, #e5e7eb); background: #fff; font-size: 15px; transition: border-color 0.2s ease, box-shadow 0.2s ease; }
                .login-modal__field input:focus { outline: none; border-color: var(--primary, #b8956e); box-shadow: 0 0 0 3px rgba(184, 149, 110, 0.2); }
                .login-modal__actions { display: flex; align-items: center; justify-content: space-between; gap: 12px; font-size: 14px; color: var(--text-light, #5d6470); }
                .login-modal__checkbox { display: inline-flex; align-items: center; gap: 8px; cursor: pointer; }
                .login-modal__submit { width: 100%; border: none; border-radius: 12px; padding: 12px 14px; background: linear-gradient(135deg, var(--primary, #b8956e), var(--gold, #d4b896)); color: #fff; font-weight: 700; font-size: 15px; cursor: pointer; box-shadow: 0 16px 36px rgba(0,0,0,0.18); transition: transform 0.2s ease, box-shadow 0.2s ease; }
                .login-modal__submit:hover { transform: translateY(-1px); box-shadow: 0 20px 42px rgba(0,0,0,0.22); }
                .login-modal__footnote { text-align: center; margin: 4px 0 0; font-size: 14px; color: var(--text-light, #5d6470); }
                .login-modal__footnote a { color: var(--primary, #b8956e); font-weight: 600; text-decoration: none; }
                .login-modal__footnote a:hover { text-decoration: underline; }
                .login-modal__status { font-size: 14px; color: var(--accent, #1c7f5a); min-height: 18px; }
                body.login-modal-open { overflow: hidden; }
                .nav-login { border: 1px solid rgba(15,23,42,0.12); border-radius: 999px; padding: 10px 16px; font-weight: 600; }
                header.ghost_menu .nav-login { color: rgba(255,255,255,0.9); border-color: rgba(255,255,255,0.35); }
                .nav-login:hover { background: var(--primary, #b8956e); color: #fff !important; box-shadow: 0 12px 24px rgba(0,0,0,0.15); }
                @keyframes loginModalSlide { from { transform: translateY(10px); opacity: 0.92; } to { transform: translateY(0); opacity: 1; } }
                @media (max-width: 540px) { .login-modal__panel { padding: 22px; } .login-modal__actions { flex-direction: column; align-items: flex-start; } .login-modal__submit { font-size: 14px; } }
            `;
            document.head.appendChild(style);
        }

        let modal = document.getElementById('loginModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'loginModal';
            modal.className = 'login-modal';
            modal.setAttribute('aria-hidden', 'true');
            modal.innerHTML = `
                <div class="login-modal__backdrop" data-login-close></div>
                <div class="login-modal__panel" role="dialog" aria-modal="true" aria-labelledby="loginModalTitle">
                    <button class="login-modal__close" type="button" aria-label="Đóng" data-login-close>&times;</button>
                    <div class="login-modal__header">
                        <p class="login-modal__eyebrow">Chào mừng trở lại</p>
                        <h3 id="loginModalTitle">Đăng nhập</h3>
                        <p class="login-modal__subtitle">Tiếp tục lưu thư viện yêu thích và xem các bài viết mới nhất.</p>
                    </div>
                    <form class="login-modal__form" novalidate>
                        <label class="login-modal__field">
                            <span>Email</span>
                            <input type="email" name="email" placeholder="ban@vidu.com" required>
                        </label>
                        <label class="login-modal__field">
                            <span>Mật khẩu</span>
                            <input type="password" name="password" placeholder="••••••••" required>
                        </label>
                        <div class="login-modal__actions">
                            <label class="login-modal__checkbox">
                                <input type="checkbox" name="remember"> Ghi nhớ đăng nhập
                            </label>
                            <a href="login.html">Quên mật khẩu?</a>
                        </div>
                        <button type="submit" class="login-modal__submit">Đăng nhập</button>
                        <p class="login-modal__footnote">Chưa có tài khoản? <a href="login.html">Tạo tài khoản</a></p>
                        <p class="login-modal__status" role="status" aria-live="polite"></p>
                    </form>
                </div>
            `;
            document.body.appendChild(modal);
        }

        const form = modal.querySelector('form');
        const status = modal.querySelector('.login-modal__status');
        const emailInput = modal.querySelector('input[type="email"]');

        const openModal = () => {
            modal.classList.add('open');
            modal.setAttribute('aria-hidden', 'false');
            document.body.classList.add('login-modal-open');
            status.textContent = '';
            window.setTimeout(() => emailInput && emailInput.focus(), 120);
        };

        const closeModal = () => {
            modal.classList.remove('open');
            modal.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('login-modal-open');
        };

        const triggerClickHandler = (event) => {
            event.preventDefault();
            event.stopImmediatePropagation();
            openModal();
        };

        document.querySelectorAll('[data-login-trigger]').forEach((trigger) => {
            trigger.addEventListener('click', triggerClickHandler);
        });

        modal.addEventListener('click', (event) => {
            const target = event.target;
            if (target.hasAttribute('data-login-close') || target.closest('[data-login-close]')) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modal.classList.contains('open')) {
                closeModal();
            }
        });

        if (form) {
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                status.textContent = 'Đang kiểm tra thông tin đăng nhập...';
                setTimeout(() => {
                    status.textContent = 'Chưa kết nối máy chủ. Đây là bản demo giao diện.';
                }, 900);
            });
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
