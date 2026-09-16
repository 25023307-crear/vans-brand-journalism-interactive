import { FormEvent, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Check,
  ChevronRight,
  ExternalLink,
  Footprints,
  Instagram,
  Menu,
  MessageCircle,
  Play,
  Quote,
  Sparkles,
  X,
} from "lucide-react";

const HERO_IMAGE = `${import.meta.env.BASE_URL}images/vans-hero.jpg`;
const PROCESS_IMAGE = `${import.meta.env.BASE_URL}images/vans-process.jpg`;
const COMMUNITY_IMAGE = `${import.meta.env.BASE_URL}images/vans-community.jpg`;
const USER_STORE_FRONT = `${import.meta.env.BASE_URL}images/store-front.jpg`;
const USER_STORE_DISPLAY = `${import.meta.env.BASE_URL}images/store-display.jpg`;
const USER_STORE_VISIT = `${import.meta.env.BASE_URL}images/store-visit.jpg`;

const galleryItems = [
  { src: USER_STORE_FRONT, number: "01", title: "Fachada de la tienda", description: "Vista exterior de una tienda Vans durante la visita de observación.", alt: "Fachada exterior de una tienda Vans, fotografiada por José Antonio Lorenzo Mora durante su visita de campo" },
  { src: USER_STORE_DISPLAY, number: "02", title: "Exhibición de producto", description: "Organización visual del calzado y la comunicación de producto dentro del punto de venta.", alt: "Exhibición de tenis Vans en el interior de una tienda, con modelos y materiales organizados en anaqueles" },
  { src: USER_STORE_VISIT, number: "03", title: "Recorrido de observación", description: "Registro de la interacción del estudiante con el espacio y la exhibición de calzado.", alt: "José Antonio Lorenzo Mora observa una exhibición de calzado Vans dentro de la tienda" },
];

const sourceLinks = [
  {
    number: "01",
    title: "Historia oficial de Vans",
    type: "Fuente primaria",
    href: "https://www.vans.com/en-us/about",
  },
  {
    number: "02",
    title: "The Invention of the Iconic Vans Skateboarding Shoe",
    type: "Smithsonian Institution",
    href: "https://invention.si.edu/invention-stories/invention-iconic-vans-skateboarding-shoe",
  },
  {
    number: "03",
    title: "How Are Vans Shoes Made?",
    type: "Vans Stories · 2025",
    href: "https://www.vans.com/en-se/vans-stories/how-are-vans-shoes-made",
  },
  {
    number: "04",
    title: "Vans Sustainability · VR3",
    type: "Compromisos corporativos",
    href: "https://www.vans.com/en-us/sustainability",
  },
];

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState("");

  const goTo = (id: string) => {
    scrollToSection(id);
    setMenuOpen(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(false);
    setFormError("");
    const form = event.currentTarget;
    const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;
    if (!endpoint) {
      setFormError("El formulario necesita configurar VITE_FORMSPREE_ENDPOINT. Consulta el archivo .env.example.");
      return;
    }
    setSending(true);
    try {
      const response = await fetch(endpoint, { method: "POST", headers: { Accept: "application/json", "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(form))) });
      if (!response.ok) throw new Error("No se pudo enviar");
      setSubmitted(true);
      form.reset();
    } catch {
      setFormError("No pudimos enviar tu participación. Revisa tu conexión e inténtalo de nuevo.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="wordmark" href="#inicio" onClick={() => goTo("inicio")} aria-label="Vans, volver al inicio">
          VANS<span className="wordmark-dot">®</span>
        </a>
        <nav className={`desktop-nav ${menuOpen ? "is-open" : ""}`} aria-label="Navegación principal">
          <button onClick={() => goTo("historia")}>Historia</button>
          <button onClick={() => goTo("producto")}>Producto</button>
          <button onClick={() => goTo("proceso")}>Proceso</button>
          <button onClick={() => goTo("comunidad")}>Comunidad</button>
          <button onClick={() => goTo("fuentes")}>Fuentes</button>
        </nav>
        <div className="header-actions">
          <a className="header-buy" href="https://www.vans.mx/" target="_blank" rel="noreferrer">
            Comprar <ArrowUpRight size={15} />
          </a>
          <button className="menu-toggle" onClick={() => setMenuOpen((value) => !value)} aria-label="Abrir menú">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <main>
        <section className="hero-section" id="inicio">
          <img className="hero-image" src={HERO_IMAGE} alt="Tenis de skate en una pista urbana al atardecer" />
          <div className="hero-overlay" />
          <div className="hero-content reveal-up">
            <p className="eyebrow light">Brand Journalism · Sector calzado</p>
            <h1>El medio<br /><em>es el mensaje.</em></h1>
            <p className="hero-dek">Cómo Vans convirtió una suela de goma, una comunidad y una mirada creativa en una marca global.</p>
            <button className="button button-light" onClick={() => goTo("historia")}>
              Entrar a la historia <ArrowDown size={17} />
            </button>
          </div>
          <div className="hero-meta">
            <span>01 — 08</span>
            <span>Una investigación visual sobre Vans</span>
          </div>
          <div className="hero-side-label">OFF THE WALL / SINCE 1966</div>
        </section>

        <section className="identification-strip" aria-label="Datos de identificación académica">
          <div className="identification-label"><span>Módulo / reto</span><strong>Creación de marca y posicionamiento<br />Reto 3 · El medio es el mensaje</strong></div>
          <div className="identification-item"><span>Estudiante</span><strong>José Antonio Lorenzo Mora</strong></div>
          <div className="identification-item"><span>Matrícula</span><strong>25023307</strong></div>
          <div className="identification-item"><span>Asesor</span><strong>Mtro. Daniel Rivera Nieto</strong></div>
          <div className="identification-item"><span>Fecha</span><strong>15 de septiembre de 2026</strong></div>
        </section>

        <section className="intro-section section-pad" id="historia">
          <div className="section-kicker"><span>01</span><span>Una marca que nació cerca del usuario</span></div>
          <div className="intro-grid">
            <div>
              <h2>Antes de ser un ícono, Vans fue una tienda que escuchaba.</h2>
            </div>
            <div className="intro-copy">
              <p className="lead-copy">El 16 de marzo de 1966, The Van Doren Rubber Company abrió sus puertas en Anaheim, California. Paul y Jim Van Doren, junto con Gordon Lee y Serge D’Elia, fabricaban y vendían directamente sus zapatos.</p>
              <p>La historia de Vans no se explica sólo por su diseño. Los patinadores del sur de California encontraron en sus suelas de goma una respuesta funcional para la tabla; después, esa adopción convirtió el producto en una señal de pertenencia, creatividad y autoexpresión.</p>
              <button className="text-link" onClick={() => goTo("linea-tiempo")}>Ver línea del tiempo <ChevronRight size={17} /></button>
            </div>
          </div>
          <div className="timeline" id="linea-tiempo">
            <article className="timeline-item active"><span>1966</span><h3>The Van Doren Rubber Company</h3><p>Anaheim, California. Fabricación y venta directa.</p></article>
            <article className="timeline-item"><span>1976</span><h3>El Era entra en escena</h3><p>Colaboración con Tony Alva y Stacy Peralta.</p></article>
            <article className="timeline-item"><span>1977</span><h3>Nace el Old Skool</h3><p>La Sidestripe™ aparece por primera vez.</p></article>
            <article className="timeline-item"><span>HOY</span><h3>Una plataforma creativa</h3><p>Calzado, ropa, arte, música y comunidad.</p></article>
          </div>
        </section>

        <section className="red-band" id="producto">
          <div className="red-band-inner">
            <span className="red-band-number">02</span>
            <h2>El producto es el punto de partida.<br /><em>La cultura lo lleva más lejos.</em></h2>
            <p>Vans es una empresa de calzado, ropa y accesorios. Sus siluetas históricas —Authentic, Era, Old Skool, Classic Slip-On, Sk8-Hi y Half Cab— mantienen una identidad común, pero responden a usos y públicos distintos.</p>
          </div>
        </section>

        <section className="product-section section-pad">
          <div className="section-kicker"><span>03</span><span>Producto representativo · Old Skool</span></div>
          <div className="product-intro">
            <div>
              <p className="eyebrow">1977 / Vans #36</p>
              <h2>Una franja lateral que se volvió firma.</h2>
            </div>
            <p>El Old Skool fue el primer modelo de skate de Vans que incorporó paneles de cuero para aumentar la resistencia. También presentó la franja lateral que la marca llamó originalmente “jazz stripe” y que hoy reconocemos como Sidestripe™.</p>
          </div>
          <div className="product-cards">
            <article className="feature-card dark-card">
              <span className="card-index">A</span>
              <Footprints size={27} strokeWidth={1.5} />
              <h3>Construcción vulcanizada</h3>
              <p>La goma se cura mediante calor y presión. El proceso ayuda a crear una suela flexible y resistente.</p>
            </article>
            <article className="feature-card cream-card">
              <span className="card-index">B</span>
              <Sparkles size={27} strokeWidth={1.5} />
              <h3>Diseño reconocible</h3>
              <p>Paneles múltiples, lona, gamuza y una silueta que deja espacio para la personalización.</p>
            </article>
            <article className="feature-card red-card">
              <span className="card-index">C</span>
              <MessageCircle size={27} strokeWidth={1.5} />
              <h3>Significado compartido</h3>
              <p>El calzado conecta con skateboarding, música, arte, diseño y formas de vestir propias.</p>
            </article>
          </div>
          <p className="small-note">Las características pueden variar por modelo, versión, temporada y país. Consulta siempre la ficha técnica del producto específico.</p>
        </section>

        <section className="field-notes-section section-pad" id="registro-visual">
          <div className="section-kicker"><span>04</span><span>Registro visual / visita del estudiante</span></div>
          <div className="field-notes-heading"><h2>La marca también se observa <em>en el espacio real.</em></h2><p>Estas fotografías fueron proporcionadas por José Antonio Lorenzo Mora para documentar la experiencia de acercamiento a una tienda Vans: su fachada, su exhibición y la interacción con el espacio de venta.</p></div>
          <div className="user-gallery" aria-label="Álbum fotográfico de la visita a la tienda">
            {galleryItems.map((photo, index) => (
              <button className={`user-photo ${index === 0 ? "user-photo-large" : ""}`} key={photo.number} onClick={() => setSelectedPhoto(index)} aria-label={`Abrir fotografía ${photo.number}: ${photo.title}`}>
                <img src={photo.src} alt={photo.alt} />
                <span className="photo-expand"><ExternalLink size={15} /></span>
                <span className="photo-caption"><b>{photo.number}</b>{photo.title} · Archivo del estudiante</span>
              </button>
            ))}
          </div>
          <p className="gallery-help">Selecciona una fotografía para abrir el álbum. Usa los controles para recorrerlo.</p>
        </section>

        <section className="process-section section-pad" id="proceso">
          <div className="section-kicker light-kicker"><span>05</span><span>Proceso / materiales</span></div>
          <div className="process-heading">
            <h2>La suela waffle<br /><em>no apareció por accidente.</em></h2>
            <p>La fabricación convierte decisiones materiales en una experiencia que el usuario puede sentir en cada paso.</p>
          </div>
          <div className="process-feature">
            <div className="process-image-wrap"><img src={PROCESS_IMAGE} alt="Molde de suela waffle y piezas de calzado en un taller" /><span className="image-caption">Imagen editorial original · reconstrucción visual</span></div>
            <div className="process-list">
              <div className="process-step"><span>01</span><div><h3>Curar la goma</h3><p>La goma se calienta y se comprime en el área de vulcanización.</p></div></div>
              <div className="process-step"><span>02</span><div><h3>Formar el patrón</h3><p>La suela se prensa para crear el patrón entrecruzado tipo waffle.</p></div></div>
              <div className="process-step"><span>03</span><div><h3>Ensamblar el upper</h3><p>Los paneles de lona, gamuza y otros componentes se ajustan al molde.</p></div></div>
              <div className="process-step"><span>04</span><div><h3>Vulcanizar de nuevo</h3><p>El horno final fija la construcción antes del acabado y el control de calidad.</p></div></div>
            </div>
          </div>
        </section>

        <section className="benefits-section section-pad" id="beneficios">
          <div className="section-kicker"><span>06</span><span>Beneficios / decisión informada</span></div>
          <div className="benefits-layout">
            <div>
              <h2>Lo que puede ofrecer.<br /><em>Lo que no promete.</em></h2>
              <p className="lead-copy">Un producto puede ser reconocible sin ser universal. La experiencia depende de la versión, la talla, la actividad y la persona que lo usa.</p>
            </div>
            <div className="benefit-table">
              <div className="benefit-row"><span className="benefit-tag">01</span><div><h3>Versatilidad</h3><p>Distintas siluetas, colores y materiales para uso casual y urbano.</p></div></div>
              <div className="benefit-row"><span className="benefit-tag">02</span><div><h3>Conexión cultural</h3><p>Una historia vinculada con skateboarding, música, arte y comunidad.</p></div></div>
              <div className="benefit-row"><span className="benefit-tag">03</span><div><h3>Opciones especializadas</h3><p>Líneas como Skate, BMX, MTE, ComfyCush y Eco Theory tienen características específicas.</p></div></div>
              <div className="benefit-row"><span className="benefit-tag">04</span><div><h3>Consumo informado</h3><p>Revisa composición, talla, uso, precio, cuidados y políticas antes de comprar.</p></div></div>
            </div>
          </div>
        </section>

        <section className="community-section" id="comunidad">
          <div className="community-image-wrap"><img src={COMMUNITY_IMAGE} alt="Comunidad de skaters y artistas reunida en una rampa al atardecer" /></div>
          <div className="community-copy">
            <div className="section-kicker light-kicker"><span>07</span><span>Comunidad / Brand Journalism</span></div>
            <h2>No sólo contar<br />qué vendes.<br /><em>Contar por qué importa.</em></h2>
            <p>El Brand Journalism crea valor cuando la marca informa, documenta, contextualiza y abre conversación. En Vans, la historia del producto puede convivir con historias de skate, procesos creativos, música, arte, cuidado y consumo responsable.</p>
            <div className="ratio-note"><strong>80 / 20</strong><span>Una guía editorial: 80% comunidad y 20% promoción.</span></div>
          </div>
        </section>

        <section className="participation-section section-pad" id="participa">
          <div className="section-kicker"><span>08</span><span>Call to action / participación</span></div>
          <div className="participation-grid">
            <div>
              <h2>La conversación<br /><em>también es contenido.</em></h2>
              <p>Comparte una perspectiva breve. Tu respuesta ayuda a entender qué información espera una comunidad antes de elegir calzado.</p>
              <div className="question-list">
                <span>¿Qué valoras más: diseño, comodidad, resistencia o precio?</span>
                <span>¿Qué modelo relacionas con tu estilo personal?</span>
                <span>¿La historia de una marca influye en tu decisión?</span>
              </div>
            </div>
            <form className="comment-form" onSubmit={handleSubmit}>
              <label htmlFor="name">Nombre o seudónimo</label>
              <input id="name" name="name" placeholder="Escribe cómo quieres aparecer" required />
              <label htmlFor="opinion">Tu perspectiva</label>
              <textarea id="opinion" name="opinion" rows={5} placeholder="Cuéntanos qué buscas en un par de tenis…" required />
              <input type="hidden" name="_subject" value="Nueva participación en Vans Brand Journalism" />
              <button className="button button-dark" type="submit" disabled={sending}>{sending ? "Enviando…" : "Enviar participación"} <ArrowUpRight size={16} /></button>
              {submitted && <p className="form-success"><Check size={17} /> Gracias. Tu participación fue enviada correctamente.</p>}
              {formError && <p className="form-error" role="alert">{formError}</p>}
            </form>
          </div>
        </section>

        <section className="purchase-section" id="compra">
          <div className="purchase-inner">
            <div>
              <p className="eyebrow light">09 / Consulta oficial</p>
              <h2>Encuentra tu siguiente par.</h2>
              <p>Consulta catálogo, tallas, disponibilidad, envíos y políticas directamente en Vans México.</p>
            </div>
            <a className="button button-light purchase-button" href="https://www.vans.mx/" target="_blank" rel="noreferrer">Ir a Vans México <ExternalLink size={17} /></a>
          </div>
        </section>

        <section className="sources-section section-pad" id="fuentes">
          <div className="section-kicker"><span>Fuentes</span><span>Investigación y transparencia</span></div>
          <div className="sources-heading"><h2>Detrás de la historia,<br /><em>hay fuentes.</em></h2><p>Contenido editorial elaborado con fuentes oficiales y una institución de referencia. Consulta cada enlace para profundizar.</p></div>
          <div className="source-list">
            {sourceLinks.map((source) => (
              <a className="source-row" href={source.href} target="_blank" rel="noreferrer" key={source.number}>
                <span className="source-number">{source.number}</span><span className="source-title">{source.title}</span><span className="source-type">{source.type}</span><ExternalLink size={17} />
              </a>
            ))}
          </div>
          <div className="apa-box">
            <Quote size={24} />
            <p>Vans. (s. f.). <em>About: Off the Wall since 1966</em>. https://www.vans.com/en-us/about<br />Smithsonian Institution. (2021). <em>The invention of the iconic Vans skateboarding shoe</em>. https://invention.si.edu/<br />VF Corporation. (2025). <em>Fiscal year 2025 annual report</em>. https://www.vfc.com/</p>
          </div>
        </section>
        {selectedPhoto !== null && (
          <div className="lightbox" role="dialog" aria-modal="true" aria-label="Álbum fotográfico" onClick={() => setSelectedPhoto(null)}>
            <div className="lightbox-panel" onClick={(event) => event.stopPropagation()}>
              <button className="lightbox-close" onClick={() => setSelectedPhoto(null)} aria-label="Cerrar álbum"><X size={24} /></button>
              <img src={galleryItems[selectedPhoto].src} alt={galleryItems[selectedPhoto].alt} />
              <div className="lightbox-info"><span>{galleryItems[selectedPhoto].number} / {galleryItems.length}</span><h3>{galleryItems[selectedPhoto].title}</h3><p>{galleryItems[selectedPhoto].description}</p></div>
              <div className="lightbox-controls"><button onClick={() => setSelectedPhoto((selectedPhoto - 1 + galleryItems.length) % galleryItems.length)} aria-label="Fotografía anterior"><ArrowUp size={18} className="rotate-left" /> Anterior</button><button onClick={() => setSelectedPhoto((selectedPhoto + 1) % galleryItems.length)} aria-label="Fotografía siguiente">Siguiente <ArrowUp size={18} className="rotate-right" /></button></div>
            </div>
          </div>
        )}
      </main>

      <footer className="site-footer">
        <div className="footer-top"><a className="wordmark footer-wordmark" href="#inicio">VANS<span className="wordmark-dot">®</span></a><p>Contenido académico de Brand Journalism<br />sobre una marca de calzado.</p><div className="footer-social"><a href="https://www.instagram.com/vans_mx/" target="_blank" rel="noreferrer" aria-label="Instagram Vans México"><Instagram size={20} /></a><a href="https://www.vans.mx/" target="_blank" rel="noreferrer" aria-label="Tienda Vans México"><ExternalLink size={19} /></a></div></div>
        <div className="footer-bottom"><span>© 2026 Proyecto académico</span><span>Vans es una marca de VF Corporation. Este sitio no es oficial.</span><button onClick={() => goTo("inicio")} aria-label="Volver al inicio"><ArrowUp size={17} /></button></div>
      </footer>
    </div>
  );
}
