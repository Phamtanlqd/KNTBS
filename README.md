# Bài 5 – Kết nối máy tính với các thiết bị số (Tin học 11)

## Nội dung gói
- `index.html`: website học tập responsive, mobile-first; 7 khu vực học tập + nộp bài + dashboard + QR.
- `assets/infographic.svg`: infographic sơ đồ kết nối, có thể mở/in hoặc chỉnh sửa bằng trình biên tập SVG.
- `apps-script/Code.gs`: endpoint mẫu nhận bài nộp và ghi Google Sheets.
- `docs/storyboard.md`: storyboard bài giảng 2 tiết.
- `docs/SETUP.md`: hướng dẫn triển khai GitHub Pages và Google Apps Script.

## Chạy thử
Mở `index.html` bằng trình duyệt. Tính năng QR tự tạo qua dịch vụ QR trực tuyến khi có Internet. Khi chưa cấu hình endpoint, website cho phép tải phiếu JSON để nộp qua kênh giáo viên chỉ định.

## Triển khai GitHub Pages
1. Tạo repository GitHub, tải lên toàn bộ nội dung bên trong thư mục này.
2. Settings → Pages → Deploy from a branch → `main` / `/ (root)`.
3. Mở URL GitHub Pages. QR sẽ dùng địa chỉ hiện tại.
4. Để nhận bài tập trung, triển khai `apps-script/Code.gs` theo hướng dẫn trong `docs/SETUP.md`.

## Giới hạn cần biết
GitHub Pages là hosting tĩnh, không tự lưu bài nộp hoặc ảnh tải lên. Mẫu hiện tại nhận JSON và URL minh chứng; tệp ảnh nên được lưu ở Google Drive/LMS được nhà trường phê duyệt, với quyền truy cập phù hợp. Dashboard đọc danh sách khi endpoint trả về JSON. Không gửi dữ liệu cá nhân nhạy cảm hoặc hình/giọng nói của học sinh vào AI công cộng.

## Nguồn nội dung
Các nội dung được xây dựng theo yêu cầu mô tả trong đề bài. PDF SGK được đính kèm trong cuộc trò chuyện không trích xuất được văn bản tự động, vì vậy gói này không khẳng định đã đối chiếu từng trang SGK.
