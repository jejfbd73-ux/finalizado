import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")!;

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

function clean(value: unknown): string {
  if (value === null || value === undefined || value === "") return "—";
  if (typeof value === "boolean") return value ? "Sí" : "No";
  return String(value);
}

function escapeHtml(value: unknown): string {
  return clean(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function labelize(key: string): string {
  const labels: Record<string,string> = {
    animal_interes: "Animal que quiere adoptar",
    animal_id: "ID del animal",
  };
  return labels[key] || key.replaceAll("_", " ");
}

const dbMap: Record<string,string> = {
  "Nombre completo": "nombre_completo",
  "Edad": "edad",
  "DNI": "dni",
  "Número de DNI": "dni",
  "Teléfono de contacto": "telefono",
  "Teléfono": "telefono",
  "Telefono": "telefono",
  "Email": "email",
  "Correo electrónico": "email",
  "Instagram o Facebook": "instagram",
  "Dirección exacta": "direccion",
  "Localidad": "localidad",
  "Provincia": "provincia",
  "Tipo de vivienda": "tipo_vivienda",
  "Profesión / ocupación": "ocupacion",
  "Profesión u ocupación": "ocupacion",
  "Personas que viven en el domicilio": "personas_en_domicilio",
  "Horas que quedaría solo": "tiempo_fuera_de_casa",
  "¿Tenés otras mascotas?": "tiene_mascotas",
  "Información sobre otras mascotas": "mascotas_detalle",
  "Veterinario de confianza": "veterinario",
  "Motivo de adopción": "motivo_adopcion",
  "Experiencia previa con animales": "experiencia_con_animales",
  "Qué harías si no pudieras continuar con la adopción": "que_pasaria_si_no_puede_continuar",
  "Aceptación de visita": "acepta_visita",
  "Aceptación del seguimiento por WhatsApp": "acepta_seguimiento",
};

function normalizeDbValue(value: string, column?: string) {
  const v = value.trim();
  if (!v) return null;

  if (["vivienda_propia", "tiene_patio", "patio_cerrado", "tiene_mascotas",
       "mascotas_vacunadas", "mascotas_castradas", "acepta_visita",
       "acepta_seguimiento"].includes(column || "")) {
    const lower = v.toLowerCase();
    if (["sí","si","true","verdadero","propia","patio","terraza","balcón","balcon",
         "sí, estoy de acuerdo","sí, estoy totalmente de acuerdo","sí, soy consciente",
         "estoy de acuerdo"].includes(lower)) return true;
    if (["no","false","falso","alquilada","no tiene","sin exterior",
         "no estoy de acuerdo","no estoy dispuesto"].includes(lower)) return false;
  }

  return v;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ ok:false, error:"Método no permitido" }), {
        status:405, headers:{...corsHeaders, "Content-Type":"application/json"}
      });
    }

    const contentType = req.headers.get("content-type") || "";
    if (!contentType.toLowerCase().includes("multipart/form-data")) {
      return new Response(JSON.stringify({ ok:false, error:"El formulario debe enviarse como multipart/form-data." }), {
        status:400, headers:{...corsHeaders, "Content-Type":"application/json"}
      });
    }

    const form = await req.formData();
    const fields = new Map<string,string>();
    const attachments: Array<{filename:string, content:string}> = [];
    let totalBytes = 0;
    const MAX_FILE = 8 * 1024 * 1024;
    const MAX_TOTAL = 20 * 1024 * 1024;

    for (const [key, value] of form.entries()) {
      if (value instanceof File) {
        if (!value.size) continue;
        if (value.size > MAX_FILE) {
          throw new Error(`El archivo "${value.name}" supera el límite de 8 MB.`);
        }
        totalBytes += value.size;
        if (totalBytes > MAX_TOTAL) {
          throw new Error("El total de archivos adjuntos supera el límite de 20 MB.");
        }
        const bytes = new Uint8Array(await value.arrayBuffer());
        let binary = "";
        const chunk = 0x8000;
        for (let i=0; i<bytes.length; i+=chunk) {
          binary += String.fromCharCode(...bytes.subarray(i, Math.min(i+chunk, bytes.length)));
        }
        attachments.push({
          filename: value.name || "archivo",
          content: btoa(binary),
        });
      } else {
        fields.set(key, value);
      }
    }

    const animalNombre = fields.get("animal_interes") || fields.get("Animal que quiere adoptar") || "No especificado";
    let animalId = fields.get("animal_id") || fields.get("Identificador interno") || null;

    // Si el frontend sólo envía el nombre, intentamos resolver el UUID.
    if (animalId && !/^[0-9a-f]{8}-[0-9a-f-]{27,36}$/i.test(animalId)) animalId = null;
    if (!animalId && animalNombre && animalNombre !== "No especificado") {
      const { data } = await supabase
        .from("animales")
        .select("id")
        .eq("nombre", animalNombre)
        .maybeSingle();
      animalId = data?.id ?? null;
    }

    const solicitud: Record<string,unknown> = {
      animal_id: animalId,
      estado: "nueva",
    };

    for (const [label, column] of Object.entries(dbMap)) {
      const value = fields.get(label);
      if (value !== undefined && column !== "vivienda_propia") {
        solicitud[column] = normalizeDbValue(value, column);
      }
    }

    // Evita perder estos campos si el formulario utiliza nombres ligeramente distintos.
    const aliases: Record<string,string[]> = {
      nombre_completo:["Nombre completo"],
      edad:["Edad"],
      dni:["DNI","Número de DNI"],
      telefono:["Teléfono de contacto","Teléfono","Telefono"],
      email:["Email","Correo electrónico"],
      instagram:["Instagram o Facebook"],
      direccion:["Dirección exacta"],
      localidad:["Localidad"],
      provincia:["Provincia"],
      tipo_vivienda:["Tipo de vivienda"],
      ocupacion:["Profesión / ocupación","Profesión u ocupación"],
      personas_en_domicilio:["Personas que viven en el domicilio"],
      tiempo_fuera_de_casa:["Horas que quedaría solo"],
      tiene_mascotas:["¿Tenés otras mascotas?"],
      mascotas_detalle:["Información sobre otras mascotas"],
      veterinario:["Veterinario de confianza"],
      motivo_adopcion:["Motivo de adopción"],
      experiencia_con_animales:["Experiencia previa con animales"],
      que_pasaria_si_no_puede_continuar:["Qué harías si no pudieras continuar con la adopción"],
      acepta_seguimiento:["Aceptación del seguimiento por WhatsApp"],
    };

    for (const [column, names] of Object.entries(aliases)) {
      if (solicitud[column] !== undefined) continue;
      const found = names.map(n=>fields.get(n)).find(v=>v !== undefined);
      if (found !== undefined) solicitud[column] = normalizeDbValue(found, column);
    }

    // Campos booleanos derivados de las respuestas del formulario.
    const permiso = fields.get("Permiso del propietario para tener mascota");
    if (permiso !== undefined) {
      solicitud.vivienda_propia = normalizeDbValue(permiso, "vivienda_propia");
    }

    const exterior = fields.get("Espacio exterior");
    if (exterior !== undefined) {
      solicitud.tiene_patio = normalizeDbValue(exterior, "tiene_patio");
    }

    const protegido = fields.get("Cómo es y cómo está protegido el espacio exterior");
    if (protegido !== undefined) {
      // El formulario describe el espacio; para el campo booleano sólo marcamos
      // como cerrado/protegido cuando la respuesta lo indica explícitamente.
      const p = protegido.toLowerCase();
      solicitud.patio_cerrado = /cerrad|segur|red|protegid/.test(p);
    }

    // El formulario actual no pregunta por separado vacunas/castración de mascotas;
    // no inventamos esos valores en la base.

    if (solicitud.edad) solicitud.edad = Number(solicitud.edad) || null;

    const { data: nuevaSolicitud, error: insertError } = await supabase
      .from("solicitudes_adopcion")
      .insert(solicitud)
      .select("id")
      .single();

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      throw new Error("No se pudo guardar la solicitud en Supabase.");
    }

    const excluded = new Set(["animal_id","animal_interes","Identificador interno","_subject"]);
    const rows = [...fields.entries()]
      .filter(([key]) => !excluded.has(key))
      .map(([key,value]) => `<tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:600;vertical-align:top">${escapeHtml(key)}</td><td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(value)}</td></tr>`)
      .join("");

    const filesHtml = attachments.length
      ? `<h3>Archivos adjuntos</h3><ul>${attachments.map(a=>`<li>${escapeHtml(a.filename)}</li>`).join("")}</ul>`
      : `<p>No se adjuntaron archivos.</p>`;

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:760px;margin:auto;color:#2b211b">
        <div style="background:#F6A922;padding:20px;border-radius:14px 14px 0 0">
          <h2 style="margin:0">🐾 Nueva solicitud de adopción</h2>
          <p style="margin:8px 0 0">Animales Ramallo</p>
        </div>
        <div style="padding:20px">
          <p><strong>Animal:</strong> ${escapeHtml(animalNombre)}</p>
          <p><strong>ID de solicitud:</strong> ${escapeHtml(nuevaSolicitud.id)}</p>
          <table style="width:100%;border-collapse:collapse">${rows}</table>
          ${filesHtml}
        </div>
      </div>`;

    const resendBody: Record<string,unknown> = {
      from: "Animales Ramallo <noreply@ongramallo.com>",
      to: ["celinita3535@gmail.com", "fedeiribarria@gmail.com"],
      subject: `🐾 Nueva solicitud de adopción — ${animalNombre}`,
      html,
    };
    if (attachments.length) resendBody.attachments = attachments;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method:"POST",
      headers:{
        "Authorization":`Bearer ${RESEND_API_KEY}`,
        "Content-Type":"application/json",
      },
      body:JSON.stringify(resendBody),
    });

    const resendData = await resendResponse.json().catch(()=>({}));
    if (!resendResponse.ok) {
      console.error("Resend error:", resendData);
      return new Response(JSON.stringify({
        ok:false,
        saved:true,
        emailSent:false,
        error:"La solicitud fue guardada, pero Resend no pudo enviar el correo.",
        id:nuevaSolicitud.id
      }), { status:502, headers:{...corsHeaders,"Content-Type":"application/json"} });
    }

    return new Response(JSON.stringify({
      ok:true,
      saved:true,
      emailSent:true,
      id:nuevaSolicitud.id
    }), { status:200, headers:{...corsHeaders,"Content-Type":"application/json"} });

  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({
      ok:false,
      error:error instanceof Error ? error.message : "Error inesperado"
    }), { status:500, headers:{...corsHeaders,"Content-Type":"application/json"} });
  }
});
