# 👨‍💻 Mithusanth Sukumar — Portfolio

My personal developer portfolio: an animated single-page site showcasing my projects, with a detail page for each one covering the purpose, challenge, solution and key features.

### 🌐 [View it live → portfolio-mithusanth-sukumar.laravel.cloud](https://portfolio-mithusanth-sukumar.laravel.cloud/)

![Laravel](https://img.shields.io/badge/Laravel_12-FF2D20?style=flat-square&logo=laravel&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Inertia](https://img.shields.io/badge/Inertia.js-9553E9?style=flat-square&logo=inertia&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white)

---

## ✨ Highlights
- Smooth page and section animations with Framer Motion
- Project case-study pages (`/projectshow/{id}`)
- Fully typed React + TypeScript front end, served through Laravel + Inertia
- Built with Tailwind CSS 4 and shadcn/ui components

## 📝 Editing content
All personal details and projects live in one place:

```
resources/js/pages/mithusanth.tsx   →  the ME object and the projects array
```
Add project screenshots to `public/images/`.

---

## 🚀 Run locally

```bash
git clone https://github.com/Jack-Mithu/portfolio.git
cd portfolio

composer install
npm install

echo "APP_KEY=" > .env              # create a .env file
php artisan key:generate
touch database/database.sqlite      # uses SQLite by default
php artisan migrate

composer run dev        # or: php artisan serve  +  npm run dev
```
Open **http://localhost:8000**.

---

## 📫 Contact
[Portfolio](https://portfolio-mithusanth-sukumar.laravel.cloud/) · [GitHub](https://github.com/Jack-Mithu) · [LinkedIn](https://linkedin.com/in/sukumar-mithushanth)
