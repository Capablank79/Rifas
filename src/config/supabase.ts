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
  username?: string
  password?: string
  expires_at?: string
  status?: 'pending' | 'active' | 'expired'
  email_sent?: boolean
  created_at?: string
}

// Tipo para validación de credenciales
export interface CredentialValidation {
  is_valid: boolean
  user_id?: string
  expires_at?: string
  nombre?: string
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

// Función para validar credenciales de demo
export const validateDemoCredentials = async (username: string, password: string): Promise<CredentialValidation> => {
  // Si estamos usando credenciales placeholder, simular la respuesta
  if (supabaseUrl === 'https://placeholder.supabase.co') {
    console.warn('⚠️ Using placeholder Supabase credentials. Validation simulated.')
    return {
      is_valid: username === 'demo_test' && password === 'TEST1234',
      user_id: 'placeholder-id',
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      nombre: 'Usuario Demo'
    }
  }

  const { data, error } = await supabase
    .rpc('validate_demo_credentials', {
      input_username: username,
      input_password: password
    })

  if (error) {
    throw error
  }

  return data?.[0] || { is_valid: false }
}

// Función para obtener credenciales por ID (para envío de email)
export const getDemoCredentials = async (requestId: string) => {
  // Si estamos usando credenciales placeholder, simular la respuesta
  if (supabaseUrl === 'https://placeholder.supabase.co') {
    console.warn('⚠️ Using placeholder Supabase credentials. Credentials simulated.')
    return {
      username: 'demo_test',
      password: 'TEST1234',
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      nombre: 'Usuario Demo',
      email: 'test@example.com'
    }
  }

  const { data, error } = await supabase
    .from('demo_requests')
    .select('username, password, expires_at, nombre, email')
    .eq('id', requestId)
    .single()

  if (error) {
    throw error
  }

  return data
}

// Función para marcar email como enviado
export const markEmailSent = async (requestId: string) => {
  // Si estamos usando credenciales placeholder, simular la respuesta
  if (supabaseUrl === 'https://placeholder.supabase.co') {
    console.warn('⚠️ Using placeholder Supabase credentials. Email mark simulated.')
    return true
  }

  const { error } = await supabase
    .from('demo_requests')
    .update({ email_sent: true })
    .eq('id', requestId)

  if (error) {
    throw error
  }

  return true
}