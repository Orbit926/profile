# Orbit - AWS Infrastructure Documentation

Este directorio contiene la documentación de la infraestructura AWS de Orbit, incluyendo diagramas UML que representan la arquitectura completa del sistema.

> 💡 **¿No sabes qué diagrama usar?** Consulta la [Guía de Diagramas](./DIAGRAM_GUIDE.md) para elegir el diagrama correcto según tu necesidad.

> 📊 **¿Eres stakeholder o manager?** Lee el [Resumen Ejecutivo](./EXECUTIVE_SUMMARY.md) - explicación no técnica en 5 minutos.

## 📊 Diagramas Disponibles

### 1. `c4-component-diagram.puml` ⭐⭐ (Recomendado para arquitectos)
Diagrama C4 nivel Componente (Level 3) profesional que muestra las relaciones y dependencias entre todos los componentes del sistema.

**Características:**
- Notación C4 estándar para arquitectura de software
- Agrupado por capas: DNS & Edge, Frontend, API, Email, Monitoring
- Estereotipos de color por tipo de componente
- Interacciones claramente etiquetadas
- Compatible con PlantUML antiguo (2021+)
- Ideal para presentaciones técnicas y documentación de arquitectura

### 2. `architecture-overview.puml` ⭐ (Recomendado para empezar)
Diagrama de alto nivel que muestra la arquitectura general del sistema de forma simplificada.

**Vista de:**
- Capas principales (DNS, Frontend, API, Email)
- Flujo de datos entre componentes
- Servicios externos (reCAPTCHA, Zoho Mail)
- Stack tecnológico

### 3. `aws-infrastructure.puml`
Diagrama UML detallado de la infraestructura AWS con todos los componentes y sus configuraciones.

**Componentes principales:**
- **Frontend**: S3 + CloudFront + ACM + Route 53
- **API**: API Gateway + Lambda (contact-form)
- **Email**: Lambda (email-dispatcher) + SES + SNS
- **Monitoreo**: CloudWatch Logs
- **DNS**: Route 53 (registros para ACM, SES, Zoho Mail)

### 4. `data-flow.puml`
Diagrama de secuencia que muestra paso a paso el flujo de datos cuando un usuario envía el formulario de contacto.

**Incluye:**
- Carga inicial de la página
- Validación de formulario
- Integración con reCAPTCHA
- Envío de emails
- Manejo de errores

## 🚀 Cómo Visualizar los Diagramas

### Opción 1: Visual Studio Code (Recomendado)
1. Instala la extensión **PlantUML** de jebbs
2. Abre el archivo `.puml`
3. Presiona `Alt + D` (o `Cmd + D` en Mac) para ver el preview
4. Presiona `Alt + Shift + F` para exportar a PNG/SVG

### Opción 2: Online
1. Visita [PlantUML Online Editor](http://www.plantuml.com/plantuml/uml/)
2. Copia y pega el contenido del archivo `.puml`
3. El diagrama se renderizará automáticamente

### Opción 3: CLI (PlantUML JAR)
```bash
# Instalar PlantUML (requiere Java)
brew install plantuml  # macOS
# o
sudo apt-get install plantuml  # Linux

# Generar imagen PNG
plantuml aws-infrastructure.puml

# Generar imagen SVG
plantuml -tsvg aws-infrastructure.puml
```

### Opción 4: IntelliJ IDEA / PyCharm
1. Instala el plugin **PlantUML Integration**
2. Abre el archivo `.puml`
3. El preview aparecerá automáticamente en el panel lateral

## 🏗️ Modelo C4 de Arquitectura

Este proyecto utiliza el **modelo C4** (Context, Containers, Components, Code) para documentar la arquitectura de software.

### Nivel 3: Component Diagram (c4-component-diagram.puml)

El diagrama C4 de componentes muestra la arquitectura interna del sistema Orbit, organizada en **6 capas principales**:

1. **DNS & Edge Layer**: Route 53, CloudFront CDN, ACM (certificados SSL)
2. **Frontend Layer**: S3 bucket con aplicación React estática
3. **Backend API Layer**: API Gateway + Lambda (contact-form) + IAM roles
4. **Email Service Layer**: Lambda (email-dispatcher) + SES + SNS topics
5. **Monitoring Layer**: CloudWatch Logs para observabilidad
6. **External Services**: reCAPTCHA (validación), Zoho Mail (correo corporativo)

**Colores en el diagrama:**
- 🔵 **Azul claro**: Servicios externos (reCAPTCHA, Zoho)
- 🟠 **Naranja**: Usuarios y actores
- 🟢 **Verde**: CDN (CloudFront)
- 🔵 **Azul**: Storage (S3)
- 🟡 **Amarillo**: API Gateway
- 🟠 **Naranja claro**: Lambda functions
- 🔴 **Rosa**: Email services (SES, SNS)
- ⚪ **Gris**: Monitoring (CloudWatch)
- 🟣 **Púrpura**: Security/IAM
- 🔵 **Azul oscuro**: DNS (Route 53)

### Patrón Arquitectónico

**Serverless + JAMstack**
- Frontend: React desplegado como sitio estático
- Backend: Lambda functions sin servidores
- Email: SES para transaccional
- Todo gestionado con Terraform (Infrastructure as Code)

## 📋 Descripción de la Arquitectura

### Frontend Layer
- **S3 Bucket**: Almacena los archivos estáticos de la aplicación React
- **CloudFront**: CDN que distribuye el contenido globalmente con cache y compresión
- **ACM Certificate**: Certificado SSL/TLS para `orbit.com.mx` y `www.orbit.com.mx`
- **CloudFront Function**: Redirige el dominio raíz a `www` con HTTP 301

### API Layer
- **API Gateway HTTP**: Endpoint `/contact` con throttling y CORS configurado
- **Lambda (contact-form)**: Valida ReCAPTCHA e invoca el email dispatcher
- **IAM Role**: Permisos para logs y para invocar otras lambdas

### Email Layer
- **Lambda (email-dispatcher)**: Envía correos usando plantillas de SES
- **Amazon SES**: Servicio de email transaccional con dominio verificado
- **SNS Topics**: Reciben eventos de bounces, complaints y deliveries
- **SES Templates**:
  - `ContactAckTemplate`: Email de confirmación al cliente
  - `VendorNotifyTemplate`: Notificación al equipo de ventas

### DNS Configuration
- **Route 53 Records**:
  - A records para `orbit.com.mx` y `www.orbit.com.mx` → CloudFront
  - MX records → Zoho Mail (correo corporativo)
  - TXT records → SPF, DKIM, DMARC (autenticación de email)
  - SES verification records → Verificación de dominio para SES
  - ACM validation records → Validación de certificado SSL

## 🔄 Flujo de Datos

### Flujo de Navegación Web
1. Usuario visita `orbit.com.mx` o `www.orbit.com.mx`
2. Route 53 resuelve a CloudFront
3. CloudFront Function redirige root → www (si aplica)
4. CloudFront sirve contenido desde S3 con cache
5. Usuario recibe la página con HTTPS y security headers

### Flujo de Formulario de Contacto
1. Usuario envía formulario desde el frontend
2. Frontend valida y envía POST a API Gateway
3. API Gateway invoca Lambda (contact-form)
4. Lambda valida ReCAPTCHA con Google
5. Lambda invoca Lambda (email-dispatcher)
6. Email dispatcher envía 2 emails via SES:
   - Email de confirmación al cliente
   - Email de notificación a ventas@orbit.com.mx
7. SES envía los correos y reporta eventos a SNS
8. Lambda responde a API Gateway
9. API Gateway responde al frontend
10. Frontend muestra Snackbar de éxito/error

## 🏷️ Recursos y Convenciones

### Naming Convention
- **Prefijo**: `{project}-{env}-{resource}`
- **Ejemplo**: `orbit-prod-site-bucket`

### Tags Estándar
```hcl
Project     = "orbit"
Environment = "prod"
ManagedBy   = "terraform"
```

### Región
Todos los recursos están desplegados en **us-east-1**

## 📝 Notas Técnicas

### Seguridad
- **S3**: Bucket privado con acceso solo via CloudFront OAC
- **CloudFront**: TLS 1.2+, HSTS habilitado, security headers
- **API Gateway**: Rate limiting (1 req/s, burst 10)
- **Lambda**: Execution roles con permisos mínimos necesarios
- **SES**: TLS requerido, DKIM habilitado, DMARC configurado

### Monitoreo
- **CloudWatch Logs**: Retención de 30 días para todas las lambdas
- **SNS Topics**: Notificaciones de bounces, complaints y deliveries de SES
- **API Gateway**: Logs de acceso y throttling configurados

### Costos Optimizados
- **CloudFront**: Price Class 100 (solo Norte América y Europa)
- **Lambda**: Memory optimizada (256 MB)
- **S3**: Sin versionado para reducir costos de storage

## 📁 Archivos en este Directorio

```
infra/docs/
├── README.md                      # Este archivo - Documentación principal
├── EXECUTIVE_SUMMARY.md          # Resumen ejecutivo (para management)
├── DIAGRAM_GUIDE.md              # Guía: ¿Qué diagrama usar?
├── c4-component-diagram.puml     # Diagrama C4 (Nivel Componente) ⭐
├── architecture-overview.puml    # Diagrama de alto nivel
├── aws-infrastructure.puml       # Diagrama detallado de AWS
└── data-flow.puml               # Diagrama de secuencia (flujo de datos)
```

### Guía Rápida por Audiencia

| Audiencia | Documento Recomendado |
|-----------|----------------------|
| **Management / Stakeholders** | `EXECUTIVE_SUMMARY.md` |
| **Arquitectos / Tech Leads** | `c4-component-diagram.puml` |
| **Desarrolladores Nuevos** | `architecture-overview.puml` |
| **DevOps / SRE** | `aws-infrastructure.puml` |
| **QA / Support** | `data-flow.puml` |

## 🔗 Referencias

### Documentación del Proyecto
- [Terraform Code](../terraform/) - Código de infraestructura como código
- [Guía de Diagramas](./DIAGRAM_GUIDE.md) - ¿Qué diagrama usar?

### Estándares y Metodologías
- [C4 Model for Software Architecture](https://c4model.com/) - Modelo C4
- [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/) - Best practices AWS

### Herramientas
- [PlantUML Documentation](https://plantuml.com/) - Documentación PlantUML
- [AWS Architecture Icons](https://aws.amazon.com/architecture/icons/) - Iconos AWS

## 📅 Última Actualización

**Fecha**: Noviembre 2024  
**Versión Terraform**: ~> 5.0  
**Mantenedor**: Orbit Team

---

**¿Preguntas sobre la arquitectura?** Contacta al equipo de arquitectura o consulta la [Guía de Diagramas](./DIAGRAM_GUIDE.md).
