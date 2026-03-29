🚀 CP Tracker — Competitive Programming Score Analyzer

🔗 Live App: https://cptracker-gdg.vercel.app/

CP Tracker is a full-stack application that analyzes competitive programming performance by integrating data from platforms like LeetCode and GitHub, generating meaningful insights and quality metrics.



✨ Features

📊 Code Quality Index (CQI) evaluation

🌍 Heatmap visualization of performance data

🤖 AI-powered analysis of coding patterns

🔗 Multi-platform integration (LeetCode + GitHub)

⚡ Real-time pipeline processing

📁 Exportable results for further analysis



🛠️ Tech Stack
Backend: Node.js, Express

APIs: GitHub API, LeetCode scraping

Data Processing: Custom pipeline (integrate.js)

Visualization: Heatmap-based UI

Deployment: Vercel



🧠 How It Works

User provides coding profile data

Backend pipeline (integrate.js) fetches data

Data is processed to compute CQI metrics

Results are visualized on a heatmap/dashboard



⚙️ Installation & Setup

# Clone the repository
git clone https://github.com/netalgupta/All-In_CodeEvaluator_GDG.git

# Navigate to project folder
cd Competitive-Programming-Score

# Install dependencies
npm install

# Start backend server
node server.js
🌐 Run Locally

Open in browser:

http://localhost:3000

To trigger analysis:

http://localhost:3000/run



📦 Project Structure
├── integrate.js        # Core data pipeline
├── server.js           # Express server
├── scripts/            # Utility scripts
├── output/             # Generated results
├── package.json



📈 Performance

⚡ AI response time: ~4–5 sec

🎤 Voice interaction latency: ~2–3 sec

🔄 Handles concurrent data processing (prototype scale)




🚀 Future Improvements

Full frontend dashboard UI

Real-time streaming updates

Advanced ranking & recommendations
Scalable backend architecture

📌 Note

This project is a functional prototype designed to demonstrate workflow reliability and intelligent analysis, not production-scale deployment.
