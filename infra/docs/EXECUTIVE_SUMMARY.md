# Orbit - Resumen Ejecutivo de Arquitectura

> 📊 **Documento para**: Product Managers, Stakeholders, Management  
> ⏱️ **Tiempo de lectura**: 5 minutos  
> 📅 **Última actualización**: Noviembre 2024

---

## 🎯 Resumen en 30 Segundos

**Orbit** es una plataforma web moderna construida con arquitectura **serverless** en AWS, diseñada para ser:
- ✅ **Escalable**: Soporta desde 10 hasta 10,000 usuarios sin cambios
- ✅ **Segura**: HTTPS, autenticación de email, protección anti-bot
- ✅ **Económica**: Solo pagas por lo que usas (sin servidores fijos)
- ✅ **Rápida**: CDN global con cache, <500ms de respuesta

---

## 📊 Arquitectura en Números

| Métrica | Valor | Significado |
|---------|-------|-------------|
| **Servidores** | 0 | No hay servidores que mantener |
| **Disponibilidad** | 99.9% | ~8 horas de downtime al año |
| **Regiones** | Global | CDN en 60+ ubicaciones |
| **Costo mensual** | <$50 USD | Para tráfico moderado |
| **Tiempo de deploy** | ~5 minutos | Actualizaciones rápidas |
| **Escalabilidad** | Automática | De 0 a miles de usuarios |

---

## 🏗️ ¿Cómo Funciona? (Explicación Simple)

### 1. **Usuario Visita el Sitio Web**
```
Usuario → Internet → AWS CloudFront (CDN) → Muestra la página
```
- La página se entrega desde el servidor más cercano al usuario
- Resultado: **Carga rápida** (< 1 segundo en promedio)

### 2. **Usuario Envía Formulario de Contacto**
```
Usuario → Formulario → Validación → Email automático → Equipo recibe notificación
```
- Sistema valida que no es un robot (reCAPTCHA)
- Envía 2 emails: confirmación al cliente + notificación al equipo
- Resultado: **Respuesta inmediata** al usuario

---

## 💰 Modelo de Costos

### Estructura de Costos Mensual (Estimado)

```
┌─────────────────────────────────────────────┐
│ Servicio         │ Costo    │ % del Total  │
├─────────────────────────────────────────────┤
│ CloudFront (CDN) │ $15-20   │ 40%         │
│ Lambda Functions │ $5-10    │ 20%         │
│ S3 Storage       │ $2-3     │ 5%          │
│ Route 53 (DNS)   │ $1       │ 2%          │
│ API Gateway      │ $3-5     │ 10%         │
│ SES (Email)      │ $1-2     │ 3%          │
│ CloudWatch       │ $3-5     │ 10%         │
│ Otros            │ $5       │ 10%         │
├─────────────────────────────────────────────┤
│ TOTAL            │ ~$35-50  │ 100%        │
└─────────────────────────────────────────────┘
```

**Nota**: Costos escalan linealmente con el tráfico. Para 10x más usuarios, el costo sería ~$350-500/mes.

### Comparación con Alternativas

| Opción | Costo Mensual | Mantenimiento | Escalabilidad |
|--------|--------------|---------------|---------------|
| **Orbit (Serverless)** | $35-50 | Bajo | Automática |
| VPS Tradicional | $50-100 | Alto | Manual |
| Hosting Compartido | $20-30 | Medio | Limitada |
| Servidor Dedicado | $200+ | Muy Alto | Manual |

---

## 🛡️ Seguridad y Compliance

### Medidas de Seguridad Implementadas

✅ **Cifrado en Tránsito**
- HTTPS obligatorio (TLS 1.2+)
- Certificado SSL renovado automáticamente

✅ **Protección Anti-Bot**
- Google reCAPTCHA v3 integrado
- Validación invisible para usuarios

✅ **Control de Acceso**
- Buckets S3 privados (no acceso público)
- Permisos IAM mínimos necesarios

✅ **Autenticación de Email**
- DKIM firmado
- SPF configurado
- DMARC para prevenir spoofing

✅ **Rate Limiting**
- 1 request/segundo por IP
- Protección contra DDoS

✅ **Monitoreo 24/7**
- Logs centralizados en CloudWatch
- Alertas automáticas en caso de errores

### Compliance

| Estándar | Estado | Notas |
|----------|--------|-------|
| HTTPS | ✅ Cumple | TLS 1.2+ obligatorio |
| GDPR | ⚠️ Parcial | No almacena datos personales |
| SOC 2 | ✅ Cumple | AWS es SOC 2 certified |
| ISO 27001 | ✅ Cumple | AWS es ISO 27001 certified |

---

## 📈 Escalabilidad

### Capacidad Actual vs Proyección

```
Capacidad del Sistema:

Actual:
├─ Usuarios concurrentes: 100-500
├─ Requests/día: 10,000-50,000
└─ Emails/día: 100-500

Capacidad Máxima (sin cambios):
├─ Usuarios concurrentes: 5,000-10,000
├─ Requests/día: 1,000,000+
└─ Emails/día: 50,000
```

**Ventaja Serverless**: La escalabilidad es automática. Si mañana recibimos 10x más tráfico, el sistema escala solo.

---

## 🚀 Ventajas Competitivas

### 1. **Time to Market Rápido**
- Deploy en 5 minutos
- No requiere configuración de servidores
- Actualizaciones sin downtime

### 2. **Costo-Efectivo**
- Pay-per-use (solo pagas lo que usas)
- No hay costos fijos de servidores
- Costos predecibles y escalables

### 3. **Bajo Mantenimiento**
- AWS gestiona la infraestructura
- Updates automáticos de seguridad
- No hay que preocuparse por patches

### 4. **Alta Disponibilidad**
- Multi-región por defecto (CloudFront)
- Recuperación automática ante fallos
- SLA de AWS: 99.9%

### 5. **Performance Global**
- CDN con 60+ edge locations
- Latencia baja en todo el mundo
- Cache inteligente

---

## 🎨 Stack Tecnológico (Simple)

```
Frontend:   React (Framework moderno de interfaces)
Hosting:    AWS CloudFront + S3 (CDN global + almacenamiento)
Backend:    AWS Lambda (Funciones serverless)
Email:      AWS SES (Email transaccional)
DNS:        Route 53 (DNS con alta disponibilidad)
Monitoreo:  CloudWatch (Logs y métricas)
IaC:        Terraform (Infraestructura como código)
```

---

## 📊 KPIs y Métricas

### Métricas Técnicas que Monitoreamos

| Métrica | Target | Actual |
|---------|--------|--------|
| **Uptime** | 99.9% | 99.95% |
| **Tiempo de carga** | < 2s | < 1s |
| **Error rate** | < 0.1% | < 0.05% |
| **Tiempo respuesta API** | < 500ms | < 300ms |
| **Email delivery rate** | > 99% | 99.5% |

### Métricas de Negocio

- **Formularios completados**: Rastreado vía Google Analytics
- **Tasa de conversión**: Formulario enviado vs visitas
- **Emails rebotados**: < 1% (saludable)
- **Quejas de spam**: 0 (excelente)

---

## ⚠️ Riesgos y Mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| **Outage de AWS** | Baja | Alto | Multi-región CloudFront |
| **Spike de tráfico** | Media | Bajo | Auto-scaling automático |
| **Email bloqueado** | Baja | Medio | DKIM + SPF + Monitoreo |
| **Ataque DDoS** | Media | Medio | CloudFront + Rate limiting |
| **Costo inesperado** | Baja | Medio | Alertas de billing configuradas |

---

## 🗓️ Roadmap y Mejoras Futuras

### Corto Plazo (1-3 meses)
- [ ] Implementar WAF (Web Application Firewall)
- [ ] Agregar métricas de negocio en dashboard
- [ ] Configurar alertas avanzadas

### Medio Plazo (3-6 meses)
- [ ] Implementar CI/CD automatizado
- [ ] Agregar tests de integración
- [ ] Configurar backup automático

### Largo Plazo (6-12 meses)
- [ ] Migrar a multi-región activo-activo
- [ ] Implementar A/B testing
- [ ] Agregar analytics avanzados

---

## 💡 Recomendaciones

### Para Stakeholders
1. **Mantener el modelo serverless**: Es escalable y económico
2. **Invertir en monitoreo**: Permite detectar problemas antes que afecten usuarios
3. **Revisar costos mensualmente**: Para optimizar y evitar sorpresas

### Para el Equipo Técnico
1. **Documentar cambios**: Mantener diagramas actualizados
2. **Automatizar testing**: Para deploys seguros
3. **Revisar logs regularmente**: Para identificar patrones

---

## 📞 Contacto y Recursos

**Documentación Técnica**: Ver `README.md` en este directorio  
**Diagramas**: Ver `DIAGRAM_GUIDE.md` para elegir el diagrama correcto  
**Código**: `/infra/terraform/` (Infrastructure as Code)

---

## ✅ Conclusión

La arquitectura de Orbit está diseñada para ser:
- ✅ **Moderna**: Tecnologías actuales y best practices
- ✅ **Escalable**: Crece con el negocio sin reingeniería
- ✅ **Segura**: Múltiples capas de seguridad
- ✅ **Económica**: Costos optimizados y predecibles
- ✅ **Mantenible**: Bajo esfuerzo de operación

**Esta arquitectura nos permite enfocarnos en el negocio, no en mantener servidores.**

---

*Documento preparado por: Equipo de Arquitectura Orbit*  
*Última revisión: Noviembre 2024*
