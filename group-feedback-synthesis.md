# GROUP FEEDBACK SYNTHESIS — TỔNG HỢP NHÓM

> **Nhóm:** Ca Khô — Nguyễn Văn Sơn (2A202602744) · Ninh Quang Minh (2A202602432)
> **Case:** Case B — AI Notes: Personal Learning Notes
> **Tài liệu liên quan:** [`three-option-design-sheet.md`](three-option-design-sheet.md) · [`prototype-link.md`](prototype-link.md) · [`docs/TEST-KIT.md`](docs/TEST-KIT.md)
> **Bản ghi chép cá nhân:** [`prototype-feedback-note.md`](prototype-feedback-note.md) (phiên của Nguyễn Văn Sơn) · bản của Ninh Quang Minh nằm trong repo cá nhân của bạn ấy.

---

## ⚠️ TRẠNG THÁI HỒ SƠ

> **PHẦN DỮ LIỆU CHƯA CÓ — CHƯA ĐƯỢC ĐIỀN.**
>
> Bảng ma trận và quyết định Next Change ở đây **chỉ được điền sau khi cả hai đã có phiên test thật**. Tôi không điền sẵn phỏng đoán của tester, vì đó là vi phạm luật lab và làm hỏng đúng thứ bài này muốn đo.
>
> **Checklist trước khi nộp:**
>
> - [ ] Sơn đã điền [`prototype-feedback-note.md`](prototype-feedback-note.md)
> - [ ] Minh đã điền bản feedback note trong repo cá nhân của bạn ấy
> - [ ] Cả hai đã họp 15 phút, mỗi người đọc tóm tắt cột của mình
> - [ ] §2 đã điền đủ 6 hàng × 2 cột
> - [ ] §3 đã tìm ra ít nhất 1 pattern chung **và** 1 khác biệt nổi bật
> - [ ] §4 đã chốt **đúng 1** Next Change
> - [ ] §5 đã ghi Still Unproven
> - [ ] Đã cập nhật mục 5 trong [`README.md`](README.md)

---

## 1. HỢP ĐỒNG SO SÁNH TRƯỚC KHI TEST

Ba option đã được chốt cùng một hợp đồng ở [`three-option-design-sheet.md` §2.4](three-option-design-sheet.md). Ghi lại ở đây để khi tổng hợp không quên rằng mình đang so cái gì:

| | **A — AI tự chọn lọc** | **B — AI hỏi 3 câu** | **C — AI tự can thiệp** |
| :--- | :--- | :--- | :--- |
| **Agency** | Don't act | Ask | Act |
| **Người học phải làm gì trước khi AI ra kết quả** | Bấm 1 nút | Trả lời 3 câu | Không làm gì |
| **Chi phí thời gian** | ~1 giây | 40–60 giây | 0 giây nhưng phải chờ |
| **Vị trí 2 ảnh chụp do ai quyết** | AI đoán | **Người học** | AI đoán kèm độ chắc chắn |

---

## 2. MA TRẬN SO SÁNH 2 PHIÊN

*(Nhóm 2 người → mỗi người 1 phiên. Ai cũng phải cho người học thử **đủ 3 option**, không mang riêng option mình làm.)*

| Tiêu điểm quan sát | **Phiên 1**<br>*Facilitator: Nguyễn Văn Sơn (2A202602744)* | **Phiên 2**<br>*Facilitator: Ninh Quang Minh (2A202602432)* | **Pattern chung / Khác biệt nổi bật** |
| :--- | :--- | :--- | :--- |
| **Tester đạt tiêu chí 7 ngày?**<br>*Câu trả lời nguyên văn* | ⬜ | ⬜ | ⬜ |
| **First Action**<br>*Trong 15 giây đầu ở mỗi option* | ⬜ | ⬜ | ⬜ |
| **Điểm nghẽn**<br>*Dừng lâu ở đâu, bấm nhầm gì, mất bao lâu* | ⬜ | ⬜ | ⬜ |
| **Có kiểm chứng neo vị trí không?**<br>*Bấm vào badge `Slide X · phút` để nhảy về bài* | ⬜ | ⬜ | ⬜ |
| **Cách lấy lại control**<br>*Undo / Làm lại 3 câu / Bỏ phần hỏi / Không phải chỗ này / Tắt tự nhắc* | ⬜ | ⬜ | ⬜ |
| **Option được chọn cuối cùng + trade-off** | ⬜ | ⬜ | ⬜ |
| **⭐ Sáng mai có cần mở lại video không?** | ⬜ | ⬜ | ⬜ |

---

## 3. ĐỐI CHIẾU ĐỊNH LƯỢNG TỪ LOG CSV

Điền từ cột `t_sec` của [`prototype-feedback-note.md` §2.1](prototype-feedback-note.md):

| Đo được | Phiên 1 | Phiên 2 | Nhận xét |
| :--- | :--- | :--- | :--- |
| Giây từ `start` → ghi chú xuất hiện hết (**A**) | ⬜ | ⬜ | ⬜ |
| Giây từ `start` → `b-built` (**B**) | ⬜ | ⬜ | ⬜ |
| Giây người học nghĩ ở câu 3 của B (từ `b-next` câu 2 → `b-assign` đầu tiên) | ⬜ | ⬜ | ⬜ |
| Giây chờ thẻ tự nhắc của **C** (từ `start` → `c-nudge`) | ⬜ | ⬜ | ⬜ |
| Giây từ `start` → `note-save` (option được chọn) | ⬜ | ⬜ | ⬜ |
| Số lần bấm `note-edit` (sửa tay) | ⬜ | ⬜ | ⬜ |
| Số lần bấm `note-del` (xoá mục AI thêm) | ⬜ | ⬜ | ⬜ |
| Số lần bấm `anchor-check` (kiểm chứng neo vị trí) | ⬜ | ⬜ | ⬜ |

---

## 4. GROUP NEXT CHANGE — QUYẾT ĐỊNH DUY NHẤT

> Luật của bài lab: chốt **một** thay đổi, dựa trên **bằng chứng quan sát được**, không bình bầu theo cảm tính.
> Mẫu câu hỏi để chốt: *"Ở vòng lặp tiếp theo, nhóm sẽ thay đổi một điều gì? Bằng chứng nào khiến mình chọn điều đó?"*

⬜ **Quyết định:**

> ⬜ *(viết ở đây, tối đa 5 dòng)*

### 4.1 Bằng chứng dẫn tới quyết định

| # | Bằng chứng cụ thể | Từ phiên nào | Nó buộc phải quyết định gì |
| :--- | :--- | :--- | :--- |
| 1 | ⬜ | ⬜ | ⬜ |
| 2 | ⬜ | ⬜ | ⬜ |
| 3 | ⬜ | ⬜ | ⬜ |

### 4.2 Điều đã thử mà **không** làm quyết định

*Ghi lại để tránh lặp lại sai lầm ở vòng sau.*

| Ý tưởng cân nhắc | Vì sao cuối cùng không chọn |
| :--- | :--- |
| ⬜ | ⬜ |

---

## 5. STILL UNPROVEN SAU 2 PHIÊN

> **Không được viết "không còn gì chưa biết".** Cột này càng dài càng cho thấy nhóm hiểu giới hạn bằng chứng của mình.
>
> Danh sách khởi đầu — những điều **chắc chắn vẫn chưa biết** dù 2 phiên có ra sao (chi tiết ở [`three-option-design-sheet.md` §5](three-option-design-sheet.md)):

| # | Điều chưa chứng minh được | Vì sao 2 phiên test không trả lời được |
| :--- | :--- | :--- |
| 1 | **Có thật sự thay được việc xem lại video không?** (Hypothesis B từ Day 17) | Chỉ 2 người, mỗi người 1 buổi tối có sẵn bài đã học. Không đo được hành vi **một tuần sau** khi bài đã lạnh. |
| 2 | **Ghi chú có bắt được lỗi "lộn công thức" không?** | Trong prototype chỉ có cờ suy ra từ *hành vi đọc*; chưa có cơ chế nào phát hiện *sai sót kiến thức*. |
| 3 | **Có kéo được hành vi ghi chú trở lại không?** (P07 đã bỏ ghi chú 2 tuần) | Prototype chỉ làm việc trong 1 buổi. Không quan sát được chuỗi nhiều buổi. |
| 4 | **Ảnh chụp cũ ngoài bài** (~40 ảnh lẫn ảnh đời thường, không phân thư mục) | Ngoài scope critical interaction. |
| 5 | **Tồn đọng giữa các buổi** | Mọi option kết thúc ở "lưu ghi chú"; không có gì xử lý lần mở ghi chú tuần sau — đúng khoảnh khắc P07 nói là không bao giờ xảy ra. |
| 6 | **Chất lượng khi AI thật** | Toàn bộ phản hồi trong prototype là canned output. Chưa đo được lúc AI thật sai, chậm, hoặc từ chối trả lời. |
| 7 | **Quy mô mẫu** | ⬜ *(ghi thêm điểm khác biệt riêng với 2 tester của nhóm)* |

⬜ **Câu hỏi lớn nhất còn mở sau Day 18:**

> ⬜

---

## 6. CHECKPOINT CHẶNG 7

- [ ] Bảng ma trận §2 đủ 6 hàng × 2 cột, mọi ô đều là **quan sát được** chứ không phải cảm nhận.
- [ ] Có ít nhất **1 pattern chung** (2/2 tester hành xử giống nhau) — không phải 2 kết luận trái chiều rồi gọi đó là "đa dạng".
- [ ] Có ít nhất **1 khác biệt nổi bật** giữa 2 tester — đây mới là chỗ dùng được để quyết định.
- [ ] §4 chốt **đúng 1** Next Change, có số dòng bằng chứng.
- [ ] §5 ghi Still Unproven, không ghi "đã chứng minh".
- [ ] Không có câu nào trong bài này dùng từ *"validated"*, *"chứng minh được"* hay *"chắc chắn là"*.
- [ ] Đã cập nhật [`README.md`](README.md) §5.