# PSYC 402 Group 1 — Mandela Effect Lab DataPipe integration

**What this ZIP contains:** `datapipe.js` is the new JavaScript file; it works with the existing site's inline JavaScript and does not replace the questions, styling, scoring, or psychology explanations. The professor's DataPipe experiment ID for Team 1 (Chain A) is already configured.

## IMPORTANT: TWO edits are required

1. In GitHub, open the existing `index.html` and click **Edit** (pencil). Find its final lines:

   ```html
   </script>
   </body></html>
   ```

   Change those final lines to:

   ```html
   </script>
   <script src="datapipe.js"></script>
   </body></html>
   ```

   Commit the edit. **Do not remove the existing inline script!** The new file adds the DataPipe feature *after* your original code loads.

2. Upload **`datapipe.js`** to the repository root, next to `index.html`, using **Add file → Upload files**. Commit it to `main`.

   **Before releasing to actual participants:** Open `datapipe.js` in GitHub and change the empty `NEXT_PROJECT_URL` near the top to **Team 2's verified public GitHub Pages URL**, e.g. `const NEXT_PROJECT_URL = "https://TEAM2USERNAME.github.io/TEAM2-REPOSITORY/";`. The example URL is NOT real. Until this is set, the site can attempt a DataPipe save but CANNOT redirect to Team 2. Never guess or invent Team 2's URL.

## What happens

- Team 1 creates a fresh anonymous `sid` for each new browser session.
- After the 12th response, `datapipe.js` shows a saving message and automatically sends **two CSVs** to the instructor's DataPipe experiment: `summary_<sid>.csv` (one row) and `trials_<sid>.csv` (12 rows).
- Every CSV row includes `session_id`, `team_id`, and `chain_id`.
- It accepts DataPipe HTTP 201/202 and `FILE_EXISTS` (on retry).
- If an upload fails, the participant stays on the results page and sees **Retry saving** and **Download backup CSV files**.
- Only when both files are accepted, the site redirects to Team 2 preserving `?sid=<same id>&chain=A`. With no Team 2 URL, it stops and reports that the project is not ready for recruitment.
- The original questions, design, recall scoring, review, and educational material remain available in the source project. **Once a redirect is configured, it occurs immediately after successful saving**, so participants might not have time to read the results/educational page; discuss this timing with your professor if feedback viewing is important.
- The original consent and site notice are corrected by this script to disclose that anonymous data are transmitted to instructor-controlled storage. Obtain the instructor's approval of participant-facing consent wording before recruitment.

## Required testing before recruitment

1. Under instructor supervision, use the published GitHub Pages URL and complete all 12 items (not a local `file://` URL).
2. Confirm the saving indicator appears without clicking a save button.
3. Ask Dr. Onyper to verify that BOTH `summary_<sid>.csv` and `trials_<sid>.csv` appear under `My Drive / 402_Fall2026 / Team1_402_Fall2026` in the instructor-owned account. Students do not need access to that Google Drive.
4. Confirm `session_id` matches in both, the trial file has 12 data rows, and `team_id=1`, `chain_id=A`.
5. Confirm Team 2's app receives **exactly the same** sid and chain A after both saves succeed.
6. Ask your instructor to confirm that DataPipe accepts CSV, that "Accept new data" is ON, and that required fields (such as `trial_type`) are not configured incompatibly.
7. Test the failure path: interrupt network access at completion, verify no redirect and a retry plus local backup appear; restore access and retry. An already-saved CSV may return `FILE_EXISTS` and is counted as success.
8. Run the full chain and repeat on a second browser/device before participant recruitment.

## Privacy

Do NOT add any participant CSV files, names, email addresses, consent information, or research-credit records to public GitHub. The data is automatically sent to the instructor's separate system.

## Notes

This is a ready-to-install integration based on the public `index.html` structure reviewed on 2026-11-18. It has not been validated against the professor's live DataPipe storage. Final confirmation requires an actual test upload and instructor verification. The current project uses inline JavaScript, so adding just `datapipe.js` without the `<script src>` tag will have no effect.
