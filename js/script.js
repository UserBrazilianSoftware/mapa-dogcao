// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MENU HAMBURGER =====
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Fecha o menu ao clicar em um link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // ===== EFEITO 1: ROTAÇÃO DE IMAGENS NO HERO =====
    const heroImg = document.getElementById('hero-img');
    if (heroImg) {
        const images = [
            'images/golden_retriever.jpg',
            'images/labrador_retriever.jpg',
            'images/pastor_alemao.jpg',
            'images/bulldog_frances.jpg',
            'images/poodle.jpg'
        ];
        
        let currentImageIndex = 0;
        
        function rotateHeroImage() {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            heroImg.style.opacity = '0';
            
            setTimeout(() => {
                heroImg.src = images[currentImageIndex];
                heroImg.style.opacity = '1';
            }, 300);
        }
        
        // Inicia a rotação de imagens a cada 4 segundos
        setInterval(rotateHeroImage, 4000);
    }
    
    // ===== EFEITO 2: ANIMAÇÃO DOS CARDS DE RAÇAS =====
    const breedCards = document.querySelectorAll('.breed-card');
    
    breedCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Adiciona efeito de brilho
            this.style.boxShadow = '0 15px 40px rgba(102, 126, 234, 0.3)';
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Efeito de clique com animação
        card.addEventListener('click', function() {
            this.style.transform = 'translateY(-10px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            }, 150);
        });
    });
    
    // ===== FILTRO DE RAÇAS (página racas.html) =====
    const filterButtons = document.querySelectorAll('.filter-btn');
    const breedDetailCards = document.querySelectorAll('.breed-detail-card');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove classe active de todos os botões
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Adiciona classe active ao botão clicado
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Filtra os cards com animação
                breedDetailCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-size') === filter) {
                        card.style.display = 'grid';
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(-20px)';
                        
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // ===== VALIDAÇÃO DO FORMULÁRIO DE CONTATO =====
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Função para mostrar erro
        function showError(fieldId, message) {
            const errorElement = document.getElementById(fieldId + '-error');
            const field = document.getElementById(fieldId);
            
            if (errorElement && field) {
                errorElement.textContent = message;
                field.style.borderColor = '#e74c3c';
            }
        }
        
        // Função para limpar erro
        function clearError(fieldId) {
            const errorElement = document.getElementById(fieldId + '-error');
            const field = document.getElementById(fieldId);
            
            if (errorElement && field) {
                errorElement.textContent = '';
                field.style.borderColor = '#ddd';
            }
        }
        
        // Validação em tempo real
        const fields = ['nome', 'email', 'telefone', 'assunto', 'mensagem'];
        
        fields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.addEventListener('blur', () => validateField(fieldId));
                field.addEventListener('input', () => clearError(fieldId));
            }
        });
        
        // Função de validação individual
        function validateField(fieldId) {
            const field = document.getElementById(fieldId);
            const value = field.value.trim();
            
            switch(fieldId) {
                case 'nome':
                    if (value.length < 2) {
                        showError(fieldId, 'Nome deve ter pelo menos 2 caracteres');
                        return false;
                    }
                    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(value)) {
                        showError(fieldId, 'Nome deve conter apenas letras');
                        return false;
                    }
                    break;
                    
                case 'email':
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                        showError(fieldId, 'Email inválido');
                        return false;
                    }
                    break;
                    
                case 'telefone':
                    if (value && !/^[\d\s\(\)\-\+]+$/.test(value)) {
                        showError(fieldId, 'Telefone inválido');
                        return false;
                    }
                    break;
                    
                case 'assunto':
                    if (!value) {
                        showError(fieldId, 'Selecione um assunto');
                        return false;
                    }
                    break;
                    
                case 'mensagem':
                    if (value.length < 10) {
                        showError(fieldId, 'Mensagem deve ter pelo menos 10 caracteres');
                        return false;
                    }
                    break;
            }
            
            clearError(fieldId);
            return true;
        }
        
        // Submissão do formulário
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Valida todos os campos
            let isValid = true;
            fields.forEach(fieldId => {
                if (!validateField(fieldId)) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                // Simula envio do formulário
                const submitButton = contactForm.querySelector('.submit-button');
                const buttonText = submitButton.querySelector('.button-text');
                const buttonLoading = submitButton.querySelector('.button-loading');
                
                // Mostra estado de carregamento
                submitButton.disabled = true;
                buttonText.style.display = 'none';
                buttonLoading.style.display = 'inline';
                
                // Simula delay de envio
                setTimeout(() => {
                    // Esconde formulário e mostra mensagem de sucesso
                    contactForm.style.display = 'none';
                    document.getElementById('success-message').style.display = 'block';
                    
                    // Scroll suave para a mensagem de sucesso
                    document.getElementById('success-message').scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }, 2000);
            } else {
                // Scroll para o primeiro campo com erro
                const firstError = contactForm.querySelector('.error-message:not(:empty)');
                if (firstError) {
                    firstError.parentElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }
        });
    }
    
    // ===== EFEITO 3: ANIMAÇÃO DE SCROLL REVEAL =====
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.info-item, .value-item, .help-item, .faq-item');
        
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Inicializa elementos para animação
    const animatedElements = document.querySelectorAll('.info-item, .value-item, .help-item, .faq-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
    });
    
    // Adiciona listener de scroll
    window.addEventListener('scroll', revealOnScroll);
    
    // Executa uma vez no carregamento
    revealOnScroll();
    
    // ===== EFEITO 4: CONTADOR ANIMADO (se houver elementos com números) =====
    function animateCounters() {
        const counters = document.querySelectorAll('[data-count]');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000; // 2 segundos
            const increment = target / (duration / 16); // 60 FPS
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current);
            }, 16);
        });
    }
    
    // ===== SMOOTH SCROLL PARA LINKS INTERNOS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ===== EFEITO DE TYPING PARA TÍTULOS (opcional) =====
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // ===== LAZY LOADING PARA IMAGENS =====
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // ===== FEEDBACK VISUAL PARA INTERAÇÕES =====
    function addRippleEffect(element) {
        element.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
    
    // Adiciona efeito ripple aos botões
    document.querySelectorAll('.cta-button, .filter-btn, .submit-button').forEach(addRippleEffect);
    
    // ===== PERFORMANCE: DEBOUNCE PARA SCROLL =====
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Aplica debounce ao scroll reveal
    window.addEventListener('scroll', debounce(revealOnScroll, 10));
    
    // ===== ACESSIBILIDADE: NAVEGAÇÃO POR TECLADO =====
    document.addEventListener('keydown', function(e) {
        // ESC fecha o menu mobile
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // ===== INICIALIZAÇÃO FINAL =====
    console.log('🐕 DogCão website carregado com sucesso!');
    
    // Adiciona classe loaded ao body para animações CSS
    document.body.classList.add('loaded');
});

// ===== CSS PARA EFEITOS ADICIONAIS =====
const additionalStyles = `
    <style>
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .lazy {
            opacity: 0;
            transition: opacity 0.3s;
        }
        
        .lazy.loaded {
            opacity: 1;
        }
        
        /* Melhorias de transição */
        .breed-card,
        .breed-detail-card {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Estados de foco melhorados */
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            transform: translateY(-2px);
        }
        
        /* Animação de carregamento */
        .button-loading {
            display: inline-block;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        /* Scroll suave para navegadores que não suportam */
        @media (prefers-reduced-motion: no-preference) {
            html {
                scroll-behavior: smooth;
            }
        }
    </style>
`;

// Adiciona os estilos adicionais ao head
document.head.insertAdjacentHTML('beforeend', additionalStyles);

