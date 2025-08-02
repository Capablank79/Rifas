import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
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
  const { data, error } = await supabase
    .from('demo_requests')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return data
}