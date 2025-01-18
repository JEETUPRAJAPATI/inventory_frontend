import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export const generateInvoicePDF = (invoiceData) => {
  try {
    // Create new PDF document
    const doc = new jsPDF();
    
    // Company Header
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('COMPANY NAME', 105, 20, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('123 Business Street, City, State, ZIP', 105, 30, { align: 'center' });
    doc.text('Phone: (123) 456-7890 | Email: info@company.com', 105, 35, { align: 'center' });

    // Invoice Title
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('INVOICE', 105, 50, { align: 'center' });

    // Invoice Details
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');

    // Left side - Bill To
    doc.setFont('helvetica', 'bold');
    doc.text('Bill To:', 20, 70);
    doc.setFont('helvetica', 'normal');
    doc.text([
      'Customer Name: John Doe',
      'Address: 123 Main St',
      'City, State 12345',
      'Phone: +1234567890',
      'Email: john@example.com'
    ], 20, 80);

    // Right side - Invoice Info
    doc.text([
      'Invoice No: INV-001',
      'Date: 2024-02-25',
      'Due Date: 2024-03-25',
      'GST No: GST12345678'
    ], 120, 80);

    // Add Items Table
    const tableColumns = [
      'Description',
      'Quantity',
      'Unit Price',
      'Amount'
    ];

    const tableData = [
      ['Premium Shopping Bags', '1000', '₹15.00', '₹15,000.00'],
      ['Eco Friendly Bags', '500', '₹12.00', '₹6,000.00']
    ];

    doc.autoTable({
      startY: 120,
      head: [tableColumns],
      body: tableData,
      theme: 'grid',
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontSize: 10,
        fontStyle: 'bold',
        halign: 'center'
      },
      bodyStyles: {
        fontSize: 9,
        halign: 'center'
      }
    });

    // Add Totals
    const finalY = doc.lastAutoTable.finalY + 10;

    doc.text('Subtotal:', 120, finalY + 10);
    doc.text('₹21,000.00', 170, finalY + 10);

    doc.text('GST (18%):', 120, finalY + 20);
    doc.text('₹3,780.00', 170, finalY + 20);

    doc.setFont('helvetica', 'bold');
    doc.text('Total:', 120, finalY + 30);
    doc.text('₹24,780.00', 170, finalY + 30);

    // Add Footer
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text('Thank you for your business!', 105, 250, { align: 'center' });
    doc.text('Terms & Conditions Apply', 105, 255, { align: 'center' });

    // Save the PDF
    doc.save('invoice.pdf');
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF');
  }
}