/* VibeMaps · textos en español, inglés y francés */
'use strict';

const LANGS = [
  { id: 'es', code: 'ES', nombre: 'Español' },
  { id: 'en', code: 'EN', nombre: 'English' },
  { id: 'fr', code: 'FR', nombre: 'Français' }
];

const I18N = {
  /* ============================== ESPAÑOL ============================== */
  es: {
    'tagline': 'Encuentra tu sitio esta noche',
    'lang.title': 'Elige tu idioma',
    'lang.sub': 'Podrás cambiarlo cuando quieras desde tu perfil.',
    'continue': 'Continuar', 'back': 'Atrás', 'close': 'Cerrar', 'save': 'Guardar', 'cancel': 'Cancelar', 'yes': 'Sí', 'ok': 'Vale',
    'step.of': 'Paso {n} de {total}',

    'welcome.title': 'Sal donde encajas',
    'welcome.sub': 'VibeMaps te muestra dónde hay gente, quién es y si tu rollo encaja con el de la zona, antes de salir de casa.',
    'welcome.b1': 'Mapa de zonas concurridas en tiempo real',
    'welcome.b2': 'Verde, amarillo o rojo según tu perfil',
    'welcome.b3': 'Perfil medio de la gente de cada zona',
    'welcome.cta': 'Crear mi perfil',

    's1.title': 'Cuéntanos quién eres', 's1.sub': 'Con tu perfil calculamos dónde encajas. No lo compartimos con otros usuarios.',
    's2.title': 'Un poco más sobre ti', 's2.sub': 'La edad y la nacionalidad cuentan para el cálculo; el sexo solo para estadísticas.',
    's3.title': 'A qué te dedicas', 's3.sub': 'El sector profesional influye en el ambiente que buscas.',
    's4.title': 'Tu estilo y tu plan', 's4.sub': 'Elige tu estilo. Lo demás es opcional, pero afina el resultado.',
    'f.email': 'Correo electrónico', 'f.name': 'Nombre', 'f.age': 'Edad', 'f.sex': 'Sexo', 'f.nat': 'Nacionalidad',
    'f.job': 'Oficio o puesto', 'f.job.ph': 'p. ej. analista, diseñadora, estudiante', 'f.sector': 'Sector',
    'f.style': 'Estilo', 'f.ambient': 'Qué buscas al salir', 'f.music': 'Música que te gusta', 'f.optional': 'opcional',
    'err.email': 'Introduce un correo válido.', 'err.name': 'Escribe tu nombre.', 'err.age': 'Debes tener al menos 18 años.',
    'err.sex': 'Elige una opción.', 'err.sector': 'Elige tu sector.', 'err.style': 'Elige tu estilo.', 'err.job': 'Cuéntanos a qué te dedicas.',
    'sex.mujer': 'Mujer', 'sex.hombre': 'Hombre', 'sex.otro': 'Otro / prefiero no decirlo',
    'nat.other': 'Otra',

    'loc.title': 'Tu ubicación', 'loc.sub': 'Con tu permiso te centramos en el mapa y calculamos distancias. Puedes entrar sin activarla.',
    'loc.consent': 'He leído el aviso de privacidad y acepto que VibeMaps use mi ubicación mientras uso la app.',
    'loc.read': 'Leer aviso de privacidad', 'loc.enable': 'Activar ubicación', 'loc.skip': 'Entrar sin ubicación',
    'loc.ok': 'Ubicación activada', 'loc.denied': 'No hemos podido acceder a tu ubicación. Puedes activarla luego desde el perfil.', 'loc.unsupported': 'Tu navegador no permite la ubicación.',
    'loc.need_consent': 'Marca la casilla para activar la ubicación.',

    'plan.title': 'Elige tu plan', 'plan.sub': 'Empieza gratis y pásate a Premium cuando quieras.',
    'plan.free': 'Gratis', 'plan.free.price': '0 £', 'plan.premium': 'Premium', 'plan.price': '5 £/mes', 'plan.price.short': '5 £',
    'plan.popular': 'Recomendado',
    'plan.free.f1': 'Mapa de zonas concurridas en tiempo real', 'plan.free.f2': 'Tu compatibilidad por zona', 'plan.free.f3': 'Perfil medio de la gente de cada zona',
    'plan.free.no': 'Sin nombres de bares ni locales',
    'plan.prem.f0': 'Todo lo del plan Gratis', 'plan.prem.f1': 'Nombres de bares, clubs y terrazas en el mapa',
    'plan.prem.f2': 'Aforo en tiempo real y compatibilidad por local', 'plan.prem.f3': 'Reservas directas y contacto de promotores', 'plan.prem.f4': 'Favoritos y búsqueda con filtros',
    'plan.cta.free': 'Seguir con Gratis', 'plan.cta.premium': 'Probar Premium', 'plan.cancel': 'Cancela cuando quieras desde tu perfil.',

    'ck.title': 'Activar Premium', 'ck.line': 'VibeMaps Premium, suscripción mensual', 'ck.total': 'Total al mes',
    'ck.demo': 'Versión de demostración: no se realiza ningún cobro. El pago real se activará al conectar el proveedor de pagos.',
    'ck.confirm': 'Activar Premium', 'ck.pay': 'Continuar al pago', 'ck.renew': 'Se renueva cada mes hasta que lo canceles.',
    'ck.success': 'Premium activado. Ya ves los locales.',

    'nav.map': 'Mapa', 'nav.explore': 'Explorar', 'nav.radar': 'Radar', 'nav.favs': 'Favoritos', 'nav.profile': 'Perfil',
    'mom.ahora': 'Ahora', 'mom.noche': 'Esta noche', 'mom.dia': 'De día',
    'theme.auto': 'Automático', 'theme.dark': 'Oscuro', 'theme.light': 'Claro',
    'lvl.alta': 'Tu sitio', 'lvl.media': 'Ambiente mixto', 'lvl.baja': 'Otro rollo', 'lvl.gris': 'Poca gente',

    'map.hint': 'Toca una zona para ver quién hay',
    'map.lock': 'Locales y bares con Premium', 'map.zoom': 'Acércate para ver los locales',
    'map.sum.title.noche': 'Esta noche en {city}', 'map.sum.title.dia': 'Hoy de día en {city}',
    'map.sum.best': 'Mejor zona para ti', 'map.sum.hot': 'Zona más concurrida', 'map.sum.people': 'personas',
    'map.sum.venues': '{n} locales abiertos',
    'map.locate': 'Centrar en mi ubicación', 'map.far': 'Estás lejos de {city}; cambia de ciudad desde el selector del mapa.', 'map.nopos': 'Activa la ubicación desde tu perfil para centrar el mapa en ti.',
    'people.approx': '≈{n} personas',

    'z.why': 'Por qué encajas', 'z.people': 'Quién hay', 'z.venues': 'Locales de la zona',
    'z.avg_age': 'Edad media', 'z.years': '{n} años', 'z.women': 'Mujeres', 'z.men': 'Hombres', 'z.ages': 'Edades', 'z.styles': 'Estilos', 'z.sectors': 'Sectores', 'z.nat': 'Nacionalidades', 'z.intl': '{n}% internacional',
    'z.locked.title': '{n} locales en esta zona', 'z.locked.sub': 'Con Premium ves sus nombres, aforo en tiempo real y puedes reservar.',
    'z.locked.cta': 'Desbloquear con Premium',
    'z.venue_types': '{n} {t}',

    'tipo.club': 'Club', 'tipo.cocktail': 'Coctelería', 'tipo.bar': 'Bar de copas', 'tipo.rooftop': 'Rooftop', 'tipo.sala': 'Sala de conciertos', 'tipo.terraza': 'Terraza', 'tipo.parque': 'Parque',
    'tipo.club.p': 'clubs', 'tipo.cocktail.p': 'coctelerías', 'tipo.bar.p': 'bares de copas', 'tipo.rooftop.p': 'rooftops', 'tipo.sala.p': 'salas de conciertos', 'tipo.terraza.p': 'terrazas', 'tipo.parque.p': 'parques',

    'l.in': '{tipo} en {zona}', 'l.opened': 'Abierto', 'l.closed': 'Cerrado ahora, abre a las {h}', 'l.occ': '{p}% de aforo, ≈{n} personas',
    'l.partner': 'Reserva directa', 'l.hours': 'Horario', 'l.music': 'Música', 'l.price': 'Precio', 'l.capacity': 'Aforo',
    'tab.summary': 'Resumen', 'tab.people': 'Gente', 'tab.book': 'Reservar',
    'l.fav.add': 'Guardar en favoritos', 'l.fav.del': 'Quitar de favoritos',
    'l.promoter': 'Promotor', 'l.whatsapp': 'WhatsApp', 'l.call': 'Llamar', 'l.instagram': 'Instagram',
    'l.live': 'Estadísticas en tiempo real', 'l.live.sub': 'Afluencia estimada, simulada en esta versión y actualizada cada pocos segundos.',
    'l.nopartner': 'Este local aún no tiene reserva directa en VibeMaps.', 'l.back': 'Volver a la zona',
    'l.contact_demo': 'Datos de contacto ficticios en esta demo.',

    'r.title': 'Reservar', 'r.type': 'Tipo de reserva', 'r.date': 'Fecha', 'r.time': 'Hora', 'r.guests': 'Personas', 'r.name': 'A nombre de',
    'r.submit': 'Confirmar reserva', 'r.done': 'Reserva confirmada (demo). El local recibirá tu solicitud.',
    'r.t.lista': 'Lista', 'r.t.entrada': 'Entrada', 'r.t.reservado': 'Reservado', 'r.t.mesa': 'Mesa',
    'r.err': 'Revisa la fecha y la hora.', 'r.demo': 'En la demo la confirmación es simulada.',

    'ex.title': 'Explorar', 'ex.sub.noche': '{n} locales abiertos esta noche', 'ex.sub.dia': '{n} locales abiertos de día',
    'ex.f.todos': 'Todos', 'ex.f.parati': 'Para ti', 'ex.f.club': 'Clubs', 'ex.f.bar': 'Bares y azoteas', 'ex.f.terraza': 'Terrazas y aire libre', 'ex.f.partner': 'Reserva directa',
    'ex.empty': 'Ningún local cumple ese filtro ahora mismo.', 'ex.all': 'Ver todos',
    'ex.locked.title': 'Descubre dónde salir', 'ex.locked.sub': '{n} locales abiertos ahora en {city}. Con Premium ves sus nombres, su ambiente y cuánto encajas.',

    'fav.title': 'Favoritos', 'fav.sub': 'Tus locales guardados', 'fav.empty': 'Aún no tienes favoritos. Abre un local y pulsa el corazón.',
    'fav.locked.title': 'Guarda tus locales', 'fav.locked.sub': 'Los favoritos son parte de Premium.',

    'rd.title': 'Radar', 'rd.sub': 'Cómo está {city} para ti ahora', 'rd.global': 'Compatibilidad global', 'rd.vibe': 'personas con tu vibe', 'rd.ranking': 'Ranking de zonas', 'rd.best': 'Perfil medio de tu mejor zona',
    'rd.of': 'de {n} en la ciudad',

    'pf.title': 'Perfil', 'pf.plan': 'Tu plan', 'pf.free': 'Plan Gratis', 'pf.premium': 'Plan Premium',
    'pf.renews': 'Se renueva el {d}', 'pf.ends': 'Premium activo hasta el {d}', 'pf.upgrade': 'Pasar a Premium', 'pf.cancel': 'Cancelar suscripción',
    'pf.cancel.q': '¿Cancelar Premium? Mantendrás el acceso hasta el final del periodo ya pagado.', 'pf.cancel.done': 'Suscripción cancelada.', 'pf.resume': 'Reactivar suscripción',
    'city.london': 'Londres', 'city.madrid': 'Madrid', 'pf.city': 'Ciudad', 'city.label': 'Ciudad', 
    'l.closed2': 'Cerrado ahora', 'l.hours.na': 'Horario no disponible', 'l.addr': 'Dirección', 'l.web': 'Web', 'l.source': 'Datos del local: © colaboradores de OpenStreetMap. El aforo y la afluencia son estimaciones simuladas.', 'l.contact_real': 'Contacta con el local directamente; datos de OpenStreetMap, pueden estar desactualizados.',
    'pf.language': 'Idioma', 'pf.theme': 'Tema', 'pf.moment': 'Momento del mapa',
    'pf.reservations': 'Mis reservas', 'pf.res.none': 'Aún no has hecho ninguna reserva.', 'pf.res.locked': 'Las reservas son parte de Premium.',
    'pf.res.guests': '{n} personas', 'pf.res.cancel': 'Cancelar',
    'pf.edit': 'Editar mi perfil', 'pf.export': 'Descargar mis datos', 'pf.delete': 'Borrar mis datos', 'pf.delete.q': 'Se borrarán tu perfil y tus datos de este dispositivo. ¿Continuar?',
    'pf.loc.on': 'Ubicación activada', 'pf.loc.off': 'Ubicación desactivada', 'pf.loc.enable': 'Activar ubicación', 'pf.loc.revoke': 'Desactivar ubicación',
    'pf.install': 'Instalar VibeMaps', 'pf.install.ios': 'Para instalarla en el iPhone: pulsa Compartir en Safari y luego «Añadir a pantalla de inicio».',
    'pf.privacy': 'Aviso de privacidad', 'pf.terms': 'Condiciones de Premium', 'pf.venues': '¿Tienes un local o eres promotor?', 'pf.venues.cta': 'Escríbenos',
    'pf.about': 'Tu perfil',

    'pw.title': 'Esto es de Premium', 'pw.sub': 'Ve los nombres de los bares y clubs, el aforo en directo y reserva sin salir de la app.', 'pw.cta': 'Probar Premium por {price}', 'pw.later': 'Ahora no',

    'toast.hello': 'Hola, {name}. Toca una zona para ver quién hay.',
    'toast.saved': 'Cambios guardados.', 'toast.fav.add': 'Guardado en favoritos.', 'toast.fav.del': 'Quitado de favoritos.', 'toast.reserved': 'Reserva confirmada.',
    'toast.exported': 'Datos descargados.', 'toast.updated': 'App actualizada.', 'toast.offline': 'Sin conexión: el mapa base puede no cargar.',

    'privacy.title': 'Aviso de privacidad',
    'privacy.body': '<p><b>Responsable.</b> VibeMaps (contacto: {contact}). Texto orientativo: debe revisarlo un abogado antes del lanzamiento.</p><p><b>Qué datos.</b> Los de tu perfil (correo, nombre, edad, sexo, nacionalidad, oficio, sector, estilo y preferencias) y, si lo autorizas, tu ubicación aproximada mientras usas la app.</p><p><b>Para qué.</b> Calcular tu compatibilidad con cada zona y local y mostrar estadísticas agregadas y anónimas de afluencia.</p><p><b>Base legal.</b> Tu consentimiento (art. 6.1.a RGPD y UK GDPR), que puedes retirar en cualquier momento desde Perfil.</p><p><b>Dónde se guardan.</b> En esta versión, solo en tu dispositivo (almacenamiento local del navegador).</p><p><b>Tus derechos.</b> Acceso, rectificación, supresión, oposición y portabilidad, desde Perfil o escribiendo al contacto. Puedes reclamar ante la AEPD (España) o la ICO (Reino Unido).</p>',
    'terms.title': 'Condiciones de Premium',
    'terms.body': '<p>VibeMaps Premium cuesta {price} al mes y se renueva cada mes hasta que lo canceles desde Perfil.</p><p>Al cancelar mantienes el acceso hasta el final del periodo ya pagado. No hay permanencia.</p><p>Premium desbloquea los nombres de los locales, el aforo en tiempo real, las reservas directas, los favoritos y la búsqueda con filtros.</p><p>Versión de demostración: de momento no se realiza ningún cobro real.</p>',
    'offline': 'Estás sin conexión',

    'r.age_close': 'Edad media de {n} años, como la tuya',
    'r.age_diff': 'Edad media de {n} años, {d} de diferencia contigo',
    'r.style': 'Predomina el estilo {s}',
    'r.sector': 'Sectores más comunes: {s}',
    'r.music': 'Suena {m}',
    /* opciones */
    'o.estilo.arreglado': 'Arreglado', 'o.estilo.pijo': 'Pijo', 'o.estilo.rollo': 'Del rollo', 'o.estilo.alternativo': 'Alternativo', 'o.estilo.casual': 'Casual', 'o.estilo.deportivo': 'Deportivo',
    'o.sector.finanzas': 'Finanzas', 'o.sector.consultoria': 'Consultoría', 'o.sector.tecnologia': 'Tecnología', 'o.sector.sanidad': 'Sanidad', 'o.sector.derecho': 'Derecho', 'o.sector.educacion': 'Educación',
    'o.sector.arte': 'Arte y cultura', 'o.sector.hosteleria': 'Hostelería', 'o.sector.comercio': 'Comercio', 'o.sector.ingenieria': 'Ingeniería', 'o.sector.estudiante': 'Estudiante', 'o.sector.otro': 'Otro',
    'o.ambiente.fiesta': 'Fiesta', 'o.ambiente.copas': 'Copas', 'o.ambiente.terraza': 'Terraza', 'o.ambiente.conciertos': 'Conciertos', 'o.ambiente.tranquilo': 'Tranquilo', 'o.ambiente.deporte': 'Deporte',
    'o.musica.comercial': 'Comercial', 'o.musica.electronica': 'Electrónica', 'o.musica.reggaeton': 'Reggaeton', 'o.musica.techno': 'Techno', 'o.musica.indie': 'Indie', 'o.musica.rock': 'Rock',

    /* etiquetas de zona */
    'tag.cocktails': 'Copas y cócteles', 'tag.dress': 'Dress code cuidado', 'tag.exclusive': 'Ambiente exclusivo', 'tag.bigclubs': 'Discotecas grandes', 'tag.late': 'Fiesta hasta tarde', 'tag.vip': 'Reservados',
    'tag.character': 'Bares con carácter', 'tag.indie_electro': 'Indie y electrónica', 'tag.young': 'Ambiente joven', 'tag.inclusive': 'Ambiente inclusivo', 'tag.terraces': 'Terrazas', 'tag.night': 'Mucha vida nocturna',
    'tag.multicultural': 'Multicultural', 'tag.live': 'Arte y música en directo', 'tag.cheap': 'Precios bajos', 'tag.university': 'Universitario', 'tag.student': 'Precios de estudiante', 'tag.early': 'Fiesta temprana',
    'tag.walk': 'Terrazas y paseo', 'tag.brunch': 'Brunch y vermú', 'tag.morning': 'Deporte por la mañana', 'tag.run': 'Running y paseo', 'tag.river': 'Terrazas junto al río', 'tag.relaxed': 'Ambiente relajado',
    'tag.tourist': 'Mucho turismo', 'tag.tapas': 'Tapas y cañas', 'tag.sunday': 'Domingo de Rastro', 'tag.neighbourhood': 'Barrio con encanto', 'tag.calmbars': 'Bares tranquilos',

    'and': ' y '
  },

  /* ============================== ENGLISH ============================== */
  en: {
    'tagline': 'Find your spot tonight',
    'lang.title': 'Choose your language',
    'lang.sub': 'You can change it any time from your profile.',
    'continue': 'Continue', 'back': 'Back', 'close': 'Close', 'save': 'Save', 'cancel': 'Cancel', 'yes': 'Yes', 'ok': 'OK',
    'step.of': 'Step {n} of {total}',

    'welcome.title': 'Go out where you fit in',
    'welcome.sub': 'VibeMaps shows you where the crowds are, who they are and whether the vibe matches yours, before you leave home.',
    'welcome.b1': 'Live map of busy areas',
    'welcome.b2': 'Green, yellow or red based on your profile',
    'welcome.b3': 'Average profile of the people in each area',
    'welcome.cta': 'Create my profile',

    's1.title': 'Tell us who you are', 's1.sub': 'We use your profile to work out where you fit. We never share it with other users.',
    's2.title': 'A bit more about you', 's2.sub': 'Age and nationality count towards the match; sex is only used for statistics.',
    's3.title': 'What you do', 's3.sub': 'Your professional sector shapes the atmosphere you look for.',
    's4.title': 'Your style', 's4.sub': 'Pick your style. The rest is optional but sharpens the result.',
    'f.email': 'Email', 'f.name': 'First name', 'f.age': 'Age', 'f.sex': 'Sex', 'f.nat': 'Nationality',
    'f.job': 'Job title', 'f.job.ph': 'e.g. analyst, designer, student', 'f.sector': 'Sector',
    'f.style': 'Style', 'f.ambient': 'What you look for when going out', 'f.music': 'Music you like', 'f.optional': 'optional',
    'err.email': 'Enter a valid email.', 'err.name': 'Enter your name.', 'err.age': 'You must be at least 18.',
    'err.sex': 'Pick an option.', 'err.sector': 'Pick your sector.', 'err.style': 'Pick your style.', 'err.job': 'Tell us what you do.',
    'sex.mujer': 'Female', 'sex.hombre': 'Male', 'sex.otro': 'Other / prefer not to say',
    'nat.other': 'Other',

    'loc.title': 'Your location', 'loc.sub': 'With your permission we centre the map on you and calculate distances. You can continue without it.',
    'loc.consent': 'I have read the privacy notice and agree that VibeMaps may use my location while I use the app.',
    'loc.read': 'Read the privacy notice', 'loc.enable': 'Enable location', 'loc.skip': 'Continue without location',
    'loc.ok': 'Location enabled', 'loc.denied': 'We could not access your location. You can enable it later from your profile.', 'loc.unsupported': 'Your browser does not support location.',
    'loc.need_consent': 'Tick the box to enable location.',

    'plan.title': 'Choose your plan', 'plan.sub': 'Start free and upgrade to Premium whenever you like.',
    'plan.free': 'Free', 'plan.free.price': '£0', 'plan.premium': 'Premium', 'plan.price': '£5/month', 'plan.price.short': '£5',
    'plan.popular': 'Recommended',
    'plan.free.f1': 'Live map of busy areas', 'plan.free.f2': 'Your match score for each area', 'plan.free.f3': 'Average profile of the people in each area',
    'plan.free.no': 'No bar or venue names',
    'plan.prem.f0': 'Everything in Free', 'plan.prem.f1': 'Bar, club and terrace names on the map',
    'plan.prem.f2': 'Live capacity and match score per venue', 'plan.prem.f3': 'Direct bookings and promoter contacts', 'plan.prem.f4': 'Favourites and filtered search',
    'plan.cta.free': 'Stay on Free', 'plan.cta.premium': 'Try Premium', 'plan.cancel': 'Cancel any time from your profile.',

    'ck.title': 'Activate Premium', 'ck.line': 'VibeMaps Premium, monthly subscription', 'ck.total': 'Total per month',
    'ck.demo': 'Demo version: no payment is taken. Real payments will be enabled once the payment provider is connected.',
    'ck.confirm': 'Activate Premium', 'ck.pay': 'Continue to payment', 'ck.renew': 'Renews every month until you cancel.',
    'ck.success': 'Premium activated. Venues are now unlocked.',

    'nav.map': 'Map', 'nav.explore': 'Explore', 'nav.radar': 'Radar', 'nav.favs': 'Favourites', 'nav.profile': 'Profile',
    'mom.ahora': 'Now', 'mom.noche': 'Tonight', 'mom.dia': 'Daytime',
    'theme.auto': 'Automatic', 'theme.dark': 'Dark', 'theme.light': 'Light',
    'lvl.alta': 'Your spot', 'lvl.media': 'Mixed vibe', 'lvl.baja': 'Different vibe', 'lvl.gris': 'Quiet',

    'map.hint': 'Tap an area to see who is there',
    'map.lock': 'Venues and bars with Premium', 'map.zoom': 'Zoom in to see venues',
    'map.sum.title.noche': 'Tonight in {city}', 'map.sum.title.dia': '{city} by day',
    'map.sum.best': 'Best area for you', 'map.sum.hot': 'Busiest area', 'map.sum.people': 'people',
    'map.sum.venues': '{n} venues open',
    'map.locate': 'Centre on my location', 'map.far': 'You are far from {city}; switch city from the selector on the map.', 'map.nopos': 'Enable location from your profile to centre the map on you.',
    'people.approx': '≈{n} people',

    'z.why': 'Why you fit', 'z.people': 'Who is there', 'z.venues': 'Venues in this area',
    'z.avg_age': 'Average age', 'z.years': '{n} years', 'z.women': 'Women', 'z.men': 'Men', 'z.ages': 'Ages', 'z.styles': 'Styles', 'z.sectors': 'Sectors', 'z.nat': 'Nationalities', 'z.intl': '{n}% international',
    'z.locked.title': '{n} venues in this area', 'z.locked.sub': 'With Premium you see their names and live capacity, and you can book.',
    'z.locked.cta': 'Unlock with Premium',
    'z.venue_types': '{n} {t}',

    'tipo.club': 'Club', 'tipo.cocktail': 'Cocktail bar', 'tipo.bar': 'Bar', 'tipo.rooftop': 'Rooftop', 'tipo.sala': 'Live music venue', 'tipo.terraza': 'Terrace', 'tipo.parque': 'Park',
    'tipo.club.p': 'clubs', 'tipo.cocktail.p': 'cocktail bars', 'tipo.bar.p': 'bars', 'tipo.rooftop.p': 'rooftops', 'tipo.sala.p': 'live music venues', 'tipo.terraza.p': 'terraces', 'tipo.parque.p': 'parks',

    'l.in': '{tipo} in {zona}', 'l.opened': 'Open', 'l.closed': 'Closed now, opens at {h}', 'l.occ': '{p}% full, ≈{n} people',
    'l.partner': 'Direct booking', 'l.hours': 'Hours', 'l.music': 'Music', 'l.price': 'Price', 'l.capacity': 'Capacity',
    'tab.summary': 'Overview', 'tab.people': 'People', 'tab.book': 'Book',
    'l.fav.add': 'Save to favourites', 'l.fav.del': 'Remove from favourites',
    'l.promoter': 'Promoter', 'l.whatsapp': 'WhatsApp', 'l.call': 'Call', 'l.instagram': 'Instagram',
    'l.live': 'Live statistics', 'l.live.sub': 'Footfall estimate, simulated in this version and refreshed every few seconds.',
    'l.nopartner': 'This venue does not offer direct booking on VibeMaps yet.', 'l.back': 'Back to the area',
    'l.contact_demo': 'Contact details are fictional in this demo.',

    'r.title': 'Book', 'r.type': 'Booking type', 'r.date': 'Date', 'r.time': 'Time', 'r.guests': 'Guests', 'r.name': 'Name for the booking',
    'r.submit': 'Confirm booking', 'r.done': 'Booking confirmed (demo). The venue will receive your request.',
    'r.t.lista': 'Guest list', 'r.t.entrada': 'Ticket', 'r.t.reservado': 'VIP area', 'r.t.mesa': 'Table',
    'r.err': 'Check the date and time.', 'r.demo': 'In the demo the confirmation is simulated.',

    'ex.title': 'Explore', 'ex.sub.noche': '{n} venues open tonight', 'ex.sub.dia': '{n} venues open by day',
    'ex.f.todos': 'All', 'ex.f.parati': 'For you', 'ex.f.club': 'Clubs', 'ex.f.bar': 'Bars and rooftops', 'ex.f.terraza': 'Terraces and outdoors', 'ex.f.partner': 'Direct booking',
    'ex.empty': 'No venue matches that filter right now.', 'ex.all': 'See all',
    'ex.locked.title': 'Discover where to go', 'ex.locked.sub': '{n} venues are open in {city} right now. With Premium you see their names, their vibe and how well you fit.',

    'fav.title': 'Favourites', 'fav.sub': 'Your saved venues', 'fav.empty': 'No favourites yet. Open a venue and tap the heart.',
    'fav.locked.title': 'Save your venues', 'fav.locked.sub': 'Favourites are part of Premium.',

    'rd.title': 'Radar', 'rd.sub': 'How {city} looks for you right now', 'rd.global': 'Overall match', 'rd.vibe': 'people with your vibe', 'rd.ranking': 'Area ranking', 'rd.best': 'Average profile of your best area',
    'rd.of': 'out of {n} in the city',

    'pf.title': 'Profile', 'pf.plan': 'Your plan', 'pf.free': 'Free plan', 'pf.premium': 'Premium plan',
    'pf.renews': 'Renews on {d}', 'pf.ends': 'Premium active until {d}', 'pf.upgrade': 'Upgrade to Premium', 'pf.cancel': 'Cancel subscription',
    'pf.cancel.q': 'Cancel Premium? You keep access until the end of the period you already paid for.', 'pf.cancel.done': 'Subscription cancelled.', 'pf.resume': 'Resume subscription',
    'city.london': 'London', 'city.madrid': 'Madrid', 'pf.city': 'City', 'city.label': 'City', 
    'l.closed2': 'Closed now', 'l.hours.na': 'Hours not available', 'l.addr': 'Address', 'l.web': 'Website', 'l.source': 'Venue data: © OpenStreetMap contributors. Capacity and footfall are simulated estimates.', 'l.contact_real': 'Contact the venue directly; data from OpenStreetMap and may be out of date.',
    'pf.language': 'Language', 'pf.theme': 'Theme', 'pf.moment': 'Map time of day',
    'pf.reservations': 'My bookings', 'pf.res.none': 'You have not made any bookings yet.', 'pf.res.locked': 'Bookings are part of Premium.',
    'pf.res.guests': '{n} guests', 'pf.res.cancel': 'Cancel',
    'pf.edit': 'Edit my profile', 'pf.export': 'Download my data', 'pf.delete': 'Delete my data', 'pf.delete.q': 'Your profile and data will be deleted from this device. Continue?',
    'pf.loc.on': 'Location enabled', 'pf.loc.off': 'Location disabled', 'pf.loc.enable': 'Enable location', 'pf.loc.revoke': 'Disable location',
    'pf.install': 'Install VibeMaps', 'pf.install.ios': 'To install on iPhone: tap Share in Safari, then “Add to Home Screen”.',
    'pf.privacy': 'Privacy notice', 'pf.terms': 'Premium terms', 'pf.venues': 'Own a venue or promote events?', 'pf.venues.cta': 'Get in touch',
    'pf.about': 'Your profile',

    'pw.title': 'This is a Premium feature', 'pw.sub': 'See bar and club names, live capacity, and book without leaving the app.', 'pw.cta': 'Try Premium for {price}', 'pw.later': 'Not now',

    'toast.hello': 'Hi {name}. Tap an area to see who is there.',
    'toast.saved': 'Changes saved.', 'toast.fav.add': 'Saved to favourites.', 'toast.fav.del': 'Removed from favourites.', 'toast.reserved': 'Booking confirmed.',
    'toast.exported': 'Data downloaded.', 'toast.updated': 'App updated.', 'toast.offline': 'Offline: the base map may not load.',

    'privacy.title': 'Privacy notice',
    'privacy.body': '<p><b>Controller.</b> VibeMaps (contact: {contact}). Indicative text: a lawyer must review it before launch.</p><p><b>What data.</b> Your profile (email, name, age, sex, nationality, job, sector, style and preferences) and, if you allow it, your approximate location while you use the app.</p><p><b>Why.</b> To calculate how well you fit each area and venue, and to show aggregated, anonymous footfall statistics.</p><p><b>Legal basis.</b> Your consent (Art. 6(1)(a) GDPR and UK GDPR), which you can withdraw at any time from Profile.</p><p><b>Where it is stored.</b> In this version, only on your device (the browser’s local storage).</p><p><b>Your rights.</b> Access, rectification, erasure, objection and portability, from Profile or by writing to the contact. You can complain to the AEPD (Spain) or the ICO (UK).</p>',
    'terms.title': 'Premium terms',
    'terms.body': '<p>VibeMaps Premium costs {price} per month and renews every month until you cancel it from Profile.</p><p>If you cancel you keep access until the end of the period you already paid for. There is no minimum term.</p><p>Premium unlocks venue names, live capacity, direct bookings, favourites and filtered search.</p><p>Demo version: no real payment is taken for now.</p>',
    'offline': 'You are offline',

    'r.age_close': 'Average age {n}, just like you',
    'r.age_diff': 'Average age {n}, {d} years away from yours',
    'r.style': 'The {s} style dominates',
    'r.sector': 'Most common sectors: {s}',
    'r.music': 'Playing {m}',

    'o.estilo.arreglado': 'Smart', 'o.estilo.pijo': 'Preppy', 'o.estilo.rollo': 'Laid-back', 'o.estilo.alternativo': 'Alternative', 'o.estilo.casual': 'Casual', 'o.estilo.deportivo': 'Sporty',
    'o.sector.finanzas': 'Finance', 'o.sector.consultoria': 'Consulting', 'o.sector.tecnologia': 'Technology', 'o.sector.sanidad': 'Healthcare', 'o.sector.derecho': 'Law', 'o.sector.educacion': 'Education',
    'o.sector.arte': 'Arts and culture', 'o.sector.hosteleria': 'Hospitality', 'o.sector.comercio': 'Retail', 'o.sector.ingenieria': 'Engineering', 'o.sector.estudiante': 'Student', 'o.sector.otro': 'Other',
    'o.ambiente.fiesta': 'Party', 'o.ambiente.copas': 'Drinks', 'o.ambiente.terraza': 'Terrace', 'o.ambiente.conciertos': 'Live music', 'o.ambiente.tranquilo': 'Chilled', 'o.ambiente.deporte': 'Sport',
    'o.musica.comercial': 'Commercial', 'o.musica.electronica': 'Electronic', 'o.musica.reggaeton': 'Reggaeton', 'o.musica.techno': 'Techno', 'o.musica.indie': 'Indie', 'o.musica.rock': 'Rock',

    'tag.cocktails': 'Drinks and cocktails', 'tag.dress': 'Smart dress code', 'tag.exclusive': 'Exclusive feel', 'tag.bigclubs': 'Big clubs', 'tag.late': 'Parties until late', 'tag.vip': 'VIP areas',
    'tag.character': 'Bars with character', 'tag.indie_electro': 'Indie and electronic', 'tag.young': 'Young crowd', 'tag.inclusive': 'Inclusive scene', 'tag.terraces': 'Terraces', 'tag.night': 'Lively nightlife',
    'tag.multicultural': 'Multicultural', 'tag.live': 'Live art and music', 'tag.cheap': 'Low prices', 'tag.university': 'University crowd', 'tag.student': 'Student prices', 'tag.early': 'Early parties',
    'tag.walk': 'Terraces and strolls', 'tag.brunch': 'Brunch and vermouth', 'tag.morning': 'Morning sport', 'tag.run': 'Running and strolls', 'tag.river': 'Riverside terraces', 'tag.relaxed': 'Relaxed vibe',
    'tag.tourist': 'Lots of tourists', 'tag.tapas': 'Tapas and small beers', 'tag.sunday': 'Sunday flea market', 'tag.neighbourhood': 'Charming neighbourhood', 'tag.calmbars': 'Quiet bars',

    'and': ' and '
  },

  /* ============================== FRANÇAIS ============================== */
  fr: {
    'tagline': 'Trouve ton spot ce soir',
    'lang.title': 'Choisissez votre langue',
    'lang.sub': 'Vous pourrez la changer à tout moment depuis votre profil.',
    'continue': 'Continuer', 'back': 'Retour', 'close': 'Fermer', 'save': 'Enregistrer', 'cancel': 'Annuler', 'yes': 'Oui', 'ok': 'OK',
    'step.of': 'Étape {n} sur {total}',

    'welcome.title': 'Sortez là où vous vous sentez bien',
    'welcome.sub': 'VibeMaps vous montre où se trouve la foule, qui elle est et si l’ambiance vous correspond, avant même de quitter la maison.',
    'welcome.b1': 'Carte en direct des zones animées',
    'welcome.b2': 'Vert, jaune ou rouge selon votre profil',
    'welcome.b3': 'Profil moyen des personnes de chaque zone',
    'welcome.cta': 'Créer mon profil',

    's1.title': 'Dites-nous qui vous êtes', 's1.sub': 'Votre profil nous sert à calculer où vous vous sentez bien. Nous ne le partageons avec aucun autre utilisateur.',
    's2.title': 'Un peu plus sur vous', 's2.sub': 'L’âge et la nationalité comptent dans le calcul ; le sexe sert uniquement aux statistiques.',
    's3.title': 'Votre métier', 's3.sub': 'Votre secteur professionnel influence l’ambiance que vous recherchez.',
    's4.title': 'Votre style', 's4.sub': 'Choisissez votre style. Le reste est facultatif, mais affine le résultat.',
    'f.email': 'E-mail', 'f.name': 'Prénom', 'f.age': 'Âge', 'f.sex': 'Sexe', 'f.nat': 'Nationalité',
    'f.job': 'Métier ou poste', 'f.job.ph': 'ex. analyste, designer, étudiante', 'f.sector': 'Secteur',
    'f.style': 'Style', 'f.ambient': 'Ce que vous cherchez en sortant', 'f.music': 'Musique que vous aimez', 'f.optional': 'facultatif',
    'err.email': 'Saisissez un e-mail valide.', 'err.name': 'Saisissez votre prénom.', 'err.age': 'Vous devez avoir au moins 18 ans.',
    'err.sex': 'Choisissez une option.', 'err.sector': 'Choisissez votre secteur.', 'err.style': 'Choisissez votre style.', 'err.job': 'Dites-nous ce que vous faites.',
    'sex.mujer': 'Femme', 'sex.hombre': 'Homme', 'sex.otro': 'Autre / je préfère ne pas le dire',
    'nat.other': 'Autre',

    'loc.title': 'Votre position', 'loc.sub': 'Avec votre accord, nous centrons la carte sur vous et calculons les distances. Vous pouvez continuer sans.',
    'loc.consent': 'J’ai lu l’avis de confidentialité et j’accepte que VibeMaps utilise ma position pendant que j’utilise l’application.',
    'loc.read': 'Lire l’avis de confidentialité', 'loc.enable': 'Activer la position', 'loc.skip': 'Continuer sans position',
    'loc.ok': 'Position activée', 'loc.denied': 'Impossible d’accéder à votre position. Vous pourrez l’activer plus tard depuis votre profil.', 'loc.unsupported': 'Votre navigateur ne gère pas la géolocalisation.',
    'loc.need_consent': 'Cochez la case pour activer la position.',

    'plan.title': 'Choisissez votre formule', 'plan.sub': 'Commencez gratuitement et passez à Premium quand vous voulez.',
    'plan.free': 'Gratuit', 'plan.free.price': '0 £', 'plan.premium': 'Premium', 'plan.price': '5 £/mois', 'plan.price.short': '5 £',
    'plan.popular': 'Recommandé',
    'plan.free.f1': 'Carte en direct des zones animées', 'plan.free.f2': 'Votre compatibilité par zone', 'plan.free.f3': 'Profil moyen des personnes de chaque zone',
    'plan.free.no': 'Sans le nom des bars ni des lieux',
    'plan.prem.f0': 'Tout ce qui est dans Gratuit', 'plan.prem.f1': 'Noms des bars, clubs et terrasses sur la carte',
    'plan.prem.f2': 'Affluence en direct et compatibilité par lieu', 'plan.prem.f3': 'Réservations directes et contacts des promoteurs', 'plan.prem.f4': 'Favoris et recherche avec filtres',
    'plan.cta.free': 'Rester en Gratuit', 'plan.cta.premium': 'Essayer Premium', 'plan.cancel': 'Annulez quand vous voulez depuis votre profil.',

    'ck.title': 'Activer Premium', 'ck.line': 'VibeMaps Premium, abonnement mensuel', 'ck.total': 'Total par mois',
    'ck.demo': 'Version de démonstration : aucun paiement n’est prélevé. Le paiement réel sera activé une fois le prestataire de paiement connecté.',
    'ck.confirm': 'Activer Premium', 'ck.pay': 'Continuer vers le paiement', 'ck.renew': 'Renouvelé chaque mois jusqu’à votre annulation.',
    'ck.success': 'Premium activé. Les lieux sont maintenant débloqués.',

    'nav.map': 'Carte', 'nav.explore': 'Explorer', 'nav.radar': 'Radar', 'nav.favs': 'Favoris', 'nav.profile': 'Profil',
    'mom.ahora': 'Maintenant', 'mom.noche': 'Ce soir', 'mom.dia': 'En journée',
    'theme.auto': 'Automatique', 'theme.dark': 'Sombre', 'theme.light': 'Clair',
    'lvl.alta': 'Votre spot', 'lvl.media': 'Ambiance mixte', 'lvl.baja': 'Autre ambiance', 'lvl.gris': 'Peu de monde',

    'map.hint': 'Touchez une zone pour voir qui s’y trouve',
    'map.lock': 'Lieux et bars avec Premium', 'map.zoom': 'Zoomez pour voir les lieux',
    'map.sum.title.noche': 'Ce soir à {city}', 'map.sum.title.dia': '{city} en journée',
    'map.sum.best': 'Meilleure zone pour vous', 'map.sum.hot': 'Zone la plus animée', 'map.sum.people': 'personnes',
    'map.sum.venues': '{n} lieux ouverts',
    'map.locate': 'Centrer sur ma position', 'map.far': 'Vous êtes loin de {city} ; changez de ville depuis le sélecteur de la carte.', 'map.nopos': 'Activez la position depuis votre profil pour centrer la carte sur vous.',
    'people.approx': '≈{n} personnes',

    'z.why': 'Pourquoi ça vous correspond', 'z.people': 'Qui est là', 'z.venues': 'Lieux de la zone',
    'z.avg_age': 'Âge moyen', 'z.years': '{n} ans', 'z.women': 'Femmes', 'z.men': 'Hommes', 'z.ages': 'Âges', 'z.styles': 'Styles', 'z.sectors': 'Secteurs', 'z.nat': 'Nationalités', 'z.intl': '{n} % d’internationaux',
    'z.locked.title': '{n} lieux dans cette zone', 'z.locked.sub': 'Avec Premium, vous voyez leurs noms et leur affluence en direct, et vous pouvez réserver.',
    'z.locked.cta': 'Débloquer avec Premium',
    'z.venue_types': '{n} {t}',

    'tipo.club': 'Club', 'tipo.cocktail': 'Bar à cocktails', 'tipo.bar': 'Bar', 'tipo.rooftop': 'Rooftop', 'tipo.sala': 'Salle de concerts', 'tipo.terraza': 'Terrasse', 'tipo.parque': 'Parc',
    'tipo.club.p': 'clubs', 'tipo.cocktail.p': 'bars à cocktails', 'tipo.bar.p': 'bars', 'tipo.rooftop.p': 'rooftops', 'tipo.sala.p': 'salles de concerts', 'tipo.terraza.p': 'terrasses', 'tipo.parque.p': 'parcs',

    'l.in': '{tipo} à {zona}', 'l.opened': 'Ouvert', 'l.closed': 'Fermé, ouvre à {h}', 'l.occ': '{p} % de remplissage, ≈{n} personnes',
    'l.partner': 'Réservation directe', 'l.hours': 'Horaires', 'l.music': 'Musique', 'l.price': 'Prix', 'l.capacity': 'Capacité',
    'tab.summary': 'Résumé', 'tab.people': 'Public', 'tab.book': 'Réserver',
    'l.fav.add': 'Ajouter aux favoris', 'l.fav.del': 'Retirer des favoris',
    'l.promoter': 'Promoteur', 'l.whatsapp': 'WhatsApp', 'l.call': 'Appeler', 'l.instagram': 'Instagram',
    'l.live': 'Statistiques en direct', 'l.live.sub': 'Affluence estimée, simulée dans cette version et actualisée toutes les quelques secondes.',
    'l.nopartner': 'Ce lieu ne propose pas encore la réservation directe sur VibeMaps.', 'l.back': 'Retour à la zone',
    'l.contact_demo': 'Les coordonnées sont fictives dans cette démo.',

    'r.title': 'Réserver', 'r.type': 'Type de réservation', 'r.date': 'Date', 'r.time': 'Heure', 'r.guests': 'Personnes', 'r.name': 'Au nom de',
    'r.submit': 'Confirmer la réservation', 'r.done': 'Réservation confirmée (démo). Le lieu recevra votre demande.',
    'r.t.lista': 'Liste', 'r.t.entrada': 'Billet', 'r.t.reservado': 'Carré VIP', 'r.t.mesa': 'Table',
    'r.err': 'Vérifiez la date et l’heure.', 'r.demo': 'Dans la démo, la confirmation est simulée.',

    'ex.title': 'Explorer', 'ex.sub.noche': '{n} lieux ouverts ce soir', 'ex.sub.dia': '{n} lieux ouverts en journée',
    'ex.f.todos': 'Tous', 'ex.f.parati': 'Pour vous', 'ex.f.club': 'Clubs', 'ex.f.bar': 'Bars et rooftops', 'ex.f.terraza': 'Terrasses et plein air', 'ex.f.partner': 'Réservation directe',
    'ex.empty': 'Aucun lieu ne correspond à ce filtre pour le moment.', 'ex.all': 'Tout voir',
    'ex.locked.title': 'Découvrez où sortir', 'ex.locked.sub': '{n} lieux sont ouverts à {city} en ce moment. Avec Premium, vous voyez leurs noms, leur ambiance et votre compatibilité.',

    'fav.title': 'Favoris', 'fav.sub': 'Vos lieux enregistrés', 'fav.empty': 'Pas encore de favoris. Ouvrez un lieu et touchez le cœur.',
    'fav.locked.title': 'Enregistrez vos lieux', 'fav.locked.sub': 'Les favoris font partie de Premium.',

    'rd.title': 'Radar', 'rd.sub': 'Comment est {city} pour vous en ce moment', 'rd.global': 'Compatibilité globale', 'rd.vibe': 'personnes qui vous ressemblent', 'rd.ranking': 'Classement des zones', 'rd.best': 'Profil moyen de votre meilleure zone',
    'rd.of': 'sur {n} dans la ville',

    'pf.title': 'Profil', 'pf.plan': 'Votre formule', 'pf.free': 'Formule Gratuit', 'pf.premium': 'Formule Premium',
    'pf.renews': 'Renouvelé le {d}', 'pf.ends': 'Premium actif jusqu’au {d}', 'pf.upgrade': 'Passer à Premium', 'pf.cancel': 'Annuler l’abonnement',
    'pf.cancel.q': 'Annuler Premium ? Vous gardez l’accès jusqu’à la fin de la période déjà payée.', 'pf.cancel.done': 'Abonnement annulé.', 'pf.resume': 'Réactiver l’abonnement',
    'city.london': 'Londres', 'city.madrid': 'Madrid', 'pf.city': 'Ville', 'city.label': 'Ville', 
    'l.closed2': 'Fermé en ce moment', 'l.hours.na': 'Horaires indisponibles', 'l.addr': 'Adresse', 'l.web': 'Site web', 'l.source': 'Données du lieu : © contributeurs OpenStreetMap. La capacité et l’affluence sont des estimations simulées.', 'l.contact_real': 'Contactez directement le lieu ; données OpenStreetMap, peuvent être obsolètes.',
    'pf.language': 'Langue', 'pf.theme': 'Thème', 'pf.moment': 'Moment de la carte',
    'pf.reservations': 'Mes réservations', 'pf.res.none': 'Vous n’avez encore fait aucune réservation.', 'pf.res.locked': 'Les réservations font partie de Premium.',
    'pf.res.guests': '{n} personnes', 'pf.res.cancel': 'Annuler',
    'pf.edit': 'Modifier mon profil', 'pf.export': 'Télécharger mes données', 'pf.delete': 'Supprimer mes données', 'pf.delete.q': 'Votre profil et vos données seront supprimés de cet appareil. Continuer ?',
    'pf.loc.on': 'Position activée', 'pf.loc.off': 'Position désactivée', 'pf.loc.enable': 'Activer la position', 'pf.loc.revoke': 'Désactiver la position',
    'pf.install': 'Installer VibeMaps', 'pf.install.ios': 'Pour l’installer sur iPhone : touchez Partager dans Safari, puis « Sur l’écran d’accueil ».',
    'pf.privacy': 'Avis de confidentialité', 'pf.terms': 'Conditions Premium', 'pf.venues': 'Vous avez un lieu ou vous êtes promoteur ?', 'pf.venues.cta': 'Écrivez-nous',
    'pf.about': 'Votre profil',

    'pw.title': 'Réservé à Premium', 'pw.sub': 'Voyez le nom des bars et des clubs, l’affluence en direct, et réservez sans quitter l’application.', 'pw.cta': 'Essayer Premium pour {price}', 'pw.later': 'Pas maintenant',

    'toast.hello': 'Bonjour {name}. Touchez une zone pour voir qui s’y trouve.',
    'toast.saved': 'Modifications enregistrées.', 'toast.fav.add': 'Ajouté aux favoris.', 'toast.fav.del': 'Retiré des favoris.', 'toast.reserved': 'Réservation confirmée.',
    'toast.exported': 'Données téléchargées.', 'toast.updated': 'Application mise à jour.', 'toast.offline': 'Hors ligne : le fond de carte peut ne pas se charger.',

    'privacy.title': 'Avis de confidentialité',
    'privacy.body': '<p><b>Responsable.</b> VibeMaps (contact : {contact}). Texte indicatif : un avocat doit le relire avant le lancement.</p><p><b>Quelles données.</b> Celles de votre profil (e-mail, prénom, âge, sexe, nationalité, métier, secteur, style et préférences) et, si vous l’autorisez, votre position approximative pendant que vous utilisez l’application.</p><p><b>Pourquoi.</b> Calculer votre compatibilité avec chaque zone et chaque lieu, et afficher des statistiques d’affluence agrégées et anonymes.</p><p><b>Base légale.</b> Votre consentement (art. 6.1.a du RGPD et UK GDPR), que vous pouvez retirer à tout moment depuis Profil.</p><p><b>Où elles sont stockées.</b> Dans cette version, uniquement sur votre appareil (stockage local du navigateur).</p><p><b>Vos droits.</b> Accès, rectification, effacement, opposition et portabilité, depuis Profil ou en écrivant au contact. Vous pouvez saisir l’AEPD (Espagne), l’ICO (Royaume-Uni) ou la CNIL (France).</p>',
    'terms.title': 'Conditions Premium',
    'terms.body': '<p>VibeMaps Premium coûte {price} par mois et se renouvelle chaque mois jusqu’à ce que vous l’annuliez depuis Profil.</p><p>Si vous annulez, vous gardez l’accès jusqu’à la fin de la période déjà payée. Aucun engagement de durée.</p><p>Premium débloque les noms des lieux, l’affluence en direct, les réservations directes, les favoris et la recherche avec filtres.</p><p>Version de démonstration : aucun paiement réel n’est prélevé pour le moment.</p>',
    'offline': 'Vous êtes hors ligne',

    'r.age_close': 'Âge moyen de {n} ans, comme vous',
    'r.age_diff': 'Âge moyen de {n} ans, {d} ans d’écart avec vous',
    'r.style': 'Le style {s} domine',
    'r.sector': 'Secteurs les plus courants : {s}',
    'r.music': 'On y écoute {m}',

    'o.estilo.arreglado': 'Soigné', 'o.estilo.pijo': 'Chic', 'o.estilo.rollo': 'Cool', 'o.estilo.alternativo': 'Alternatif', 'o.estilo.casual': 'Décontracté', 'o.estilo.deportivo': 'Sportif',
    'o.sector.finanzas': 'Finance', 'o.sector.consultoria': 'Conseil', 'o.sector.tecnologia': 'Technologie', 'o.sector.sanidad': 'Santé', 'o.sector.derecho': 'Droit', 'o.sector.educacion': 'Éducation',
    'o.sector.arte': 'Art et culture', 'o.sector.hosteleria': 'Hôtellerie-restauration', 'o.sector.comercio': 'Commerce', 'o.sector.ingenieria': 'Ingénierie', 'o.sector.estudiante': 'Étudiant', 'o.sector.otro': 'Autre',
    'o.ambiente.fiesta': 'Fête', 'o.ambiente.copas': 'Verres', 'o.ambiente.terraza': 'Terrasse', 'o.ambiente.conciertos': 'Concerts', 'o.ambiente.tranquilo': 'Tranquille', 'o.ambiente.deporte': 'Sport',
    'o.musica.comercial': 'Commerciale', 'o.musica.electronica': 'Électronique', 'o.musica.reggaeton': 'Reggaeton', 'o.musica.techno': 'Techno', 'o.musica.indie': 'Indie', 'o.musica.rock': 'Rock',

    'tag.cocktails': 'Verres et cocktails', 'tag.dress': 'Dress code soigné', 'tag.exclusive': 'Ambiance exclusive', 'tag.bigclubs': 'Grandes discothèques', 'tag.late': 'Fêtes jusqu’au bout de la nuit', 'tag.vip': 'Carrés VIP',
    'tag.character': 'Bars de caractère', 'tag.indie_electro': 'Indie et électro', 'tag.young': 'Public jeune', 'tag.inclusive': 'Ambiance inclusive', 'tag.terraces': 'Terrasses', 'tag.night': 'Vie nocturne animée',
    'tag.multicultural': 'Multiculturel', 'tag.live': 'Art et musique live', 'tag.cheap': 'Petits prix', 'tag.university': 'Public étudiant', 'tag.student': 'Prix étudiants', 'tag.early': 'Soirées tôt',
    'tag.walk': 'Terrasses et balades', 'tag.brunch': 'Brunch et vermouth', 'tag.morning': 'Sport le matin', 'tag.run': 'Running et balades', 'tag.river': 'Terrasses au bord du fleuve', 'tag.relaxed': 'Ambiance détendue',
    'tag.tourist': 'Beaucoup de touristes', 'tag.tapas': 'Tapas et petites bières', 'tag.sunday': 'Marché aux puces du dimanche', 'tag.neighbourhood': 'Quartier de charme', 'tag.calmbars': 'Bars tranquilles',

    'and': ' et '
  }
};

/* Descripciones de los locales */
const DESC = {
  l_nocturne: { es: 'Club de dos salas en pleno Soho, con DJs residentes y lista hasta la medianoche.', en: 'Two-room Soho club with resident DJs and guest list until midnight.', fr: 'Club à deux salles en plein Soho, DJ résidents et liste jusqu’à minuit.' },
  l_blueroom: { es: 'Coctelería íntima con luz azul y carta de autor para empezar la noche.', en: 'Intimate cocktail bar with blue lighting and a signature menu to start the night.', fr: 'Bar à cocktails intime à la lumière bleue, carte d’auteur pour commencer la soirée.' },
  l_dukeyard: { es: 'Bar de callejón con barra larga y buena música todo el día.', en: 'Alley bar with a long counter and good music all day.', fr: 'Bar de ruelle avec un long comptoir et de la bonne musique toute la journée.' },
  l_marlowe: { es: 'Club selecto de Mayfair con código de vestimenta, mesas y servicio de botella.', en: 'Select Mayfair club with a dress code, tables and bottle service.', fr: 'Club sélect de Mayfair : dress code, tables et service bouteille.' },
  l_gilded: { es: 'Salón de cócteles dorado, con coctelería clásica y reservas recomendadas.', en: 'Gilded cocktail lounge with classic drinks; booking recommended.', fr: 'Salon de cocktails doré, classiques revisités, réservation conseillée.' },
  l_sky: { es: 'Rooftop elegante con vistas a los tejados de Mayfair, perfecto al atardecer.', en: 'Elegant rooftop overlooking Mayfair’s rooftops, perfect at sunset.', fr: 'Rooftop élégant surplombant les toits de Mayfair, parfait au coucher du soleil.' },
  l_warehouse: { es: 'Nave de ladrillo con sonido potente y sesiones de techno hasta el amanecer.', en: 'Brick warehouse with a powerful sound system and techno until sunrise.', fr: 'Entrepôt en briques, son puissant et techno jusqu’à l’aube.' },
  l_brickyard: { es: 'Bar con patio interior, DJs locales y ambiente creativo de Shoreditch.', en: 'Courtyard bar with local DJs and Shoreditch’s creative crowd.', fr: 'Bar avec cour intérieure, DJ locaux et public créatif de Shoreditch.' },
  l_rooftopeast: { es: 'Terraza en azotea con cócteles, música electrónica y vistas a la City.', en: 'Rooftop terrace with cocktails, electronic music and City views.', fr: 'Terrasse sur le toit : cocktails, électro et vue sur la City.' },
  l_dalsonstage: { es: 'Sala de conciertos con bandas emergentes y entradas asequibles.', en: 'Live music venue with emerging bands and affordable tickets.', fr: 'Salle de concerts avec groupes émergents et billets abordables.' },
  l_basement: { es: 'Sótano oscuro con sistema de sonido de club y sesiones de techno y house.', en: 'Dark basement with a club-grade sound system and techno and house sessions.', fr: 'Sous-sol sombre, sono de club, sessions techno et house.' },
  l_kingsland: { es: 'Bar de esquina de toda la vida: cerveza, rock y buena gente.', en: 'Classic corner bar: beer, rock and good company.', fr: 'Bar de coin classique : bière, rock et bonne compagnie.' },
  l_electricyard: { es: 'Sala emblemática para conciertos de rock e indie con gran aforo.', en: 'Landmark venue for big rock and indie gigs.', fr: 'Salle emblématique pour de grands concerts rock et indé.' },
  l_locklane: { es: 'Pub junto al canal con jukebox y terraza cuando hace sol.', en: 'Canal-side pub with a jukebox and a terrace when the sun is out.', fr: 'Pub au bord du canal avec jukebox et terrasse quand il fait beau.' },
  l_marketstage: { es: 'Terraza del mercado con comida callejera y música en directo los fines de semana.', en: 'Market terrace with street food and live music at weekends.', fr: 'Terrasse du marché : street food et musique live le week-end.' },
  l_electricbrix: { es: 'Nave enorme con fiesta de electrónica y ritmos latinos hasta tarde.', en: 'Huge warehouse with electronic and Latin rhythms until late.', fr: 'Immense entrepôt : électro et rythmes latins jusque tard.' },
  l_villagebar: { es: 'Bar animado con DJ y cócteles a buen precio en el corazón de Brixton.', en: 'Lively bar with a DJ and well-priced cocktails in the heart of Brixton.', fr: 'Bar animé avec DJ et cocktails à prix doux au cœur de Brixton.' },
  l_rooftoppeck: { es: 'Azotea con vistas a todo Londres, DJs al atardecer y mucho ambiente artístico.', en: 'Rooftop with views across London, sunset DJs and an artsy crowd.', fr: 'Rooftop avec vue sur tout Londres, DJ au coucher du soleil et public artiste.' },
  l_railarch: { es: 'Club bajo los arcos del tren: techno, bajos fuertes y puerta sin postureo.', en: 'Club under the railway arches: techno, heavy bass and no-attitude door.', fr: 'Club sous les arches du train : techno, basses lourdes, sans chichis.' },
  l_porto: { es: 'Terraza tranquila para el brunch y una copa de vino entre las casas de colores.', en: 'Quiet terrace for brunch and a glass of wine among the pastel houses.', fr: 'Terrasse calme pour un brunch et un verre de vin entre les maisons colorées.' },
  l_ladbroke: { es: 'Vinoteca pequeña y acogedora con carta de vinos por copas.', en: 'Small, cosy wine bar with a by-the-glass list.', fr: 'Petit bar à vins chaleureux avec carte au verre.' },
  l_canalside: { es: 'Terraza junto al canal con comida, cerveza artesanal y mucha gente joven.', en: 'Canalside terrace with food, craft beer and a young crowd.', fr: 'Terrasse au bord du canal : cuisine, bière artisanale et public jeune.' },
  l_granary: { es: 'Club en un antiguo almacén con electrónica y house para toda la noche.', en: 'Club in a former warehouse with electronic and house all night.', fr: 'Club dans un ancien entrepôt : électro et house toute la nuit.' },
  l_claphamcommon: { es: 'Jardín-terraza junto al parque, ideal para tardes largas y barbacoa.', en: 'Garden terrace by the common, ideal for long afternoons and barbecues.', fr: 'Jardin-terrasse près du parc, idéal pour de longs après-midis et barbecues.' },
  l_nightowl: { es: 'Club de pop y reggaeton con barra libre de ambiente y colas los sábados.', en: 'Pop and reggaeton club with a big party crowd and queues on Saturdays.', fr: 'Club pop et reggaeton, grosse ambiance et files d’attente le samedi.' },
  l_riverdeck: { es: 'Terraza sobre el Támesis con cerveza, picoteo y vistas de la ciudad.', en: 'Thames-side terrace with beer, small plates and city views.', fr: 'Terrasse sur la Tamise : bière, petites assiettes et vue sur la ville.' },
  l_borough: { es: 'Taberna de cervezas artesanas junto al mercado de Borough.', en: 'Craft beer taproom next to Borough Market.', fr: 'Taproom de bières artisanales à côté de Borough Market.' },
  l_shardview: { es: 'Bar en un piso alto con cócteles y vistas de 360º a Londres.', en: 'High-floor bar with cocktails and 360° views over London.', fr: 'Bar en étage avec cocktails et vue à 360° sur Londres.' },
  ambar: { es: 'Discoteca de referencia del barrio, con reservados y una terraza cubierta en invierno.', en: 'The neighbourhood’s go-to club, with VIP areas and a terrace that is covered in winter.', fr: 'La discothèque de référence du quartier, avec carrés VIP et une terrasse couverte l’hiver.' },
  velvet: { es: 'Coctelería de autor con luz baja, ideal para la primera copa antes de salir.', en: 'Dimly lit signature cocktail bar, perfect for the first drink before heading out.', fr: 'Bar à cocktails d’auteur à la lumière tamisée, idéal pour le premier verre avant de sortir.' },
  serrano22: { es: 'Terraza amplia con sofás, se llena en cuanto sale el sol.', en: 'Spacious terrace with sofas that fills up as soon as the sun comes out.', fr: 'Grande terrasse avec canapés, pleine dès que le soleil pointe.' },
  nebula: { es: 'La macrodiscoteca de Azca: tres salas, reservados y fiesta hasta el amanecer.', en: 'Azca’s mega-club: three rooms, VIP areas and partying until sunrise.', fr: 'La méga-discothèque d’Azca : trois salles, carrés VIP et fête jusqu’à l’aube.' },
  norte: { es: 'Sala industrial con cabina de sonido grande y sesiones de techno.', en: 'Industrial space with a big sound booth and techno sessions.', fr: 'Salle industrielle avec une grande cabine son et des sessions techno.' },
  oficina: { es: 'Bar de copas para after work que se alarga hasta la madrugada.', en: 'After-work bar that keeps going into the small hours.', fr: 'Bar d’after-work qui se prolonge jusqu’au petit matin.' },
  almendro: { es: 'Bar de barrio con vinilos, copas baratas y mucha conversación.', en: 'Neighbourhood bar with vinyl, cheap drinks and plenty of conversation.', fr: 'Bar de quartier avec vinyles, verres pas chers et beaucoup de discussions.' },
  cabina: { es: 'Sala pequeña con conciertos indie casi todas las noches.', en: 'Small venue with indie gigs almost every night.', fr: 'Petite salle avec des concerts indie presque tous les soirs.' },
  taller29: { es: 'Bar y sala de sesiones con DJs locales y entrada por lista.', en: 'Bar and DJ room with local DJs and guest-list entry.', fr: 'Bar et salle de sessions avec DJ locaux et entrée sur liste.' },
  pluma: { es: 'Coctelería con espectáculos en directo y ambiente muy abierto.', en: 'Cocktail bar with live shows and a very open atmosphere.', fr: 'Bar à cocktails avec spectacles en direct et ambiance très ouverte.' },
  arlequin: { es: 'Club con pista grande, pop y electrónica hasta tarde.', en: 'Club with a big dance floor, pop and electronic until late.', fr: 'Club avec grande piste, pop et électro jusqu’à tard.' },
  hortaleza: { es: 'Terraza en plena calle peatonal, perfecta para el vermú y la cena.', en: 'Terrace on a pedestrian street, perfect for vermouth and dinner.', fr: 'Terrasse en pleine rue piétonne, parfaite pour le vermouth et le dîner.' },
  tamarindo: { es: 'Bar multicultural con cócteles baratos y música de todo el mundo.', en: 'Multicultural bar with cheap cocktails and music from around the world.', fr: 'Bar multiculturel avec cocktails abordables et musique du monde entier.' },
  acequia: { es: 'Sala de conciertos con aforo medio y programación de música en directo.', en: 'Mid-sized live music venue with a full programme of gigs.', fr: 'Salle de concerts de taille moyenne avec une programmation live.' },
  campus: { es: 'El club universitario por excelencia: precios de estudiante y mucho ambiente.', en: 'The classic student club: student prices and a great atmosphere.', fr: 'Le club étudiant par excellence : prix étudiants et super ambiance.' },
  cantina: { es: 'Bar de copas con barra larga, futbolín y música comercial.', en: 'Bar with a long counter, table football and commercial music.', fr: 'Bar avec long comptoir, baby-foot et musique commerciale.' },
  estanque: { es: 'Terraza junto al parque, buena para brunch de día y copas al atardecer.', en: 'Terrace by the park, great for brunch by day and drinks at sunset.', fr: 'Terrasse près du parc, idéale pour le brunch de jour et les verres au coucher du soleil.' },
  brunch: { es: 'Café con terraza y brunch de fin de semana, tranquilo y soleado.', en: 'Café with a terrace and weekend brunch, calm and sunny.', fr: 'Café avec terrasse et brunch le week-end, calme et ensoleillé.' },
  manzanares: { es: 'Chiringuito junto al río con música suave y mucha gente al atardecer.', en: 'Riverside beach bar with soft music and a crowd at sunset.', fr: 'Guinguette au bord du fleuve avec musique douce et beaucoup de monde au coucher du soleil.' },
  campa: { es: 'Gran explanada verde para pícnic, deporte y música en directo ocasional.', en: 'Large green lawn for picnics, sport and the odd live gig.', fr: 'Grande esplanade verte pour pique-niques, sport et concerts occasionnels.' },
  azotea: { es: 'Azotea con vistas al centro, cócteles y sesiones de DJ al atardecer.', en: 'Rooftop with views over the centre, cocktails and sunset DJ sets.', fr: 'Rooftop avec vue sur le centre, cocktails et DJ sets au coucher du soleil.' },
  meridiano: { es: 'Club céntrico con cuatro salas y colas largas los sábados.', en: 'Central club with four rooms and long queues on Saturdays.', fr: 'Club central avec quatre salles et de longues files le samedi.' },
  bodega: { es: 'Bodega de barrio con vermú de grifo y tapas hasta la madrugada.', en: 'Old-school bodega with vermouth on tap and tapas until late.', fr: 'Bodega de quartier avec vermouth à la pression et tapas jusqu’au bout de la nuit.' },
  cava: { es: 'Terraza en la calle más famosa de tapas, llena todo el fin de semana.', en: 'Terrace on the most famous tapas street, packed all weekend.', fr: 'Terrasse dans la rue la plus célèbre pour les tapas, pleine tout le week-end.' },
  vermut45: { es: 'Vermutería clásica con barra de azulejos y buen ambiente de domingo.', en: 'Classic vermouth bar with a tiled counter and a great Sunday crowd.', fr: 'Vermouthrie classique avec comptoir en azulejos et super ambiance du dimanche.' },
  olavide: { es: 'Rooftop con vistas a la plaza y carta de cócteles de temporada.', en: 'Rooftop overlooking the square with a seasonal cocktail menu.', fr: 'Rooftop avec vue sur la place et carte de cocktails de saison.' },
  breton: { es: 'Café-bar tranquilo, ideal para charlar con copa y buena música.', en: 'Quiet café-bar, ideal for chatting over a drink with good music.', fr: 'Café-bar tranquille, idéal pour discuter autour d’un verre avec de la bonne musique.' }
};

let LANG = 'es';
function setLangId(l) { LANG = I18N[l] ? l : 'es'; document.documentElement.lang = LANG; }
function t(key, vars) {
  let s = (I18N[LANG] && I18N[LANG][key]);
  if (s === undefined) s = I18N.es[key];
  if (s === undefined) return key;
  if (vars) s = s.replace(/\{(\w+)\}/g, (m, k) => (vars[k] !== undefined ? vars[k] : m));
  return s;
}
function localeTag() { return { es: 'es-ES', en: 'en-GB', fr: 'fr-FR' }[LANG]; }
function nombrePais(code) {
  if (code === 'XX') return t('nat.other');
  try { return new Intl.DisplayNames([localeTag()], { type: 'region' }).of(code) || code; } catch (e) { return code; }
}
