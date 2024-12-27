import React, { useContext, useEffect, useState } from "react";
import { Picker } from '@react-native-picker/picker';
import { Modal, Pressable, View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { registerWithEmailAndPassword, loginWithEmailAndPassword, resetPassword } from "../features/firebase/userAuth";
import AuthContext from "../features/context/authContext";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const AuthenticationModal = ({ modalVisible, setModalVisible, onclose }) => {
    const [type, setType] = useState("login"); // 'login', 'register', or 'resetPassword'
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState(18); // Độ tuổi
    const [loading, setLoading] = useState(false);

    const { currentUser, setCurrentUser, setIsLoggedIn } = useContext(AuthContext);

    const handleLogin = async () => {
        setLoading(true);
        try {
            const res = await loginWithEmailAndPassword(email, password);
            if (res.success) {
                setCurrentUser(res.user);
                setIsLoggedIn(true);
                setModalVisible(false);
            } else {
                Alert.alert('Lỗi', 'Sai tài khoản hoặc mật khẩu!');
            }
        } catch (error) {
            Alert.alert('Lỗi', 'Đã xảy ra lỗi khi đăng nhập.');
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async () => {
        setLoading(true);
        try {
            const res = await registerWithEmailAndPassword(name, email, password, age); // Gửi độ tuổi khi đăng ký
            if (res.success) {
                Alert.alert('Thành công', 'Tài khoản đã được tạo!');
                setType("login");
            }
        } catch (error) {
            Alert.alert('Lỗi', 'Không thể đăng ký!');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        if (!email) {
            Alert.alert('Thông báo', 'Vui lòng nhập email!');
            return;
        }

        setLoading(true);
        try {
            const res = await resetPassword(email);
            console.log('Vui lòng check Email');
            if (res.success) {
                Alert.alert('Thành công', 'Kiểm tra email để đặt lại mật khẩu.');
                setType("login");
            } else {
                Alert.alert('Lỗi', 'Không thể gửi email khôi phục!');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            
        }
    };

    const close = () => {
        setModalVisible(false);
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(false);
            }}
        >
            {type === "resetPassword" ? (
                // Giao diện khôi phục mật khẩu
                <Pressable className="flex-1 justify-center items-center bg-black/[0.5]">
                    <View className="w-[80%] bg-white p-6 rounded-lg">
                        <TouchableOpacity
                            style={{ position: "absolute", top: 15, right: 15, borderWidth: 0 }}
                            onPress={() => setType("login")}
                        >
                            <MaterialIcons name="close" size={30} />
                        </TouchableOpacity>

                        <Text className="font-bold mb-2">Nhập email để khôi phục mật khẩu</Text>
                        <TextInput
                            className="border border-slate-300 px-3 py-2"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                        />

                        <TouchableOpacity
                            className="bg-black py-4 mt-6 rounded-lg"
                            onPress={handleResetPassword}
                        >
                            {loading ? (
                                <ActivityIndicator size={'large'} />
                            ) : (
                                <Text className="text-white font-semibold text-center">Khôi phục mật khẩu</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </Pressable>
            ) : type === "login" ? (
                // Giao diện đăng nhập
                <Pressable className="flex-1 justify-center items-center bg-black/[0.5]">
                    <View className="w-[80%] bg-white p-6 rounded-lg">
                        <TouchableOpacity
                            style={{ position: "absolute", top: 15, right: 15, borderWidth: 0 }}
                            onPress={close}
                        >
                            <MaterialIcons name="close" size={30} />
                        </TouchableOpacity>

                        <Text className="font-bold mb-2">Email</Text>
                        <TextInput
                            className="border border-slate-300 px-3 py-2"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                        />
                        <Text className="font-bold mt-4 mb-2">Password:</Text>
                        <TextInput
                            className="border border-slate-300 px-3 py-2"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                        />

                        <TouchableOpacity className="bg-black py-4 mt-6 rounded-lg" onPress={handleLogin}>
                            {loading ? <ActivityIndicator size={'large'} /> : <Text className="text-white font-semibold text-center">Đăng nhập</Text>}
                        </TouchableOpacity>

                        <TouchableOpacity className="mt-4" onPress={() => setType("resetPassword")}>
                            <Text className="text-blue-500 text-center">Quên mật khẩu?</Text>
                        </TouchableOpacity>

                        <TouchableOpacity className="mt-4" onPress={() => setType("register")}>
                            <Text className="text-blue-500 text-center">Đăng ký</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            ) : (
                // Giao diện đăng ký
                <Pressable className="flex-1 justify-center items-center bg-black/[0.5]">
                    <View className="w-[80%] bg-white p-6 rounded-lg">
                        <TouchableOpacity
                            style={{ position: "absolute", top: 15, right: 15, borderWidth: 0 }}
                            onPress={() => setType("login")}
                        >
                            <MaterialIcons name="close" size={30} />
                        </TouchableOpacity>

                        <Text className="font-bold mb-2">Name:</Text>
                        <TextInput
                            className="border border-slate-300 px-3 py-2"
                            value={name}
                            onChangeText={setName}
                        />
                        <Text className="font-bold mb-2">Email:</Text>
                        <TextInput
                            className="border border-slate-300 px-3 py-2"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                        />
                        <Text className="font-bold mb-2">Password:</Text>
                        <TextInput
                            className="border border-slate-300 px-3 py-2"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                        />

                        {/* Thêm Picker cho độ tuổi */}
                        <Text className="font-bold mb-2 mt-4">Tuổi:</Text>
                        <Picker
                            selectedValue={age.toString()}
                            onValueChange={(itemValue) => setAge(Number(itemValue))}
                            style={{ height: 50, width: '100%' }}
                        >
                            {[...Array(100).keys()].map((value) => (
                                <Picker.Item key={value} label={`${value + 1}`} value={`${value + 1}`} />
                            ))}
                        </Picker>

                        <TouchableOpacity className="bg-black py-4 mt-6 rounded-lg" onPress={handleRegister}>
                            {loading ? <ActivityIndicator size={'large'} /> : <Text className="text-white font-semibold text-center">Đăng ký</Text>}
                        </TouchableOpacity>
                    </View>
                </Pressable>
            )}
        </Modal>
    );
};

export default AuthenticationModal;
