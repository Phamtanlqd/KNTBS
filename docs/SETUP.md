# Hướng dẫn triển khai và cấu hình nhận bài

## A. GitHub Pages
1. Tạo repository `bai5-thiet-bi-so`.
2. Upload `index.html`, `assets/`, `apps-script/`, `docs/`, `README.md`.
3. Vào **Settings → Pages**, chọn deploy từ nhánh `main`, thư mục root.
4. Đợi GitHub cấp URL; mở URL đó trên máy tính và điện thoại.
5. Trang **QR Learning** tự lấy URL hiện tại để tạo mã QR qua dịch vụ QR trực tuyến. Nếu mạng trường chặn dịch vụ QR, dùng URL trực tiếp hoặc tạo QR theo quy định của trường.

## B. Google Sheets + Apps Script
1. Tạo Google Sheet mới, tạo/ghi lại Spreadsheet ID từ URL.
2. Trong Google Sheets: Extensions → Apps Script.
3. Dán nội dung `apps-script/Code.gs`.
4. Thay `PASTE_SPREADSHEET_ID_HERE` bằng ID của bảng tính.
5. Chạy hàm `setup()` một lần và cấp quyền. Hàm tạo sheet `Submissions`.
6. Deploy → New deployment → Web app. Chọn execute as tài khoản triển khai; quyền truy cập chọn theo chính sách nhà trường (không mở công khai nếu không phù hợp).
7. Sao chép URL Web App `/exec`.
8. Mở website → Dashboard giáo viên → dán URL endpoint → Lưu endpoint. Endpoint được lưu trong trình duyệt hiện tại. Để gửi bài trên từng thiết bị học sinh, cần cấu hình endpoint ở mỗi trình duyệt hoặc sửa cấu hình `DEFAULT_ENDPOINT` trong `index.html`.
9. Nộp thử một bản ghi với dữ liệu giả trước khi dùng với lớp thật.

## C. Ảnh minh chứng
Mẫu website nhận **URL** minh chứng, không tải file ảnh nhị phân lên Apps Script. Học sinh có thể đưa ảnh vào thư mục Google Drive/LMS do giáo viên hướng dẫn, đặt quyền truy cập tối thiểu cần thiết rồi dán URL. Không dùng thư mục công khai cho dữ liệu nhạy cảm.

## D. An toàn và vận hành
- Không yêu cầu học sinh nhập mật khẩu/tài khoản vào website học liệu.
- Chỉ thu thập dữ liệu cần thiết; công bố mục đích sử dụng và thời hạn lưu.
- Không đưa khuôn mặt/giọng nói của học sinh lên AI công cộng nếu chưa có sự cho phép phù hợp.
- Khi thiết bị không sẵn có, cho phép quan sát/mô phỏng nhưng phải ghi rõ, không tính là thao tác thực tế thành công.
- Apps Script web app có giới hạn quota và chính sách quyền truy cập; kiểm tra trong tài khoản trường trước khi triển khai chính thức.
