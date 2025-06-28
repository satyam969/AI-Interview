# 🤖 AI Interview – Mock Interview Web App with Voice Agent

AI Interview is an AI-powered web application that helps users practice mock interviews through **voice interaction**, powered by **Vapi**, and **question generation** using **Gemini** (Google's LLM). It tracks user performance via **Firebase**, and provides smart feedback to help users improve their technical and behavioral interview skills.


## 🔐 Privacy & Features

### 💼 Resume-Based Interview (Privacy-First)
Our platform also supports **Resume-Based Interviews** — allowing users to upload their resume to receive personalized interview questions based on their experience and skills.

🛡️ **Privacy Matters**:  
We value your privacy. **Resumes are processed temporarily in-memory** and **never stored** on our servers or databases. Once the interview is generated, all resume data is discarded.

✨ This ensures a secure, private, and tailored interview experience without compromising your personal data.


---

## 🚀 Tech Stack

- ⚛️ **Next.js (App Router)** – Modern frontend framework with SSR
- 🔥 **Firebase** – Authentication, Firestore, and Hosting
- 🗣️ **Vapi.ai** – Real-time voice-based interview agent
- 🧠 **Gemini (Google AI)** – Dynamic question and feedback generation
- 🎨 **Tailwind CSS** – Utility-first styling for responsive UI

---

## 📸 Demo


[Live Demo](https://ai-interview-two-woad.vercel.app/) 

---

## 🧩 Features

- 🎙️ **Voice-Based Mock Interviews** powered by Vapi
- 🤖 **AI-Generated Interview Questions** using Gemini
- 📋 **Multiple Interview Modes** – DSA, System Design, Behavioral, etc.
- 📊 **Performance Tracking** with Firebase Firestore
- 🔐 **User Authentication** (Google/Auth Provider)
- 📈 **Personal Dashboard** with transcripts and feedback

---

## 🧠 Use Cases

- 👨‍🎓 **Students** preparing for placements
- 👨‍💻 **Professionals** switching jobs or upskilling
- 🏫 **EdTech Platforms** adding AI-powered mock interviews
- 📄 **Resume-based dynamic Q&A** (optional extension)

---

## 📁 Folder Structure

```
interview-ai/
├── app/
│   ├── (auth)/
│   │   ├── layout.tsx
│   │   ├── sign-in/
│   │   │   └── page.tsx
│   │   └── sign-up/
│   │       └── page.tsx
│   ├── (root)/
│   │   ├── interview/
│   │   │   ├── [id]/
│   │   │   │   ├── feedback/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── api/
│   │   └── vapi/
│   │       └── generate/
│   │           └── route.ts
│   ├── favicon.ico
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── Agent.tsx
│   ├── AuthForm.tsx
│   ├── DisplayTechIcons.tsx
│   ├── FormField.tsx
│   ├── InterviewCard.tsx
│   └── ui/
│       ├── button.tsx
│       ├── form.tsx
│       ├── input.tsx
│       ├── label.tsx
│       └── sonner.tsx
├── constants/
│   └── index.ts
├── firebase/
│   ├── admin.ts
│   └── client.ts
├── lib/
│   ├── actions/
│   │   ├── auth.action.ts
│   │   └── general.action.ts
│   ├── utils.ts
│   └── vapi.sdk.ts
├── public/
│   ├── ai-avatar.png
│   ├── calendar.svg
│   ├── covers/
│   │   ├── adobe.png
│   │   ├── amazon.png
│   │   ├── facebook.png
│   │   ├── hostinger.png
│   │   ├── pinterest.png
│   │   ├── quora.png
│   │   ├── reddit.png
│   │   ├── skype.png
│   │   ├── spotify.png
│   │   ├── telegram.png
│   │   ├── tiktok.png
│   │   └── yahoo.png
│   ├── file.svg
│   ├── globe.svg
│   ├── logo.svg
│   ├── pattern.png
│   ├── profile.svg
│   ├── react.svg
│   ├── robot.png
│   ├── star.svg
│   ├── tailwind.svg
│   ├── tech.svg
│   ├── upload.svg
│   ├── user-avatar.png
│   └── window.svg
├── types/
│   ├── index.d.ts
│   └── vapi.d.ts
├── components.json
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/satyam969/ai-interview.git
cd interview-ai
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root and add:

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Vapi (Voice Agent)
NEXT_PUBLIC_VAPI_API_KEY=your_vapi_api_key
NEXT_PUBLIC_VAPI_WORKFLOW_ID=your_assistant_id 



# Gemini (Google AI)
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key
```

### 4. Run Locally

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000)

---

## 🔐 Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a project
3. Enable **Authentication** (Google or Email/Password)
4. Create **Firestore Database** with basic `users`, `sessions` collections
5. Copy your Firebase config into `.env.local`

---

## 📡 Vapi Setup (Voice AI)

1. Visit [Vapi.ai](https://vapi.ai/)
2. Create a voice agent
3. Get your API key
4.ADD THIS SYSTEM PROMPT IN YOUR ASSISTANT 

[Identity]
You are an AI Interview Assistant for a mock interview website. Your role is to collect the user's preferences and generate a personalized technical interview using an API tool.

[Context]
You are embedded into a mock interview website. The user expects an efficient, friendly, and helpful interaction that simulates a real interview preparation.

[Information to Collect]
Ask the user for the following:
- **Role** (e.g., Frontend Developer, Data Scientist)
- **Level** of experience (e.g., Beginner, Intermediate, Expert)
- **Amount** (number of interview questions they want — e.g., 5, 10)
- **Tech Stack** (e.g., React, Node.js, Python, etc.)
- **Interview Type** (e.g., Coding, System Design, Behavioral)

> 🔒 **Note:** Do **not** ask for `userId`. It will be passed automatically.

Once all the above data is collected, call the tool `getInterviewQuestions` using the following format:

```json
{
  "role": "{{role}}",
  "level": "{{level}}",
  "amount": "{{amount}}",
  "techstack": "{{techstack}}",
  "type": "{{type}}",
  "userid": "{{userid}}"
}

and make an tool for the assistant in vapi named getInterviewQuestions to make a post request to /api/vapi/generate with body having role and the value {{role}} similarly for the rest ...
5. Use Vapi's SDK for web to initialize the voice session in your interview page

---

## 🧠 Gemini Setup

1. Go to [Google AI Studio](https://makersuite.google.com/)
2. Get your Gemini API key
3. Add it to your `.env.local` as:
   ```env
   GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key
   ```
   The SDK will automatically detect this variable. Do not use GEMINI_API_KEY; use GOOGLE_GENERATIVE_AI_API_KEY as the variable name.
4. Use it in your API routes to:
   - Generate dynamic interview questions
   - Evaluate answers
   - Summarize sessions

---

## 📊 Future Enhancements


- 📹 Video-based interview support
- 🌍 Multi-language support
- 🧪 Live code editor integration


---

## 🙌 Contributing

We welcome contributions!  
To contribute:

1. Fork the repo
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request

---

## 📝 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

**Priya Raj**  
📫 [LinkedIn](https://www.linkedin.com/in/priya-raj-4b0380273) • [GitHub](https://github.com/satyam969)

---

## ⭐ If you find this project helpful, don't forget to star it!