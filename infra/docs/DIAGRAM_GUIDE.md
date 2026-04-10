# Guía de Diagramas - ¿Cuál usar?

Esta guía te ayudará a elegir el diagrama correcto según tu necesidad.

## 🎯 Selección Rápida

| Necesito... | Usar este diagrama | Nivel de detalle |
|------------|-------------------|------------------|
| **Presentar la arquitectura a stakeholders técnicos** | `c4-component-diagram.puml` | ⭐⭐⭐⭐⭐ Alto |
| **Explicar la arquitectura a un nuevo desarrollador** | `architecture-overview.puml` | ⭐⭐⭐ Medio |
| **Documentar todos los recursos AWS desplegados** | `aws-infrastructure.puml` | ⭐⭐⭐⭐ Alto |
| **Explicar el flujo de envío de formulario** | `data-flow.puml` | ⭐⭐⭐⭐ Alto |
| **Preparar documentación para auditoría** | `c4-component-diagram.puml` + `aws-infrastructure.puml` | ⭐⭐⭐⭐⭐ Muy Alto |

---

## 📊 Descripción de Cada Diagrama

### 1️⃣ C4 Component Diagram (RECOMENDADO)
**Archivo:** `c4-component-diagram.puml`

**¿Cuándo usarlo?**
- ✅ Presentaciones a arquitectos de software
- ✅ Documentación técnica para equipos de desarrollo
- ✅ Revisiones de arquitectura
- ✅ Onboarding de nuevos arquitectos
- ✅ Documentación de decisiones de diseño

**¿Qué muestra?**
- Componentes del sistema organizados por capas
- Relaciones y dependencias entre componentes
- Tipos de componentes (Lambda, API, Storage, etc.)
- Flujos de datos principales
- Servicios externos integrados

**Ventajas:**
- Notación estándar C4 (reconocida internacionalmente)
- Balance perfecto entre detalle y claridad
- Colores por tipo de componente
- Fácil de entender para audiencias técnicas

**Audiencia:** Arquitectos, Tech Leads, Desarrolladores Senior

---

### 2️⃣ Architecture Overview
**Archivo:** `architecture-overview.puml`

**¿Cuándo usarlo?**
- ✅ Introducción rápida a la arquitectura
- ✅ Presentaciones a stakeholders no técnicos
- ✅ Documentación de alto nivel
- ✅ README del proyecto
- ✅ Explicaciones rápidas en meetings

**¿Qué muestra?**
- Vista de alto nivel de las capas del sistema
- Flujos principales de usuario
- Stack tecnológico usado
- Integraciones externas

**Ventajas:**
- Simple y fácil de entender
- No abruma con detalles
- Perfecto para primeras impresiones
- Incluye leyenda explicativa

**Audiencia:** Product Managers, Stakeholders, Nuevos desarrolladores

---

### 3️⃣ AWS Infrastructure Diagram
**Archivo:** `aws-infrastructure.puml`

**¿Cuándo usarlo?**
- ✅ Documentación de infraestructura detallada
- ✅ Troubleshooting y debugging
- ✅ Auditorías de seguridad
- ✅ Compliance y certificaciones
- ✅ Planificación de costos

**¿Qué muestra?**
- Todos los recursos AWS desplegados
- Configuraciones de seguridad (IAM, OAC, etc.)
- Configuraciones de red (DNS, certificados)
- Configuraciones de SES (DKIM, SPF, DMARC)
- Relaciones entre todos los recursos

**Ventajas:**
- Máximo nivel de detalle
- Muestra configuraciones específicas
- Útil para operaciones
- Incluye notes con configuraciones

**Audiencia:** DevOps, SRE, Ingenieros de Cloud, Auditores

---

### 4️⃣ Data Flow (Sequence Diagram)
**Archivo:** `data-flow.puml`

**¿Cuándo usarlo?**
- ✅ Debugging de flujos específicos
- ✅ Documentación de casos de uso
- ✅ Análisis de performance
- ✅ Identificación de bottlenecks
- ✅ Testing y QA

**¿Qué muestra?**
- Secuencia temporal de llamadas
- Flujo completo de envío de formulario
- Interacciones con servicios externos
- Validaciones y respuestas
- Manejo de errores

**Ventajas:**
- Vista temporal de las operaciones
- Fácil identificar orden de ejecución
- Muestra interacciones asíncronas
- Incluye casos de error

**Audiencia:** Desarrolladores, QA, Support Engineers

---

## 🎨 Comparación Visual

```
Nivel de Abstracción:

Alto    │  architecture-overview.puml
        │         ↕
Medio   │  c4-component-diagram.puml
        │         ↕
Bajo    │  aws-infrastructure.puml

Dimensión Temporal:

Estático │  c4-component-diagram.puml
         │  architecture-overview.puml
         │  aws-infrastructure.puml
         │         ↕
Dinámico │  data-flow.puml
```

---

## 💡 Casos de Uso Comunes

### Escenario 1: Onboarding de Nuevo Desarrollador
**Secuencia recomendada:**
1. Empezar con `architecture-overview.puml` (10 min)
2. Profundizar con `c4-component-diagram.puml` (20 min)
3. Revisar `data-flow.puml` para flujo principal (15 min)
4. Consultar `aws-infrastructure.puml` según necesidad

### Escenario 2: Presentación a Cliente/Stakeholder
**Usar:**
- `architecture-overview.puml` para la presentación
- `c4-component-diagram.puml` como backup para preguntas técnicas

### Escenario 3: Documentación de Auditoría
**Incluir:**
- `c4-component-diagram.puml` (arquitectura)
- `aws-infrastructure.puml` (recursos desplegados)
- README.md (contexto y decisiones)

### Escenario 4: Troubleshooting de Problema en Producción
**Usar:**
- `data-flow.puml` para entender el flujo
- `aws-infrastructure.puml` para verificar configuraciones
- CloudWatch Logs para logs reales

### Escenario 5: Planificación de Nueva Feature
**Usar:**
- `c4-component-diagram.puml` para ver dónde encaja
- `architecture-overview.puml` para impacto general

---

## 📝 Tips de Uso

### Para Presentaciones
1. **Empieza simple**: `architecture-overview.puml`
2. **Profundiza si preguntan**: `c4-component-diagram.puml`
3. **Ten los otros disponibles**: Por si necesitas más detalle

### Para Documentación
1. **README principal**: `architecture-overview.puml`
2. **Wiki/Confluence**: `c4-component-diagram.puml`
3. **Runbooks**: `aws-infrastructure.puml` + `data-flow.puml`

### Para Desarrollo
1. **Feature planning**: `c4-component-diagram.puml`
2. **Implementation**: `aws-infrastructure.puml`
3. **Testing**: `data-flow.puml`

---

## 🔄 Actualización de Diagramas

Los diagramas deben actualizarse cuando:

- ✅ Se agrega un nuevo servicio AWS
- ✅ Se modifica la arquitectura (nuevas lambdas, APIs, etc.)
- ✅ Cambian las integraciones externas
- ✅ Se modifican flujos principales
- ⚠️ NO es necesario actualizar por cambios menores en configuración

**Responsable:** Arquitecto del proyecto / Tech Lead

---

## 📞 ¿Necesitas Ayuda?

Si no estás seguro de qué diagrama usar:

1. **¿Es para explicar?** → Usa `architecture-overview.puml`
2. **¿Es para arquitectura?** → Usa `c4-component-diagram.puml`
3. **¿Es para debugging?** → Usa `data-flow.puml`
4. **¿Es para operaciones?** → Usa `aws-infrastructure.puml`

**Cuando dudes, usa `c4-component-diagram.puml` - es el más versátil.**
