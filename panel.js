const SUPABASE_URL = "https://ymfnjqueeijlbngbkzue.supabase.co";
const SUPABASE_KEY = "sb_publishable_m0Flyr-F5ufagmxwlcGZKA_w16bhIfT";

const sb = window.supabase?.createClient(
  SUPABASE_URL,
  SUPABASE_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false
    }
  }
);

document.addEventListener("DOMContentLoaded", async () => {

  /* ========================================================
     TECLADO MÓVIL — evita que el teclado tape el campo activo
     ======================================================== */
  const mobileKeyboard = {
    focusedField: null,
    timer: null,
    lastHeight: 0,
    raf: 0
  };

  const isEditableField = (el) => {
    if (!el || !(el instanceof HTMLElement)) return false;
    const tag = el.tagName;
    return (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") && !el.disabled;
  };

  const keyboardLikelyOpen = () => {
    const vv = window.visualViewport;
    if (!vv) return false;
    return (window.innerHeight - vv.height) > 120 || vv.offsetTop > 20;
  };

  const keepFocusedFieldVisible = () => {
    const field = mobileKeyboard.focusedField;
    if (!isEditableField(field)) return;

    cancelAnimationFrame(mobileKeyboard.raf);
    mobileKeyboard.raf = requestAnimationFrame(() => {
      const vv = window.visualViewport;
      const rect = field.getBoundingClientRect();
      const topSafe = (vv?.offsetTop || 0) + 24;
      const bottomSafe = (vv?.offsetTop || 0) + (vv?.height || window.innerHeight) - 34;

      if (rect.top < topSafe || rect.bottom > bottomSafe) {
        field.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
      }
    });
  };

  const updateKeyboardState = () => {
    const open = keyboardLikelyOpen();
    document.body.classList.toggle("keyboard-open", open);
    document.documentElement.classList.toggle("keyboard-open", open);
    if (open) keepFocusedFieldVisible();
  };

  document.addEventListener("focusin", (event) => {
    if (!isEditableField(event.target)) return;
    mobileKeyboard.focusedField = event.target;
    clearTimeout(mobileKeyboard.timer);
    // Esperamos a que Android/iOS termine de abrir el teclado antes de desplazar.
    mobileKeyboard.timer = setTimeout(() => {
      updateKeyboardState();
      keepFocusedFieldVisible();
    }, 280);
  }, true);

  document.addEventListener("focusout", () => {
    clearTimeout(mobileKeyboard.timer);
    mobileKeyboard.timer = setTimeout(updateKeyboardState, 220);
  }, true);

  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", updateKeyboardState);
    window.visualViewport.addEventListener("scroll", keepFocusedFieldVisible);
  }

  window.addEventListener("resize", updateKeyboardState);




  const navItems = document.querySelectorAll(".nav-item");
  const quickActions = document.querySelectorAll("[data-section]");
  const sections = document.querySelectorAll(".page-section");

  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("mobileOverlay");

  const openSidebarButton = document.getElementById("openSidebar");
  const closeSidebarButton = document.getElementById("closeSidebar");

  const breadcrumbCurrent = document.getElementById("breadcrumbCurrent");

  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toastMessage");


  /*
  ==========================================
  NAVEGACIÓN
  ==========================================
  */

  const sectionNames = {
    inicio: "Inicio",
    animales: "Animales",
    solicitudes: "Solicitudes",
    donaciones: "Donaciones",
    contenido: "Contenido",
    multimedia: "Multimedia",
    configuracion: "Configuración"
  };


  function showSection(sectionName) {

    sections.forEach(section => {
      section.classList.remove("active-section");
    });

    const target = document.getElementById(`section-${sectionName}`);

    if (target) {
      target.classList.add("active-section");
    }


    navItems.forEach(item => {

      if (item.dataset.section === sectionName) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }

    });


    breadcrumbCurrent.textContent =
      sectionNames[sectionName] || "Inicio";


    closeMobileMenu();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }


  /*
  ==========================================
  BOTONES DE NAVEGACIÓN
  ==========================================
  */

  navItems.forEach(item => {

    item.addEventListener("click", () => {

      const sectionName = item.dataset.section;

      showSection(sectionName);

    });

  });


  quickActions.forEach(item => {

    item.addEventListener("click", () => {

      const sectionName = item.dataset.section;

      if (sectionName) {
        showSection(sectionName);
      }

    });

  });


  /*
  ==========================================
  MENÚ MOBILE
  ==========================================
  */

  function openMobileMenu() {

    sidebar.classList.add("open");
    overlay.classList.add("show");

    document.body.style.overflow = "hidden";

  }


  function closeMobileMenu() {

    sidebar.classList.remove("open");
    overlay.classList.remove("show");

    document.body.style.overflow = "";

  }


  openSidebarButton.addEventListener("click", openMobileMenu);

  closeSidebarButton.addEventListener("click", closeMobileMenu);

  overlay.addEventListener("click", closeMobileMenu);


  /*
  ==========================================
  ESC PARA CERRAR
  ==========================================
  */

  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
      closeMobileMenu();
    }

  });


  /*
  ==========================================
  TOAST
  ==========================================
  */

  let toastTimer;


  function showToast(message) {

    toastMessage.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

      toast.classList.remove("show");

    }, 2800);

  }


  /*
  ==========================================
  NOTIFICACIONES
  ==========================================
  */

  const notificationButton =
    document.querySelector(".notification-button");


  if (notificationButton) {

    notificationButton.addEventListener("click", () => {

      showToast("Tenés 4 solicitudes nuevas");

    });

  }


  /*
  ==========================================
  VER TODO
  ==========================================
  */

  const textButton =
    document.querySelector(".text-button");


  if (textButton) {

    textButton.addEventListener("click", () => {

      showToast("El historial completo estará disponible próximamente");

    });

  }


  /*
  ==========================================
  DETECTAR CAMBIO DE TAMAÑO
  ==========================================
  */

  window.addEventListener("resize", () => {

    if (window.innerWidth > 800) {
      closeMobileMenu();
    }

  });


  /*
  ==========================================
  INICIO
  ==========================================
  */
const mobileNavItems =
  document.querySelectorAll(".mobile-nav-item[data-section]");

mobileNavItems.forEach(item => {

  item.addEventListener("click", () => {

    const sectionName = item.dataset.section;

    mobileNavItems.forEach(nav => {
      nav.classList.remove("active");
    });

    item.classList.add("active");

    showSection(sectionName);

  });

});


const mobileMoreButton =
  document.getElementById("mobileMoreButton");

if (mobileMoreButton) {

  mobileMoreButton.addEventListener("click", () => {
    openMobileMenu();
  });

}


  /*
  ==========================================
  AUTENTICACIÓN DEL PANEL
  ==========================================
  */

  async function requireSession() {

    if (!sb) {
      showToast("No se pudo cargar la conexión con Supabase");
      return false;
    }

    const { data, error } = await sb.auth.getSession();

    if (error || !data?.session) {
      window.location.replace("admin.html");
      return false;
    }

    return true;
  }


  /*
  ==========================================
  ANIMALES - DATOS REALES
  ==========================================
  */

  const animalGrid =
    document.getElementById("animalsGrid");

  const filterButtons =
    document.querySelectorAll(".filter-button");

  const animalSearch =
    document.getElementById("animalSearch");

  const animalsCount =
    document.getElementById("animalsCount");

  const animalSort =
    document.getElementById("animalSort");

  let animalsData = [];

  let currentAnimalFilter = "todos";

  let animalSortAsc = true;


  function getAnimalCategory(animal) {

    const estado =
      String(animal.estado || "").toLowerCase();

    if (estado === "disponible") {
      return "adopcion";
    }

    if (estado === "adoptado") {
      return "adoptado";
    }

    return "tratamiento";
  }


  function getAnimalStatusLabel(animal) {

    const estado =
      String(animal.estado || "").toLowerCase();

    if (estado === "disponible") {
      return "En adopción";
    }

    if (estado === "adoptado") {
      return "Adoptado";
    }

    return "En proceso";
  }


  function getAnimalStatusClass(animal) {

    return getAnimalCategory(animal) === "adopcion"
      ? "adoption"
      : "treatment";

  }


  function escapeHtml(value) {

    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  }


  function getAnimalPhoto(animal) {

    if (animal.foto_principal) {
      return animal.foto_principal;
    }

    const photo =
      (animal._photos || [])
        .slice()
        .sort((a, b) =>
          Number(a.orden || 0) - Number(b.orden || 0)
        )[0];

    return photo?.url || "";

  }


  function renderAnimals() {

    if (!animalGrid) return;

    const search =
      animalSearch?.value.toLowerCase().trim() || "";

    let visibleAnimals =
      animalsData.filter(animal => {

        const name =
          String(animal.nombre || "").toLowerCase();

        const category =
          getAnimalCategory(animal);

        const matchesSearch =
          name.includes(search);

        const matchesFilter =
          currentAnimalFilter === "todos" ||
          category === currentAnimalFilter;

        return matchesSearch && matchesFilter;

      });


    visibleAnimals.sort((a, b) => {

      const nameA =
        String(a.nombre || "").toLowerCase();

      const nameB =
        String(b.nombre || "").toLowerCase();

      return animalSortAsc
        ? nameA.localeCompare(nameB, "es")
        : nameB.localeCompare(nameA, "es");

    });


    if (animalsCount) {
      animalsCount.textContent = visibleAnimals.length;
    }


    if (!visibleAnimals.length) {

      animalGrid.innerHTML = `
        <div class="empty-development-card" style="grid-column:1/-1;min-height:220px">
          <div class="development-icon">🐾</div>
          <h2>No encontramos animales</h2>
          <p>
            Probá con otro nombre o cambiá el filtro.
          </p>
        </div>
      `;

      return;
    }


    animalGrid.innerHTML =
      visibleAnimals.map(animal => {

        const photo =
          getAnimalPhoto(animal);

        const statusLabel =
          getAnimalStatusLabel(animal);

        const statusClass =
          getAnimalStatusClass(animal);

        const sex =
          animal.sexo
            ? escapeHtml(animal.sexo)
            : "Sin especificar";

        const age =
          animal.edad_aproximada
            ? escapeHtml(animal.edad_aproximada)
            : "Edad no indicada";

        const size =
          animal.tamanio
            ? escapeHtml(animal.tamanio)
            : "Tamaño no indicado";

        const description =
          animal.descripcion ||
          animal.historia ||
          "Sin descripción cargada.";

        const featured =
          animal._featured === true;


        return `
          <article
            class="animal-card"
            data-id="${escapeHtml(animal.id)}"
            data-status="${escapeHtml(getAnimalCategory(animal))}"
            data-name="${escapeHtml(animal.nombre)}"
          >

            <div class="animal-card-image">

              ${
                photo
                  ? `
                    <img
                      src="${escapeHtml(photo)}"
                      alt="${escapeHtml(animal.nombre)}"
                      style="width:100%;height:100%;object-fit:cover"
                      loading="lazy"
                    >
                  `
                  : `
                    <div class="animal-photo-placeholder">
                      🐶
                    </div>
                  `
              }

              ${
                featured
                  ? `
                    <span class="animal-featured">
                      ⭐ Destacado
                    </span>
                  `
                  : ""
              }

              <button
                type="button"
                class="animal-menu"
                data-id="${escapeHtml(animal.id)}"
                aria-label="Opciones">
                ⋮
              </button>

            </div>


            <div class="animal-card-content">

              <div class="animal-card-title">

                <div>
                  <h3>${escapeHtml(animal.nombre)}</h3>

                  <p>
                    ${sex} · ${age} · ${size}
                  </p>
                </div>

                <span class="animal-status-pill ${statusClass}">
                  ${statusLabel}
                </span>

              </div>


              <p class="animal-description">
                ${escapeHtml(description)}
              </p>


              <div class="animal-card-actions">

                <button
                  type="button"
                  class="secondary-action animal-view-action"
                  data-id="${escapeHtml(animal.id)}">
                  Ver
                </button>

                <button
                  type="button"
                  class="edit-action animal-edit-action"
                  data-id="${escapeHtml(animal.id)}">
                  Editar
                </button>

                <button
                  type="button"
                  class="delete-action animal-delete-action"
                  data-id="${escapeHtml(animal.id)}"
                  data-name="${escapeHtml(animal.nombre)}">
                  Eliminar
                </button>

              </div>

            </div>

          </article>
        `;

      }).join("");


    document
      .querySelectorAll(".animal-edit-action")
      .forEach(button => {

        button.addEventListener("click", () => {

          const animal =
            animalsData.find(
              item => String(item.id) === String(button.dataset.id)
            );

          if (animal) {
            openAnimalModal(animal);
          }

        });

      });


    document
      .querySelectorAll(".animal-delete-action")
      .forEach(button => {

        button.addEventListener("click", async () => {

          await deleteAnimal(
            button.dataset.id,
            button.dataset.name
          );

        });

      });


    document
      .querySelectorAll(".animal-view-action")
      .forEach(button => {

        button.addEventListener("click", () => {

          const animal =
            animalsData.find(
              item => String(item.id) === String(button.dataset.id)
            );

          if (!animal) return;

          showToast(
            `${animal.nombre}: ${getAnimalStatusLabel(animal)}`
          );

        });

      });

  }


  async function deleteAnimal(animalId, animalName) {

    if (!sb || !animalId) return;

    const confirmed = window.confirm(
      `¿Eliminar a ${animalName || "este animal"}?\n\nEsta acción quitará al animal del panel y de la web. También intentaremos eliminar sus fotos. No se puede deshacer.`
    );

    if (!confirmed) return;

    try {

      showToast(`Eliminando ${animalName || "animal"}...`);

      // 1) Obtener las fotos asociadas para poder limpiar Storage.
      const { data: photoRows, error: photosError } = await sb
        .from("animal_fotos")
        .select("id, url")
        .eq("animal_id", animalId);

      if (photosError) throw photosError;

      // 2) Eliminar los registros de fotos.
      if ((photoRows || []).length) {
        const { error: deletePhotosError } = await sb
          .from("animal_fotos")
          .delete()
          .eq("animal_id", animalId);

        if (deletePhotosError) throw deletePhotosError;
      }

      // 3) Limpiar los archivos de Storage que estén dentro de la carpeta del animal.
      try {
        const { data: storageFiles, error: listError } = await sb.storage
          .from("animales")
          .list(String(animalId), { limit: 100 });

        if (!listError && storageFiles?.length) {
          const paths = storageFiles
            .filter(file => file?.name)
            .map(file => `${animalId}/${file.name}`);

          if (paths.length) {
            await sb.storage.from("animales").remove(paths);
          }
        }
      } catch (storageError) {
        console.warn("No se pudieron limpiar todas las fotos de Storage:", storageError);
      }

      // 4) Eliminar el animal. RLS permite DELETE a usuarios autenticados.
      const { error: deleteAnimalError } = await sb
        .from("animales")
        .delete()
        .eq("id", animalId);

      if (deleteAnimalError) {
        throw deleteAnimalError;
      }

      // 5) Refrescar el panel para que desaparezca inmediatamente.
      await loadAnimals();
      await loadDashboard();

      showToast(`${animalName || "El animal"} fue eliminado correctamente`);

    } catch (error) {

      console.error("Error eliminando animal:", error);

      const message = String(error?.message || error || "");

      if (/foreign key|violates|constraint/i.test(message)) {
        showToast("No se puede eliminar porque este animal tiene datos relacionados, como solicitudes.");
      } else {
        showToast("No se pudo eliminar el animal. Revisá los permisos de Supabase.");
      }

    }

  }


  async function loadAnimals() {

    if (!sb || !animalGrid) return;

    animalGrid.innerHTML = `
      <div class="empty-development-card" style="grid-column:1/-1;min-height:220px">
        <div class="development-icon">⏳</div>
        <h2>Cargando animales...</h2>
        <p>Estamos trayendo los datos de Supabase.</p>
      </div>
    `;


    const [
      animalsResult,
      photosResult
    ] = await Promise.all([

      sb
        .from("animales")
        .select("*")
        .order("nombre", { ascending: true }),

      sb
        .from("animal_fotos")
        .select("id, animal_id, url, orden, creado_en")
        .order("orden", { ascending: true })

    ]);


    if (animalsResult.error) {

      console.error(
        "Error cargando animales:",
        animalsResult.error
      );

      animalGrid.innerHTML = `
        <div class="empty-development-card" style="grid-column:1/-1">
          <div class="development-icon">⚠️</div>
          <h2>No pudimos cargar los animales</h2>
          <p>
            Revisá la conexión con Supabase y los permisos de la tabla.
          </p>
        </div>
      `;

      showToast("No se pudieron cargar los animales");

      return;

    }


    const photos =
      photosResult.error
        ? []
        : (photosResult.data || []);


    const photosByAnimal = new Map();


    photos.forEach(photo => {

      const key =
        String(photo.animal_id);

      if (!photosByAnimal.has(key)) {
        photosByAnimal.set(key, []);
      }

      photosByAnimal
        .get(key)
        .push(photo);

    });


    animalsData =
      (animalsResult.data || []).map(animal => ({
        ...animal,
        _photos:
          photosByAnimal.get(String(animal.id)) || []
      }));


    renderAnimals();

  }


  filterButtons.forEach(button => {

    button.addEventListener("click", () => {

      filterButtons.forEach(item => {
        item.classList.remove("active");
      });

      button.classList.add("active");

      currentAnimalFilter =
        button.dataset.filter || "todos";

      renderAnimals();

    });

  });


  animalSearch?.addEventListener(
    "input",
    renderAnimals
  );


  animalSort?.addEventListener(
    "click",
    () => {

      animalSortAsc = !animalSortAsc;

      animalSort.textContent =
        animalSortAsc
          ? "Ordenar A-Z"
          : "Ordenar Z-A";

      renderAnimals();

    }
  );


  /*
  ==========================================
  MODAL AGREGAR / EDITAR ANIMAL
  ==========================================
  */

  const animalModal =
    document.getElementById("animalModal");

  const animalModalTitle =
    document.getElementById("animalModalTitle");

  const animalModalEyebrow =
    document.getElementById("animalModalEyebrow");

  const openAnimalButtons =
    document.querySelectorAll(".open-animal-modal");

  const closeAnimalModalButton =
    document.getElementById("closeAnimalModal");

  const cancelAnimalModalButton =
    document.getElementById("cancelAnimalModal");

  const animalForm =
    document.getElementById("animalForm");

  let selectedPhotos = [];

  let editingAnimalId = null;


  function resetAnimalForm() {

    animalForm?.reset();

    selectedPhotos = [];

    editingAnimalId = null;

    renderPhotoPreviews();

    if (animalModalTitle) {
      animalModalTitle.textContent =
        "Agregar animal 🐶";
    }

    if (animalModalEyebrow) {
      animalModalEyebrow.textContent =
        "NUEVO ANIMAL";
    }

  }


  function openAnimalModal(animal = null) {

    resetAnimalForm();

    if (animal) {

      editingAnimalId =
        animal.id;

      document.getElementById("animalName").value =
        animal.nombre || "";

      document.getElementById("animalSex").value =
        animal.sexo || "";

      document.getElementById("animalAge").value =
        animal.edad_aproximada || "";

      document.getElementById("animalSize").value =
        animal.tamanio || "";

      const reverseStatus = {
        disponible: "adopcion",
        en_proceso: "tratamiento",
        adoptado: "adoptado"
      };

      document.getElementById("animalStatus").value =
        reverseStatus[animal.estado] || "adopcion";

      document.getElementById("animalStory").value =
        animal.historia || animal.descripcion || "";

      if (animalModalTitle) {
        animalModalTitle.textContent =
          "Editar animal ✏️";
      }

      if (animalModalEyebrow) {
        animalModalEyebrow.textContent =
          "EDITAR ANIMAL";
      }

    }

    animalModal?.classList.add("open");

    document.body.style.overflow = "hidden";

  }


  function closeAnimalModal() {

    animalModal?.classList.remove("open");

    document.body.style.overflow = "";

  }


  openAnimalButtons.forEach(button => {

    button.addEventListener(
      "click",
      () => openAnimalModal()
    );

  });


  closeAnimalModalButton?.addEventListener(
    "click",
    closeAnimalModal
  );


  cancelAnimalModalButton?.addEventListener(
    "click",
    closeAnimalModal
  );


  animalModal?.addEventListener(
    "click",
    event => {

      if (event.target === animalModal) {
        closeAnimalModal();
      }

    }
  );


  /*
  ==========================================
  FOTOS
  ==========================================
  */

  const photoUploadArea =
    document.getElementById("photoUploadArea");

  const animalPhotos =
    document.getElementById("animalPhotos");

  const photoPreviewList =
    document.getElementById("photoPreviewList");


  function renderPhotoPreviews() {

    if (!photoPreviewList) return;

    photoPreviewList.innerHTML = "";

    selectedPhotos.forEach((file, index) => {

      const wrapper =
        document.createElement("div");

      wrapper.className =
        `photo-preview ${index === 0 ? "cover" : ""}`;


      const image =
        document.createElement("img");

      image.src =
        URL.createObjectURL(file);


      const remove =
        document.createElement("button");

      remove.type = "button";
      remove.className = "photo-preview-remove";
      remove.textContent = "×";


      remove.addEventListener(
        "click",
        event => {

          event.preventDefault();

          selectedPhotos.splice(index, 1);

          renderPhotoPreviews();

        }
      );


      wrapper.appendChild(image);
      wrapper.appendChild(remove);

      photoPreviewList.appendChild(wrapper);

    });

  }


  photoUploadArea?.addEventListener(
    "click",
    () => animalPhotos?.click()
  );


  animalPhotos?.addEventListener(
    "change",
    event => {

      const files =
        Array.from(event.target.files || [])
          .filter(file =>
            file.type.startsWith("image/")
          );

      selectedPhotos.push(...files);

      renderPhotoPreviews();

      event.target.value = "";

    }
  );


  photoUploadArea?.addEventListener(
    "dragover",
    event => {

      event.preventDefault();

      photoUploadArea.classList.add("dragging");

    }
  );


  photoUploadArea?.addEventListener(
    "dragleave",
    () => {

      photoUploadArea.classList.remove("dragging");

    }
  );


  photoUploadArea?.addEventListener(
    "drop",
    event => {

      event.preventDefault();

      photoUploadArea.classList.remove("dragging");

      const files =
        Array.from(event.dataTransfer.files || [])
          .filter(file =>
            file.type.startsWith("image/")
          );

      selectedPhotos.push(...files);

      renderPhotoPreviews();

    }
  );


  /*
  ==========================================
  GUARDAR ANIMAL - SUPABASE
  ==========================================
  */

  async function saveAnimal() {

    const submitButton =
      animalForm?.querySelector(
        'button[type="submit"]'
      );

    const name =
      document.getElementById("animalName")
        ?.value.trim();

    const sex =
      document.getElementById("animalSex")
        ?.value || "";

    const age =
      document.getElementById("animalAge")
        ?.value.trim() || null;

    const size =
      document.getElementById("animalSize")
        ?.value || null;

    const statusForm =
      document.getElementById("animalStatus")
        ?.value || "adopcion";

    const story =
      document.getElementById("animalStory")
        ?.value.trim() || null;


    if (!name) {

      showToast(
        "Ingresá el nombre del animal"
      );

      return;

    }

    if (!sex) {

      showToast(
        "Seleccioná el sexo del animal"
      );

      return;

    }


    const statusMap = {
      adopcion: "disponible",
      tratamiento: "en_proceso",
      transito: "en_proceso",
      adoptado: "adoptado"
    };


    const estado =
      statusMap[statusForm] || "disponible";


    if (submitButton) {

      submitButton.disabled = true;

      submitButton.textContent =
        editingAnimalId
          ? "GUARDANDO CAMBIOS..."
          : "GUARDANDO...";

    }


    try {

      let animalId =
        editingAnimalId;


      if (editingAnimalId) {

        const { error } =
          await sb
            .from("animales")
            .update({
              nombre: name,
              sexo: sex,
              edad_aproximada: age,
              tamanio: size,
              historia: story,
              descripcion: story,
              estado
            })
            .eq("id", editingAnimalId);


        if (error) {
          throw error;
        }

      } else {

        const { data, error } =
          await sb
            .from("animales")
            .insert({
              nombre: name,
              sexo: sex,
              edad_aproximada: age,
              tamanio: size,
              historia: story,
              descripcion: story,
              estado
            })
            .select()
            .single();


        if (error) {
          throw error;
        }

        animalId =
          data.id;

      }


      /*
      ----------------------------------------
      SUBIR FOTOS NUEVAS
      ----------------------------------------
      */

      const uploadedPhotos = [];


      for (
        let index = 0;
        index < selectedPhotos.length;
        index++
      ) {

        const file =
          selectedPhotos[index];

        const extension =
          file.name
            .split(".")
            .pop()
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "");


        const safeName =
          file.name
            .replace(/\.[^/.]+$/, "")
            .replace(/[^a-zA-Z0-9-_]/g, "-")
            .slice(0, 50);


        const filePath =
          `${animalId}/${Date.now()}-${index}-${safeName}.${extension || "jpg"}`;


        const { error: uploadError } =
          await sb.storage
            .from("animales")
            .upload(
              filePath,
              file,
              {
                cacheControl: "3600",
                upsert: false
              }
            );


        if (uploadError) {
          throw uploadError;
        }


        const { data: publicData } =
          sb.storage
            .from("animales")
            .getPublicUrl(filePath);


        const publicUrl =
          publicData.publicUrl;


        const { error: photoError } =
          await sb
            .from("animal_fotos")
            .insert({
              animal_id: animalId,
              url: publicUrl,
              orden: index
            });


        if (photoError) {
          throw photoError;
        }


        uploadedPhotos.push(publicUrl);

      }


      /*
      ----------------------------------------
      FOTO PRINCIPAL
      ----------------------------------------
      */

      if (uploadedPhotos.length > 0) {

        const { error } =
          await sb
            .from("animales")
            .update({
              foto_principal:
                uploadedPhotos[0]
            })
            .eq("id", animalId);


        if (error) {
          throw error;
        }

      }


      closeAnimalModal();

      resetAnimalForm();

      await loadAnimals();
      await loadDashboard();


      showToast(
        editingAnimalId
          ? `${name} fue actualizado correctamente`
          : `${name} fue guardado correctamente`
      );


    } catch (error) {

      console.error(
        "Error guardando animal:",
        error
      );

      showToast(
        error?.message
          ? `No se pudo guardar: ${error.message}`
          : "No se pudo guardar el animal"
      );

    } finally {

      if (submitButton) {

        submitButton.disabled = false;

        submitButton.textContent =
          "Guardar animal";

      }

    }

  }


  animalForm?.addEventListener(
    "submit",
    event => {

      event.preventDefault();

      saveAnimal();

    }
  );


  /*
  ==========================================
  DASHBOARD - DATOS REALES
  ==========================================
  */

  const formatMoney = (value) => {
    const amount = Number(value || 0);
    return amount.toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0
    });
  };

  const formatRelativeDate = (dateValue) => {
    if (!dateValue) return "Sin fecha";
    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return "Sin fecha";
    const diff = Math.max(0, Date.now() - date.getTime());
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return "Ahora";
    if (minutes < 60) return `Hace ${minutes} min`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `Hace ${hours} h`;
    const days = Math.floor(hours / 24);
    return `Hace ${days} día${days === 1 ? "" : "s"}`;
  };

  const getRequestStatusLabel = (status) => ({
    nueva: "Nueva",
    en_revision: "En revisión",
    apta: "Apta",
    entrevista: "Entrevista",
    aprobada: "Aprobada",
    adoptada: "Adoptada",
    no_apta: "No apta",
    rechazada: "Rechazada"
  })[String(status || "").toLowerCase()] || String(status || "Sin estado");

  async function loadDashboard() {
    if (!sb) return;

    const [requestsResult, campaignsResult] = await Promise.all([
      sb.from("solicitudes_adopcion").select("id, animal_id, nombre_completo, estado, creado_en, actualizado_en, email, telefono").order("creado_en", { ascending: false }),
      sb.from("campanias_donacion").select("id, titulo, objetivo, recaudado, activa, creado_en, actualizado_en").order("creado_en", { ascending: false })
    ]);

    const requests = requestsResult.error ? [] : (requestsResult.data || []);
    const campaigns = campaignsResult.error ? [] : (campaignsResult.data || []);

    if (requestsResult.error) console.warn("No se pudieron cargar las solicitudes:", requestsResult.error);
    if (campaignsResult.error) console.warn("No se pudieron cargar las campañas:", campaignsResult.error);

    const activeAnimals = animalsData.filter(a => String(a.estado || "").toLowerCase() !== "adoptado").length;
    const newRequests = requests.filter(r => String(r.estado || "").toLowerCase() === "nueva").length;
    const adopted = requests.filter(r => String(r.estado || "").toLowerCase() === "adoptada").length;
    const raised = campaigns.reduce((sum, c) => sum + Number(c.recaudado || 0), 0);
    const activeCampaigns = campaigns.filter(c => c.activa).length;

    document.getElementById("statAnimals")?.replaceChildren(document.createTextNode(String(activeAnimals)));
    document.getElementById("statRequests")?.replaceChildren(document.createTextNode(String(newRequests)));
    document.getElementById("statAdoptions")?.replaceChildren(document.createTextNode(String(adopted)));
    document.getElementById("statRaised")?.replaceChildren(document.createTextNode(formatMoney(raised)));
    const adoptionsLabel = document.getElementById("statAdoptionsLabel");
    if (adoptionsLabel) adoptionsLabel.textContent = "Registradas";
    const raisedLabel = document.getElementById("statRaisedLabel");
    if (raisedLabel) raisedLabel.textContent = `${activeCampaigns} campaña${activeCampaigns === 1 ? " activa" : "s activas"}`;

    const sidebarAnimalsCount = document.getElementById("sidebarAnimalsCount");
    if (sidebarAnimalsCount) sidebarAnimalsCount.textContent = String(activeAnimals);
    const sidebarRequestsCount = document.getElementById("sidebarRequestsCount");
    if (sidebarRequestsCount) sidebarRequestsCount.textContent = String(newRequests);
    const quickRequestsText = document.getElementById("quickRequestsText");
    if (quickRequestsText) quickRequestsText.textContent = newRequests === 0 ? "No hay pendientes" : `Hay ${newRequests} pendiente${newRequests === 1 ? "" : "s"}`;

    const featuredGrid = document.getElementById("featuredAnimalsGrid");
    if (featuredGrid) {
      const featured = animalsData.slice(0, 3);
      featuredGrid.innerHTML = featured.length ? featured.map(animal => {
        const photo = getAnimalPhoto(animal);
        const statusLabel = getAnimalStatusLabel(animal);
        const statusClass = getAnimalCategory(animal) === "adopcion" ? "" : " treatment";
        return `<article class="animal-preview">
          <div class="animal-image ${photo ? "" : "placeholder-image"}">${photo ? `<img src="${escapeHtml(photo)}" alt="${escapeHtml(animal.nombre)}" style="width:100%;height:100%;object-fit:cover">` : "🐶"}</div>
          <div class="animal-details">
            <strong>${escapeHtml(animal.nombre)}</strong>
            <span>${escapeHtml(animal.sexo || "Sin especificar")} · ${escapeHtml(animal.edad_aproximada || "Edad no indicada")}</span>
            <div class="animal-status${statusClass}"><i></i>${escapeHtml(statusLabel)}</div>
          </div>
        </article>`;
      }).join("") : `<div class="empty-development-card" style="grid-column:1/-1"><div class="development-icon">🐾</div><h2>No hay animales cargados</h2><p>Agregá el primero desde Animales.</p></div>`;
    }

    const activityList = document.getElementById("activityList");
    if (activityList) {
      const activities = [];
      requests.slice(0, 2).forEach(r => activities.push({ icon: "✉", cls: "request", title: `Solicitud de ${r.nombre_completo || "postulante"}`, date: r.creado_en }));
      animalsData.slice(0, 2).forEach(a => activities.push({ icon: "🐶", cls: "animal", title: `${a.nombre} está publicado`, date: a.actualizado_en || a.creado_en }));
      activities.sort((a,b) => new Date(b.date || 0) - new Date(a.date || 0));
      activityList.innerHTML = activities.length ? activities.slice(0,4).map(a => `<div class="activity-item"><div class="activity-icon ${a.cls}">${a.icon}</div><div class="activity-info"><strong>${escapeHtml(a.title)}</strong><span>${escapeHtml(formatRelativeDate(a.date))}</span></div></div>`).join("") : `<div class="empty-development-card" style="min-height:140px"><div class="development-icon">◷</div><h2>Sin actividad todavía</h2><p>Cuando haya movimientos aparecerán acá.</p></div>`;
    }
  }


  /*
  ==========================================
  INICIO DEL PANEL
  ==========================================
  */

  const hasSession =
    await requireSession();

  if (hasSession) {

    await loadAnimals();
    await loadDashboard();

  }


  showSection("inicio");

});
