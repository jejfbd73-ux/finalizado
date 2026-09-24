const SUPABASE_URL='https://ymfnjqueeijlbngbkzue.supabase.co';
const SUPABASE_KEY='sb_publishable_m0Flyr-F5ufagmxwlcGZKA_w16bhIfT';
const sb=window.supabase?.createClient(SUPABASE_URL,SUPABASE_KEY);

const legacyDogs=[
['Aaron','6 años · grande · macho','assets/images/aaron.jpg'],
['Anto','3 años · grande · hembra','assets/images/anto.jpg'],
['Bad','3 años · XXL · macho','assets/images/bad.jpg'],
['Carballito','En adopción','assets/images/carballito.jpg'],
['Choky','En adopción','assets/images/choky.jpg'],
['Coca','5 años · mediana · hembra','assets/images/coca.jpg'],
['Estrellita','En adopción','assets/images/estrellita.jpg'],
['Gal','En adopción','assets/images/gal.jpg'],
['Harper','En adopción','assets/images/harper.jpg'],
['Lisa','En adopción','assets/images/lisa.jpg'],
['Lobito','En adopción','assets/images/lobito.jpg'],
['Maya','En adopción','assets/images/maya.jpg'],
['Pancho','En adopción','assets/images/pancho.jpg'],
['Pit','En adopción','assets/images/pit.jpg'],
['Polo','En adopción','assets/images/polo.jpg'],
['Rody','En adopción','assets/images/rody.jpg'],
['Sandy','En adopción','assets/images/sandy.jpg'],
['Scooby','En adopción','assets/images/scooby.jpg'],
['Simpa','En adopción','assets/images/simpa.jpg'],
['Thor','En adopción','assets/images/thor.jpg'],
['Tuli','En adopción','assets/images/tuli.jpg']
];

const stories={
Aaron:`AARON es macho, está castrado, vacunas al día, tiene aproximadamente 6 años y es de tamaño grande.

Es muy cariñoso con las personas y se lleva bien con perras hembras.

Fue encontrado en un grave estado de abandono, con una bichera en la cabeza. Después de recibir los cuidados necesarios, logró recuperarse por completo y hoy se encuentra en excelente condiciones.`,

Anto:`Anto tiene aproximadamente 3 años, está castrada, vacunas al día y es de tamaño grande.

Es muy cariñosa, le encantan los mimos y se lleva bien con otros perros.

Fue encontrada en un baldío junto a sus bebés, que lamentablemente ya habían fallecido. Anto también estaba en un estado delicado y tuvo que luchar por su vida tras atravesar una fuerte infección.

Logró salir adelante y hoy se encuentra excelente, lista para dejar atrás su historia y encontrar una familia.`,

Bad:`BAD tiene aproximadamente 3 años, está castrado, vacunas al día y es de tamaño XXL.

Es súper juguetón, extremadamente bueno y se lleva muy bien con otros perros.

Fue encontrado en pleno invierno, durmiendo entre las hojas y con una fuerte neumonía.`,

Betún:`Betún es macho, tiene aproximadamente 3 años. Está castrado y tiene sus vacunas al día.

Fue encontrado atropellado en el medio de la calle. Después de recuperarse, hoy espera la oportunidad de encontrar una familia.`,

Carballito:`Carballito es hembra, de tamaño chico-mediano. Está castrada y tiene sus vacunas al día.

Se lleva perfecto con otros perros y es muy buena con las personas.

Era parte de una manada de perros que fue abandonada en la zona del río. Hoy está con nosotros esperando encontrar una familia.`,

Choky:`Choky es macho, está castrado y tiene sus vacunas al día.

Fue encontrado atropellado al costado de la ruta, con una lesión en su columna que le impedía caminar.

Tuvo un largo proceso de recuperación, pero hoy se encuentra excelente y está listo para encontrar una familia.`,

Coca:`COCA es hembra, está castrada, vacunas al día, tiene aproximadamente 5 años y es de tamaño mediano.

Es súper amorosa con las personas y se lleva bien tanto con hembras como con machos.

Fue encontrada junto a sus bebés en el cementerio. Todos ellos encontraron una familia, pero Coca todavía sigue esperando la suya. Ya pasaron 3 años desde su rescate.`,

Daysi:`Daysi es hembra, de tamaño mediano. Está castrada y tiene sus vacunas al día.

Es tranquila, se lleva bien con otros perros y le encanta salir a pasear.

Fue encontrada en situación de calle mientras estaba en celo. Hoy está a salvo y esperando una familia.`,

Estrellita:`Estrellita es hembra, está castrada y tiene sus vacunas al día.

Hace 2 años que espera una familia. Es una perra buenísima, aunque algo arisca al principio. Es simplemente diferente y necesita una familia que pueda entenderla y respetar sus tiempos.`,

Arepa:`Arepa es hembra y de tamaño chico. Próximamente será castrada y vacunada.

Actualmente está en recuperación. Fue encontrada en situación de calle con muchísima sarna. Es súper dócil, se lleva muy bien con otros perros y es extremadamente amorosa con las personas.`,

Harper:`Harper es hembra, de tamaño grande. Está castrada y tiene sus vacunas al día.

Es muy amorosa con las personas y se lleva bien con perros machos, pero no con hembras.

Fue encontrada en situación de calle, en celo y siendo acosada por muchísimos perros.`,

Polo:`Polo es macho, de tamaño mediano. Está castrado y tiene sus vacunas al día.

Es extremadamente amoroso y se lleva bien con otros perros, especialmente con hembras.

Fue encontrado muy flaco y con una bichera en una de sus orejas. Hoy está recuperado y esperando una familia.`,

Juana:`Juana es hembra, tiene aproximadamente 2 años. Está castrada y tiene sus vacunas al día.

Está con nosotros desde que tenía apenas 2 meses. Es una perra muy miedosa y una vez fue devuelta por este motivo. Necesita una familia con paciencia que pueda darle tiempo, seguridad y mucho amor.`,

Simpa:`Simpa es macho, está castrado y tiene sus vacunas al día. Se lleva bien con perras hembras o puede ser hijo único. Es ideal para convivir con personas adultas, no con niños.

La calle fue muy dura con él. Vivió mucho tiempo en situación de calle, desnutrido y lleno de gusanos. Lo recuperamos, conseguimos una familia para él y, tiempo después, volvió a ser abandonado.

Hoy está nuevamente con nosotros, esperando que esta vez sea para siempre.`,

Lobito:`Lobito es macho, está castrado y tiene sus vacunas al día. Se lleva bien tanto con perros como con perras.

Es una de las joyitas de la ONG y lleva 2 años esperando una familia. Llegó con nosotros siendo apenas un bebé de días y creció acá.

Todavía espera que alguien lo elija.`,

Maya:`Maya es hembra, está castrada y tiene sus vacunas al día. Es muy tranquila y amorosa, y se lleva bien únicamente con perros machos.

Fue encontrada junto a sus bebés en una casa abandonada. Hoy está recuperada y esperando una familia para ella.`,

Scooby:`Scooby es macho, está castrado y tiene sus vacunas al día. Se lleva bien tanto con perros como con perras.

Al principio le cuesta entrar en confianza, pero una vez que se siente seguro es un amor. Está con nosotros hace tiempo y necesita una familia dispuesta a respetar sus tiempos y darle la oportunidad que merece.`,

Gal:`Gal es hembra, de tamaño grande. Está castrada y tiene sus vacunas al día.

Se lleva excelente con otros perros y es muy tranquila. Ama dormir en el sillón y en la cama, pero también disfruta muchísimo salir a pasear.`,

Lisa:`Lisa es hembra, de tamaño grande. Está castrada y tiene sus vacunas al día.

Fue encontrada en situación de calle, en celo y rodeada de muchísimos perros. Hoy está a salvo y espera encontrar una familia.`,

Pancho:`Pancho es macho, está castrado y tiene sus vacunas al día.

Fue comunitario durante varios años, hasta que enfermó de moquillo y lo encontramos en muy mal estado. Pudimos recuperarlo y hoy está listo para encontrar una familia.`,

Pit:`Pit es hembra, de tamaño mediano. Está castrada y tiene sus vacunas al día.

Fue encontrada en la calle en un estado de abandono extremo, desnutrida y con sarna. Debido a las lesiones que sufrió, no controla esfínteres, pero fuera de eso lleva una vida completamente normal.

Espera una familia que pueda darle la oportunidad que merece.`,

Rody:`Rody es macho, tiene aproximadamente 1 año. Está castrado y tiene sus vacunas al día.

Es un cachorrón que fue encontrado con una bichera en una de sus patas. Pudimos recuperarlo y hoy se encuentra excelente, esperando encontrar una familia.`,

Sandy:`Sandy es hembra, de tamaño mediano. Está castrada y tiene sus vacunas al día.

Está con nosotros desde que tenía apenas 2 meses. Se lleva muy bien con otros perros y también es muy buena con las personas.

Creció con nosotros y hoy espera tener, por fin, su propia familia.`,

Thor:`Thor es macho, está castrado y tiene sus vacunas al día.

Es ideal como hijo único, aunque también puede llevarse bien con otros perros. Es muy bueno con las personas, súper activo y necesita una familia que tenga tiempo para dedicarle, jugar y compartir actividades con él.`,

Tuli:`Tuli es hembra, tiene aproximadamente 3 años y es de tamaño grande. Está castrada y tiene sus vacunas al día.

Fue encontrada en situación de calle, con tumores por todo su cuerpo. Hoy está recuperada y espera encontrar una familia.`
};

/*
  Animales públicos:
  - Los animales creados desde el panel llegan desde Supabase.
  - Los animales antiguos que todavía no fueron migrados se mantienen
    desde la lista local para que la web no pierda contenido.
*/
let dogs=[];
let dogsById=new Map();

function escapeHtml(value=''){
  return String(value)
    .replaceAll('&','&amp;')
    .replaceAll('<','&lt;')
    .replaceAll('>','&gt;')
    .replaceAll('"','&quot;')
    .replaceAll("'","&#039;");
}

function normalizeAnimal(row){
  const name=row.nombre || 'Sin nombre';
  const sex=row.sexo ? String(row.sexo).toLowerCase() : '';
  const age=row.edad_aproximada ? String(row.edad_aproximada) : '';
  const size=row.tamano ? String(row.tamano) : '';
  const metaParts=[];
  if(age) metaParts.push(age);
  if(size) metaParts.push(size);
  if(sex) metaParts.push(sex);
  const meta=metaParts.length ? metaParts.join(' · ') : 'En adopción';

  return {
    id: row.id || null,
    name,
    meta,
    img: row.foto_principal || 'assets/images/dog.png',
    story: row.historia || row.descripcion || 'Está esperando una familia responsable que le dé una segunda oportunidad.',
    estado: row.estado || 'disponible',
    source:'supabase',
    row
  };
}

function normalizeLegacy([name,meta,img]){
  return {
    id:`legacy-${name}`,
    name,
    meta,
    img,
    story:stories[name] || 'Está esperando una familia responsable que le dé una segunda oportunidad. Conocelo, completá la solicitud y el equipo de la ONG se comunicará con vos.',
    estado:'disponible',
    source:'legacy'
  };
}

async function loadPublicDogs(){
  let dbDogs=[];

  if(sb){
    try{
      const {data,error}=await sb
        .from('animales')
        .select('id,nombre,sexo,edad_aproximada,tamano,descripcion,historia,foto_principal,estado')
        .eq('estado','disponible')
        .order('creado_en',{ascending:false});

      if(!error && Array.isArray(data)){
        dbDogs=data.map(normalizeAnimal);
      }else if(error){
        console.warn('No se pudieron cargar los animales de Supabase:',error);
      }
    }catch(error){
      console.warn('Error cargando animales públicos:',error);
    }
  }

  // Los registros de Supabase reemplazan a los legacy con el mismo nombre.
  const dbNames=new Set(dbDogs.map(d=>d.name.trim().toLowerCase()));
  const legacyDogsNormalized=legacyDogs
    .map(normalizeLegacy)
    .filter(d=>!dbNames.has(d.name.trim().toLowerCase()));

  dogs=[...dbDogs,...legacyDogsNormalized];
  dogsById=new Map(dogs.map(d=>[String(d.id),d]));

  renderDogs();

  // Si hay animales nuevos en Supabase, también pueden aparecer en el hero.
  updateHeroDogs();
}

function updateHeroDogs(){
  const source=dogs.length ? dogs : legacyDogs.map(normalizeLegacy);
  heroDogs=source.map(d=>({name:d.name,meta:d.meta,img:d.img}));
  const current=Math.max(0,heroDogs.findIndex(d=>d.name.toLowerCase()==='coca'));
  heroIndex=current;
  setHeroDog(heroIndex,true);
}

let heroDogs=legacyDogs.map(normalizeLegacy).map(d=>({name:d.name,meta:d.meta,img:d.img}));
let heroIndex=Math.max(0, heroDogs.findIndex(d => d.name === 'Coca'));
let heroTimer=null;

function setHeroDog(index, initial=false){
  const card=document.querySelector('#heroCard');
  const img=document.querySelector('#heroDog');
  const name=document.querySelector('#heroDogName');
  const meta=document.querySelector('#heroDogMeta');

  if(!card || !img || !name || !meta || !heroDogs.length) return;

  const dog=heroDogs[index % heroDogs.length];

  if(!initial){
    card.classList.add('is-changing');

    window.setTimeout(()=>{
      img.src=dog.img;
      img.alt=`${dog.name}, perro en adopción`;
      name.textContent=dog.name.toUpperCase();
      meta.textContent=dog.meta;
      card.classList.remove('is-changing');
    },300);
  }else{
    img.src=dog.img;
    img.alt=`${dog.name}, perro en adopción`;
    name.textContent=dog.name.toUpperCase();
    meta.textContent=dog.meta;
  }
}

function renderDogs(){
  const el=document.querySelector('#dogs');
  if(!el) return;

  el.innerHTML=dogs.map(d=>`
    <article class="dog-card">
      <img loading="lazy" src="${escapeHtml(d.img)}" alt="${escapeHtml(d.name)}, perro en adopción" onerror="this.src='assets/images/dog.png'">
      <div class="pad">
        <h3>${escapeHtml(d.name)}</h3>
        <p>${escapeHtml(d.meta)}</p>
        <button class="mini-btn" data-dog-id="${escapeHtml(d.id)}">CONOCER →</button>
      </div>
    </article>
  `).join('');

  el.querySelectorAll('[data-dog-id]').forEach(
    b=>b.onclick=()=>openDog(b.dataset.dogId)
  );

  const count=document.querySelector('#dogCount');
  if(count) count.textContent=String(dogs.filter(d=>d.estado==='disponible').length);
}

function formatStory(text){
  const paragraphs=String(text||'').split(/\n\s*\n/).map(x=>x.trim()).filter(Boolean);
  return paragraphs.map((p,i)=>{
    const safe=escapeHtml(p);
    if(i===0) return `<p class="story-lead">${safe}</p>`;
    if(i===paragraphs.length-1) return `<p class="story-rescue">${safe}</p>`;
    return `<p>${safe}</p>`;
  }).join('');
}

function openDog(id){
  const d=dogsById.get(String(id)) || dogs.find(x=>String(x.id)===String(id));
  if(!d) return;

  document.querySelector('#dogModalContent').innerHTML=`
    <img class="modal-dog" src="${escapeHtml(d.img)}" alt="${escapeHtml(d.name)}" onerror="this.src='assets/images/dog.png'">
    <span class="eyebrow">EN ADOPCIÓN</span>
    <h2>${escapeHtml(d.name)}</h2>
    <p><b>${escapeHtml(d.meta)}</b></p>
    <div class="story-wrap"><div class="story-heading"><img src="assets/icons-formulario/perro.png" alt="" aria-hidden="true"><span>SU HISTORIA</span></div><div class="story">${formatStory(d.story)}</div></div>
    <div class="modal-actions">
      <button class="btn primary" onclick="openAdopt('${String(d.id).replace(/'/g,"\\'")}')">
        QUIERO ADOPTAR A ${escapeHtml(d.name.toUpperCase())} ❤️
      </button>
    </div>
  `;

  document.querySelector('#dogModal').showModal();
}

function openAdopt(id){
  const d=dogsById.get(String(id)) || dogs.find(x=>String(x.id)===String(id));
  if(!d) return;

  document.querySelector('#dogModal').close();
  document.querySelector('#adoptTitle').textContent=`QUIERO ADOPTAR A ${d.name.toUpperCase()}`;

  const animalId=document.querySelector('#animalId');
  const animalInterest=document.querySelector('#animalInterest');

  if(animalId) animalId.value=d.id;
  if(animalInterest) animalInterest.value=d.name;

  document.querySelector('#formMsg').textContent='';
  document.querySelector('#adoptModal').showModal();
  document.querySelector('#adoptModal').scrollTop=0;
}

async function renderCampaigns(){
  const el=document.querySelector('#campaigns');
  let rows=[];

  if(sb){
    const r=await sb
      .from('campanias_donacion')
      .select('*')
      .eq('activa',true)
      .order('creado_en',{ascending:false});

    if(!r.error) rows=r.data||[];
  }

  if(!rows.length){
    el.innerHTML=`
      <div class="campaign-empty">
        <div class="campaign-empty-icon" aria-hidden="true">🐾</div>
        <div class="campaign-empty-copy">
          <span class="eyebrow">CAMPAÑAS DE DONACIÓN</span>
          <h3>Próximamente vas a encontrar nuevas campañas</h3>
          <p>Cuando un animal necesite nuestra ayuda, publicaremos aquí la campaña para que puedas acompañar su rescate.</p>
        </div>
      </div>
    `;
    return;
  }

  el.innerHTML=rows.map(c=>{
    const pct=Math.min(
      100,
      Math.round(
        (Number(c.recaudado)/
        Math.max(1,Number(c.objetivo)))*100
      )
    );

    return `
      <article class="campaign">

        <div class="campaign-top">

          <div class="campaign-title-wrap">

            <img
              class="campaign-active-logo"
              src="assets/images/dogg.png"
              alt="Campaña activa"
              aria-hidden="true"
            >

            <div>
              <span class="eyebrow">CAMPAÑA ACTIVA</span>
              <h3>${c.titulo}</h3>
            </div>

          </div>

          <b class="campaign-percent">${pct}%</b>

        </div>

        <p class="small">${c.descripcion||''}</p>

        <div class="progress">
          <span style="width:${pct}%"></span>
        </div>

        <div class="campaign-total">
          <b>
            $${Number(c.recaudado).toLocaleString('es-AR')}
            /
            $${Number(c.objetivo).toLocaleString('es-AR')}
          </b>

          <span>recaudado</span>
        </div>

      </article>
    `;
  }).join('');
}

const mp={
  mensual:'https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c938084806ff3b701806ffba6f40001',

  100000:'https://www.mercadopago.com.ar/checkout/v1/payment/redirect/5d620248-b247-41b9-87af-e25c0c67e3a4/payment-option-form-v2/?p=185938ee32ba8056ca464ba62d3ff88d&preference-id=529159148-fb4f69e1-91c4-4134-9568-99d370de8f5f&router-request-id=324064f7-607d-4bbd-b2d8-86e9df65cf1c&source=link',

  50000:'https://www.mercadopago.com.ar/checkout/v1/payment/redirect/39c7ad4a-2226-4afe-95a0-a588981fbc03/payment-option-form-v2/?p=185938ee32ba8056ca464ba62d3ff88d&preference-id=529159148-7c6a8d4d-d4c4-4630-9e39-abc182e634d5&router-request-id=482632a9-7909-4631-be87-bf89855a904e&source=link',

  10000:'https://mpago.la/2ipb2a3',
  5000:'https://mpago.la/2Y41ryF',
  2000:'https://mpago.la/1F1Mvhu',
  1000:'https://mpago.la/2jGANSg',

  500:'https://www.mercadopago.com.ar/checkout/v1/payment/redirect/44ccbb95-fd5a-4ce9-9929-7038b445291a/payment-option-form-v2/?p=185938ee32ba8056ca464ba62d3ff88d&preference-id=529159148-51c3b5d2-0291-4e27-9436-02a0fc82a77b&router-request-id=0bd92ea1-6a13-495e-a009-90cdfb6906cf&source=link',

  other:'https://link.mercadopago.com.ar/donarotromonto'
};

function renderMP(){
  const vals=[500,1000,2000,5000,10000,50000,100000];
  const coin='assets/images/monedas.png';

  document.querySelector('#mpButtons').innerHTML=

    vals.map(v=>`
      <a
        class="amount-btn"
        target="_blank"
        rel="noopener"
        href="${mp[v]}"
      >
        <img
          src="${coin}"
          alt=""
          aria-hidden="true"
        >
        <span>$${v.toLocaleString('es-AR')}</span>
      </a>
    `).join('')

    +

    `<a
      class="amount-btn amount-special"
      target="_blank"
      rel="noopener"
      href="${mp.other}"
    >
      <img
        src="${coin}"
        alt=""
        aria-hidden="true"
      >
      <span>Otro monto</span>
    </a>`

    +

    `<a
      class="amount-btn amount-monthly"
      target="_blank"
      rel="noopener"
      href="${mp.mensual}"
    >
      <img
        src="${coin}"
        alt=""
        aria-hidden="true"
      >
      <span>Donar todos los meses</span>
    </a>`;
}

async function copyAlias(){
  const alias='ongramallo';
  const label=document.querySelector('#copyAliasText');
  if(!label) return;

  try{
    if(navigator.clipboard && window.isSecureContext){
      await navigator.clipboard.writeText(alias);
    }else{
      const input=document.createElement('input');
      input.value=alias;
      input.setAttribute('readonly','');
      input.style.position='fixed';
      input.style.opacity='0';
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      input.remove();
    }

    label.textContent='✓ COPIADO';
    setTimeout(()=>{
      label.textContent='TOCÁ PARA COPIAR';
    },2000);
  }catch(error){
    label.textContent='Alias: ongramallo';
    setTimeout(()=>{
      label.textContent='TOCÁ PARA COPIAR';
    },2500);
  }
}

const copyAliasButton=document.querySelector('#copyAliasButton');
if(copyAliasButton){
  copyAliasButton.addEventListener('click',copyAlias);
}

document
  .querySelectorAll('[data-close]')
  .forEach(
    b=>b.onclick=()=>b.closest('dialog').close()
  );



/* FORMULARIO DE ADOPCIÓN — experiencia interactiva */
const adoptForm = document.querySelector('#adoptForm');
const adoptSteps = [...document.querySelectorAll('.adopt-step')];
const adoptPrev = document.querySelector('#adoptPrev');
const adoptNext = document.querySelector('#adoptNext');
const adoptSubmit = document.querySelector('#adoptSubmit');
const adoptProgressBar = document.querySelector('#adoptProgressBar');
const adoptStepLabel = document.querySelector('#adoptStepLabel');
const adoptProgressPct = document.querySelector('#adoptProgressPct');
let adoptCurrentStep = 0;

function updateAdoptStep(index){
  adoptCurrentStep = Math.max(0, Math.min(index, adoptSteps.length - 1));
  adoptSteps.forEach((step,i)=>step.classList.toggle('active',i===adoptCurrentStep));
  const pct=Math.round(((adoptCurrentStep+1)/adoptSteps.length)*100);
  if(adoptProgressBar) adoptProgressBar.style.width=`${pct}%`;
  if(adoptStepLabel) adoptStepLabel.textContent=`Paso ${adoptCurrentStep+1} de ${adoptSteps.length}`;
  if(adoptProgressPct) adoptProgressPct.textContent=`${pct}%`;
  if(adoptPrev) adoptPrev.classList.toggle('hidden',adoptCurrentStep===0);
  if(adoptNext) adoptNext.classList.toggle('hidden',adoptCurrentStep===adoptSteps.length-1);
  if(adoptSubmit) adoptSubmit.classList.toggle('hidden',adoptCurrentStep!==adoptSteps.length-1);
  const wrap=document.querySelector('.adopt-wrap');
  if(wrap) wrap.scrollTo({top:0,behavior:'smooth'});
}

function validateAdoptStep(){
  const step=adoptSteps[adoptCurrentStep];
  if(!step) return true;
  const fields=[...step.querySelectorAll('input,select,textarea')].filter(el=>!el.disabled && el.type!=='hidden');
  const names=[...new Set(fields.filter(el=>el.required && el.type==='radio').map(el=>el.name))];
  let firstInvalid=null;
  for(const el of fields){
    if(el.type==='radio') continue;
    if(el.required && !String(el.value||'').trim()){ firstInvalid=firstInvalid||el; }
  }
  for(const name of names){
    if(!fields.some(el=>el.name===name && el.checked)){ firstInvalid=firstInvalid||fields.find(el=>el.name===name); }
  }
  if(firstInvalid){
    firstInvalid.closest('label,.question-card,.commitment-card,.upload-box')?.classList.add('field-error');
    firstInvalid.focus({preventScroll:true});
    const msg=document.querySelector('#formMsg');
    if(msg){msg.className='form-msg error';msg.textContent='Completá la información marcada antes de continuar.';}
    return false;
  }
  document.querySelectorAll('.field-error').forEach(el=>el.classList.remove('field-error'));
  const msg=document.querySelector('#formMsg');
  if(msg){msg.textContent='';msg.className='form-msg';}
  return true;
}

if(adoptNext) adoptNext.addEventListener('click',()=>{if(validateAdoptStep()) updateAdoptStep(adoptCurrentStep+1);});
if(adoptPrev) adoptPrev.addEventListener('click',()=>updateAdoptStep(adoptCurrentStep-1));

const rentRadios=[...document.querySelectorAll('input[name="Tipo de vivienda"]')];
const rentBox=document.querySelector('#rentBox');
const rentSelect=rentBox?.querySelector('select');
function syncRent(){
  const value=rentRadios.find(r=>r.checked)?.value;
  const show=value==='Alquilada';
  rentBox?.classList.toggle('hidden',!show);
  if(rentSelect){rentSelect.required=show;if(!show)rentSelect.value='';}
}
rentRadios.forEach(r=>r.addEventListener('change',syncRent));

const petRadios=[...document.querySelectorAll('input[name="¿Tenés otras mascotas?"]')];
const petsBox=document.querySelector('#petsBox');
const petsDetail=petsBox?.querySelector('textarea[name="Información sobre otras mascotas"]');
function syncPets(){
  const show=petRadios.find(r=>r.checked)?.value==='Sí';
  petsBox?.classList.toggle('hidden',!show);
  if(petsDetail) petsDetail.required=show;
}
petRadios.forEach(r=>r.addEventListener('change',syncPets));

const castrationRadios=[...document.querySelectorAll('input[name="Compromiso de castración"]')];
const castrationMotivo=document.querySelector('#castracionMotivo');
const castrationTextarea=castrationMotivo?.querySelector('textarea');
function syncCastration(){
  const show=castrationRadios.find(r=>r.checked)?.value==='No estoy de acuerdo';
  castrationMotivo?.classList.toggle('hidden',!show);
  if(castrationTextarea) castrationTextarea.required=show;
}
castrationRadios.forEach(r=>r.addEventListener('change',syncCastration));

function resetAdoptionExperience(){
  if(!adoptForm) return;
  adoptForm.reset();
  document.querySelectorAll('.hidden').forEach(el=>{});
  syncRent();syncPets();syncCastration();
  updateAdoptStep(0);
  const msg=document.querySelector('#formMsg');
  if(msg){msg.textContent='';msg.className='form-msg';}
}

function hydrateSelectedAnimal(d){
  const title=document.querySelector('#adoptTitle');
  const id=document.querySelector('#animalId');
  const interest=document.querySelector('#animalInterest');
  const image=document.querySelector('#selectedAnimalImg');
  const name=document.querySelector('#selectedAnimalName');
  const meta=document.querySelector('#selectedAnimalMeta');
  if(title) title.textContent=`QUIERO ADOPTAR A ${d.name.toUpperCase()}`;
  if(id) id.value=d.id;
  if(interest) interest.value=d.name;
  if(image){image.src=d.img||'assets/images/dog.png';image.alt=d.name;image.onerror=()=>{image.src='assets/images/dog.png';};}
  if(name) name.textContent=d.name.toUpperCase();
  if(meta) meta.textContent=d.meta||'Animal en adopción';
}

/* Reemplaza la apertura anterior para iniciar siempre desde el paso 1. */
const originalOpenAdopt=openAdopt;
openAdopt=function(id){
  const d=dogsById.get(String(id)) || dogs.find(x=>String(x.id)===String(id));
  if(!d) return;
  document.querySelector('#dogModal')?.close();
  resetAdoptionExperience();
  hydrateSelectedAnimal(d);
  document.querySelector('#adoptModal')?.showModal();
  updateAdoptStep(0);
};

const adoptionEmailLabels={
  'Animal que quiere adoptar':'01 · ADOPCIÓN — Animal que quiere adoptar',
  'Nombre completo':'02 · DATOS DEL POSTULANTE — Nombre completo',
  'Edad':'03 · DATOS DEL POSTULANTE — Edad',
  'Dirección exacta':'04 · DATOS DEL POSTULANTE — Dirección exacta',
  'Profesión u ocupación':'05 · DATOS DEL POSTULANTE — Profesión u ocupación',
  'Teléfono de contacto':'06 · DATOS DEL POSTULANTE — Teléfono de contacto',
  '¿La adopción es para quién?':'07 · ADOPCIÓN — ¿La adopción es para quién?',
  'Función del animal en el hogar':'08 · ADOPCIÓN — Función del animal en el hogar',
  'Qué buscás en el animal':'09 · ADOPCIÓN — Qué buscás en el animal',
  'Si este animal es adoptado, ¿aceptarías otro?':'10 · ADOPCIÓN — Si este animal es adoptado, ¿aceptarías otro?',
  'Tipo de vivienda':'11 · HOGAR — Tipo de vivienda',
  'Permiso del propietario para tener mascota':'12 · HOGAR — Permiso del propietario para tener mascota',
  'Espacio exterior':'13 · HOGAR — Espacio exterior',
  'Cómo es y cómo está protegido el espacio exterior':'14 · HOGAR — Cómo es y cómo está protegido el espacio exterior',
  'Foto del patio o casa':'15 · HOGAR — Foto del patio o casa',
  'Horas que quedaría solo':'16 · CONVIVENCIA — Horas que quedaría solo',
  'Quién lo cuidaría durante vacaciones':'17 · CONVIVENCIA — Quién lo cuidaría durante vacaciones',
  'Dónde estaría de día y dónde dormiría':'18 · CONVIVENCIA — Dónde estaría de día y dónde dormiría',
  'Personas que viven en el domicilio':'19 · CONVIVENCIA — Personas que viven en el domicilio',
  '¿Tenés otras mascotas?':'20 · MASCOTAS — ¿Tenés otras mascotas?',
  'Información sobre otras mascotas':'21 · MASCOTAS — Información sobre otras mascotas',
  'Veterinario de confianza':'22 · MASCOTAS — Veterinario de confianza',
  'Fotos de otras mascotas':'23 · MASCOTAS — Fotos de otras mascotas',
  '¿Todos están de acuerdo con la adopción?':'24 · RESPONSABILIDAD — ¿Todos están de acuerdo con la adopción?',
  'Recursos económicos para mantenerlo y atenderlo':'25 · RESPONSABILIDAD — Recursos económicos para mantenerlo y atenderlo',
  'Compromiso de castración':'26 · RESPONSABILIDAD — Compromiso de castración',
  'Motivo si no acepta la castración':'27 · RESPONSABILIDAD — Motivo si no acepta la castración',
  '¿Entendés el período de adaptación?':'28 · RESPONSABILIDAD — ¿Entendés el período de adaptación?',
  'Qué harías ante problemas de comportamiento':'29 · RESPONSABILIDAD — Qué harías ante problemas de comportamiento',
  'Qué harías si te mudás':'30 · RESPONSABILIDAD — Qué harías si te mudás',
  'Compromiso de devolución a la ONG':'31 · COMPROMISOS — Compromiso de devolución a la ONG',
  'Compromiso de no dejarlo en la calle':'32 · COMPROMISOS — Compromiso de no dejarlo en la calle',
  'Aceptación del seguimiento por WhatsApp':'33 · COMPROMISOS — Aceptación del seguimiento por WhatsApp',
  'Conciencia de que la adopción es para toda la vida':'34 · COMPROMISOS — Conciencia de que la adopción es para toda la vida',
  'Instagram o Facebook':'35 · CONTACTO — Instagram o Facebook'
};
function buildReadableAdoptionData(source){
  const out=new FormData();
  for(const [key,value] of source.entries()){
    if(key==='_next' || key==='_url' || key==='Identificador interno' || key==='cf-turnstile-response') continue;
    if(key==='_template'){ out.append('_template','basic'); continue; }
    if(key==='_captcha'){ out.append('_captcha','false'); continue; }
    const label=adoptionEmailLabels[key] || key;
    out.append(label,value);
  }
  const selectedAnimal=(document.querySelector('#animalInterest')?.value || 'Animal en adopción').trim();
  out.set('_subject',`🐾 Nueva solicitud de adopción — ${selectedAnimal}`);
  return out;
}

function showAdoptionSuccess(){
  const success=document.querySelector('#adoptSuccess');
  const form=document.querySelector('#adoptForm');
  const selected=document.querySelector('#selectedAnimalCard');
  const progress=document.querySelector('.adopt-progress');
  if(success) success.hidden=false;
  if(form) form.style.visibility='hidden';
  if(selected) selected.style.visibility='hidden';
  if(progress) progress.style.visibility='hidden';
  // Mostrar el mensaje durante 2 segundos y volver automáticamente al inicio.
  window.setTimeout(()=>{
    window.location.assign(window.location.origin + '/');
  },2000);
}

const adoptSuccessClose=document.querySelector('#adoptSuccessClose');
adoptSuccessClose?.addEventListener('click',()=>{
  const modal=document.querySelector('#adoptModal');
  const success=document.querySelector('#adoptSuccess');
  const form=document.querySelector('#adoptForm');
  const selected=document.querySelector('#selectedAnimalCard');
  const progress=document.querySelector('.adopt-progress');
  if(success) success.hidden=true;
  if(form){form.style.visibility='';form.reset();}
  if(selected) selected.style.visibility='';
  if(progress) progress.style.visibility='';
  if(typeof window.turnstile!=='undefined'){try{window.turnstile.reset();}catch(_){} }
  modal?.close();
  window.scrollTo({top:0,behavior:'smooth'});
});

// En móvil, mantenemos siempre visible el campo que recibe el foco cuando aparece el teclado.
// Se limita al formulario de adopción para no alterar el resto del sitio.
if(adoptForm){
  const adoptScrollWrap=document.querySelector('.adopt-wrap');
  let adoptKeyboardTimer=null;

  const keepAdoptFieldVisible=(target)=>{
    if(!target || !adoptScrollWrap) return;
    if(!window.matchMedia('(max-width: 650px)').matches) return;
    window.clearTimeout(adoptKeyboardTimer);
    adoptKeyboardTimer=window.setTimeout(()=>{
      const rect=target.getBoundingClientRect();
      const viewportHeight=window.visualViewport?.height || window.innerHeight;
      const safeBottom=window.visualViewport ? Math.max(18, window.innerHeight - (window.visualViewport.offsetTop + viewportHeight)) : 18;
      const topLimit=80;
      const bottomLimit=viewportHeight - 105 - safeBottom;

      if(rect.bottom > bottomLimit || rect.top < topLimit){
        target.scrollIntoView({behavior:'smooth',block:'center',inline:'nearest'});
      }
    },220);
  };

  adoptForm.addEventListener('focusin',(e)=>keepAdoptFieldVisible(e.target));

  if(window.visualViewport){
    window.visualViewport.addEventListener('resize',()=>{
      const active=document.activeElement;
      if(active && adoptForm.contains(active)) keepAdoptFieldVisible(active);
    });
  }

  adoptForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    if(!validateAdoptStep()) return;
    const age=Number(document.querySelector('#age')?.value||0);
    if(age<22){
      const msg=document.querySelector('#formMsg');
      if(msg){msg.className='form-msg error';msg.textContent='Para completar la solicitud necesitás tener 22 años o más.';}
      document.querySelector('#age')?.focus();
      return;
    }
    const noOptions=['No estoy de acuerdo','No'];
    const blocked=['Compromiso de devolución a la ONG','Compromiso de no dejarlo en la calle','Aceptación del seguimiento por WhatsApp','Conciencia de que la adopción es para toda la vida'];
    const rejected=blocked.some(name=>{
      const el=document.querySelector(`input[name="${name}"]:checked`);
      return el && noOptions.includes(el.value);
    });
    if(rejected){
      const msg=document.querySelector('#formMsg');
      if(msg){msg.className='form-msg error';msg.textContent='Para avanzar con la adopción necesitamos que aceptes los compromisos indicados.';}
      return;
    }

    const submit=document.querySelector('#adoptSubmit');
    const msg=document.querySelector('#formMsg');
    if(submit){submit.disabled=true;submit.textContent='Enviando…';}
    if(msg){msg.className='form-msg';msg.textContent='Enviando solicitud…';}

    // Envío seguro mediante Supabase Edge Function + Resend.
    // El formulario se envía como multipart/form-data para conservar todos
    // los campos y las fotos adjuntas.
    try{
      const EDGE_FUNCTION_URL='https://ymfnjqueeijlbngbkzue.supabase.co/functions/v1/enviar-solicitud-adopcion';
      const formData=new FormData(adoptForm);
      formData.delete('_next');
      formData.delete('_url');
      formData.delete('_template');
      formData.delete('_captcha');
      formData.delete('_honey');
      formData.delete('cf-turnstile-response');

      const selectedAnimal=(document.querySelector('#animalInterest')?.value || 'Animal en adopción').trim();
      formData.set('animal_interes', selectedAnimal);
      const animalId=document.querySelector('#animalId')?.value?.trim();
      if(animalId) formData.set('animal_id', animalId);

      const response=await fetch(EDGE_FUNCTION_URL,{
        method:'POST',
        body:formData
      });
      const result=await response.json().catch(()=>({}));
      if(!response.ok || !result.ok){
        throw new Error(result.error || 'La solicitud no pudo enviarse.');
      }

      if(msg){
        msg.className='form-msg success';
        msg.textContent='Solicitud enviada correctamente.';
      }
      showAdoptionSuccess();
    }catch(err){
      console.error('Error enviando adopción:',err);
      if(msg){
        msg.className='form-msg error';
        msg.textContent='No se pudo enviar la solicitud. Intentá nuevamente.';
      }
      if(submit){submit.disabled=false;submit.textContent='Enviar solicitud ❤️';}
    }
  });
}

updateAdoptStep(0);


loadPublicDogs();
renderMP();
renderCampaigns();

const menuBtn=document.querySelector('#menuBtn');
const mobileMenu=document.querySelector('#mobileMenu');
const menuOverlay=document.querySelector('#menuOverlay');
const menuClose=document.querySelector('#menuClose');

function closeMobileMenu(){
  if(!menuBtn || !mobileMenu) return;
  mobileMenu.classList.remove('open');
  if(menuOverlay) menuOverlay.classList.remove('open');
  mobileMenu.setAttribute('aria-hidden','true');
  if(menuOverlay) menuOverlay.setAttribute('aria-hidden','true');
  menuBtn.setAttribute('aria-expanded','false');
  menuBtn.setAttribute('aria-label','Abrir menú');
  const icon = menuBtn.querySelector('img');
  if(icon) icon.alt='';
  document.body.classList.remove('menu-is-open');
}

function openMobileMenu(){
  if(!menuBtn || !mobileMenu) return;
  mobileMenu.classList.add('open');
  if(menuOverlay) menuOverlay.classList.add('open');
  mobileMenu.setAttribute('aria-hidden','false');
  if(menuOverlay) menuOverlay.setAttribute('aria-hidden','false');
  menuBtn.setAttribute('aria-expanded','true');
  menuBtn.setAttribute('aria-label','Cerrar menú');
  const icon = menuBtn.querySelector('img');
  if(icon) icon.alt='';
  document.body.classList.add('menu-is-open');
}

if(menuBtn && mobileMenu){
  menuBtn.addEventListener('click',()=>{
    if(mobileMenu.classList.contains('open')) closeMobileMenu();
    else openMobileMenu();
  });

  menuClose?.addEventListener('click',closeMobileMenu);
  menuOverlay?.addEventListener('click',closeMobileMenu);

  mobileMenu.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click',closeMobileMenu);
  });

  document.addEventListener('keydown',e=>{
    if(e.key==='Escape' && mobileMenu.classList.contains('open')) closeMobileMenu();
  });
}

/* =========================================================
   HERO — reproducir solamente mientras el hero es visible
========================================================= */
function stopHeroCarousel(){
  if(heroTimer !== null){
    window.clearInterval(heroTimer);
    heroTimer=null;
  }
}

function startHeroCarousel(){
  if(heroTimer !== null) return;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  heroTimer=window.setInterval(()=>{
    heroIndex=(heroIndex+1)%Math.max(1,heroDogs.length);
    setHeroDog(heroIndex);
  },1400);
}

const heroSection=document.querySelector('.hero');
if(heroSection){
  const heroVisibilityObserver=new IntersectionObserver(entries=>{
    const entry=entries[0];
    if(entry.isIntersecting && entry.intersectionRatio>=0.25){
      startHeroCarousel();
    }else{
      stopHeroCarousel();
    }
  },{threshold:[0,0.25,0.5]});

  heroVisibilityObserver.observe(heroSection);
}

