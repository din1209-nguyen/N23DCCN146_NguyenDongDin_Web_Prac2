# Order Management API

API quản lý đơn hàng được xây dựng với Node.js, Express.js và MongoDB.

## Công nghệ
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Render** - Hosting

## Tính năng
- Quản lý đơn hàng (CRUD)
- Tìm kiếm đơn hàng theo tên khách hàng
- Lọc theo trạng thái (pending, completed, cancelled)
- Sắp xếp theo tổng tiền

## Deployment
- **URL**: https://n23dccn146-nguyendongdin-web-prac2.onrender.com
- **Database**: MongoDB

## Cài đặt
```bash
npm install
npm start        # Production
npm run dev      # Development (nodemon)
```

## API Endpoints
- `GET /api/orders` - Lấy tất cả đơn hàng
- `GET /api/orders/:id` - Lấy chi tiết đơn hàng
- `POST /api/orders` - Tạo đơn hàng
- `PUT /api/orders/:id` - Cập nhật đơn hàng
- `DELETE /api/orders/:id` - Xóa đơn hàng

## Dependencies
- express, mongoose, cors, dotenv, nodemon

