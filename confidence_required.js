/*
 * PSYC 402 — Mandela Effect Lab
 * Required answer + confidence selection (revision)
 *
 * Add AFTER the original inline <script> in index.html.
 * Compatible with the separate datapipe.js integration.
 *
 * This script intentionally does not modify stimuli, question order,
 * scoring, DataPipe uploads, redirect behavior, or results displays.
 */
(() => {
  "use strict";

  const task = document.getElementById("task");
  const answerChoices = document.getElementById("choices");
  const nextButton = document.getElementById("next");
  const confidenceInput = document.getElementById("confidence");
  const confidenceOutput = document.getElementById("confidenceValue");

  if (!task || !answerChoices || !nextButton || !confidenceInput || !confidenceOutput) {
    console.error("Confidence selection: required Mandela Effect Lab elements were not found.");
    return;
  }

  // Preserve the original 50%–100%, 5-point confidence scale.
  // Replace the slider with explicit, clickable number buttons so no
  // default percentage can be accepted without a participant action.
  confidenceInput.style.display = "none";
  confidenceInput.tabIndex = -1;
  confidenceInput.setAttribute("aria-hidden", "true");

  const style = document.createElement("style");
  style.textContent = `
    .confidence-number-options {
      display: grid;
      grid-template-columns: repeat(6, minmax(0, 1fr));
      gap: 8px;
      margin: 16px 0 10px;
    }
    .confidence-number-option {
      border: 1.5px solid var(--line, #e4e7f0);
      border-radius: 11px;
      background: white;
      color: var(--ink, #182235);
      padding: 12px 4px;
      font: inherit;
      font-weight: 750;
      cursor: pointer;
    }
    .confidence-number-option:hover,
    .confidence-number-option:focus-visible {
      border-color: var(--purple, #6657d9);
      outline-offset: 2px;
    }
    .confidence-number-option[aria-pressed="true"] {
      border-color: var(--purple, #6657d9);
      background: var(--purple2, #eeeaff);
      color: var(--purple, #6657d9);
      box-shadow: 0 0 0 2px #6657d922;
    }
    @media (max-width: 620px) {
      .confidence-number-options {
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }
    }
  `;
  document.head.appendChild(style);

  const numberGroup = document.createElement("div");
  numberGroup.id = "confidenceNumberOptions";
  numberGroup.className = "confidence-number-options";
  numberGroup.setAttribute("role", "group");
  numberGroup.setAttribute("aria-label", "Choose one confidence percentage");
  confidenceInput.insertAdjacentElement("afterend", numberGroup);

  let answerWasClicked = false;
  let confidenceWasClicked = false;
  const numberButtons = [];

  function syncNextButton() {
    // The original Next handler still records the selected answer
    // and the selected confidence value; this only gates advancing.
    nextButton.disabled = !(answerWasClicked && confidenceWasClicked);
  }

  for (let value = 50; value <= 100; value += 5) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "confidence-number-option";
    button.textContent = `${value}%`;
    button.setAttribute("aria-pressed", "false");
    button.setAttribute("aria-label", `${value} percent confident`);
    button.addEventListener("click", () => {
      if (task.classList.contains("hidden")) return;
      confidenceWasClicked = true;
      confidenceInput.value = String(value);
      // Preserve the original site's own confidence-display handler.
      confidenceInput.dispatchEvent(new Event("input", { bubbles: true }));
      numberButtons.forEach(other => {
        other.setAttribute("aria-pressed", String(other === button));
      });
      syncNextButton();
    });
    numberButtons.push(button);
    numberGroup.appendChild(button);
  }

  // Original per-answer click handlers run on the individual buttons.
  // This bubbling listener runs afterward and adds the confidence requirement.
  answerChoices.addEventListener("click", event => {
    const choice = event.target.closest("button.choice");
    if (!choice || !answerChoices.contains(choice) || task.classList.contains("hidden")) return;
    answerWasClicked = true;
    syncNextButton();
  });

  function resetQuestionSelections() {
    answerWasClicked = false;
    confidenceWasClicked = false;
    numberButtons.forEach(button => button.setAttribute("aria-pressed", "false"));
    // The original render() sets a default slider value of 70%; hide that
    // default in the visible UI until an actual percentage is clicked.
    confidenceOutput.textContent = "Choose a %";
    syncNextButton();
  }

  // Each original render() replaces the answer buttons; detect that change
  // so both selections are required again on every new question.
  const observer = new MutationObserver(mutations => {
    if (mutations.some(m => m.type === "childList")) {
      resetQuestionSelections();
    }
  });
  observer.observe(answerChoices, { childList: true });

  resetQuestionSelections();
})();
