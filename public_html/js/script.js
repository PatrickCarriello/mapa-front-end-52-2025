// --- Script para Menu Responsivo (Hamburger Menu) ---
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navList = document.querySelector(".nav-list");

  // Verifica se os elementos existem antes de adicionar event listener
  if (navToggle && navList) {
    navToggle.addEventListener("click", () => {
      navList.classList.toggle("active"); // Alterna a classe 'active' para mostrar/esconder o menu
      navToggle.setAttribute(
        "aria-expanded",
        navList.classList.contains("active")
      );
    });

    // Fecha o menu se um item for clicado (útil para Single Page Applications ou se for um link âncora)
    navList.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
          // Apenas em telas pequenas
          navList.classList.remove("active");
          navToggle.setAttribute("aria-expanded", false);
        }
      });
    });
  }

  // --- Efeito Interativo 1: Animação de Entrada ao Scroll ---
  // Faz elementos aparecerem com um fade-in e slide-up quando entram na viewport
  const revealElements = document.querySelectorAll(
    ".hero-content, .skills-item, .portfolio-item, .about-content, .contact-form, .contact-info"
  );

  const observerOptions = {
    root: null, // Observa a viewport
    rootMargin: "0px",
    threshold: 0.1, // 10% do elemento visível para acionar
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in-up"); // Adiciona classe para animação CSS
        observer.unobserve(entry.target); // Para de observar após a animação
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => {
    observer.observe(el);
  });

  // Adiciona a classe para elementos que já estão visíveis no carregamento inicial
  // para que a animação não pareça estranha.
  // Isso é feito com CSS, a animação só ocorre se a classe 'fade-in-up' for adicionada.
});

// --- Efeito Interativo 2: Validação de Formulário de Contato com JavaScript ---
// (Não usa jQuery para manter o código leve e sem dependências extras)

const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const subjectError = document.getElementById("subjectError");
const messageError = document.getElementById("messageError");
const successMessage = document.getElementById("successMessage");

// Função para exibir mensagem de erro
function showError(element, message) {
  if (element) {
    element.textContent = message;
    element.style.display = "block";
  }
}

// Função para limpar mensagem de erro
function clearError(element) {
  if (element) {
    element.textContent = "";
    element.style.display = "none";
  }
}

// Função para validar email
function isValidEmail(email) {
  // Regex simples para validação de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Listener para o evento 'submit' do formulário
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Impede o envio padrão do formulário

    let isValid = true; // Flag para controlar a validade geral do formulário

    // Validação do campo Nome
    if (nameInput.value.trim() === "") {
      showError(nameError, "Por favor, digite seu nome.");
      isValid = false;
    } else {
      clearError(nameError);
    }

    // Validação do campo Email
    if (emailInput.value.trim() === "") {
      showError(emailError, "Por favor, digite seu email.");
      isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
      showError(emailError, "Por favor, digite um email válido.");
      isValid = false;
    } else {
      clearError(emailError);
    }

    // Validação do campo Assunto
    if (subjectInput.value.trim() === "") {
      showError(subjectError, "Por favor, digite o assunto.");
      isValid = false;
    } else {
      clearError(subjectError);
    }

    // Validação do campo Mensagem
    if (messageInput.value.trim() === "") {
      showError(messageError, "Por favor, digite sua mensagem.");
      isValid = false;
    } else {
      clearError(messageError);
    }

    // Se o formulário for válido, exibe mensagem de sucesso
    if (isValid) {
      // Apenas simula o envio do formulário
      console.log("Formulário enviado com sucesso!", {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        subject: subjectInput.value.trim(),
        message: messageInput.value.trim(),
      });

      // Exibe mensagem de sucesso
      if (successMessage) {
        successMessage.textContent =
          "Mensagem enviada com sucesso! Em breve entrarei em contato.";
        successMessage.style.display = "block";
      }
      contactForm.reset(); // Limpa o formulário
      // Esconde a mensagem de sucesso após alguns segundos
      setTimeout(() => {
        if (successMessage) {
          successMessage.style.display = "none";
        }
      }, 5000);
    } else {
      // Certifica-se de que a mensagem de sucesso está escondida se houver erros
      if (successMessage) {
        successMessage.style.display = "none";
      }
    }
  });
}
