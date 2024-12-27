import React from 'react';
import { Link } from 'react-router-dom';

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
    id: '0Byde02Xp7E3BDgTx140',
    bookName: 'Đại Cương Triết Học Trung Quốc – Liệt Tử Và Dương Tử',
    price: 210000,
    userId: 'user2',
    address: 'binh duong',
    date: '15:52:48 8/11/2024',
    deliveryTime: '12h30',
    image: 'https://firebasestorage.googleapis.com/v0/b/bookchill-9ad45.appspot.com/o/nhasachmienphi-dai-cuong-triet-hoc-trung-quoc-liet-tu-va-duong-tu.jpg?alt=media&token=36932d0a-bc9b-4f40-ac00-e80e0cf911d3',
    name: 'Hunng',
    orderId: '684e20816256',
    phone: '0334610624',
    qty: 2,
    title: 'Ngay ở nước ta, cả trong giới tân học, tên Liệt tử cũng khá quen thuộc...',
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

const Oder = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Danh Sách Đơn Hàng</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {orders.map(order => (
          <li key={order.id} style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '15px', borderRadius: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={order.image} alt={order.bookName} width="100" style={{ borderRadius: '8px', marginRight: '15px' }} />
              <div>
                <h3 style={{ margin: '0', color: '#333' }}>{order.bookName}</h3>
                <p style={{ margin: '5px 0', color: '#555' }}>{order.title}</p>
                <p><strong>Giá:</strong> {order.price} VND</p>
                <p><strong>Địa chỉ:</strong> {order.address}</p>
                <p><strong>Thời gian giao hàng:</strong> {order.deliveryTime}</p>
                <Link to={`/orders/${order.userId}/${order.orderId}`} style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}>
                  Xem chi tiết đơn hàng
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Oder;
