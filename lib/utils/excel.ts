import { writeFileSync } from "fs"
import path from "path"
import * as XLSX from "xlsx"

interface ExcelExportOptions {
  filename: string
  sheets: {
    name: string
    data: any[]
  }[]
}

export async function createExcelFile(options: ExcelExportOptions): Promise<string> {
  try {
    // Create a new workbook
    const workbook = XLSX.utils.book_new()

    // Add each sheet to the workbook
    options.sheets.forEach(sheet => {
      const worksheet = XLSX.utils.json_to_sheet(sheet.data)
      XLSX.utils.book_append_sheet(workbook, worksheet, sheet.name)
    })

    // Create temp directory if it doesn't exist
    const tempDir = path.join(process.cwd(), "tmp")
    
    // Generate a unique filename to avoid collisions
    const uniqueId = Math.random().toString(36).substring(2, 10)
    const timestamp = new Date().getTime()
    const fullFilename = `${options.filename.replace(/\s+/g, '_')}_${uniqueId}_${timestamp}.xlsx`
    const outputPath = path.join(tempDir, fullFilename)
    
    // Write the file to the temp directory
    XLSX.writeFile(workbook, outputPath)
    
    return outputPath
  } catch (error) {
    console.error("Error creating Excel file:", error)
    throw new Error("Falha ao gerar arquivo Excel")
  }
}
