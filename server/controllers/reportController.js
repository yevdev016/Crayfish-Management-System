import { createClient } from '@supabase/supabase-js'
import { generateReport } from '../services/grokService.js'
import { generatePdf } from '../services/pdfService.js'
import { uploadReport } from '../services/supabaseService.js'
import * as habitatModel from '../models/habitatModel.js'
import * as saleStockModel from '../models/saleStockModel.js'
import * as lifecycleModel from '../models/lifecycleModel.js'
import * as activityModel from '../models/activityModel.js'
import db from '../configs/db.js'

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY)

export const getReportHistory = async (req, res) => {
  try {
    const result = await db.query(
      `SELECT id, report_name, report_type, storage_url, created_at
       FROM reports WHERE user_id = $1
       ORDER BY created_at DESC`,
      [req.user.id]
    )

    const valid = []
    for (const row of result.rows) {
      const { data } = await supabase.storage
        .from('Crayfish-Reports')
        .list('report-logs', { search: row.report_name, limit: 1 })

      if (data && data.length > 0) {
        valid.push(row)
      } else {
        await db.query(`DELETE FROM reports WHERE id = $1`, [row.id])
      }
    }

    res.json(valid)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const sanitize = {
  habitat: (rows) => rows.map(({ id, user_id, image, created_at, ...rest }) => rest),
  'sales-stock': (rows) => rows.map(({ id, user_id, habitat_id, created_at, ...rest }) => rest),
  lifecycle: ({ transitions, habitats }) => ({
    transitions: transitions.map(({ id, user_id, habitat_id, created_at, ...rest }) => rest),
    habitats: habitats.map(({ id, user_id, image, created_at, ...rest }) => rest)
  }),
  activity: (rows) => rows.map(({ id, user_id, ...rest }) => rest)
}

export const generateReportController = async (req, res) => {
  const { type } = req.body
  const userId = req.user.id
  try {
    let data
    switch (type) {
      case 'habitat':
        data = sanitize.habitat(await habitatModel.getAllHabitats(userId))
        break
      case 'sales-stock':
        data = sanitize['sales-stock'](await saleStockModel.getAllSaleStock(userId))
        break
      case 'lifecycle': {
        const transitions = sanitize.lifecycle({
          transitions: await lifecycleModel.getAllLifecycle(userId),
          habitats: await habitatModel.getAllHabitats(userId)
        })
        data = transitions
        break
      }
      case 'activity':
        data = sanitize.activity(await activityModel.getAllActivities(userId))
        break
      default:
        return res.status(400).json({ message: 'Invalid report type' })
    }
    const report = await generateReport(type, data)
    const pdfBuffer = await generatePdf(report, type)
    const date = new Date().toISOString().slice(0, 10)
    const fileName = `${type}_report_${date}.pdf`
    const pdfUrl = await uploadReport(pdfBuffer, fileName)
    await db.query(
      `INSERT INTO reports (user_id, report_name, report_type, storage_url)
       VALUES ($1, $2, $3, $4)`,
      [userId, fileName, type, pdfUrl]
    )
    res.json({ pdfUrl, reportName: fileName, type })
  } catch (err) {
    console.error('Report generation error:', err)
    res.status(500).json({ message: err.message || 'Failed to generate report' })
  }
}