# ResourceHub – Department Notes Sharing Platform

ResourceHub is a web app for students in a single department to **upload, approve, and access study resources** (notes, PYQs, links) without digging through WhatsApp or Telegram chats.

---

## 🌟 Features

- **Auth**: Email/password sign up & login + Google sign-in (Firebase Auth).
- **Landing Page**: Clear CTAs to browse or upload resources.  
- **Browse**: Filter by course, semester, subject, and resource type (notes, PYQs, links).  
- **Upload**: Seniors upload Google Drive links / files with metadata.  
- **Admin Panel**: Admin approves resources before they appear in Browse (quality control).

---

## 🧑‍💻 Tech Stack

- **Frontend**: React, Vite, MUI/Tailwind-style UI.  
- **Backend & Services**: Firebase Authentication, Cloud Firestore, Firebase Storage / Drive links.[web:379][web:381]  
- **Deployment**: Vercel for fast, automatic deployments.[web:408][web:402]

---

## 🚀 Run Locally

```bash
git clone https://github.com/Tanu9981/resource-sharing.git
cd resource-sharing
npm install

