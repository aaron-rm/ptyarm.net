import { supabase } from './conexion.js';

// 1. FUNCIÓN PARA REGISTRAR
export async function registrar(email, password, nombre, numero, contactar) {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: email,
    password: password
  });

  if (authError) {
    console.error("❌ Error al crear cuenta:", authError.message);
    alert("Error: " + authError.message);
    return;
  }

  const { data, error } = await supabase
    .from('usuario')
    .insert([
      {
        id: authData.user.id,
        nombre: nombre,
        email: email,
        numero: numero,
        contactar: contactar
      }
    ])
    .select();

  if (error) {
    console.error("❌ Error al guardar datos del usuario:", error.message);
    alert("Cuenta creada, pero hubo un error guardando tus datos: " + error.message);
    return;
  }

  console.log("✅ Usuario guardado con éxito:", data);

  // Si ya hay sesión activa (signUp la creó porque no requiere confirmación de correo)
  if (authData.session) {
    alert("¡Cuenta creada e iniciada sesión con éxito!");
    window.location.href = './index.html';
    return;
  }

  // Si no hay sesión (ej. requiere confirmar correo), intentamos login manual
  const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  });

  if (loginError) {
    console.error("Error al iniciar sesión automáticamente:", loginError.message);
    alert("Cuenta creada. Por favor confirma tu correo antes de iniciar sesión.");
    return;
  }

  console.log("Sesión iniciada correctamente:", loginData);
  alert("¡Cuenta creada e iniciada sesión con éxito!");
  window.location.href = './index.html';
}

// 2. FUNCIÓN PARA INICIAR SESIÓN
export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  });

  if (error) {
    console.error("Error al iniciar sesión:", error.message);
    alert("Credenciales incorrectas: " + error.message);
  } else {
    console.log("Sesión iniciada correctamente:", data);
    window.location.href = './index.html';
  }
}

// 3. FUNCIÓN PARA CERRAR SESIÓN (útil desde cualquier página)
export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Error al cerrar sesión:", error.message);
    alert("Error al cerrar sesión: " + error.message);
    return;
  }
  window.location.href = './login.html';
}