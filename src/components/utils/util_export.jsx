import * as XLSX from 'xlsx';
import { aget } from './util_axios';

export const exportOrdersToExcel = async () => {
    try {
        const response = await aget('/orders/admin');
        let data = response.data;

        const ordersData = data.map(order => ({
            _id: order._id,
            order_code: order.order_code,
            status: order.status,
            total_price: order.total_price,
            createdAt: new Date(order.createdAt).toLocaleString()
        }));

        const worksheet = XLSX.utils.json_to_sheet(ordersData);

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

        XLSX.writeFile(workbook, "Orders.xlsx");
    } catch (error) {
        console.error("Error exporting orders:", error);
    }
};


