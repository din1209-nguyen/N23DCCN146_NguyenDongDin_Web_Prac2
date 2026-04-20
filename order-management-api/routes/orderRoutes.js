const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// 1. Lấy toàn bộ đơn hàng với lọc & sắp xếp (GET /api/orders?status=pending&sort=asc)
router.get('/', async (req, res) => {
  try {
    let query = Order.find();

    // Yêu cầu 1: Lọc theo trạng thái
    if (req.query.status) {
      query = query.where('status').equals(req.query.status);
    }

    // Yêu cầu 3: Sắp xếp theo tổng tiền
    if (req.query.sort) {
      const sortOrder = req.query.sort === 'asc' ? 1 : -1;
      query = query.sort({ totalAmount: sortOrder });
    } else {
      query = query.sort({ createdAt: -1 });
    }

    const orders = await query;
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. Tìm kiếm đơn hàng theo tên khách hàng (GET /api/orders/search?name=...)
router.get('/search', async (req, res) => {
  try {
    if (!req.query.name) {
      return res.status(400).json({ message: 'Vui lòng nhập tên khách hàng để tìm kiếm' });
    }

    const orders = await Order.find({
      customerName: { $regex: req.query.name, $options: 'i' }
    });

    if (orders.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    }

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 3. Lấy đơn hàng theo ID (GET /api/orders/:id)
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 4. Tạo đơn hàng mới (POST /api/orders)
router.post('/', async (req, res) => {
  const order = new Order({
    customerName: req.body.customerName,
    customerEmail: req.body.customerEmail,
    items: req.body.items,
    totalAmount: req.body.totalAmount
  });

  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 5. Cập nhật đơn hàng (PUT /api/orders/:id)
router.put('/:id', async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    }

    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 6. Xóa đơn hàng (DELETE /api/orders/:id)
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
    }

    res.json({ message: 'Đã xóa đơn hàng thành công!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;