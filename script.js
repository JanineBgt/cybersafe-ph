// ==========================================
// CYBERSAFE PH
// No personal information is collected.
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 11. ACTIVE NAVIGATION
  // ==========================================

  const navigationLinks = document.querySelectorAll(".nav-link");
  const pageSections = document.querySelectorAll("main section[id]");

  function updateActiveNavigation() {
    let currentSection = "home";

    pageSections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;

      if (sectionTop <= 150) {
        currentSection = section.id;
      }
    });

    navigationLinks.forEach(link => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${currentSection}`
      );
    });
  }

  navigationLinks.forEach(link => {
    link.addEventListener("click", () => {
      const target = link.getAttribute("href");

      navigationLinks.forEach(item => {
        item.classList.toggle(
          "active",
          item.getAttribute("href") === target
        );
      });
    });
  });

  window.addEventListener("scroll", updateActiveNavigation);

  updateActiveNavigation();
// ==========================================
// NAVIGATION ACTIVE STATE
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      // Remove active state from all navigation links
      navLinks.forEach((nav) => {
        nav.classList.remove("active");
      });

      // Add active state to the clicked navigation link
      this.classList.add("active");
    });
  });
});


  // ==========================================
  // 1. MOBILE NAVIGATION
  // ==========================================

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
      );
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open menu");
      });
    });

  }


  // ==========================================
  // 2. THREAT CENTER
  // ==========================================

  const threatInfo = {

    phishing: {
      title: "Phishing: pause when a message pressures you.",
      text: "Warning signs include urgent language, unexpected attachments, unfamiliar sender addresses, and suspicious links. Do not reply or open the link. Visit the official website or app yourself to check the message."
    },

    shopping: {
      title: "Shopping scams: check the seller before paying.",
      text: "Be careful with prices that seem too good to be true, requests to pay outside a platform, copied product photos, and sellers with no reliable history. Use trusted payment methods and keep transaction records."
    },

    malware: {
      title: "Malware: avoid untrusted downloads.",
      text: "Malware can arrive through suspicious attachments, fake updates, pirated software, or unsafe downloads. Keep your device and apps updated, use reputable security tools, and download software from official sources."
    },

    identity: {
      title: "Identity theft: limit what you share.",
      text: "Personal details can be misused to impersonate you. Share only what is necessary, review privacy settings, use multi-factor authentication, and contact the affected service or relevant authority if you suspect misuse."
    }

  };

  const threatDetail = document.getElementById("threatDetail");
  const threatCards = document.querySelectorAll(".threat-card");

  threatCards.forEach(card => {

    card.addEventListener("click", () => {

      const selectedThreat = card.dataset.threat;
      const info = threatInfo[selectedThreat];

      if (!info || !threatDetail) return;

      threatDetail.replaceChildren();

      const mark = document.createElement("div");
      mark.className = "detail-mark";
      mark.textContent = "i";

      const content = document.createElement("div");

      const label = document.createElement("span");
      label.className = "detail-label";
      label.textContent = "THREAT FIELD GUIDE";

      const title = document.createElement("h3");
      title.textContent = info.title;

      const paragraph = document.createElement("p");
      paragraph.textContent = info.text;

      content.append(label, title, paragraph);
      threatDetail.append(mark, content);

      threatCards.forEach(item => {
        item.setAttribute("aria-pressed", "false");
      });

      card.setAttribute("aria-pressed", "true");

    });

  });


  // ==========================================
  // 3. PASSWORD SAFETY CHECKLIST
  // ==========================================

  // This feature does not collect real passwords.

  const habitChecks = [
    ...document.querySelectorAll(".check-row input")
  ];

  const checkCount = document.getElementById("checkCount");
  const checkProgress = document.getElementById("checkProgress");

  function updateHabits() {

    const total = habitChecks.length;

    const completed = habitChecks.filter(
      input => input.checked
    ).length;

    if (checkCount) {
      checkCount.textContent = `${completed} / ${total} complete`;
    }

    if (checkProgress) {

      const percentage = total > 0
        ? (completed / total) * 100
        : 0;

      checkProgress.style.width = `${percentage}%`;

    }

  }

  habitChecks.forEach(input => {
    input.addEventListener("change", updateHabits);
  });

  updateHabits();


  // ==========================================
  // 4. CYBERSAFE INTERACTIVE QUIZ
  // ==========================================

  const quizQuestions = [

    {
      q: "A message says your account will close in 10 minutes unless you sign in through its link. What is the safest move?",

      a: [
        "Click quickly so you do not lose access",
        "Open the official app or type the official address yourself",
        "Forward the message to friends"
      ],

      correct: 1,

      why: "Urgency is a common pressure tactic. Check through an official channel instead."
    },

    {
      q: "A new online seller asks you to pay through an unrelated personal account. What should you do?",

      a: [
        "Pause and verify the seller and payment method",
        "Pay immediately to reserve the item",
        "Send a photo of your ID"
      ],

      correct: 0,

      why: "Unusual payment requests are a warning sign. Verify the seller and use safer payment options."
    },

    {
      q: "Which password habit is safer?",

      a: [
        "Reuse one easy password everywhere",
        "Use your name and birthday",
        "Use a long, unique password for each account"
      ],

      correct: 2,

      why: "Unique passwords limit the damage if one account is compromised."
    },

    {
      q: "Someone posts hurtful comments about you repeatedly. What is a helpful response?",

      a: [
        "Post their private details",
        "Save evidence, block, and report the behavior",
        "Send threats back"
      ],

      correct: 1,

      why: "Keep evidence and use platform reporting. Seek help from someone you trust."
    },

    {
      q: "A website asks for information that is not needed for its service. What should you consider?",

      a: [
        "Whether the request is necessary and trustworthy",
        "Provide everything just in case",
        "Use the same password as your email"
      ],

      correct: 0,

      why: "Share the minimum necessary information and check the site's legitimacy."
    }

  ];


  // ==========================================
  // 5. QUIZ ELEMENTS AND VARIABLES
  // ==========================================

  const quizContent = document.getElementById("quizContent");
  const quizProgress = document.getElementById("quizProgress");
  const quizBar = document.getElementById("quizBar");
  const quizFeedback = document.getElementById("quizFeedback");
  const startQuiz = document.getElementById("startQuiz");

  let questionIndex = 0;
  let quizScore = 0;
  let quizLocked = false;


  // ==========================================
  // 6. UPDATE QUIZ PROGRESS
  // ==========================================

  function updateQuizProgress() {

    if (quizProgress) {
      quizProgress.textContent =
        `QUESTION ${String(questionIndex + 1).padStart(2, "0")} / ${String(quizQuestions.length).padStart(2, "0")}`;
    }

    if (quizBar) {

      const percentage =
        (questionIndex / quizQuestions.length) * 100;

      quizBar.style.width = `${percentage}%`;

    }

  }


  // ==========================================
  // 7. DISPLAY QUESTION
  // ==========================================

  function renderQuestion() {

    if (!quizContent) return;

    quizLocked = false;

    const item = quizQuestions[questionIndex];

    updateQuizProgress();

    if (quizFeedback) {
      quizFeedback.textContent = "";
    }

    quizContent.replaceChildren();

    const symbol = document.createElement("div");
    symbol.className = "quiz-symbol";
    symbol.textContent = String(questionIndex + 1).padStart(2, "0");

    const question = document.createElement("h3");
    question.textContent = item.q;

    const options = document.createElement("div");
    options.className = "quiz-options";

    item.a.forEach((answer, index) => {

      const button = document.createElement("button");

      button.className = "quiz-option";
      button.type = "button";

      button.textContent =
        `${String.fromCharCode(65 + index)}. ${answer}`;

      button.dataset.answer = index;

      button.addEventListener("click", () => {
        chooseAnswer(index);
      });

      options.appendChild(button);

    });

    quizContent.append(symbol, question, options);

  }


  // ==========================================
  // 8. CHECK ANSWER
  // ==========================================

  function chooseAnswer(choice) {

    if (quizLocked || !quizContent) return;

    quizLocked = true;

    const item = quizQuestions[questionIndex];

    const buttons = [
      ...quizContent.querySelectorAll(".quiz-option")
    ];

    buttons.forEach((button, index) => {

      button.disabled = true;

      if (index === item.correct) {
        button.classList.add("correct");
      }

      if (index === choice && choice !== item.correct) {
        button.classList.add("wrong");
      }

    });

    const isCorrect = choice === item.correct;

    if (isCorrect) {
      quizScore++;
    }

    if (quizFeedback) {
      quizFeedback.textContent =
        `${isCorrect ? "Correct! " : "Not quite. "}${item.why}`;
    }

    const nextButton = document.createElement("button");

    nextButton.className = "button button-primary quiz-next";
    nextButton.type = "button";

    nextButton.textContent =
      questionIndex === quizQuestions.length - 1
        ? "See my result →"
        : "Next question →";

    nextButton.addEventListener("click", () => {

      questionIndex++;

      if (questionIndex < quizQuestions.length) {
        renderQuestion();
      } else {
        renderResult();
      }

    });

    quizContent.appendChild(nextButton);

  }


  // ==========================================
  // 9. DISPLAY FINAL RESULT
  // ==========================================

  function renderResult() {

    if (!quizContent) return;

    if (quizProgress) {
      quizProgress.textContent = "CHALLENGE COMPLETE";
    }

    if (quizBar) {
      quizBar.style.width = "100%";
    }

    if (quizFeedback) {
      quizFeedback.textContent = "";
    }

    let message;

    if (quizScore === 5) {
      message =
        "Excellent awareness! Keep practicing safe online habits.";
    } else if (quizScore >= 3) {
      message =
        "Good effort! Review the topics and keep learning.";
    } else {
      message =
        "A good start! Revisit the guides and try again.";
    }

    quizContent.replaceChildren();

    const symbol = document.createElement("div");
    symbol.className = "quiz-symbol";
    symbol.textContent = "✓";

    const resultTitle = document.createElement("h3");
    resultTitle.textContent =
      `You scored ${quizScore} out of ${quizQuestions.length}.`;

    const resultMessage = document.createElement("p");
    resultMessage.textContent = message;

    const retryButton = document.createElement("button");
    retryButton.className = "button button-primary";
    retryButton.type = "button";
    retryButton.textContent = "Try again ↻";

    retryButton.addEventListener("click", startQuizAgain);

    quizContent.append(
      symbol,
      resultTitle,
      resultMessage,
      retryButton
    );

  }


  // ==========================================
  // 10. START OR RESTART QUIZ
  // ==========================================

  function startQuizAgain() {

    questionIndex = 0;
    quizScore = 0;
    quizLocked = false;

    renderQuestion();

  }

  if (startQuiz) {
    startQuiz.addEventListener("click", startQuizAgain);
  }

});