import { supabase } from './conexion.js';

// Actualiza el link de "Iniciar sesión" del header según si hay sesión activa
export async function actualizarNav() {
  const { data: { session } } = await supabase.auth.getSession();
  const loginLink = document.querySelector('.nav-links a[href="login.html"]');

  if (session && loginLink) {
    loginLink.textContent = 'Cerrar sesión';
    loginLink.href = '#';
    loginLink.addEventListener('click', async (e) => {
      e.preventDefault();
      await supabase.auth.signOut();
      // El reload lo dispara el listener de abajo (evento SIGNED_OUT)
    });
  }

  // Solo recarga cuando el evento sea explícitamente un cierre de sesión.
  // OJO: onAuthStateChange también dispara al cargar la página con el estado
  // inicial (evento INITIAL_SESSION). Si reaccionáramos a "session === null"
  // en general, cualquier visitante sin sesión (el caso normal) entraría en
  // un bucle infinito de recargas.
  supabase.auth.onAuthStateChange((event) => {
    if (event === 'SIGNED_OUT') {
      window.location.reload();
    }
  });

  return session;
}

// Redirige a login.html si NO hay sesión activa (usar en páginas protegidas)
export async function requerirSesion(destino = 'login.html') {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    window.location.href = destino;
    return null;
  }
  return session;
}

// Redirige a destino si YA hay sesión activa (usar en login.html / register.html)
export async function redirigirSiHaySesion(destino = 'index.html') {
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    window.location.href = destino;
  }
  return session;
}