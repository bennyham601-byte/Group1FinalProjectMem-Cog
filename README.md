# The Mandela Effect Lab — PSYC 402 prototype

A browser-based memory demonstration built with plain HTML, CSS, and JavaScript. Open `index.html` locally or publish the repository with GitHub Pages.

## What it does
- Presents 12 randomized multiple-choice cultural-memory questions.
- Records each answer and a 50–100% confidence judgment.
- Provides feedback, accuracy/confidence summaries, and item-level explanations.
- Exports an anonymous CSV locally when the participant chooses to download it.
- Includes a short educational explanation of reconstructive memory, source monitoring, and confidence.

## Suggested research question
How closely does confidence track recognition accuracy on familiar Mandela Effect examples?

## Suggested outcomes
- Recognition accuracy (proportion correct)
- Lure endorsement rate (proportion choosing the incorrect alternative)
- Mean confidence
- Calibration gap (mean confidence minus accuracy, both expressed as percentages)
- Optional trial-level comparison of confidence on correct versus incorrect responses

## Important research and ethics notes
This is a prototype and not a validated psychological instrument. The stimuli are a convenience sample; familiarity will vary across participants. Pilot-test every item and its answer key before data collection. The Curious George item is a general expectation-based foil, not necessarily a canonical Mandela Effect. Consider replacing it if your instructor wants only widely reported examples.

The page does not transmit data to a server. CSV export is participant-initiated and contains a random session code, not names or email addresses. Your handout requires the class-approved DataPipe workflow (or another instructor-approved method) for collecting evaluation data. This prototype does **not** implement DataPipe; obtain the correct endpoint/instructions and instructor approval before adding any transmission. Do not place participant data or credentials in a public GitHub repository.

## Run locally
Double-click `index.html`, or serve the folder with any static web server.

## Deploy with GitHub Pages
1. Create a public repository and add `index.html` and this README.
2. Commit and push the files.
3. In repository Settings → Pages, choose deployment from the main branch and root folder.
4. Share the published Pages URL after checking the app on desktop and mobile.

## Before the study
- Verify the cultural examples, exact wording, and answer key against authoritative primary sources.
- Ask your instructor to approve consent language, participant age criteria, recruitment, and data handling.
- Pilot with a few volunteers and check completion time, confusing items, and CSV output.
- Do not interpret a convenience-sample score as a diagnosis or a general measure of memory ability.
