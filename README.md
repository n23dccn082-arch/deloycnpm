# 🛍️ DT-Shop E-Commerce Web Application

DT-Shop là một dự án website thương mại điện tử hoàn chỉnh được xây dựng trên mô hình Client-Server hiện đại, sử dụng công nghệ Node.js/Express cho Backend, React.js cho Frontend và MongoDB làm cơ sở dữ liệu.

---

## 🚀 Các Tính Năng Chính
- **Xác thực & Phân quyền:** Đăng ký, đăng nhập an toàn sử dụng cơ chế Access Token & Refresh Token (JWT). Ràng buộc mật khẩu tối thiểu 6 ký tự, kiểm tra tính đúng đắn của email và định dạng số điện thoại (10 chữ số).
- **Quản lý sản phẩm:** Tìm kiếm, phân trang, lọc sản phẩm theo danh mục sản phẩm, hiển thị chi tiết sản phẩm.
- **Giỏ hàng & Đơn hàng:** Thêm vào giỏ hàng (Redux), đặt hàng trực tuyến dành cho cả thành viên và khách vãng lai (Guest Checkout).
- **Thanh toán trực tuyến VNPay:** Tích hợp cổng thanh toán VNPay Sandbox với thuật toán mã hóa HMAC-SHA512. Tự động chuyển hướng chính xác theo môi trường chạy (Localhost / Production) và cập nhật trạng thái đơn hàng.
- **Gửi Email tự động:** Xác nhận thông tin đơn đặt hàng tới Email khách hàng ngay sau khi thanh toán thành công thông qua Nodemailer.
- **Trang Admin (Dashboard):** Quản trị danh mục sản phẩm, người dùng và đơn đặt hàng. Hỗ trợ tìm kiếm, phân loại thông minh, sắp xếp không crash, xuất dữ liệu thống kê ra file Excel.

---

## 🛠️ Yêu Cầu Hệ Thống
Trước khi cài đặt, hãy đảm bảo máy tính của bạn đã được cài đặt:
- [Node.js](https://nodejs.org/) (Khuyến nghị phiên bản LTS v18 trở lên)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) hoặc MongoDB Server chạy cục bộ.

---

## ⚙️ Hướng Dẫn Cài Đặt Chi Tiết
##hoặc có thể truy cập hosting đã deploy để xem:https://deloycnpm.vercel.app/

### Bước 1: Clone mã nguồn về máy cục bộ
```bash
git clone https://github.com/n23dccn082-arch/deloycnpm.git
cd deloycnpm
```

### Bước 2: Cấu hình và chạy Backend (`BackE`)
1. Di chuyển vào thư mục backend:
   ```bash
   cd BackE
   ```
2. Cài đặt các gói phụ thuộc (Dependencies):
   ```bash
   npm install
   ```
3. Tạo file cấu hình môi trường `.env` trong thư mục `BackE` và điền đầy đủ các thông tin sau:
   ```env
   REACT_APP_API_URL=http://localhost:3001/api
   PORT=3001
   
   # Chuỗi kết nối cơ sở dữ liệu MongoDB (Ví dụ bên dưới sử dụng MongoDB Atlas)
   MongoDB=mongodb+srv://<username>:<password>@cluster.mongodb.net/dtshop?retryWrites=true&w=majority
   
   # Khóa bí mật ký mã JWT
   ACCESS_TOKEN=ChuoiBiMatAccessToken123
   REFRESH_TOKEN=ChuoiBiMatRefreshToken456
   
   # Cổng thanh toán VNPay (Thông tin Sandbox của bạn)
   VNP_TMN_CODE=31YLPZ3I
   VNP_HASH_SECRET=86CEZX2NCAUJN1IVXLXI7S64VK2SI6TO
   VNP_URL=https://sandbox.vnpayment.vn/paymentv2/vpcpay.html
   VNP_RETURN_URL=http://localhost:3000/payment/vnpay-return
   
   # Cấu hình Nodemailer gửi Email
   MAIL_HOST=smtp.gmail.com
   MAIL_PORT=587
   MAIL_USER=dtshop.noreply@gmail.com
   MAIL_PASS=ynjbfxsyaaykidop
   MAIL_FROM="DT Shop" <dtshop.noreply@gmail.com>
   
   FRONTEND_URL=http://localhost:3000
   ```
4. Khởi chạy máy chủ Backend:
   ```bash
   npm start
   ```
   Mặc định server backend sẽ hoạt động tại địa chỉ: `http://localhost:3001`

---

### Bước 3: Cấu hình và chạy Frontend (`FrontE`)
1. Mở một terminal mới và di chuyển vào thư mục frontend:
   ```bash
   cd FrontE
   ```
2. Cài đặt các gói phụ thuộc (Dependencies):
   ```bash
   npm install
   ```
3. Tạo file cấu hình môi trường `.env` trong thư mục `FrontE`:
   ```env
   REACT_APP_API_URL=http://localhost:3001/api
   DANGEROUSLY_DISABLE_HOST_CHECK=true
   ```
4. Khởi chạy giao diện Frontend:
   ```bash
   npm start
   ```
   Ứng dụng frontend sẽ tự động khởi động trên trình duyệt tại địa chỉ: `http://localhost:3000`

---

## 🌐 Hướng Dẫn Triển Khai Lên Hosting (Production)

### 1. Triển khai Backend lên Render
- Kết nối GitHub Repository của bạn với [Render](https://render.com/).
- Tạo một **Web Service** mới trỏ vào thư mục root hoặc chỉ định `Root Directory` là `BackE`.
- **Build Command:** `npm install`
- **Start Command:** `node src/index.js`
- Cài đặt đầy đủ các biến môi trường trong tab **Environment** tương tự file `.env` của Backend. *Lưu ý: Đảm bảo biến `VNP_RETURN_URL` được cấu hình động hoặc trùng khớp với domain của Frontend trên Vercel.*

### 2. Triển khai Frontend lên Vercel
- Kết nối GitHub Repository của bạn với [Vercel](https://vercel.com/).
- Tạo project mới, chọn thư mục root và chỉ định thư mục build là `FrontE`.
- **Framework Preset:** `Create React App`
- Thiết lập biến môi trường `REACT_APP_API_URL` trỏ về địa chỉ domain Backend của bạn đã deploy trên Render (Ví dụ: `https://your-backend-domain.onrender.com/api`).
