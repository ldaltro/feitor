import * as XLSX from 'xlsx';

export interface SheetData {
  name: string;
  data: any[];
}

export interface ExcelMetadata {
  title?: string;
  subject?: string;
  author?: string;
  creator?: string;
}

/**
 * Creates and downloads an Excel file in the browser with multiple sheets
 */
export function createAndDownloadExcel(
  sheets: SheetData[],
  filename: string,
  metadata?: ExcelMetadata
): void {
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
    
    // Generate Excel file and download it
    XLSX.writeFile(workbook, filename);
  } catch (error) {
    console.error("Error creating Excel workbook:", error);
    throw new Error("Falha ao gerar arquivo Excel");
  }
}
