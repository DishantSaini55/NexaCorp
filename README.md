# NexaCorp

Modern multi-page React website for cybersecurity research and education.

NexaCorp is a realistic enterprise-style frontend built to simulate a corporate security platform experience. It includes a multi-stage login demo, transparent in-memory analytics, and a premium responsive UI.

## Highlights

- Modern premium UI/UX (responsive on mobile, tablet, desktop)
- Multi-page navigation with React Router
- Five production-style pages: Home, About, Services, Careers, Login
- Multi-stage login simulation (credentials, MFA, lockout, reset flow)
- Transparent session analytics (no sensitive data capture)
- Export analytics data as JSON from built-in dev panel

## Tech Stack

- React 18
- Vite 5
- React Router DOM 6
- Tailwind CSS 4
- Lucide React icons

## Project Structure

```text
nexacorp/
  src/
    components/
      Navbar.jsx
      Footer.jsx
    pages/
      Home.jsx
      About.jsx
      Services.jsx
      Careers.jsx
      Login.jsx
    utils/
      analytics.js
    App.jsx
    main.jsx
    index.css
  index.html
  package.json
  vite.config.js
  postcss.config.js
```

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Run locally

```bash
npm run dev
```

Open: `http://localhost:3000`

### 3) Production build

```bash
npm run build
npm run preview
```

## Pages

- `/` Home: Hero, value props, trust section, CTA
- `/about` About: Story, mission/vision, stats, leadership
- `/services` Services: Security offerings and sales CTA
- `/careers` Careers: Job listings and culture section
- `/login` Login: Multi-stage authentication demo

## Login Demo Flow

1. Stage 1: Username/password + remember device
2. Stage 2: MFA code input + countdown timer
3. Stage 3: Account locked state
4. Stage 4: Forgot password input
5. Stage 5: Reset confirmation

## Transparent Analytics

The app includes an in-memory analytics utility (`src/utils/analytics.js`) that tracks:

- Page views and time spent
- Scroll depth
- UI interactions (buttons, links, form actions)
- Basic environment metadata (viewport, language, platform)

### Dev Analytics Panel

- Hidden trigger at bottom-right corner (for controlled demo use)
- View current session analytics JSON
- Copy JSON to clipboard
- Download JSON snapshot

## Security & Ethics

This repository is for education, UX demonstration, and controlled research only.

What this project does:

- Demonstrates realistic enterprise login UX flows
- Tracks non-sensitive interaction data in memory
- Supports transparent analytics review/export

What this project does not do:

- No credential exfiltration
- No external analytics transmission
- No backend persistence by default
- No malware, exploit, or stealth collection logic

## Accessibility & UX

- Responsive layouts across breakpoints
- Focus-visible outlines and readable contrast
- Reduced-motion support via CSS media query
- Consistent spacing, hierarchy, and component states

## Scripts

- `npm run dev` - start dev server
- `npm run build` - build for production
- `npm run preview` - preview production build

## License

For educational and internal demonstration use.

## 👀 View Session Data

1. Spend time on the site (click around, scroll, interact)
2. Click the **invisible 1x1px button** in the **bottom-right corner**
3. A modal opens showing all collected session data
4. **Copy JSON** or **Download JSON** to export data

## 📦 Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag dist/ folder to Netlify
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🤝 Contributing

This is an educational project. Feel free to:
- Extend the analytics
- Add more pages
- Improve styling
- Add more realistic content
- Implement additional demo features

## ⚠️ Disclaimer

This project is for **educational and authorized security research only**. 

**Do NOT use this to:**
- Trick users into thinking it's real
- Steal credentials
- Perform unauthorized testing
- Circumvent security systems
- Violate laws or ethical guidelines

**Always:**
- Get explicit authorization before testing
- Disclose the true nature of testing
- Comply with local laws
- Follow responsible disclosure practices

## 📝 License

Educational use only. For detailed terms, see specific use case documentation.

## 🎓 Learning Resources

- **React Router:** https://reactrouter.com/
- **Tailwind CSS:** https://tailwindcss.com/
- **Vite:** https://vitejs.dev/
- **Lucide Icons:** https://lucide.dev/

---

**Built with ❤️ for cybersecurity education and research.**
