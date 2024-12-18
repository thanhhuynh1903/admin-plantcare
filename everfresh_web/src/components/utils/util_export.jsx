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

export const exportPremiumUsersToExcel = async () => {
    try {
        const response = await aget('/users');
        let data = response.data;

        const premiumUsersData = data.filter(user => user.rank === "Premium").map(user => ({
            _id: user._id,
            name: user.name,
            email: user.email,
            rank: user.rank,
            createdAt: new Date(user.createdAt).toLocaleString()
        }));    

        const worksheet = XLSX.utils.json_to_sheet(premiumUsersData);

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Premium Users");

        XLSX.writeFile(workbook, "Premium Users.xlsx");
    } catch (error) {
        console.error("Error exporting premium users:", error);
    }
};


