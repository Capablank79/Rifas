import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://fdqmyjuzgqvklhdesgik.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkcW15anV6Z3F2a2xoZGVzZ2lrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQxMTQ4MzIsImV4cCI6MjA2OTY5MDgzMn0.kJMvEuoO-0BSdYRAi1Yc00erlCqnoj9Kd2R3z9VWUaM'

// Advertencia en desarrollo si las variables no están configuradas
if (import.meta.env.DEV && (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY)) {
  console.warn('⚠️ Supabase environment variables not configured. Using placeholder values.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para la tabla demo_requests
export interface DemoRequest {
  id?: string
  nombre: string
  email: string
  telefono: string
  tipo_rifa?: string
  frecuencia?: string
  comentarios?: string
  created_at?: string
}

// Función para insertar una nueva solicitud de demo
export const insertDemoRequest = async (data: Omit<DemoRequest, 'id' | 'created_at'>) => {
  // Si estamos usando credenciales placeholder, simular la respuesta
  if (supabaseUrl === 'https://placeholder.supabase.co') {
    console.warn('⚠️ Using placeholder Supabase credentials. Request simulated.')
    return [{ ...data, id: 'placeholder-id', created_at: new Date().toISOString() }]
  }

  const { data: result, error } = await supabase
    .from('demo_requests')
    .insert([data])
    .select()

  if (error) {
    throw error
  }

  return result
}

// Función para obtener todas las solicitudes de demo (para admin)
export const getDemoRequests = async () => {
  // Si estamos usando credenciales placeholder, simular la respuesta
  if (supabaseUrl === 'https://placeholder.supabase.co') {
    console.warn('⚠️ Using placeholder Supabase credentials. Returning empty data.')
    return []
  }

  const { data, error } = await supabase
    .from('demo_requests')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return data
}