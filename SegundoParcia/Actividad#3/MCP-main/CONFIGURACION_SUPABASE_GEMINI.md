# 🔧 Guía de Configuración: Supabase y Gemini AI

Esta guía te ayudará a configurar Supabase y Gemini AI para que funcionen correctamente con el sistema de microservicios.

---

## 📦 1. Configuración de Supabase

### Paso 1: Crear un Proyecto en Supabase

1. Ve a [https://supabase.com](https://supabase.com)
2. Inicia sesión o crea una cuenta
3. Haz clic en **"New Project"**
4. Completa los datos:
   - **Name**: Nombre de tu proyecto (ej: "restaurante-ms")
   - **Database Password**: Crea una contraseña segura (guárdala)
   - **Region**: Selecciona la región más cercana
5. Haz clic en **"Create new project"**
6. Espera a que se complete la configuración (2-3 minutos)

### Paso 2: Obtener las Claves de API

1. En tu proyecto de Supabase, ve a **Settings** (⚙️) en el menú lateral
2. Selecciona **API**
3. Encontrarás las siguientes claves importantes:

   **a) SUPABASE_ANON_KEY (anon public)**
   - Esta es la clave que usarás en los microservicios
   - Cópiala y guárdala de forma segura
   - Se usa para autenticación en los webhooks

   **b) SUPABASE_SERVICE_ROLE_KEY (service_role)**
   - ⚠️ **IMPORTANTE**: Esta clave tiene permisos completos
   - Solo se usa en las Edge Functions (server-side)
   - **NUNCA** la expongas en el frontend o código cliente

   **c) SUPABASE_URL**
   - URL de tu proyecto (ej: `https://xxxxx.supabase.co`)
   - También la necesitarás para las Edge Functions

### Paso 3: Crear la Tabla para Webhooks

1. Ve a **SQL Editor** en el menú lateral de Supabase
2. Crea una nueva query y ejecuta el siguiente SQL:

```sql
-- Crear tabla para almacenar eventos de webhook
CREATE TABLE IF NOT EXISTS webhook_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event VARCHAR(255) NOT NULL,
  idempotency_key VARCHAR(255) UNIQUE NOT NULL,
  payload JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índice para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_webhook_events_idempotency 
ON webhook_events(idempotency_key);

CREATE INDEX IF NOT EXISTS idx_webhook_events_event 
ON webhook_events(event);

CREATE INDEX IF NOT EXISTS idx_webhook_events_created_at 
ON webhook_events(created_at);
```

3. Haz clic en **Run** para ejecutar el SQL
4. Verifica que la tabla se creó correctamente en **Table Editor**

### Paso 4: Configurar Edge Function (webhook-event-logger)

La función Edge Function ya está creada en `supabase/functions/webhook-event-logger/`, pero necesitas desplegarla:

#### Opción A: Despliegue Local (para desarrollo)

1. Instala Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Inicia sesión:
   ```bash
   supabase login
   ```

3. Enlaza tu proyecto:
   ```bash
   cd SegundoParcial/MCP-main
   supabase link --project-ref tu-project-ref
   ```
   (El project-ref lo encuentras en Settings > API > Project URL)

4. Despliega la función:
   ```bash
   supabase functions deploy webhook-event-logger
   ```

#### Opción B: Despliegue desde el Dashboard (Recomendado)

1. Ve a **Edge Functions** en el menú lateral de Supabase
2. Haz clic en **"Create a new function"**
3. Nombre: `webhook-event-logger`
4. Copia el contenido de `supabase/functions/webhook-event-logger/index.ts`
5. Pega el código en el editor
6. Haz clic en **Deploy**

### Paso 5: Configurar Variables de Entorno en Supabase

1. Ve a **Edge Functions** > **webhook-event-logger**
2. Haz clic en **Settings** o **Manage secrets**
3. Agrega las siguientes variables de entorno:

   ```
   WEBHOOK_SECRET=super_secreto_123
   SUPABASE_URL=https://tu-proyecto.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key_aqui
   ```

   ⚠️ **IMPORTANTE**: 
   - `WEBHOOK_SECRET` debe ser el mismo que uses en `docker-compose.yml`
   - `SUPABASE_URL` es la URL de tu proyecto
   - `SUPABASE_SERVICE_ROLE_KEY` es la service_role key que obtuviste en el Paso 2

### Paso 6: Obtener la URL de la Edge Function

1. En **Edge Functions**, busca `webhook-event-logger`
2. La URL será algo como:
   ```
   https://tu-proyecto.supabase.co/functions/v1/webhook-event-logger
   ```
3. Copia esta URL y úsala en `WEBHOOK_URL` en `docker-compose.yml`

### Resumen de Variables de Supabase para tu `.env`:

```env
# En la raíz del proyecto (SegundoParcial/MCP-main/.env)
SUPABASE_ANON_KEY=tu_anon_key_aqui
```

Y en `docker-compose.yml` ya está configurado:
- `WEBHOOK_URL=https://tu-proyecto.supabase.co/functions/v1/webhook-event-logger`
- `WEBHOOK_SECRET=super_secreto_123` (debe coincidir con el de Supabase)

---

## 🤖 2. Configuración de Gemini AI

### Paso 1: Obtener API Key de Gemini

1. Ve a [Google AI Studio](https://makersuite.google.com/app/apikey)
   - O directamente: [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)

2. Inicia sesión con tu cuenta de Google

3. Haz clic en **"Get API Key"** o **"Create API Key"**

4. Si es la primera vez:
   - Selecciona o crea un proyecto de Google Cloud
   - Acepta los términos de servicio

5. Se generará tu API Key (algo como: `AIzaSyD...`)

6. ⚠️ **IMPORTANTE**: 
   - Copia la clave inmediatamente (solo se muestra una vez)
   - Guárdala de forma segura
   - No la compartas públicamente

### Paso 2: Configurar en el Proyecto

1. Crea o edita el archivo `.env` en la raíz del proyecto:
   ```bash
   cd SegundoParcial/MCP-main
   ```

2. Agrega tu API Key:
   ```env
   GEMINI_API_KEY=tu_api_key_aqui
   ```

3. El `docker-compose.yml` ya está configurado para leer esta variable:
   ```yaml
   GEMINI_API_KEY=${GEMINI_API_KEY:-tu_gemini_api_key_aqui}
   ```

### Paso 3: Verificar Configuración

1. Asegúrate de que el archivo `.env` existe en `SegundoParcial/MCP-main/`
2. Verifica que contiene:
   ```env
   SUPABASE_ANON_KEY=tu_anon_key_aqui
   GEMINI_API_KEY=tu_api_key_aqui
   ```

3. Al ejecutar `docker-compose up`, Docker leerá automáticamente estas variables

---

## ✅ 3. Verificación de Configuración

### Verificar Supabase

1. **Tabla creada**: Ve a **Table Editor** y verifica que existe `webhook_events`
2. **Edge Function desplegada**: Ve a **Edge Functions** y verifica que `webhook-event-logger` está activa
3. **Variables configuradas**: Verifica que las secrets están configuradas en la función
4. **URL correcta**: Verifica que `WEBHOOK_URL` en `docker-compose.yml` apunta a tu función

### Verificar Gemini

1. **API Key válida**: Puedes probarla con:
   ```bash
   curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=TU_API_KEY" \
     -H 'Content-Type: application/json' \
     -d '{"contents":[{"parts":[{"text":"Hola"}]}]}'
   ```

2. **Variable configurada**: Verifica que `GEMINI_API_KEY` está en tu `.env`

---

## 🔒 4. Seguridad y Buenas Prácticas

### Supabase

- ✅ **NUNCA** expongas `SUPABASE_SERVICE_ROLE_KEY` en el frontend
- ✅ Usa `SUPABASE_ANON_KEY` solo en el backend (microservicios)
- ✅ Mantén `WEBHOOK_SECRET` seguro y cámbialo regularmente
- ✅ Usa Row Level Security (RLS) en las tablas si es necesario

### Gemini

- ✅ **NUNCA** subas tu API Key a repositorios públicos
- ✅ Agrega `.env` a `.gitignore`
- ✅ Rota las API keys periódicamente
- ✅ Monitorea el uso en Google Cloud Console

---

## 🐛 5. Troubleshooting

### Error: "Missing GEMINI_API_KEY"

**Solución:**
1. Verifica que el archivo `.env` existe en la raíz del proyecto
2. Verifica que contiene `GEMINI_API_KEY=tu_key`
3. Reinicia Docker Compose: `docker-compose down && docker-compose up`

### Error: "WEBHOOK_SECRET no está definido"

**Solución:**
1. Verifica que `WEBHOOK_SECRET` está configurado en Supabase Edge Functions
2. Verifica que el mismo valor está en `docker-compose.yml`
3. Asegúrate de que coinciden exactamente

### Error: "Invalid signature" en webhooks

**Solución:**
1. Verifica que `WEBHOOK_SECRET` es el mismo en:
   - Supabase Edge Function secrets
   - `docker-compose.yml` (variable `WEBHOOK_SECRET`)
2. Verifica que la URL del webhook es correcta

### Error: "Missing SUPABASE_ANON_KEY"

**Solución:**
1. Obtén la clave desde Supabase Dashboard > Settings > API
2. Agrégalo al archivo `.env`
3. Reinicia los contenedores

### Error 429 en Gemini (Rate Limit)

**Solución:**
- El código ya incluye retry automático con backoff exponencial
- Si persiste, verifica tus límites en Google Cloud Console
- Considera usar un modelo diferente (ya está configurado `gemini-2.0-flash-lite`)

---

## 📝 6. Checklist Final

Antes de ejecutar el proyecto, verifica:

### Supabase
- [ ] Proyecto creado en Supabase
- [ ] `SUPABASE_ANON_KEY` obtenida
- [ ] `SUPABASE_SERVICE_ROLE_KEY` obtenida
- [ ] Tabla `webhook_events` creada
- [ ] Edge Function `webhook-event-logger` desplegada
- [ ] Variables de entorno configuradas en la función:
  - [ ] `WEBHOOK_SECRET`
  - [ ] `SUPABASE_URL`
  - [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] URL de la función copiada a `docker-compose.yml`

### Gemini
- [ ] API Key obtenida de Google AI Studio
- [ ] `GEMINI_API_KEY` agregada al archivo `.env`

### Proyecto
- [ ] Archivo `.env` creado en `SegundoParcial/MCP-main/`
- [ ] Variables configuradas en `.env`:
  - [ ] `SUPABASE_ANON_KEY`
  - [ ] `GEMINI_API_KEY`
- [ ] `docker-compose.yml` tiene las URLs correctas

---

## 🚀 7. Próximos Pasos

Una vez configurado todo:

1. **Levanta los servicios:**
   ```bash
   cd SegundoParcial/MCP-main
   docker-compose up --build
   ```

2. **Prueba los webhooks:**
   - Crea una reserva o un plato
   - Verifica en Supabase Table Editor que el evento se guardó en `webhook_events`

3. **Prueba Gemini:**
   ```bash
   curl -X POST http://localhost:3000/ai \
     -H "Content-Type: application/json" \
     -d '{"text": "Lista las mesas disponibles"}'
   ```

---

## 📚 Recursos Adicionales

- [Documentación de Supabase](https://supabase.com/docs)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [Google Gemini AI](https://ai.google.dev/)
- [Google AI Studio](https://aistudio.google.com/)

---

**¿Necesitas ayuda?** Revisa los logs de Docker:
```bash
docker-compose logs -f gateway
docker-compose logs -f reserva-ms
docker-compose logs -f menu-ms
```

