import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export const generateInvoicePDF = (invoiceData) => {
  const doc = new jsPDF();
  
  // Define colors
  const primaryColor = [41, 98, 255];  // Blue
  const secondaryColor = [75, 85, 99]; // Gray
  const accentColor = [139, 92, 246];  // Purple
  const successColor = [34, 197, 94];  // Green

  // Add decorative header background
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 220, 40, 'F');
  
  // Add company header
  doc.setTextColor(255, 255, 255); // White text
  doc.setFontSize(24);
  doc.setFont(undefined, 'bold');
  doc.text('COMPANY NAME', 105, 20, { align: 'center' });
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.text('123 Business Street, City, State, ZIP', 105, 27, { align: 'center' });
  doc.text('Phone: (123) 456-7890 | Email: info@company.com', 105, 32, { align: 'center' });

  // Reset text color
  doc.setTextColor(0, 0, 0);
  
  // Add invoice title with accent background
  doc.setFillColor(...accentColor);
  doc.rect(15, 45, 180, 10, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text('INVOICE', 105, 52, { align: 'center' });
  
  // Reset text color
  doc.setTextColor(0, 0, 0);
  
  // Add invoice details in a modern box
  doc.setDrawColor(...secondaryColor);
  doc.setLineWidth(0.1);
  doc.rect(15, 60, 85, 35);
  
  doc.setFontSize(10);
  doc.text('Invoice Number:', 20, 68);
  doc.setFont(undefined, 'bold');
  doc.text(invoiceData.invoiceNumber, 60, 68);
  
  doc.setFont(undefined, 'normal');
  doc.text('Date:', 20, 75);
  doc.setFont(undefined, 'bold');
  doc.text(invoiceData.date, 60, 75);
  
  doc.setFont(undefined, 'normal');
  doc.text('Due Date:', 20, 82);
  doc.setFont(undefined, 'bold');
  doc.text(invoiceData.dueDate, 60, 82);
  
  // Add customer details in a modern box
  doc.setDrawColor(...secondaryColor);
  doc.rect(110, 60, 85, 35);
  
  doc.setFont(undefined, 'bold');
  doc.setTextColor(...primaryColor);
  doc.text('BILL TO', 115, 68);
  
  doc.setTextColor(0, 0, 0);
  doc.setFont(undefined, 'normal');
  doc.setFontSize(9);
  doc.text([
    invoiceData.customerName,
    invoiceData.address,
    `Phone: ${invoiceData.mobileNumber}`,
    `Email: ${invoiceData.email}`
  ], 115, 75);
  
  // Add GST details with accent color
  doc.setFillColor(...accentColor);
  doc.rect(15, 100, 180, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.text(`GST Number: ${invoiceData.gstNumber}`, 20, 105);
  
  // Add order details table with modern styling
  const tableData = [[
    invoiceData.jobName,
    invoiceData.bagType,
    invoiceData.quantity,
    `₹${invoiceData.unitPrice}`,
    `₹${(invoiceData.quantity * invoiceData.unitPrice).toFixed(2)}`
  ]];
  
  doc.autoTable({
    startY: 115,
    head: [['Description', 'Type', 'Quantity', 'Unit Price', 'Amount']],
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: [...primaryColor],
      fontSize: 10,
      fontStyle: 'bold',
      halign: 'center'
    },
    bodyStyles: {
      fontSize: 9,
      halign: 'center'
    },
    columnStyles: {
      0: { cellWidth: 50 },
      1: { cellWidth: 40 },
      2: { cellWidth: 30 },
      3: { cellWidth: 35 },
      4: { cellWidth: 35 }
    }
  });
  
  // Add totals with modern styling
  const finalY = doc.lastAutoTable.finalY + 10;
  
  // Subtotal
  doc.setFillColor(...secondaryColor);
  doc.rect(120, finalY - 5, 75, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.text(`Subtotal: ₹${invoiceData.subtotal.toFixed(2)}`, 125, finalY);
  
  // GST
  doc.setFillColor(...accentColor);
  doc.rect(120, finalY + 5, 75, 8, 'F');
  doc.text(`GST (18%): ₹${invoiceData.gst.toFixed(2)}`, 125, finalY + 10);
  
  // Total
  doc.setFillColor(...successColor);
  doc.rect(120, finalY + 15, 75, 10, 'F');
  doc.setFontSize(12);
  doc.setFont(undefined, 'bold');
  doc.text(`Total: ₹${invoiceData.total.toFixed(2)}`, 125, finalY + 22);
  
  // Add footer with modern styling
  doc.setFillColor(...primaryColor);
  doc.rect(0, 270, 220, 25, 'F');
  
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.text('Thank you for your business!', 105, 280, { align: 'center' });
  doc.setFontSize(8);
  doc.text('Terms & Conditions Apply', 105, 285, { align: 'center' });
  
  // Save the PDF
  doc.save(`Invoice-${invoiceData.invoiceNumber}.pdf`);
};