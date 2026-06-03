import { createClient } from '@supabase/supabase-js'
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export const uploadReport = async (pdfBuffer, fileName) => {
  const { data, error } = await supabase.storage
    .from('Crayfish-Reports')
    .upload(`report-logs/${fileName}`, pdfBuffer, {
      contentType: 'application/pdf',
      upsert: true
    })
  if (error) throw error
  const { data: signedData } = await supabase.storage
    .from('Crayfish-Reports')
    .createSignedUrl(`report-logs/${fileName}`, 60 * 60 * 24 * 30)
  return signedData.signedUrl
}

export const uploadImage = async (buffer, fileName, contentType) => {
  const { data, error } = await supabase.storage
    .from('Crayfish-Reports')
    .upload(`habitat-images/${fileName}`, buffer, {
      contentType,
      upsert: true
    })
  if (error) throw error
  const { data: signedData } = await supabase.storage
    .from('Crayfish-Reports')
    .createSignedUrl(`habitat-images/${fileName}`, 60 * 60 * 24 * 365)
  return signedData.signedUrl
}