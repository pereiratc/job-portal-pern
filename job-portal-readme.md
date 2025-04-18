# 📘 Projeto: Job Portal + CV + eLearning Platform (Stack PERN)

## 🧠 Stack e Tecnologias Escolhidas

| Área            | Tecnologia                          | Função                                                                 |
|-----------------|--------------------------------------|------------------------------------------------------------------------|
| **Design**      | Figma                                | Protótipos UI/UX                                                      |
| **Frontend**    | React.js, TailwindCSS, Axios         | Interface, estilos e chamadas API                                     |
| **Backend**     | Node.js, Express.js                  | API, lógica de negócio                                                |
| **Banco de Dados** | PostgreSQL + Prisma ORM           | Armazenamento relacional                                              |
| **Auth**        | JWT + Bcrypt                         | Autenticação segura                                                   |
| **Upload CV**   | Multer + Cloudinary                  | Upload de arquivos                                                    |
| **Deployment**  | Vercel (frontend) / Render (backend) | Hospedagem                                                            |

---

## 📂 Estrutura Modular do Backend

```
/server
├── modules/
│   ├── auth/
│   │   ├── auth.controller.js
│   │   ├── auth.routes.js
│   │   ├── auth.service.js
│   │   └── auth.middleware.js
│   ├── resume/
│   │   ├── resume.controller.js
│   │   ├── resume.routes.js
│   │   ├── resume.service.js
│   │   └── resume.parser.js (opcional)
|   |... **outros**
├── config/
│   ├── prisma.js
│   └── cloudinary.js
├── prisma/
│   └── schema.prisma
├── .env
├── server.js
```

---

## 📌 Roadmap de Sprints

| Sprint | Duração      | Objetivos principais                                      |
|--------|--------------|-----------------------------------------------------------|
| 1      | Semanas 1–2  | Config inicial, protótipos UI/UX                         |
| 2      | Semanas 3–4  | Auth (login/register), JWT                               |
| 3      | Semanas 5–6  | CRUD de vagas + aplicação                                |
| 4      | Semanas 7–8  | Upload de CV + parser                                    |
| 5      | Semanas 9–10 | Cursos + habilidades + progresso                         |
| 6      | Semanas 11–12| Skill auto-update + QA                                   |
| 7      | Semanas 13–14| Deploy final + monitoramento                             |

---

## 🧩 schema.prisma (corrigido - trecho)

```prisma
model User {
  id         Int        @id @default(autoincrement())
  email      String     @unique
  password   String
  role       Role       @default(CANDIDATE)
  resumes    Resume[]
  applications Application[]
  enrollments Enrollment[]
  progresses  Progress[]
  createdAt  DateTime   @default(now())
  updatedAt  DateTime   @updatedAt
}

model Resume {
  id        Int      @id @default(autoincrement())
  url       String
  user      User     @relation(fields: [userId], references: [id])
  userId    Int
  uploadedAt DateTime @default(now())
  skills    Skill[]   @relation("ResumeSkills")
}
```

---

## 🔐 Autenticação (Modular)

### auth.routes.js

```js
router.post('/register', register);
router.post('/login', login);
```

### auth.service.js

```js
export async function registerUser({ email, password, name }) {
  const hashed = await bcrypt.hash(password, 10);
  return prisma.user.create({ data: { email, password: hashed, name } });
}
```

---

## 📁 Upload de Currículo (Modular)

### resume.routes.js

```js
router.post('/upload', authMiddleware, upload.single('file'), uploadResume);
```

### resume.service.js

```js
const uploaded = await cloudinary.uploader.upload_stream(...);
return prisma.resume.create({ data: { url: uploaded.secure_url, userId } });
```

---

## ✅ Comandos importantes

```bash
# Migrar banco
npx prisma migrate dev --name init

# Gerar cliente Prisma
npx prisma generate

# Rodar projeto com nodemon
npm run dev
```

---

**Pronto para o próximo passo: conectar frontend, criar dashboard ou implementar cursos!**