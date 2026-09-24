V8 - Animales / Supabase

Cambios:
- Corregido el error de JavaScript `writeClient is not defined`: el panel usa el cliente Supabase autenticado `sb`.
- Se mantienen sexo obligatorio y el retiro temporal del campo tamano del INSERT.
- setup.sql incluye políticas administrativas completas para SELECT/INSERT/UPDATE/DELETE sobre public.animales.

IMPORTANTE: si el INSERT vuelve a mostrar un error RLS, ejecutar en Supabase el bloque V8 que está al final de setup.sql. Esto es necesario porque el INSERT del panel usa .select().single(), que requiere una política SELECT para el usuario autenticado.


V9 — ANIMALES PÚBLICOS DINÁMICOS
- La grilla pública #dogs carga primero animales con estado `disponible` desde Supabase.
- Los animales legacy que todavía no existen en Supabase se mantienen como respaldo para no perder contenido.
- `CONOCER` usa historia/foto/metadata del registro de Supabase cuando corresponde.
- `QUIERO ADOPTAR` queda asociado al ID del animal dinámico.
- No se modificó el diseño visual de las tarjetas.
