import PDFDocument from 'pdfkit'

const PAGE_MARGIN = 50
const PAGE_WIDTH = 595.28
const contentWidth = PAGE_WIDTH - PAGE_MARGIN * 2

const REMOVE_HEADERS = new Set([
  'id', 'user id', 'user_id', 'userid',
  'habitat id', 'habitat_id', 'habitatid',
  'image', 'notes', 'customer', 'customer name', 'customer_name',
  'created', 'created at', 'created_at',
  'updated', 'updated at', 'updated_at'
])

const cleanColumns = (rows) => {
  if (rows.length === 0) return rows
  const header = rows[0]
  const keep = []
  for (let i = 0; i < header.length; i++) {
    const lower = header[i].replace(/[:.]+$/, '').trim().toLowerCase()
    if (!REMOVE_HEADERS.has(lower)) keep.push(i)
  }
  if (keep.length === header.length) return rows
  return rows.map(row => keep.map(i => row[i]))
}

const drawTable = (doc, rows) => {
  rows = cleanColumns(rows)
  if (rows.length < 2) return

  const colCount = rows[0].length
  const colWidth = Math.max(65, contentWidth / colCount)
  const startX = PAGE_MARGIN
  let y = doc.y + 4

  const dataRows = rows.filter(r => !r.every(c => /^[-:]+$/.test(c.trim())))

  const heights = dataRows.map(row => {
    let maxH = 0
    for (const cell of row) {
      const h = doc.heightOfString(cell.trim(), { width: colWidth - 8 })
      maxH = Math.max(maxH, h + 10)
    }
    return Math.max(maxH, 22)
  })

  for (let r = 0; r < dataRows.length; r++) {
    const isHeader = r === 0
    const rowH = heights[r]

    if (y + rowH > doc.page.height - 60) {
      doc.addPage()
      y = 40
    }

    const cellAlign = isHeader ? 'center' : 'left'

    for (let c = 0; c < dataRows[r].length; c++) {
      const x = startX + c * colWidth
      doc.rect(x, y, colWidth, rowH).stroke('#ddd')
      doc.fontSize(9)
      doc.font(isHeader ? 'Helvetica-Bold' : 'Helvetica')
      doc.text(dataRows[r][c].trim(), x + 4, y + 4, {
        width: colWidth - 8,
        align: cellAlign,
        lineGap: 1
      })
    }

    y += rowH
  }

  doc.x = PAGE_MARGIN
  doc.y = y + 4
}

export const generatePdf = async (markdown, reportType) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: PAGE_MARGIN, size: 'A4' })
      const chunks = []
      doc.on('data', chunk => chunks.push(chunk))
      doc.on('end', () => resolve(Buffer.concat(chunks)))
      doc.on('error', reject)

      const title = reportType === 'sales-stock' ? 'Sales Stock' : reportType.charAt(0).toUpperCase() + reportType.slice(1)

      doc.fontSize(20).font('Helvetica-Bold')
      doc.text(`${title} Report`, { align: 'center' })
      doc.moveDown(0.2)
      doc.fontSize(10).font('Helvetica').fillColor('#888')
      doc.text(`Generated: ${new Date().toLocaleDateString()}`, { align: 'center' })
      doc.moveDown(1.2)
      doc.fillColor('#000')

      const lines = markdown.split('\n')
      const tableRows = []

      const flushTable = () => {
        if (tableRows.length > 0) {
          drawTable(doc, tableRows)
          tableRows.length = 0
        }
      }

      for (const line of lines) {
        const trimmed = line.trim()

        if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
          const cells = trimmed.split('|').filter(c => c !== '|')
          tableRows.push(cells.map(c => c.trim()))
          continue
        }

        flushTable()

        if (trimmed.startsWith('## ')) {
          doc.moveDown(0.35)
          doc.fontSize(14).font('Helvetica-Bold')
          doc.text(trimmed.replace('## ', ''), { width: contentWidth, align: 'left' })
          doc.moveDown(0.15)
        } else if (trimmed.startsWith('### ')) {
          doc.moveDown(0.25)
          doc.fontSize(12).font('Helvetica-Bold')
          doc.text(trimmed.replace('### ', ''), { width: contentWidth, align: 'left' })
          doc.moveDown(0.1)
        } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          doc.fontSize(10).font('Helvetica')
          doc.text(`  •  ${trimmed.replace(/^[-*] /, '')}`, {
            width: contentWidth - 10,
            align: 'left',
            lineGap: 2,
            indent: 10
          })
        } else if (trimmed === '') {
          doc.moveDown(0.15)
        } else {
          doc.fontSize(10).font('Helvetica')
          doc.text(trimmed, { width: contentWidth, align: 'left', lineGap: 2 })
        }
      }

      flushTable()

      doc.fontSize(9).fillColor('#bbb')
      doc.text('Crayfish Management System', 50, doc.page.height - 50, { align: 'center' })
      doc.end()
    } catch (err) {
      reject(err)
    }
  })
}
