# 📦 Phân Chia Đồ Án DT-Shop E-Commerce — 5 Thành Viên

> **Stack:** Node.js/Express (Backend) + React.js/Redux (Frontend) + MongoDB  
> **Nguyên tắc phân chia:** Theo chức năng nghiệp vụ, mỗi người nắm đầy đủ cả BE + FE của 1 module.

---

## 👤 Thành Viên 1 — Kiến Trúc Hệ Thống & Xác Thực (Auth & Core Setup)

### 🎯 Phạm vi phụ trách
Nền tảng kỹ thuật của toàn hệ thống: cấu hình server, xác thực JWT, phân quyền, middleware.

### 📁 Files chịu trách nhiệm

| File | Mô tả |
|------|-------|
| `BackE/src/index.js` | Khởi tạo Express server, kết nối MongoDB, CORS |
| `BackE/.env` | Biến môi trường (DB_URI, JWT secrets, port) |
| `BackE/package.json` | Dependencies backend |
| `BackE/src/middleware/authMiddleware.js` | Xác thực token, phân quyền Admin/User |
| `BackE/src/services/JwtService.js` | Tạo/xác minh access & refresh token |
| `BackE/src/routes/index.js` | Router tổng hợp gắn tất cả sub-routes |
| `BackE/src/controllers/UserController.js` | Đăng ký, đăng nhập, refresh token, đăng xuất |
| `BackE/src/services/UserService.js` | Logic nghiệp vụ User (create, login, refresh) |
| `BackE/src/models/UserModel.js` | Schema MongoDB cho User |
| `FrontE/src/App.js` | Cấu hình Router, JWT interceptor tự động refresh |
| `FrontE/src/index.js` | Entry point React, Redux Provider |
| `FrontE/src/redux/store.js` | Cấu hình Redux store |
| `FrontE/src/redux/slides/userSlide.js` | State quản lý thông tin user đăng nhập |
| `FrontE/src/services/UserService.js` | Gọi API auth (login, register, refresh) |
| `FrontE/src/pages/SignInPage/` | Trang đăng nhập |
| `FrontE/src/pages/SignUpPage/` | Trang đăng ký |
| `FrontE/src/pages/Profile/` | Trang xem/cập nhật thông tin cá nhân |
| `FrontE/src/routes/` | Định nghĩa routes và bảo vệ private routes |
| `FrontE/.env` | Biến môi trường frontend |

### 🔑 Chức năng chính
- **Đăng ký tài khoản** → Hash password (bcrypt) → Lưu MongoDB
- **Đăng nhập** → Tạo `access_token` (15 phút) + `refresh_token` (7 ngày)
- **JWT Interceptor** trong `App.js`: tự động gắn token vào mọi request, tự refresh khi hết hạn
- **authMiddleware** bảo vệ các API cần đăng nhập/quyền Admin

### 🔄 Luồng dữ liệu
```
SignInPage → UserService(FE) → POST /api/user/sign-in
→ UserController → UserService(BE) → JwtService
→ Trả về { access_token, refresh_token }
→ Redux userSlide lưu state → localStorage
```

### ❓ Câu hỏi vấn đáp tiêu biểu
1. *Access token và refresh token khác nhau như thế nào? Tại sao cần cả hai?*
2. *Middleware `authMiddleware.js` hoạt động ra sao? Kiểm tra token ở bước nào?*
3. *Khi access token hết hạn, hệ thống xử lý như thế nào tự động?*
4. *Redux store lưu thông tin user như thế nào? Khi refresh trang thì sao?*
5. *CORS được cấu hình như thế nào và tại sao cần nó?*

---

## 👤 Thành Viên 2 — Quản Lý Sản Phẩm (Product Management)

### 🎯 Phạm vi phụ trách
Toàn bộ vòng đời sản phẩm: từ Admin tạo/sửa/xóa đến User tìm kiếm, xem, lọc sản phẩm.

### 📁 Files chịu trách nhiệm

| File | Mô tả |
|------|-------|
| `BackE/src/models/ProductModel.js` | Schema MongoDB cho Product |
| `BackE/src/services/ProductService.js` | CRUD, phân trang, tìm kiếm, lọc theo type |
| `BackE/src/controllers/ProductController.js` | Xử lý request sản phẩm |
| `BackE/src/routes/ProductRouter.js` | Định nghĩa endpoints `/api/product/*` |
| `FrontE/src/services/ProductService.js` | Gọi API sản phẩm từ FE |
| `FrontE/src/redux/slides/productSlide.js` | Redux state cho sản phẩm tìm kiếm |
| `FrontE/src/pages/HomePage/` | Trang chủ hiển thị sản phẩm nổi bật |
| `FrontE/src/pages/ProductsPage/` | Danh sách tất cả sản phẩm |
| `FrontE/src/pages/ProductDetailsPage/` | Chi tiết sản phẩm |
| `FrontE/src/pages/TypeProductPage/` | Lọc sản phẩm theo danh mục |
| `FrontE/src/components/CardComponent/` | Card hiển thị từng sản phẩm |
| `FrontE/src/components/SliderComponent/` | Slider banner trên trang chủ |
| `FrontE/src/components/TypeProduct/` | Component danh mục sản phẩm |
| `FrontE/src/components/ProductDetailsComponent/` | Component chi tiết sản phẩm |
| `FrontE/src/components/AdminProduct/` | Giao diện Admin quản lý sản phẩm |
| `FrontE/src/components/ButtonInputSearch/` | Ô tìm kiếm sản phẩm |
| `FrontE/src/components/CommentComponent/` | Đánh giá/bình luận sản phẩm |
| `FrontE/src/components/LikeButtonComponent/` | Nút like sản phẩm |

### 🔑 Chức năng chính
- **CRUD sản phẩm** (Admin): tạo, cập nhật ảnh, sửa giá, xóa
- **Phân trang** sản phẩm với `limit` & `page`
- **Tìm kiếm** theo tên sản phẩm (regex MongoDB)
- **Lọc theo type** (loại hàng)
- **Hiển thị chi tiết** sản phẩm với ảnh, giá, mô tả, đánh giá

### 🔄 Luồng dữ liệu
```
ProductsPage → ProductService(FE) → GET /api/product/get-all?limit=8&page=0
→ ProductController → ProductService(BE) → MongoDB
→ Trả về { data: [...], total, pageCurrent }
→ CardComponent render từng sản phẩm
```

### ❓ Câu hỏi vấn đáp tiêu biểu
1. *Phân trang sản phẩm được thực hiện như thế nào (skip/limit trong MongoDB)?*
2. *Tìm kiếm sản phẩm theo tên dùng cơ chế gì? Tại sao dùng regex?*
3. *Schema ProductModel gồm những trường nào? Trường nào bắt buộc?*
4. *Admin upload ảnh sản phẩm như thế nào? Ảnh được lưu ở đâu?*
5. *TypeProductPage hoạt động thế nào khi user click vào một danh mục?*

---

## 👤 Thành Viên 3 — Giỏ Hàng & Đặt Hàng (Cart & Order)

### 🎯 Phạm vi phụ trách
Luồng mua hàng cốt lõi: thêm vào giỏ, quản lý giỏ hàng, đặt hàng, xem lịch sử đơn hàng.

### 📁 Files chịu trách nhiệm

| File | Mô tả |
|------|-------|
| `BackE/src/models/OrderProduct.js` | Schema MongoDB cho Order |
| `BackE/src/services/OrderService.js` | Tạo đơn, lấy đơn theo user, xóa đơn, Admin quản lý |
| `BackE/src/controllers/OrderController.js` | Xử lý request đơn hàng |
| `BackE/src/routes/OrderRouter.js` | Endpoints `/api/order/*` |
| `FrontE/src/redux/slides/orderSlide.js` | Redux state giỏ hàng (addToCart, updateProduct, etc.) |
| `FrontE/src/services/OrderService.js` | Gọi API đơn hàng từ FE |
| `FrontE/src/pages/OrderPage/` | Trang giỏ hàng |
| `FrontE/src/pages/OrderSuccess/` | Trang xác nhận đặt hàng thành công |
| `FrontE/src/pages/MyOrder/` | Lịch sử đơn hàng của user |
| `FrontE/src/pages/DetailsOrderPage/` | Chi tiết từng đơn hàng |
| `FrontE/src/components/OrderAdmin/` | Admin quản lý tất cả đơn hàng |
| `FrontE/src/components/StepConponent/` | Bước tiến trình đặt hàng |
| `FrontE/src/components/DrawerComponent/` | Drawer giỏ hàng trượt ra |

### 🔑 Chức năng chính
- **Redux Cart** (client-side): thêm/xóa/cập nhật số lượng sản phẩm trong giỏ hàng
- **Tạo đơn hàng** lưu vào MongoDB kèm thông tin user, địa chỉ, sản phẩm, giá
- **Xem lịch sử** đơn hàng của user
- **Admin** xem và quản lý toàn bộ đơn hàng

### 🔄 Luồng dữ liệu
```
CardComponent → dispatch(addToCart) → orderSlide (Redux)
OrderPage (hiển thị giỏ) → User nhấn "Đặt hàng"
→ OrderService(FE) → POST /api/order/create
→ OrderController → OrderService(BE) → MongoDB lưu Order
→ Điều hướng sang PaymentPage hoặc OrderSuccess
```

### ❓ Câu hỏi vấn đáp tiêu biểu
1. *Giỏ hàng được lưu ở đâu? Redux, localStorage hay database? Tại sao?*
2. *Schema OrderProduct gồm những trường gì? `orderItems` có cấu trúc như thế nào?*
3. *Khi user thêm cùng 1 sản phẩm 2 lần, giỏ hàng xử lý như thế nào trong `orderSlide.js`?*
4. *Luồng từ "Thêm vào giỏ" đến khi đơn hàng được lưu vào DB gồm mấy bước?*
5. *Admin có thể làm gì với đơn hàng trong `OrderAdmin`?*

---

## 👤 Thành Viên 4 — Thanh Toán (Payment)

### 🎯 Phạm vi phụ trách
Module thanh toán: tích hợp VNPay, thanh toán COD khi nhận hàng, xử lý callback thanh toán.

### 📁 Files chịu trách nhiệm

| File | Mô tả |
|------|-------|
| `BackE/src/services/PaymentService.js` | Tạo URL thanh toán VNPay, xác minh chữ ký |
| `BackE/src/controllers/PaymentController.js` | Xử lý tạo payment, callback VNPay return |
| `BackE/src/routes/PaymentRouter.js` | Endpoints `/api/payment/*` |
| `BackE/src/routes/MailRouter.js` | Router gửi email xác nhận |
| `BackE/src/services/EmailService.js` | Gửi email (nodemailer config) |
| `BackE/src/services/MailService.js` | Nội dung email đơn hàng |
| `FrontE/src/services/PaymentService.js` | Gọi API thanh toán từ FE |
| `FrontE/src/pages/PaymentPage/` | Trang chọn phương thức thanh toán + nhập địa chỉ |
| `FrontE/src/pages/PaymentVNPayReturn/` | Trang xử lý callback sau khi VNPay trả về |
| `FrontE/src/components/InputForm/` | Form nhập địa chỉ giao hàng |

### 🔑 Chức năng chính
- **VNPay integration**: tạo URL redirect với HMAC-SHA512 chữ ký bảo mật
- **Callback xử lý**: kiểm tra chữ ký VNPay trả về, xác nhận thanh toán thành công
- **Gửi email** xác nhận đơn hàng sau khi thanh toán thành công
- **COD** (thanh toán khi nhận hàng)

### 🔄 Luồng dữ liệu VNPay
```
PaymentPage → Chọn VNPay → PaymentService(FE) → POST /api/payment/create-payment
→ PaymentController → PaymentService(BE): tạo URL VNPay với checksum
→ FE redirect đến cổng VNPay
→ User thanh toán → VNPay redirect về /api/payment/vnpay-return
→ PaymentController xác minh chữ ký → Cập nhật đơn hàng
→ Redirect FE về PaymentVNPayReturn → Hiển thị kết quả
```

### ❓ Câu hỏi vấn đáp tiêu biểu
1. *VNPay hoạt động theo cơ chế nào? Tại sao cần tạo chữ ký HMAC-SHA512?*
2. *Callback từ VNPay trả về những tham số gì? Hệ thống kiểm tra gì để xác nhận giao dịch hợp lệ?*
3. *Nếu user đóng trình duyệt giữa chừng khi đang thanh toán VNPay thì đơn hàng ở trạng thái gì?*
4. *Email xác nhận đơn hàng được gửi ở bước nào trong luồng? Dùng thư viện gì?*
5. *Làm thế nào để ứng dụng gửi email xác nhận tự động mà không làm chặn luồng phản hồi HTTP?*

---

## 👤 Thành Viên 5 — Giao Diện Người Dùng, Admin Dashboard & Triển Khai (UI/UX, Admin & Deployment)

### 🎯 Phạm vi phụ trách
Toàn bộ giao diện chung, layout, Admin dashboard, trải nghiệm người dùng và chịu trách nhiệm triển khai hệ thống (Vercel/Render).

### 📁 Files chịu trách nhiệm

| File | Mô tả |
|------|-------|
| `FrontE/src/components/HeaderCompoent/` | Header: logo, search bar, giỏ hàng, user menu |
| `FrontE/src/components/FooterComponent/` | Footer trang web |
| `FrontE/src/components/NavbarComponent/` | Navigation bar danh mục |
| `FrontE/src/components/DefaultComponent/` | Layout bọc Header + Footer |
| `FrontE/src/components/HeaderLeft/` | Phần bên trái header |
| `FrontE/src/components/AdminUser/` | Admin quản lý danh sách User |
| `FrontE/src/components/TableComponent/` | Reusable table cho Admin |
| `FrontE/src/components/ModalComponent/` | Reusable modal popup |
| `FrontE/src/components/ButtonComponent/` | Reusable button |
| `FrontE/src/components/InputComponent/` | Reusable input field |
| `FrontE/src/components/LoadingComponent/` | Spinner loading toàn trang |
| `FrontE/src/components/Message/` | Thông báo toast (success/error) |
| `FrontE/src/pages/AdminPage/` | Trang Admin tổng hợp |
| `FrontE/src/pages/NotFoundPage/` | Trang 404 |
| `FrontE/src/pages/ForgotPasswordPage/` | Quên mật khẩu |
| `FrontE/src/pages/ResetPasswordPage/` | Reset mật khẩu |
| `FrontE/src/index.css` | Global CSS styles |
| `FrontE/src/utils.js` | Utility functions (format giá, ...) |
| `FrontE/src/contant.js` | Constants (API URL, ...) |
| `FrontE/src/formatter.js` | Format tiền tệ VNĐ |
| `BackE/src/formatter.js` | Format tiền tệ BE |
| `FrontE/public/` | Static assets (favicon, index.html) |
| `FrontE/src/hooks/` | Custom React hooks |
| `FrontE/src/assets/` | Hình ảnh, icons tĩnh |

### 🔑 Chức năng chính
- **Layout hệ thống**: Header responsive với giỏ hàng, tìm kiếm, avatar user
- **Admin Dashboard**: Sidebar điều hướng Admin, quản lý User, sản phẩm, đơn hàng
- **Reusable Components**: Button, Input, Modal, Table, Loading dùng chung toàn app
- **UX**: Thông báo toast, loading spinner, trang 404
- **Quên/Reset mật khẩu**: Flow gửi email OTP reset password
- **Format & Utils**: Format giá tiền VNĐ, các hàm tiện ích dùng chung
- **Triển khai hệ thống (Deployment)**: Cấu hình và triển khai Frontend lên Vercel, Backend lên Render, quản lý các biến môi trường và thiết lập CORS đảm bảo kết nối thông suốt giữa FE và BE.

### 🔄 Luồng dữ liệu Admin
```
AdminPage → Tab chọn (Product/User/Order)
→ Render AdminProduct / AdminUser / OrderAdmin
→ TableComponent hiển thị dữ liệu với search, pagination
→ ModalComponent để thêm/sửa → Gọi API tương ứng
→ Message (toast) thông báo kết quả
```

### ❓ Câu hỏi vấn đáp tiêu biểu
1. *`DefaultComponent` có tác dụng gì? Tại sao không phải trang nào cũng dùng nó?*
2. *Cơ chế phân quyền Admin được kiểm tra ở phía Frontend như thế nào?*
3. *`TableComponent` được thiết kế reusable ra sao? Nhận props gì từ parent?*
4. *Loading component hoạt động như thế nào? Tại sao bọc ở App.js?*
5. *Hàm format tiền tệ VNĐ trong `formatter.js` hoạt động ra sao?*
6. *Flow quên mật khẩu từ đầu đến cuối gồm những bước gì?*
7. *Khi deploy ứng dụng lên Vercel (Frontend) và Render (Backend), bạn đã cấu hình như thế nào để xử lý lỗi CORS và thiết lập các biến môi trường để cổng VNPay Sandbox hoạt động đúng?*

---

## 📊 Tổng Quan Phân Chia

| Thành viên | Module | BE Files | FE Files |
|-----------|--------|----------|----------|
| TV1 | Auth & Core | 5 files | 9 files |
| TV2 | Product | 4 files | 10 files |
| TV3 | Cart & Order | 4 files | 8 files |
| TV4 | Payment & Email | 5 files | 4 files |
| TV5 | UI/UX & Admin | 2 files | 18+ files |

## 💡 Lưu Ý Khi Vấn Đáp

> [!IMPORTANT]
> Mỗi thành viên cần **nắm rõ luồng dữ liệu đầu đến cuối** của module mình, không chỉ biết file của mình mà còn biết nó kết nối với module khác như thế nào.

> [!TIP]
> Các module có sự phụ thuộc quan trọng:
> - **TV3 (Order)** phụ thuộc vào **TV1 (Auth)** để xác thực user trước khi đặt hàng
> - **TV4 (Payment)** phụ thuộc vào **TV3 (Order)** để lấy thông tin đơn hàng cần thanh toán
> - **TV2 (Product)** cung cấp dữ liệu sản phẩm cho **TV3 (Cart)**
> - **TV5 (UI)** sử dụng components của tất cả các TV khác

> [!NOTE]
> Câu hỏi liên module thường gặp: *"Khi user đặt hàng, dữ liệu đi qua những thành phần nào từ TV1 → TV2 → TV3 → TV4?"*
