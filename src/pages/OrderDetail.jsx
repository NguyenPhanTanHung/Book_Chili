import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const orders = [
  {
    id: 'order1',
    bookName: 'One Piece – Đảo Hải Tặc',
    price: 130000,
    userId: 'user1',
    address: 'Binh Duong',
    date: '23:42:19 23/12/2024',
    deliveryTime: 'Chieu 4h',
    image: 'https://firebasestorage.googleapis.com/v0/b/bookchill-9ad45.appspot.com/o/nhasachmienphi-one-piece-dao-hai-tac.jpg?alt=media&token=94667b82-fc65-468e-8610-f1518b9d7bf2',
    name: 'Tan Hung',
    orderId: 'eed574f1cd75',
    phone: '0334610623',
    qty: 1,
    title: 'Bạn sẽ học được các kỹ năng thông qua những ví dụ minh hoạ cụ thể...',
  },
  
  {
    id: 'A7umBIS365ss5MIx8CYq',
    bookName: 'Ngữ Pháp Tiếng  Anh Ôn Thi Toeic',
    price: 2550000,
    userId: 'user33',
    address: 'Dau Tieng',
    date: '00:07:35 18/12/2024',
    deliveryTime: '12h',
    image: 'https://firebasestorage.googleapis.com/v0/b/bookchill-9ad45.appspot.com/o/Ng%E1%BB%AF%20Ph%C3%A1p%20Ti%E1%BA%BFng%20Anh%20%C3%94n%20Thi%20Toeic.jpg?alt=media&token=9f0f2bc5-bcbe-488a-a7bd-6702c386f237',
    name: 'dung',
    orderId: '684e20816256',
    phone: '0345089146',
    qty: 1,
    title: 'Đây là “Hệ thống ngữ pháp” chuẩn của Bộ giáo dục ban hàng trong loạt hệ thống kiến thức trọng tâm học ôn Toeic hiệu quả. Đúng như tên gọi, mục lớn này nhằm giúp người học biết, nắm bắt và hiểu một cách có hệ thống các chuyên đề ngữ pháp chính cần có để hoàn thành tốt bài thi Toeic mới với 2 phần chính là Nghe và Đọc.',
  },
  {
    id: 'LYKOpK8n40cAeL7Qscyj',
    bookName: 'Bí Quyết Thành Công 100 Thương Hiệu Hàng Đầu Thế Giới',
    price: 250000,
    userId: 'user2',
    address: 'Hà Nội',
    date: '15:39:49 7/11/2024',
    deliveryTime: 'Sáng',
    image: 'https://firebasestorage.googleapis.com/v0/b/bookchill-9ad45.appspot.com/o/nhasachmienphi-bi-quyet-thanh-cong-100-thuong-hieu-hang-dau-the-gioi.jpg?alt=media&token=99cacf21-cb15-4440-8f18-d108fac48d5e',
    orderId: '7d14d3fc0bdc',
    phone: '0334610626',
    qty: 1,
    title: 'Brand Royalty – Bí Quyết Thành Công 100 Thương Hiệu Hàng Đầu Thế Giới...',
  }

];

const OrderDetail = () => {
  const { userId, orderId } = useParams();  // Lấy userId và orderId từ URL
  const order = orders.find(o => o.userId === userId && o.orderId === orderId);
  const navigate = useNavigate();  // Khởi tạo useNavigate để điều hướng

  if (!order) {
    return <div>Đơn hàng không tồn tại!</div>;
  }

  const handleGoBack = () => {
    navigate('/orders');  // Điều hướng về trang danh sách đơn hàng
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Chi Tiết Đơn Hàng</h2>
      <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
        <div style={{ display: 'flex', marginBottom: '20px' }}>
          <img src={order.image} alt={order.bookName} width="150" style={{ borderRadius: '8px', marginRight: '20px' }} />
          <div>
            <h3 style={{ margin: '0', color: '#333' }}>{order.bookName}</h3>
            <p style={{ color: '#555' }}>{order.title}</p>
            <p><strong>Giá:</strong> {order.price} VND</p>
            <p><strong>Địa chỉ:</strong> {order.address}</p>
            <p><strong>Thời gian giao hàng:</strong> {order.deliveryTime}</p>
            <p><strong>Số điện thoại:</strong> {order.phone}</p>
            <p><strong>Số lượng:</strong> {order.qty}</p>
            <p><strong>Ngày đặt:</strong> {order.date}</p>
          </div>
        </div>
        
        {/* Nút quay lại đơn hàng */}
        <div style={{ textAlign: 'center' }}>
          <button 
            onClick={handleGoBack}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Quay lại trang đơn hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
