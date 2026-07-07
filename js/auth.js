// auth.js
import { supabase } from './supabase-client.js';

// 1. FUNCIÓN PARA REGISTRAR UN NUEVO USUARIO
export async function registrar(email, password, name, phone) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    name: name,
    phone: phone
  });

  if (error) {
    console.error("Error al registrar usuario:", error.message);
    alert("Error: " + error.message);
  } else {
    console.log("Usuario registrado con éxito:", data);
    alert("¡Registro completado! Por favor, revisa tu correo electrónico para confirmar tu cuenta.");
  }
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
    alert("¡Bienvenido!");
    // Aquí puedes redirigir al usuario a su panel privado, por ejemplo:
    // window.location.href = './dashboard.html';
  }
}