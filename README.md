<h1>Project Description:</h1>
<p>I'm plan to made a local App integrated in AI to help designer to make highly customized UI, and implement several ready-made UI component in it, and make different categories.
I'll try to using computer vision learning and train a data set to tell LLM to select, create UI component in different style, and give user recommendation depends on which type of App that user wants to create.

  I think in frontend design, if during the dev, a Global-Vision Design Agent could change how it work when doing the dev.
</p>

<h2>Step1. Data Research</h2>
<p>1. Find different Data on how many Apps we have nowadays.\n

  2. How to make LLM much better in recognize vision contents.\n

3. What vivid effects look like (visual patterns)\n

4. How vivid effects are constructed (CSS, components, tokens)\n

5. Why & when to use them (UX reasoning)</p>


<h3>===Generated part by GPT, But that's the point===</h3>
🔮 2. What a Global-Vision Design Agent Must Understand

To achieve vivid, interactive UI creation, the agent must learn:

A. Spatial context

“Where does this element exist in the visual hierarchy?”

B. Temporal context

“How do elements change over time when interacted with?”

C. Style coherence

“What is the global design system implied by this page?”

D. User intention simulation

“How does a user perceive vividness / depth / energy?”

E. Brand storytelling

“What emotional tone should this interface emit?”

This agent is essentially a designer.

<h3>DIVIDE LINE</h3>
✅ What You’re Proposing

A model that can:

0. Read the rendering content visualy

1. Read the UI code (React, HTML, Tailwind, tokens, etc.)

2. Infer the structure & look before rendering

3. Predict visual mistakes / layout issues / style conflict

5. Update the code accordingly


This is extremely powerful.

It turns UI code into visualizable meaning — without needing the browser.

<h2>Step2. Chosing a powerful vision provided model</h2>

| Rank | Model                        | Strength                                                         |
| ---- | ---------------------------- | ---------------------------------------------------------------- |
| 1    | **GPT-5.1 Vision**           | Understands depth, motion curves, UX flow                        |
| 2    | **Qwen2.5-VL (open-source)** | Best open-source for layout + code + UI tree                     |
| 3    | **InternVL 2.5**             | Great at pixel-level inference: hover states, alignment, spacing |

<p>1. Implement LLM before we do the hot-reloading render</p>

```
Frontend Hot Reload (Vite / Next / CRA)
            |
            | triggers file-change event
            v
   Local Dev Server → Node/Express API
            |
            | sends:
            | • changed file(s)
            | • full repo map
            | • runtime errors
            | • console logs
            v
   Qwen2.5 Inference Server (API)
            |
            | returns model action:
            | • analyze layout
            | • analyze interactions
            | • predict visual issues
            | • suggest code edits (diff)
            | • give design feedback
            v
  Editor / IDE / Preview UI
```

✔️ Task 1 (API + Hot Reload)

You set up a:

file watcher (chokidar)

Node API endpoint

send code + context (optionally screenshots)

receive model output & apply diffs



✔️ Task 2 (Training)

You do:

Prepare dataset

Use QLoRA on Qwen2.5-VL

Train via LLaMA-Factory or TRL

Test on real UI code

Iterate


<h2>Building steps (partially)</h2>
1. Each time we save, we take screenshot on frontend\n
<p>Latest: We solved this task! once we refresh the frontend, we can solve the real-time frontend to a root folder named 'screenshot'. We solve it by using customize hook to sensor once HMR refreshed, and we set 3 different variebles to ensure we won't step into a capture infinite loop by HMR hot-reload, and also once we change the UI in the frontend, we can save the latest visual content on frontend.</p></br><p>Next step, I will try to build my own training dataset step-by-step, I had create a source folder for keeping image data, after that, I'll list all attributes which may being considered by designers when they're doing design work</p>

2. Collect the code diff\n
   
3. Send Screenshot/code for train\n


