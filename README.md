# 🚀 Orbit - Landing Page Profesional

> **Desarrollo Web, AWS y Software a la Medida**

Orbit es una landing page moderna y escalable construida con React y desplegada en AWS con infraestructura como código usando Terraform. El proyecto incluye un sistema completo de formulario de contacto con validación de reCAPTCHA y envío de correos mediante AWS SES.

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Arquitectura](#️-arquitectura)
- [Tecnologías](#-tecnologías)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Requisitos Previos](#️-requisitos-previos)
- [Instalación](#-instalación)
- [Desarrollo Local](#-desarrollo-local)
- [Despliegue](#-despliegue)
- [Infraestructura AWS](#️-infraestructura-aws)
- [Configuración SEO](#-configuración-seo)
- [Variables de Entorno](#-variables-de-entorno)
- [Scripts Disponibles](#-scripts-disponibles)
- [Seguridad](#-seguridad)
- [Testing](#-testing)
- [Monitoreo](#-monitoreo)
- [Performance](#-performance)
- [Troubleshooting](#-troubleshooting)
- [Changelog](#-changelog)
- [Contribución](#-contribución)
- [Licencia](#-licencia)
- [Contacto](#-contacto)
- [Agradecimientos](#-agradecimientos)

---

## ✨ Características

### Frontend
- ⚡ **React 19** con **Vite** para desarrollo ultra-rápido
- 🎨 **Material-UI (MUI)** para componentes profesionales
- 🎭 **Framer Motion** para animaciones fluidas
- 📱 **Diseño Responsive** optimizado para todos los dispositivos
- 🔒 **reCAPTCHA v3** integrado para protección contra spam
- 📊 **SEO optimizado** con meta tags, Open Graph y sitemap
- 🚀 **Code Splitting** y lazy loading para mejor performance
- 🎯 **PWA-ready** con manifest y service workers configurables
- 🌐 **OGL (WebGL)** para efectos visuales avanzados

### Backend/Infraestructura
- ☁️ **Infraestructura como Código** con Terraform
- 🪣 **S3 + CloudFront** para hosting estático ultra-rápido
- 🔐 **Origin Access Control (OAC)** para seguridad S3
- 📧 **AWS SES** para envío de emails transaccionales
- ⚡ **AWS Lambda** (Python 3.12 y Node.js) para lógica serverless
- 🌐 **API Gateway HTTP API** con CORS configurado
- 🔒 **HTTPS** con certificados SSL/TLS de AWS ACM
- 📊 **CloudWatch Logs** para monitoreo y debugging
- 🔄 **Redirección 301** automática de apex a www
- 🛡️ **Headers de seguridad** configurados (HSTS, CSP, etc.)

---

## 🏗️ Arquitectura

### Diagrama de Alto Nivel

```
┌─────────────────┐
│   Usuario Web   │
└────────┬────────┘
         │ HTTPS
         ▼
┌─────────────────┐
│  CloudFront CDN │ ◄─── Certificado SSL/TLS (ACM)
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌──────┐  ┌──────────────┐
│  S3  │  │ API Gateway  │
│Bucket│  │  (HTTP API)  │
└──────┘  └───────┬──────┘
                  │
                  ▼
         ┌────────────────┐
         │ Lambda Invoker │ ◄─── Valida reCAPTCHA
         │  (Node.js 20)  │
         └────────┬───────┘
                  │ Invoca
                  ▼
         ┌───────────────────┐
         │ Email Dispatcher  │
         │   (Python 3.12)   │
         └────────┬──────────┘
                  │
                  ▼
              ┌─────┐
              │ SES │ ──► Envío de Emails
              └─────┘
```

### Flujo de Contacto

1. **Usuario** llena el formulario en la web
2. **Frontend** valida con reCAPTCHA v3
3. **API Gateway** recibe POST `/contact`
4. **Lambda Invoker** valida el token de reCAPTCHA
5. **Email Dispatcher** envía correos usando SES:
   - Email de confirmación al usuario
   - Notificación al equipo de ventas
6. **Respuesta** al frontend con estado del envío

---

## 🛠 Tecnologías

### Frontend
| Tecnología | Versión | Uso |
|-----------|---------|-----|
| React | 19.1.1 | Framework UI |
| Vite | 7.1.7 | Build tool & dev server |
| Material-UI | 7.3.5 | Librería de componentes |
| Framer Motion | 12.23.24 | Animaciones |
| React Hook Form | 7.66.0 | Manejo de formularios |
| Zod | 4.1.12 | Validación de esquemas |
| OGL | 1.0.11 | WebGL effects |
| reCAPTCHA v3 | 1.11.0 | Protección anti-spam |

### Infraestructura
| Tecnología | Versión | Uso |
|-----------|---------|-----|
| Terraform | ≥ 1.6 | IaC |
| AWS Provider | ~> 5.60 | Gestión de recursos AWS |
| Python | 3.12 | Runtime Lambda (email dispatcher) |
| Node.js | 20.x | Runtime Lambda (contact form) |

### Servicios AWS
- **S3**: Almacenamiento del sitio estático
- **CloudFront**: CDN global
- **Route 53**: Gestión DNS
- **ACM**: Certificados SSL/TLS
- **API Gateway**: Endpoints HTTP
- **Lambda**: Funciones serverless
- **SES**: Servicio de email
- **CloudWatch**: Logs y monitoreo
- **IAM**: Gestión de permisos

---

## 📁 Estructura del Proyecto

```
orbit/
├── frontend/                    # Aplicación React
│   ├── public/                  # Archivos estáticos
│   │   ├── img/                 # Imágenes y logos
│   │   ├── robots.txt           # SEO: Crawlers
│   │   ├── sitemap.xml          # SEO: Mapa del sitio
│   │   └── site.webmanifest     # PWA manifest
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/          # Header, Footer, etc.
│   │   │   ├── sections/        # Hero, About, Services, etc.
│   │   │   ├── contact_form/    # Formulario de contacto
│   │   │   └── Orb/             # Componente WebGL
│   │   ├── config/
│   │   │   ├── data.js          # Configuración (API, reCAPTCHA)
│   │   │   └── theme.js         # Tema MUI personalizado
│   │   ├── hooks/               # Custom hooks
│   │   ├── utils/               # Utilidades
│   │   ├── App.jsx              # Componente raíz
│   │   └── main.jsx             # Entry point
│   ├── index.html               # HTML base con SEO
│   ├── package.json             # Dependencias npm
│   ├── vite.config.js           # Configuración Vite
│   └── README.md                # Docs del frontend
│
├── infra/                       # Infraestructura Terraform
│   └── terraform/
│       ├── modules/             # Módulos reutilizables
│       │   ├── static-site-cdn/ # S3 + CloudFront
│       │   ├── api-gateway/     # HTTP API
│       │   ├── contact-form-lambda/
│       │   ├── email-dispatcher-lambda/
│       │   ├── email-dispatcher-iam/
│       │   ├── iam_lambda_invoker/
│       │   ├── ses/             # Configuración SES
│       │   └── route-53/        # DNS records
│       ├── main.tf              # Orquestación de módulos
│       ├── variables.tf         # Variables de entrada
│       ├── providers.tf         # Configuración AWS
│       ├── versions.tf          # Versiones de Terraform
│       └── outputs.tf           # Outputs de infraestructura
│
├── .gitignore
└── README.md                    # Este archivo
```

---

## ⚙️ Requisitos Previos

### Para Desarrollo Frontend
- **Node.js** ≥ 18.x
- **npm** ≥ 9.x (o **yarn/pnpm**)

### Para Infraestructura
- **Terraform** ≥ 1.6
- **AWS CLI** configurado con perfil `orbit`
- **Cuenta AWS** con permisos para:
  - S3, CloudFront, Route 53, ACM
  - Lambda, API Gateway, SES
  - IAM, CloudWatch

### Otros
- **Dominio registrado** en Route 53 (o external con NS records)
- **Clave de reCAPTCHA v3** (obtén en [Google reCAPTCHA](https://www.google.com/recaptcha))

---

## 📦 Instalación

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd orbit
```

### 2. Instalar dependencias del frontend

```bash
cd frontend
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto (opcional para desarrollo):

```env
# Frontend
VITE_RECAPTCHA_SITE_KEY=tu_site_key_aquí
VITE_API_URL=https://tu-api-gateway.execute-api.us-east-1.amazonaws.com/prod
```

### 4. Configurar Terraform

```bash
cd ../infra/terraform
```

Crea un archivo `terraform.tfvars` (está en `.gitignore`):

```hcl
project                  = "orbit"
env                      = "prod"
aws_region               = "us-east-1"
domain_name              = "orbit.com.mx"
zone_id                  = "Z0647556LU6E5QAL6A5"
from_email               = "no-reply@orbit.com.mx"
vendor_email             = "ventas@orbit.com.mx"
recaptcha_secret_key     = "tu_secret_key_aquí"
cors_allow_origins       = ["https://www.orbit.com.mx", "https://orbit.com.mx"]
```

---

## 💻 Desarrollo Local

### Ejecutar el frontend

```bash
cd frontend
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Comandos útiles

```bash
# Lint del código
npm run lint

# Build para producción
npm run build

# Preview del build
npm run preview
```

---

## 🚀 Despliegue

### Frontend (Manual a S3)

1. **Build de producción:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Sincronizar con S3:**
   ```bash
   aws s3 sync dist/ s3://orbit-prod-site-bucket --profile orbit --delete
   ```

3. **Invalidar cache de CloudFront:**
   ```bash
   aws cloudfront create-invalidation \
     --distribution-id E1234567890ABC \
     --paths "/*" \
     --profile orbit
   ```

### Infraestructura (Terraform)

#### Primera vez

```bash
cd infra/terraform

# Inicializar Terraform
terraform init

# Planificar cambios
terraform plan

# Aplicar infraestructura
terraform apply
```

#### Actualizar infraestructura

```bash
terraform plan   # Revisar cambios
terraform apply  # Aplicar cambios
```

#### Destruir (⚠️ CUIDADO)

```bash
terraform destroy
```

---

## ☁️ Infraestructura AWS

### Módulos Terraform

#### 1. **static-site-cdn**
Crea y configura:
- Bucket S3 privado para el sitio
- CloudFront distribution con OAC
- Certificado SSL/TLS (ACM)
- CloudFront Function para redirección www
- Cache policies optimizadas
- Security headers (HSTS, CSP, etc.)

**Características:**
- Compresión Gzip y Brotli
- HTTPS obligatorio (redirect)
- Cache de 1 hora con revalidación
- Price Class 100 (Norte América y Europa)

#### 2. **api-gateway**
API Gateway HTTP API con:
- Endpoint `POST /contact`
- CORS configurado
- Throttling (10 burst, 1 req/s)
- Integración Lambda Proxy v2.0

#### 3. **contact-form-lambda**
Lambda en Node.js 20 que:
- Valida token reCAPTCHA v3
- Verifica score mínimo (0.5)
- Invoca email-dispatcher
- Timeout: 10s, Memory: 256MB

#### 4. **email-dispatcher-lambda**
Lambda en Python 3.12 que:
- Envía email de confirmación al usuario
- Notifica al equipo de ventas
- Usa templates HTML de SES
- Timeout: 10s, Memory: 256MB

#### 5. **ses**
Configura Amazon SES:
- Verifica dominio y emails
- Registros DNS (DKIM, SPF, DMARC)
- Configuration set para tracking
- MAIL FROM personalizado

#### 6. **iam**
Roles y políticas IAM:
- `email-dispatcher-role`: Permisos SES
- `lambda-invoker-role`: Permisos Lambda invoke

#### 7. **route-53**
Gestión DNS:
- Registro A/AAAA para CloudFront
- Alias records para apex y www

---

## 📊 Configuración SEO

El proyecto incluye SEO completo configurado en `index.html`:

### ✅ Implementado
- Meta tags esenciales (title, description, keywords)
- Open Graph (Facebook, LinkedIn, WhatsApp)
- Twitter Cards
- Canonical URLs
- Favicons (16x16, 32x32, 64x64, 180x180, 192x192, 512x512)
- `robots.txt` optimizado
- `sitemap.xml` generado
- PWA manifest (`site.webmanifest`)
- Structured Data (JSON-LD) preparado

### 📋 Pendiente
- [ ] Verificar en Google Search Console
- [ ] Enviar sitemap
- [ ] Crear imagen OG optimizada (1200x630)
- [ ] Instalar Google Analytics 4
- [ ] Configurar Google Tag Manager (opcional)
- [ ] Convertir imágenes a WebP

---

## 🔐 Variables de Entorno

### Frontend (`.env` local)

```env
VITE_RECAPTCHA_SITE_KEY=6LdmpQ4sAAAAAGfHGArqFG09GNNQgteyWLuI8QT-
VITE_API_URL=https://5ee40mx0l5.execute-api.us-east-1.amazonaws.com/prod
```

### Terraform (`terraform.tfvars`)

```hcl
# Proyecto
project = "orbit"
env     = "prod"

# AWS
aws_region = "us-east-1"

# Dominio
domain_name = "orbit.com.mx"
zone_id     = "Z0647556LU6E5QAL6A5"

# Email
from_email   = "no-reply@orbit.com.mx"
vendor_email = "ventas@orbit.com.mx"

# reCAPTCHA
recaptcha_secret_key = "TU_SECRET_KEY_AQUÍ"

# CORS
cors_allow_origins = [
  "https://www.orbit.com.mx",
  "https://orbit.com.mx"
]

# Tags
tags = {
  Project     = "orbit"
  ManagedBy   = "terraform"
  Environment = "prod"
  AppName     = "LandingPage"
}
```

---

## 📜 Scripts Disponibles

### Frontend (`package.json`)

| Script | Comando | Descripción |
|--------|---------|-------------|
| `dev` | `vite` | Servidor de desarrollo |
| `build` | `vite build` | Build de producción |
| `lint` | `eslint .` | Análisis de código |
| `preview` | `vite preview` | Preview del build |

### Terraform

| Comando | Descripción |
|---------|-------------|
| `terraform init` | Inicializar backend y providers |
| `terraform fmt` | Formatear archivos `.tf` |
| `terraform validate` | Validar configuración |
| `terraform plan` | Planificar cambios |
| `terraform apply` | Aplicar cambios |
| `terraform destroy` | Destruir infraestructura |
| `terraform output` | Ver outputs |

---

## 🔒 Seguridad

### Frontend
- ✅ reCAPTCHA v3 en todos los formularios
- ✅ Validación client-side con Zod
- ✅ HTTPS obligatorio
- ✅ Content Security Policy (CSP) configurado

### Backend
- ✅ Validación server-side de reCAPTCHA
- ✅ Rate limiting en API Gateway (10 req/burst, 1 req/s)
- ✅ IAM roles con permisos mínimos (least privilege)
- ✅ Secrets en variables de entorno (no hardcoded)
- ✅ CloudWatch Logs habilitado
- ✅ Bucket S3 privado (sin acceso público)
- ✅ CORS restrictivo

### Headers de Seguridad (CloudFront)
```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Referrer-Policy: no-referrer-when-downgrade
Cache-Control: public, max-age=3600, must-revalidate
```

---

## 🧪 Testing

### Frontend
```bash
# Lint
npm run lint

# Build test
npm run build && npm run preview
```

### Backend
```bash
# Test Lambda localmente (con SAM CLI)
sam local invoke ContactFormFunction --event events/test-event.json

# Test API Gateway
curl -X POST https://5ee40mx0l5.execute-api.us-east-1.amazonaws.com/prod/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hola"}'
```

---

## 📈 Monitoreo

### CloudWatch Logs
```bash
# Ver logs de Lambda
aws logs tail /aws/lambda/orbit-prod-contact-form-fn --follow --profile orbit
aws logs tail /aws/lambda/orbit-prod-email-dispatcher-fn --follow --profile orbit
```

### Métricas
- **CloudFront**: Cache hit ratio, requests, data transfer
- **Lambda**: Invocations, duration, errors, throttles
- **API Gateway**: Request count, latency, 4xx/5xx errors
- **SES**: Emails sent, bounces, complaints

---

## 🚀 Performance

### Optimizaciones Implementadas

#### Frontend
- ⚡ **Code Splitting** manual por chunks (React, MUI, Framer Motion)
- 🔄 **Lazy Loading** de componentes con `React.lazy()`
- 📦 **Tree Shaking** automático con Vite
- 🗜️ **Minificación** de JS/CSS en build
- 🖼️ **Preload** de fuentes críticas
- 📊 **Preconnect** a Google Fonts

#### Backend
- 🌐 **CloudFront CDN** global (edge caching)
- 💾 **Cache Policy**: 1 hora con revalidación
- 🗜️ **Compresión**: Gzip + Brotli habilitado
- ⚡ **Lambda**: 256MB RAM, 10s timeout
- 🔥 **HTTP/2** habilitado en CloudFront

### Core Web Vitals (estimado)
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

---

## 🐛 Troubleshooting

### Problema: CORS Error en API Gateway
**Solución:** Verifica que el dominio esté en `cors_allow_origins` en `terraform.tfvars`

### Problema: Lambda Timeout
**Solución:** Aumenta `timeout_seconds` en el módulo Lambda (máx 900s)

### Problema: SES emails no llegan
**Solución:**
1. Verifica que los dominios estén verificados en SES
2. Revisa CloudWatch Logs de `email-dispatcher`
3. Confirma que no estés en SES Sandbox (límite 200 emails/día)

### Problema: CloudFront no actualiza
**Solución:** Crea una invalidación:
```bash
aws cloudfront create-invalidation \
  --distribution-id E1234567890ABC \
  --paths "/*" \
  --profile orbit
```

### Problema: reCAPTCHA falla
**Solución:**
1. Verifica que `recaptcha_secret_key` en Terraform sea correcto
2. Confirma que el dominio esté autorizado en Google reCAPTCHA console
3. Revisa logs de `contact-form-lambda`

---

## 🔄 Changelog

### v1.0.0 (2024)
- ✅ Landing page completa con React + Vite
- ✅ Infraestructura AWS con Terraform
- ✅ Sistema de contacto con reCAPTCHA
- ✅ SEO optimizado
- ✅ CloudFront + S3 deployment
- ✅ SES email templates
- ✅ API Gateway HTTP API
- ✅ Lambda functions (Node.js + Python)

---

## 👥 Contribución

### Flujo de trabajo
1. Fork del repositorio
2. Crear branch: `git checkout -b feature/nueva-funcionalidad`
3. Commit: `git commit -m 'Add: nueva funcionalidad'`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Crear Pull Request

### Estándares de código
- **JavaScript**: ESLint configurado (ver `eslint.config.js`)
- **Terraform**: `terraform fmt` antes de commit
- **Commits**: Conventional Commits (feat, fix, docs, style, refactor, test, chore)

---

## 📝 Licencia

Este proyecto es privado y confidencial. Todos los derechos reservados © 2024 Orbit.

---

## 📞 Contacto

- **Web:** [https://www.orbit.com.mx](https://www.orbit.com.mx)
- **Email:** contacto@orbit.com.mx
- **WhatsApp:** +52 33 3954 1634

---

## 🙏 Agradecimientos

- [Vite](https://vitejs.dev/) - Build tool increíblemente rápido
- [Material-UI](https://mui.com/) - Librería de componentes React
- [Framer Motion](https://www.framer.com/motion/) - Animaciones fluidas
- [Terraform](https://www.terraform.io/) - Infrastructure as Code
- [AWS](https://aws.amazon.com/) - Cloud infrastructure

---

**Hecho con ❤️ por el equipo de Orbit**
