import { FormEvent, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUp, Check, ExternalLink, Instagram, Menu, X } from "lucide-react";
import { marked } from "marked";
import content from "../../content/vans-calzado-cultura.md?raw";

const base = import.meta.env.BASE_URL;
const galleryItems = [
  { src: `${base}images/store-front.jpg`, number: "01", title: "Fachada de la tienda", description: "Vista exterior de una tienda Vans durante la visita de observación.", alt: "Fachada exterior de una tienda Vans, fotografiada por José Antonio Lorenzo Mora durante su visita de campo" },
  { src: `${base}images/store-display.jpg`, number: "02", title: "Exhibición de producto", description: "Organización visual del calzado y la comunicación de producto dentro del punto de venta.", alt: "Exhibición de tenis Vans en el interior de una tienda, con modelos y materiales organizados en anaqueles" },
  { src: `${base}images/store-visit.jpg`, number: "03", title: "Recorrido de observación", description: "Registro de la interacción del estudiante con el espacio y la exhibición de calzado.", alt: "José Antonio Lorenzo Mora observa una exhibición de calzado Vans dentro de la tienda" },
];

const sources = [
  ["Vans: About — Off the Wall since 1966", "https://www.vans.com/en-us/about"],
  ["Smithsonian: The invention of the iconic Vans skateboarding shoe", "https://invention.si.edu/invention-stories/invention-iconic-vans-skateboarding-shoe"],
  ["Vans: How are Vans shoes made?", "https://www.vans.com/en-se/vans-stories/how-are-vans-shoes-made"],
  ["Vans México: tienda oficial", "https://www.vans.mx/"],
];

function MarkdownContent() {
  const html = marked.parse(content, { gfm: true, breaks: true }) as string;
  return <article className="document-content" dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(false);
    setFormError("");
    const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;
    if (!endpoint) {
      setFormError("Configura VITE_FORMSPREE_ENDPOINT en GitHub para activar los envíos.");
      return;
    }
    setSending(true);
    try {
      const response = await fetch(endpoint, { method: "POST", headers: { Accept: "application/json", "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))) });
      if (!response.ok) throw new Error("send failed");
      event.currentTarget.reset();
      setSubmitted(true);
    } catch {
      setFormError("No pudimos enviar tu respuesta. Inténtalo nuevamente.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="site-shell document-site">
      <header className="site-header document-header">
        <a className="wordmark" href="#inicio" aria-label="Vans, volver al inicio">VANS<span className="wordmark-dot">®</span></a>
        <nav className={`desktop-nav ${menuOpen ? "is-open" : ""}`} aria-label="Navegación principal">
          <button onClick={() => goTo("inicio")}>Inicio</button><button onClick={() => goTo("identidad")}>Identidad</button><button onClick={() => goTo("producto")}>Producto</button><button onClick={() => goTo("fabricacion")}>Fabricación</button><button onClick={() => goTo("participa")}>Participa</button>
        </nav>
        <div className="header-actions"><a className="header-buy" href="https://www.vans.mx/" target="_blank" rel="noreferrer">Tienda <ExternalLink size={14} /></a><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú">{menuOpen ? <X size={22} /> : <Menu size={22} />}</button></div>
      </header>

      <main id="inicio">
        <section className="document-hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(16,16,16,.94), rgba(16,16,16,.48)), url(${base}images/vans-hero.jpg)` }}>
          <div><p className="eyebrow light">Proyecto académico · Brand Journalism</p><h1>Vans: el calzado<br /><em>como forma de expresión.</em></h1><p className="hero-dek">De una fábrica local de Anaheim a una marca global vinculada con el skateboarding, la música, el diseño y el arte.</p><button className="button button-light" onClick={() => goTo("identidad")}>Conoce la historia <ArrowRight size={17} /></button></div>
          <div className="document-hero-note">Calzado, ropa y accesorios<br />Estudio editorial independiente<br />No es un sitio oficial de Vans</div>
        </section>

        <section className="document-intro section-pad"><div className="section-kicker"><span>Contexto</span><span>Una investigación para orientar al consumidor</span></div><div className="intro-callout"><strong>Pregunta para comenzar</strong><p>¿Qué hace que un par de tenis pase de ser un producto funcional a convertirse en un símbolo cultural?</p></div><div className="document-lead"><p>Vans es una marca de calzado originada en Anaheim, California. La empresa inició operaciones el 16 de marzo de 1966 como <b>The Van Doren Rubber Company</b>, fundada por Paul Van Doren, Jim Van Doren, Gordon Lee y Serge D’Elia. Su modelo inicial, el Vans #44, se conoce actualmente como Authentic.</p><p>La relación con el skateboarding se fortaleció durante la década de 1970, cuando los patinadores del sur de California adoptaron sus zapatos por la resistencia y el agarre de las suelas. Con el tiempo, la marca amplió su portafolio y consolidó una identidad asociada con deportes de acción, música, diseño, arte, creatividad y autoexpresión.</p></div></section>

        <section id="identidad" className="content-section section-pad"><div className="section-kicker"><span>01</span><span>Identidad y evolución de Vans</span></div><MarkdownContent /></section>
        <section id="producto" className="content-section section-pad alt-section"><div className="section-kicker"><span>02</span><span>Portafolio y producto representativo</span></div><MarkdownContent /></section>
        <section id="fabricacion" className="content-section section-pad dark-document"><div className="section-kicker light-kicker"><span>03</span><span>Desarrollo y fabricación</span></div><MarkdownContent /></section>
        <section className="gallery-section section-pad"><div className="section-kicker"><span>Registro visual</span><span>Visita del estudiante</span></div><h2>La marca también se observa <em>en el espacio real.</em></h2><p className="gallery-intro">Fotografías proporcionadas por José Antonio Lorenzo Mora para documentar fachada, exhibición y recorrido de observación.</p><div className="user-gallery">{galleryItems.map((photo, index) => <button className={`user-photo ${index === 0 ? "user-photo-large" : ""}`} key={photo.number} onClick={() => setSelectedPhoto(index)} aria-label={`Abrir ${photo.title}`}><img src={photo.src} alt={photo.alt} /><span className="photo-expand"><ExternalLink size={15} /></span><span className="photo-caption"><b>{photo.number}</b>{photo.title} · Archivo del estudiante</span></button>)}</div></section>
        <section className="content-section section-pad"><div className="section-kicker"><span>04</span><span>Materiales, tecnologías y consumo informado</span></div><MarkdownContent /></section>
        <section className="content-section section-pad alt-section"><div className="section-kicker"><span>05</span><span>Beneficios y experiencia del consumidor</span></div><MarkdownContent /></section>
        <section className="content-section section-pad dark-document"><div className="section-kicker light-kicker"><span>06</span><span>Vans y la construcción de comunidad</span></div><MarkdownContent /></section>

        <section id="participa" className="participation-section section-pad"><div className="section-kicker"><span>07</span><span>Participa</span></div><div className="participation-grid"><div><h2>Tu experiencia también <em>forma parte de la historia.</em></h2><p>Comparte una opinión breve sobre diseño, uso, cuidado o historia de la marca. No compartas datos personales ni información financiera.</p></div><form className="comment-form" onSubmit={handleSubmit}><label htmlFor="name">Nombre o seudónimo</label><input id="name" name="name" required placeholder="Cómo quieres aparecer" /><label htmlFor="model">Modelo o línea que conoces</label><input id="model" name="model" placeholder="Authentic, Old Skool, Slip-On…" /><label htmlFor="opinion">Tu perspectiva</label><textarea id="opinion" name="opinion" rows={5} required placeholder="¿Qué valoras de Vans?" /><label className="consent"><input type="checkbox" name="consent" value="yes" required /> Autorizo publicar mi respuesta sin datos personales.</label><button className="button button-dark" type="submit" disabled={sending}>{sending ? "Enviando…" : "Enviar participación"} <ArrowRight size={16} /></button>{submitted && <p className="form-success"><Check size={17} /> Tu participación fue enviada.</p>}{formError && <p className="form-error" role="alert">{formError}</p>}</form></div></section>

        <section className="content-section section-pad"><div className="section-kicker"><span>08</span><span>Perspectiva personal y conclusión</span></div><MarkdownContent /></section>
        <section className="sources-section section-pad"><div className="section-kicker"><span>Referencias</span><span>Transparencia académica</span></div><h2>Detrás de la historia, <em>hay fuentes.</em></h2><div className="source-list">{sources.map(([title, href], index) => <a className="source-row" href={href} target="_blank" rel="noreferrer" key={href}><span className="source-number">0{index + 1}</span><span className="source-title">{title}</span><ExternalLink size={17} /></a>)}</div></section>
      </main>

      {selectedPhoto !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Álbum fotográfico" onClick={() => setSelectedPhoto(null)}><div className="lightbox-panel" onClick={(event) => event.stopPropagation()}><button className="lightbox-close" onClick={() => setSelectedPhoto(null)} aria-label="Cerrar álbum"><X size={24} /></button><img src={galleryItems[selectedPhoto].src} alt={galleryItems[selectedPhoto].alt} /><div className="lightbox-info"><span>{galleryItems[selectedPhoto].number} / {galleryItems.length}</span><h3>{galleryItems[selectedPhoto].title}</h3><p>{galleryItems[selectedPhoto].description}</p></div><div className="lightbox-controls"><button onClick={() => setSelectedPhoto((selectedPhoto - 1 + galleryItems.length) % galleryItems.length)}><ArrowLeft size={18} /> Anterior</button><button onClick={() => setSelectedPhoto((selectedPhoto + 1) % galleryItems.length)}>Siguiente <ArrowRight size={18} /></button></div></div></div>}

      <footer className="site-footer"><div className="footer-top"><a className="wordmark footer-wordmark" href="#inicio">VANS<span className="wordmark-dot">®</span></a><p>Contenido académico sobre calzado,<br />cultura y expresión personal.</p><div className="footer-social"><a href="https://www.instagram.com/vans_mx/" target="_blank" rel="noreferrer" aria-label="Instagram Vans México"><Instagram size={20} /></a><a href="https://www.vans.mx/" target="_blank" rel="noreferrer" aria-label="Tienda Vans México"><ExternalLink size={19} /></a></div></div><div className="footer-bottom"><span>© 2026 Proyecto académico</span><span>Este sitio no es oficial ni representa una relación comercial con Vans.</span><button onClick={() => goTo("inicio")} aria-label="Volver al inicio"><ArrowUp size={17} /></button></div></footer>
    </div>
  );
}
