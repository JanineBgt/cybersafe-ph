// CYBERSAFE PH
// No personal information is collected.

document.addEventListener("DOMContentLoaded", () => {

  // DARK / LIGHT MODE TOGGLE

  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const themeText = document.getElementById("themeText");

  if (themeToggle && themeIcon && themeText) {

    function updateTheme(isLight) {

      document.body.classList.toggle("light-mode", isLight);

      if (isLight) {
        themeIcon.textContent = "☾";
        themeText.textContent = "Dark Mode";
        themeToggle.setAttribute("aria-label", "Switch to dark mode");
      } else {
        themeIcon.textContent = "☀";
        themeText.textContent = "Light Mode";
        themeToggle.setAttribute("aria-label", "Switch to light mode");
      }

    }

    // Start in dark mode
    updateTheme(false);

    // Toggle theme
    themeToggle.addEventListener("click", () => {

      const isLight = !document.body.classList.contains("light-mode");

      updateTheme(isLight);

    });

  }


  // ACTIVE NAVIGATION - SCROLL DETECTION

  const navigationLinks = document.querySelectorAll(".nav-link");
  const pageSections = document.querySelectorAll("main section[id]");

  function updateActiveNavigation() {

    let currentSection = "home";

    pageSections.forEach(section => {

      const sectionTop = section.getBoundingClientRect().top;

      if (sectionTop <= 160) {
        currentSection = section.id;
      }

    });

    navigationLinks.forEach(link => {

      const target = link.getAttribute("href");

      link.classList.toggle(
        "active",
        target === `#${currentSection}`
      );

    });

  }

  // Update when scrolling
  window.addEventListener("scroll", updateActiveNavigation);

  // Update when page loads
  updateActiveNavigation();

  // Update when navigation link is clicked
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


  // 1. MOBILE NAVIGATION

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

  // 2. THREAT CENTER

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

      // Highlight the selected threat card
      threatCards.forEach(item => {
        item.setAttribute("aria-pressed", "false");
      });

      card.setAttribute("aria-pressed", "true");

      // Automatically scroll to the Threat Field Guide
      requestAnimationFrame(() => {
        threatDetail.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      });

    });

  });

  // 3. PASSWORD SAFETY CHECKLIST

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

  // 4. CYBERSAFE INTERACTIVE QUIZ

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

  // 5. QUIZ ELEMENTS AND VARIABLES

  const quizContent = document.getElementById("quizContent");
  const quizProgress = document.getElementById("quizProgress");
  const quizBar = document.getElementById("quizBar");
  const quizFeedback = document.getElementById("quizFeedback");
  const startQuiz = document.getElementById("startQuiz");

  let questionIndex = 0;
  let quizScore = 0;
  let quizLocked = false;

  // 6. UPDATE QUIZ PROGRESS

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

  // 7. DISPLAY QUESTION

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

  // 8. CHECK ANSWER

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

  // 9. MODERN QUIZ SCORING RESULTS

  function renderResult() {

    if (!quizContent) return;

    const totalQuestions = quizQuestions.length;
    const correctAnswers = quizScore;
    const wrongAnswers = totalQuestions - correctAnswers;

    const accuracy = totalQuestions > 0
      ? Math.round((correctAnswers / totalQuestions) * 100)
      : 0;

    const totalScore = Math.round(
      (correctAnswers / totalQuestions) * 100
    );

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
    let heading;

    if (accuracy === 100) {
      heading = "Perfect performance!";
      message = "Excellent awareness! You answered every question correctly. Keep practicing safe online habits.";
    } else if (accuracy >= 80) {
      heading = "Excellent work!";
      message = "You have a strong understanding of online safety. Keep using these habits in your everyday digital activities.";
    } else if (accuracy >= 60) {
      heading = "Good effort!";
      message = "You understand many important cybersecurity concepts. Review the questions you missed to improve further.";
    } else if (accuracy >= 40) {
      heading = "Keep practicing!";
      message = "You are making progress. Explore the CyberSafe PH guides and try the challenge again.";
    } else {
      heading = "A good start!";
      message = "There is more to learn about online safety. Review the Threat Center and Password Lab before trying again.";
    }

    quizContent.replaceChildren();

    // Main result container
    const result = document.createElement("div");
    result.className = "quiz-result";

    // SCORE CIRCLE
    const scoreArea = document.createElement("div");
    scoreArea.className = "result-score-area";

    const ring = document.createElement("div");
    ring.className = "score-ring";
    ring.setAttribute("role", "img");
    ring.setAttribute(
      "aria-label",
      `Score: ${totalScore} percent`
    );

    const ringContent = document.createElement("div");
    ringContent.className = "score-ring-content";

    const scoreNumber = document.createElement("span");
    scoreNumber.className = "score-number";
    scoreNumber.textContent = "0";

    const scorePercent = document.createElement("span");
    scorePercent.className = "score-percent";
    scorePercent.textContent = "%";

    ringContent.append(scoreNumber, scorePercent);
    ring.appendChild(ringContent);

    const scoreCaption = document.createElement("span");
    scoreCaption.className = "score-caption";
    scoreCaption.textContent = "YOUR ACCURACY";

    scoreArea.append(ring, scoreCaption);

    // RESULT DETAILS
    const details = document.createElement("div");
    details.className = "result-details";

    const label = document.createElement("span");
    label.className = "result-label";
    label.textContent = "QUIZ PERFORMANCE";

    const title = document.createElement("h3");
    title.textContent = heading;

    const description = document.createElement("p");
    description.className = "result-message";
    description.textContent = message;

    // STATISTICS
    const stats = document.createElement("div");
    stats.className = "result-stats";

    const statData = [
      {
        value: `${totalScore}/100`,
        label: "TOTAL SCORE"
      },
      {
        value: `${correctAnswers}`,
        label: "CORRECT ANSWERS"
      },
      {
        value: `${wrongAnswers}`,
        label: "INCORRECT ANSWERS"
      },
      {
        value: `${totalQuestions}/${totalQuestions}`,
        label: "QUESTIONS ANSWERED"
      }
    ];

    statData.forEach(data => {

      const card = document.createElement("div");
      card.className = "result-stat";

      const value = document.createElement("strong");
      value.textContent = data.value;

      const caption = document.createElement("span");
      caption.textContent = data.label;

      card.append(value, caption);
      stats.appendChild(card);

    });

    // PERFORMANCE BREAKDOWN
    const breakdown = document.createElement("div");
    breakdown.className = "result-breakdown";

    const breakdownHeading = document.createElement("div");
    breakdownHeading.className = "breakdown-heading";

    const breakdownLabel = document.createElement("span");
    breakdownLabel.textContent = "Performance breakdown";

    const breakdownPercentage = document.createElement("strong");
    breakdownPercentage.textContent = `${accuracy}% accuracy`;

    breakdownHeading.append(
      breakdownLabel,
      breakdownPercentage
    );

    const track = document.createElement("div");
    track.className = "breakdown-track";
    track.setAttribute("aria-label", "Correct and incorrect answers");

    const correctBar = document.createElement("div");
    correctBar.className = "breakdown-correct";

    const wrongBar = document.createElement("div");
    wrongBar.className = "breakdown-wrong";

    track.append(correctBar, wrongBar);
    breakdown.append(breakdownHeading, track);

    // RETAKE BUTTON
    const actions = document.createElement("div");
    actions.className = "result-actions";

    const retryButton = document.createElement("button");
    retryButton.className = "button button-primary";
    retryButton.type = "button";
    retryButton.textContent = "Retake Quiz ↻";

    retryButton.addEventListener("click", startQuizAgain);

    actions.appendChild(retryButton);

    details.append(
      label,
      title,
      description,
      stats,
      breakdown,
      actions
    );

    result.append(scoreArea, details);
    quizContent.appendChild(result);

    // ANIMATE SCORE AFTER DISPLAY
    requestAnimationFrame(() => {

      ring.style.setProperty(
        "--score-angle",
        `${accuracy * 3.6}deg`
      );

      correctBar.style.width = `${accuracy}%`;
      wrongBar.style.width = `${100 - accuracy}%`;

      const duration = 1000;
      const startTime = performance.now();

      function animateScore(currentTime) {

        const elapsed = currentTime - startTime;

        const progress = Math.min(elapsed / duration, 1);

        const easedProgress =
          1 - Math.pow(1 - progress, 3);

        scoreNumber.textContent = Math.round(
          accuracy * easedProgress
        );

        if (progress < 1) {
          requestAnimationFrame(animateScore);
        }

      }

      requestAnimationFrame(animateScore);

    });

  }

  // 10. START OR RESTART QUIZ

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
