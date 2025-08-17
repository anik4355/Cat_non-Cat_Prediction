# 🐈 Cat Classifier Frontend (React + Vite)

This is the frontend for the **Cat or Not? 🐕** project.  
Built with **React + Vite + TailwindCSS**, it connects to a Flask backend API to classify uploaded images as a cat 🐈 or not.

---

## 📸 Features

- Upload an image (`.png`, `.jpg`)
- Preview the selected image before prediction
- Send the image to the backend API for classification
- Display the prediction result (Cat 🐈 or Not 🐕)
- Error handling for invalid inputs or API failures

---

## ⚙️ Tech Stack

- React + Vite
- Tailwind CSS
- Flask API backend (deployed on Render)
- GitHub Pages for frontend hosting

---

## 🚀 Setup & Installation

```bash
# Clone the repository
git clone https://github.com/anik4355/Cat_non-Cat_Prediction.git
cd Cat_non-Cat_Prediction

# Install dependencies
npm install

# Create a .env file in the project root
echo "VITE_API_URL=https://cat-model.onrender.com/predict" > .env

# Run the development server
npm run dev
```

---

## 📦 Build for Production

```bash
npm run build
npm run preview
```

---

## 🌍 Deployment (GitHub Pages)

```bash
# Install gh-pages
npm install gh-pages --save-dev

# Add this to package.json scripts:
# "predeploy": "npm run build",
# "deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

Your app will be live at:

```
https://<your-username>.github.io/<your-frontend-repo>/
```

---

## 🛡️ Environment Variables

- `VITE_API_URL` → Backend API endpoint (`https://cat-model.onrender.com/predict`)

---

## 👨‍💻 Author

Developed by [Your Name]
