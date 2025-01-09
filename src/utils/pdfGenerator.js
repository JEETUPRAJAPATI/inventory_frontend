import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export const generateInvoicePDF = (invoiceData) => {
  try {
    const doc = new jsPDF();
    
    // Add company header
    doc.setFontSize(24);
    doc.setFont(undefined, 'bold');
    doc.text('COMPANY NAME', 105, 20, { align: 'center' });
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text('123 Business Street, City, State, ZIP', 105, 27, { align: 'center' });
    doc.text('Phone: (123) 456-7890 | Email: info@company.com', 105, 32, { align: 'center' });

    // Add invoice title
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text('INVOICE', 105, 45, { align: 'center' });
    
    // Add invoice details
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text('Invoice Number:', 20, 60);
    doc.text(invoiceData.invoiceNumber, 80, 60);
    
    doc.text('Date:', 20, 67);
    doc.text(invoiceData.date, 80, 67);
    
    doc.text('Due Date:', 20, 74);
    doc.text(invoiceData.dueDate, 80, 74);

    // Add customer details
    doc.setFont(undefined, 'bold');
    doc.text('BILL TO:', 20, 90);
    doc.setFont(undefined, 'normal');
    doc.text([
      invoiceData.customerName,
      invoiceData.address || '',
      `Phone: ${invoiceData.phone || 'N/A'}`,
      `Email: ${invoiceData.email || 'N/A'}`
    ], 20, 97);

    // Add GST details
    doc.text(`GST Number: ${invoiceData.gstNumber}`, 20, 125);

    // Add order details table
    const tableData = [[
      invoiceData.jobName,
      invoiceData.quantity,
      `₹${invoiceData.unitPrice.toFixed(2)}`,
      `₹${invoiceData.subtotal.toFixed(2)}`
    ]];

    doc.autoTable({
      startY: 135,
      head: [['Description', 'Quantity', 'Unit Price', 'Amount']],
      body: tableData,
      theme: 'grid',
      headStyles: {
        fillColor: [66, 66, 66],
        textColor: [255, 255, 255],
        fontSize: 10,
        fontStyle: 'bold',
        halign: 'center'
      },
      bodyStyles: {
        fontSize: 9,
        halign: 'center'
      }
    });

    // Add totals
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.text('Subtotal:', 140, finalY);
    doc.text(`₹${invoiceData.subtotal.toFixed(2)}`, 180, finalY, { align: 'right' });
    
    doc.text('GST (18%):', 140, finalY + 7);
    doc.text(`₹${invoiceData.gst.toFixed(2)}`, 180, finalY + 7, { align: 'right' });
    
    doc.setFont(undefined, 'bold');
    doc.text('Total:', 140, finalY + 14);
    doc.text(`₹${invoiceData.total.toFixed(2)}`, 180, finalY + 14, { align: 'right' });

    // Add footer
    doc.setFont(undefined, 'normal');
    doc.setFontSize(8);
    doc.text('Thank you for your business!', 105, 270, { align: 'center' });
    doc.text('Terms & Conditions Apply', 105, 275, { align: 'center' });

    // Save the PDF
    doc.save(`Invoice-${invoiceData.invoiceNumber}.pdf`);
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};