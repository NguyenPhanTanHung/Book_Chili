import React, { useContext, useState } from "react"; // Only one import statement
import { Text, View, Pressable, Modal, TouchableOpacity, Image, Alert, Linking, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AuthContext from '../features/context/authContext';
import { logout } from '../features/firebase/userAuth';

const ProfileScreen = ({ navigation }) => {
  const { currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [modalNotificationVisible, setModalNotificationVisible] = useState(false);
  const [modalContactVisible, setModalContactVisible] = useState(false);
  const [modalPolicyVisible, setModalPolicyVisible] = useState(false); // State cho Modal Chính sách và điều khoản

  const handleLogout = async () => {
    const res = await logout();
    if (res.success) {
      setIsLoggedIn(false);
      setCurrentUser(null);
    }
  };

  const handleOpenLink = (url) => {
    Linking.openURL(url).catch(() => Alert.alert("Lỗi", "Không thể mở liên kết"));
  };

  return (
    <SafeAreaView className="bg-white h-full p-6 justify-between">
      {/* Header */}
      <View className="mt-1 items-center">
        <Image style={{ resizeMode: 'contain', width: 200, height: 100 }} source={require('../../assets/Logo.png')} />
        {isLoggedIn ? (
          <>
            <Image style={{ resizeMode: 'contain', width: 120, height: 120, borderRadius: 60, marginVertical: 20 }} source={require('../../assets/profile-icon-design-free-vector.jpg')} />
            <Text className="text-xl font-bold text-black">{currentUser?.name}</Text>
            <Text className="text-sm font-semibold text-gray-500">{currentUser?.email}</Text>
          </>
        ) : (
          <Text className="text-lg font-bold text-black mt-4">Hãy Đăng Nhập!</Text>
        )}
      </View>

      {/* Actions */}
      {isLoggedIn && (
        <View className="mt-10">
          <Pressable onPress={() => navigation.jumpTo('order')} className="bg-gray-200 py-4 rounded-lg mb-4">
            <Text className="font-bold text-black text-center">Lịch Sử Giao Dịch</Text>
          </Pressable>

          <Pressable onPress={() => setModalNotificationVisible(true)} className="bg-gray-200 py-4 rounded-lg mb-4">
            <Text className="font-bold text-black text-center">Thông Báo</Text>
          </Pressable>

          <Pressable onPress={() => setModalContactVisible(true)} className="bg-gray-200 py-4 rounded-lg mb-4">
            <Text className="font-bold text-black text-center">Liên Hệ Với Chúng Tôi</Text>
          </Pressable>

          <Pressable onPress={() => setModalPolicyVisible(true)} className="bg-gray-200 py-4 rounded-lg mb-4">
            <Text className="font-bold text-black text-center">Chính sách và điều khoản</Text>
          </Pressable>

          <Pressable onPress={handleLogout} className="bg-black py-4 rounded-lg">
            <Text className="font-bold text-white text-center">Log Out</Text>
          </Pressable>
        </View>
      )}

      {/* Notification Modal */}
      <Modal
        animationType="fade"
        transparent
        visible={modalNotificationVisible}
        onRequestClose={() => setModalNotificationVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-gray-800 bg-opacity-50">
          <View className="bg-white w-4/5 p-6 rounded-lg shadow-lg">
            <Text className="text-lg font-bold text-black mb-4">Thông Báo</Text>
            <Text className="text-gray-600 text-center">Bạn chưa có thông báo nào</Text>
            <TouchableOpacity onPress={() => setModalNotificationVisible(false)} className="absolute top-2 right-2">
              <MaterialIcons name="close" size={25} color="#333" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Contact Us Modal */}
      <Modal
        animationType="fade"
        transparent
        visible={modalContactVisible}
        onRequestClose={() => setModalContactVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-gray-800 bg-opacity-50">
          <View className="bg-white w-4/5 p-6 rounded-lg shadow-lg">
            <Text className="text-lg font-bold text-black mb-4">Liên Hệ Với Chúng Tôi</Text>
            <Text className="text-gray-600 mb-4">
              Nếu bạn cần hỗ trợ, vui lòng liên hệ qua:
            </Text>
            <Text
              className="text-blue-600 underline mb-2 text-center"
              onPress={() => handleOpenLink('mailto:2024801030154@student.tdmu.edu.vn')}
            >
              Email: 2024801030154@student.tdmu.edu.vn
            </Text>
            <Text
              className="text-blue-600 underline text-center"
              onPress={() => handleOpenLink('https://www.facebook.com/hung.nguyenphantan.1')}
            >
              Facebook: https://www.facebook.com/hung.nguyenphantan.1
            </Text>
            <TouchableOpacity onPress={() => setModalContactVisible(false)} className="absolute top-2 right-2">
              <MaterialIcons name="close" size={25} color="#333" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Chính sách và điều khoản Modal */}
      <Modal
        animationType="fade"
        transparent
        visible={modalPolicyVisible}
        onRequestClose={() => setModalPolicyVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-gray-800 bg-opacity-50">
          <ScrollView className="bg-white w-4/5 p-6 rounded-lg shadow-lg max-h-3/4">
            <Text className="text-lg font-bold text-black mb-4">Chính sách và Điều khoản</Text>
            <Text className="text-gray-600 mb-2">
            📜 I. ĐIỀU KHOẢN SỬ DỤNG
1. Đăng ký Tài Khoản
Người dùng cần tạo tài khoản để trải nghiệm đầy đủ các tính năng của Book_Chili.
Tên, email và thông tin tài khoản phải chính xác và được cập nhật đầy đủ.
Người dùng phải bảo mật thông tin tài khoản và không chia sẻ thông tin này với bất kỳ bên thứ ba nào.
2. Trách Nhiệm của Người Dùng
Tuân thủ pháp luật và không sử dụng dịch vụ vào mục đích bất hợp pháp.
Người dùng không được làm giả thông tin, đăng tải thông tin sai lệch hoặc xâm phạm quyền sở hữu trí tuệ.
3. Nội Dung Gợi Ý và Đề Xuất
Book_Chili cung cấp thông tin sách và gợi ý dựa trên thông tin và cơ sở dữ liệu được cung cấp bởi các nhà xuất bản và bên liên quan.
Book_Chili không chịu trách nhiệm nếu thông tin sách sai lệch hoặc không đầy đủ.
4. Mua Sách và Thanh Toán
Việc mua sách qua ứng dụng Book_Chili sẽ được thực hiện thông qua các phương thức thanh toán được hỗ trợ trên nền tảng.
Người dùng cần đảm bảo thông tin thanh toán chính xác và an toàn trong quá trình giao dịch.
5. Cập Nhật và Thay Đổi
Book_Chili có quyền cập nhật, sửa đổi hoặc xóa bỏ thông tin và dịch vụ bất cứ lúc nào mà không cần thông báo trước.
Người dùng có trách nhiệm thường xuyên kiểm tra thông tin và các cập nhật mới.           
           </Text><Text className="text-gray-600 mb-2">
           🛡️ II. CHÍNH SÁCH BẢO MẬT
1. Dữ Liệu Người Dùng
Book_Chili cam kết bảo mật thông tin cá nhân của người dùng theo luật pháp hiện hành.
Thông tin người dùng sẽ được sử dụng để phục vụ mục đích mua hàng và cải thiện trải nghiệm người dùng.
2. Cách Thức Lưu Trữ và Bảo Mật Dữ Liệu
Book_Chili lưu trữ thông tin của người dùng trên máy chủ an toàn.
Chỉ các bên liên quan và có liên quan mới được phép truy cập dữ liệu trong phạm vi quy định và luật pháp.
3. Quyền Hạn của Người Dùng
Người dùng có quyền yêu cầu xóa thông tin cá nhân khỏi hệ thống Book_Chili bất kỳ lúc nào.
Người dùng có thể truy cập thông tin và sửa đổi thông tin của mình thông qua tài khoản người dùng.
            </Text><Text className="text-gray-600 mb-2">
            🚀 III. ĐIỀU KHOẢN HỦY GIAO DỊCH
Book_Chili có quyền hủy bỏ giao dịch nếu phát hiện thông tin thanh toán không chính xác hoặc gian lận.
Người dùng có thể yêu cầu hoàn tiền trong vòng 7 ngày nếu phát hiện sách bị lỗi hoặc không đúng mô tả.
🖊️ IV. GIỚI HẠN TRÁCH NHIỆM
Book_Chili sẽ không chịu trách nhiệm với các sự cố sau đây:

Hư hỏng hoặc mất mát do sự cố về đường truyền mạng hoặc hệ thống ngoài tầm kiểm soát.
Thông tin sai lệch hoặc không đầy đủ từ các bên xuất bản hoặc người dùng.            </Text>
            <Text className="text-gray-600 mb-2">
            📧 V. LIÊN HỆ HỖ TRỢ KHÁCH HÀNG
Nếu bạn gặp vấn đề trong quá trình sử dụng Book_Chili, vui lòng liên hệ với chúng tôi qua thông tin sau:

Email hỗ trợ: 2024801030154@student.tdmu.edu.vn
Hotline: [0334610624]
              
              <Text className="text-gray-600 mb-2">
              💼 VI. SỬA ĐỔI CHÍNH SÁCH
              Book_Chili có quyền cập nhật và sửa đổi các điều khoản và chính sách này. Chúng tôi khuyên bạn nên thường xuyên kiểm tra thông tin mới nhất. Việc bạn tiếp tục sử dụng ứng dụng sau khi chính sách được cập nhật là đồng ý với các thay đổi này.            </Text>
            </Text>
            <Text className="text-gray-600 mb-2">
            📜 Cảm ơn bạn đã tin tưởng và chọn Book_Chili!
            Chúng tôi sẽ không ngừng cải tiến và mang lại trải nghiệm đọc sách tuyệt vời nhất dành cho bạn.            </Text>
          
              {/* Policy Content */}
        
            <TouchableOpacity
              onPress={() => setModalPolicyVisible(false)}
              className="mt-4 bg-black py-2 rounded-lg"
              
            >
              <Text className="text-white text-center">Đóng</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ProfileScreen;
