# PRODUCT DESIGN BRIEF: Thrive by Carda Health — GLP-1 Tapering & Lifestyle Companion

## What the product does — the core problem it solves

GLP-1 medications are highly effective for weight loss but present severe clinical challenges: up to 40% of the weight lost can be lean muscle mass, patients frequently suffer from gastrointestinal side effects like nausea and constipation, and upon discontinuing the medication, patients typically experience significant weight regain (often two-thirds of their lost weight within a year) due to the return of appetite and metabolic adaptation.

The **Thrive Program by Carda Health** solves this by acting as a tech-enabled clinical companion. It provides structured lifestyle interventions — focusing on resistance training, high-protein nutrition, and behavioral psychology — to preserve lean muscle mass during active weight loss and rebuild the patient's natural satiety habits so they can sustain their weight loss permanently after the medication is deprescribed.

---

## Who uses it — patient, clinician, caregiver?

**The Patient.** The app itself is strictly a patient-facing tool designed for adults with obesity or overweight who are either actively taking GLP-1 receptor agonists or are in the process of tapering off them. While the intervention involves live clinical oversight from Certified Exercise Physiologists (CEPs), the app's entire interface is designed to empower the patient as the "Job Executor" of their own health.

---

## Key screens or flows

- **The Home Dashboard (The "North Star"):** The central hub the patient sees upon opening the app. Above the fold it displays a personalized greeting and a proactive morning message from **Cardi** — the app's AI coach — based on what the patient shared in their last conversation (e.g. food noise, a tough session, a symptom). Below that, the **Thrive Score** (a dynamic 0–100 KPI) gives the patient an immediate, gamified snapshot of how well their body is handling the medication or tapering process that day.

- **The "Today's Playlist" Flow:** Located immediately below the Thrive Score, this organizes the patient's daily requirements into a simple, chronological to-do list — Morning Check-In, Today's Read, Fuel Reminder (protein logging), Exercise Session, and Lifestyle Session — preventing them from feeling overwhelmed by a 72-hour clinical curriculum.

- **Pre-Flight Check-In & Safety Guardrails:** A 60-second morning triage assessing vital signs, hydration goals, and GI symptoms. Crucially, this flow includes an automated safety trigger: because GLP-1s profoundly suppress appetite, if a patient logs extreme food restriction or rapid extreme weight loss, the app flags this for potential disordered eating — a mandated screening priority.

- **Chat Hub:** A unified inbox giving the patient direct access to all three members of their care team. **Cardi** (AI coach, always available) proactively initiates conversations based on prior session content — particularly around food noise, GI symptoms, and behavioral patterns. **Coach Haley** (Certified Exercise Physiologist) manages session scheduling and exercise programming. **Coach Maya** (Lifestyle Coach) covers behavioral psychology, stress, and habit formation. Unread message indicators surface on the nav bar so patients never miss a check-in from their team.

- **Evening Wrap-Up (Optional):** A nightly reflection screen prompting the user to complete a brief gratitude journal, log emotional eating triggers, and review sleep hygiene microsteps. The Evening Wrap-Up is intentionally optional — it does not contribute to the Thrive Score — and is surfaced as a soft call-to-action on the end-of-day completion screen rather than as a required playlist item.

---

## Any specific features — metrics to show, actions a user can take

- **Thrive Score (Metric):** A 0–100 daily composite score calculated from habit completion (check-in, protein, exercise, lifestyle session) and contextual health signals. The score's weighting shifts dynamically by program phase — see below.

- **"Beyond the Scale" Tracking (Metrics):** To align with the American Diabetes Association's focus on holistic Cardiovascular-Kidney-Metabolic (CKM) health, the app integrates with smart bioimpedance scales and Continuous Glucose Monitors (CGMs), and prompts patients to track waist circumference. This proves to the patient they are losing fat and improving metabolic health, not just losing overall mass.

- **Protein & Hydration Floors (Metrics):** Because GLP-1s severely suppress appetite, the app abandons traditional calorie restriction (ceilings) and instead tracks daily "floors." Patients track progress toward a daily protein target (typically 120–150g) to preserve muscle.

- **Cardi Morning Outreach (Action):** Each morning, Cardi surfaces a personalized conversation card on the home screen referencing something the patient shared the previous day — a high food-noise night, a skipped meal, an anxious moment. Tapping it opens a scripted but contextual AI conversation thread. This keeps the patient feeling seen without requiring a live clinician touchpoint.

- **AI-Powered "Microsteps" (Actions):** The app delivers context-aware, bite-sized behavioral nudges that are "too small to fail." Patients are prompted to take simple actions such as scheduling movement time or swapping sugary drinks for water.

- **Mindful Eating Tools (Actions):** To help patients manage returning "food noise," the app features a 1–10 Hunger Scale to help users distinguish between physical hunger and emotional cravings, and a 20-minute meal timer to encourage chewing slowly.

---

## How the Patient Experience Changes Based on Phase

Because the clinical threats change as the patient moves through the program, the app's UI and the algorithm calculating the Thrive Score dynamically shift to meet their needs.

### Phase 1: Active Loss — The App acts as a "Physical Protector"
- **The Experience:** The patient's appetite is highly suppressed, and they are at high risk for nausea and severe muscle wasting.
- **The UI Shift:** The Daily Playlist heavily prioritizes the Symptom Triage Engine and the Protein Dashboard. If the patient logs morning nausea, Cardi suggests actionable relief like ginger tea.
- **Score Shift:** The Thrive Score is calculated almost entirely based on hitting the daily protein floor and completing the mandated 2–3 resistance training sessions per week to preserve bone density and lean mass.

### Phase 2: The 9-Week Taper — The App acts as a "Psychological Coach"
- **The Experience:** The medication dosage is being stepped down. Artificial appetite suppression fades, and natural hunger — as well as anxiety about regaining weight — returns.
- **The UI Shift:** The app pivots from symptom management to behavioral psychology. The Daily Playlist prominently features the 1–10 Hunger Scale and the 20-Minute Meal Timer before meals to train patients to recognize true physiological fullness rather than emotional eating. Cardi's morning outreach increasingly focuses on food noise patterns surfaced from prior conversations.
- **Score Shift:** The Thrive Score dynamically shifts to heavily weight mindful eating adherence, completion of behavioral microsteps, and stress management.

### Phase 3: 12-Month Maintenance — The App acts as a "Lifestyle Anchor"
- **The Experience:** The medication is entirely out of the patient's system. The body's natural set-point defense mechanisms fight to put the fat back on, which is why unstructured patients typically regain two-thirds of their weight.
- **The UI Shift:** The app transforms into a long-term stability tracker. The Daily Playlist heavily emphasizes logging 30–60 minutes of daily aerobic maintenance activity, engaging with their 15-patient peer support cohort, and completing the Evening Reflection for sleep hygiene.
- **Score Shift:** The Thrive Score acts as a long-term stability metric, driven by stable waist circumference, ongoing community engagement, and consistent sleep quality.

---

## Goals or outcomes — what success looks like for the user

- **Sustained Weight Maintenance:** The patient successfully transitions off the GLP-1 medication without experiencing the rapid weight regain typical of drug discontinuation.
- **Preservation of Lean Mass:** The patient maintains their functional strength, bone density, and lean muscle mass through adherence to supervised resistance training and protein targets.
- **Psychological Resilience & Habit Formation:** The patient successfully rebuilds their internal satiety cues, overcomes weight stigma, and confidently sustains healthy habits utilizing the mindful eating techniques they learned.
- **Optimized Sleep and CKM Health:** The patient improves their overall Cardiovascular-Kidney-Metabolic health and consistently achieves 7–9 hours of quality sleep.
