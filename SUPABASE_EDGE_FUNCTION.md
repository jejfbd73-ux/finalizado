# Conexión final del formulario

1. En Supabase > Edge Functions, crear/abrir `enviar-solicitud-adopcion`.
2. Reemplazar su código por `supabase/functions/enviar-solicitud-adopcion/index.ts`.
3. Deploy.
4. En Supabase > Project Settings > Edge Functions/Secrets, verificar que existan:
   - `RESEND_API_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `SUPABASE_URL` (normalmente disponible automáticamente)
5. No poner ninguna de esas claves en el frontend.
6. Probar desde `https://ongramallo.com`.

El frontend ya apunta a:
https://ymfnjqueeijlbngbkzue.supabase.co/functions/v1/enviar-solicitud-adopcion

DNS de Resend no requiere cambios si el dominio sigue verificado.
