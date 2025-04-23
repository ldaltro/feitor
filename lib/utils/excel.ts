import * as XLSX from "xlsx"
import path from "path"
import fs from "fs-extra"

export interface SheetData {
  name: string
  data: any[]
}

export interface ExcelMetadata {
  title?: string
  subject?: string
  author?: string
  creator?: string
}

/**
 * Creates an Excel workbook with multiple sheets and optional metadata
 */
export async function createExcelFile(
  sheets: SheetData[], 
  metadata?: ExcelMetadata
): Promise<XLSX.WorkBook> {
  try {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    
    // Add metadata if provided
    if (metadata) {
      workbook.Props = {
        ...(workbook.Props || {}),
        Title: metadata.title,
        Subject: metadata.subject,
        Author: metadata.author,
        Creator: metadata.creator,
      };
    }

    // Add each sheet to the workbook
    sheets.forEach(sheet => {
      const worksheet = XLSX.utils.json_to_sheet(sheet.data);
      XLSX.utils.book_append_sheet(workbook, worksheet, sheet.name);
    });
    
    return workbook;
  } catch (error) {
    console.error("Error creating Excel workbook:", error);
    throw new Error("Falha ao gerar workbook Excel");
  }
}

/**
 * Creates and saves an Excel file, returning the path to the saved file
 */
export async function saveExcelFile(
  workbook: XLSX.WorkBook,
  filename: string,
  directory?: string
): Promise<string> {
  try {
    // Default to a temporary directory if none provided
    const outputDir = directory || path.join(process.cwd(), "public", "tmp");
    
    // Ensure directory exists
    await fs.ensureDir(outputDir);
    
    // Generate complete filepath
    const outputPath = path.join(outputDir, filename);
    
    // Write the file
    XLSX.writeFile(workbook, outputPath);
    
    return outputPath;
  } catch (error) {
    console.error("Error saving Excel file:", error);
    throw new Error("Falha ao salvar arquivo Excel");
  }
}
