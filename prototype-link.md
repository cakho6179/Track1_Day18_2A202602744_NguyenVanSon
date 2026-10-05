# PROTOTYPE LINK & HƯỚNG DẪN MỞ

> **Người phụ trách:** Nguyễn Văn Sơn — 2A202602744 · nhóm **Ca Khô**
> **Case:** Case B — AI Notes: Personal Learning Notes
> **Prototype:** [`prototype/index.html`](prototype/index.html)

---

## 1. CÁCH MỞ

**Cách 1 — bấm thẳng file (không cần máy chủ, không cần mạng):**

Mở trình duyệt (Chrome / Edge), kéo thả file `prototype/index.html` vào cửa sổ trình duyệt, hoặc gõ trực tiếp vào thanh địa chỉ:

```
file:///D:/AITHUCCHIEN/Lab/Lab18/Track1_Day18_2A202602744_NguyenVanSon/prototype/index.html
```

**Cách 2 — VS Code:** mở `prototype/index.html`, nhấn `Ctrl+Shift+P` → **Live Server: Open with Live Server**.

> Không có bước cài đặt, không có `npm install`, không có build. Toàn bộ prototype là HTML/CSS/JS thuần, nằm trong 4 file cùng thư mục `prototype/`:
>
> | File | Vai trò |
> | :--- | :--- |
> | `prototype/index.html` | Khung trang + khung drawer Facilitator log |
> | `prototype/assets/base.css` | Toàn bộ style (bảng màu VLearn, không dùng gradient tím) |
> | `prototype/assets/data.js` | **Nội dung dùng chung**: 3 chủ đề × 2 chế độ, dấu vết học tập, ghi chú mẫu, câu hỏi kiểm tra |
> | `prototype/assets/options.js` | Mô hình ghi chú + panel của 3 option + trình chỉnh sửa dùng chung |
> | `prototype/assets/app.js` | Router (hash URL), state, logger CSV, xử lý hành động |

---

## 2. CÁCH ĐỌC URL

URL có dạng:

```
index.html#<chủ đề>/<chế độ>/<option>
```

| Thành phần | Giá trị hợp lệ | Ý nghĩa |
| :--- | :--- | :--- |
| `<chủ đề>` | `pipeline` · `cache` · `context` | Pipeline CPU · Cache & CPI · Context Window |
| `<chế độ>` | `theory` · `lab` | Lý thuyết (Slide) · Thực hành (Lab) |
| `<option>` | `A` · `B` · `C` | Ba solution options |

Ngoài ra có `#log` để mở thẳng drawer Facilitator log.

Gõ URL sai hoặc thiếu phần → tự động rơi về `pipeline/theory/A`.

### 2.1 Đủ 18 tổ hợp

| Chủ đề | Lý thuyết (Slide) | Thực hành (Lab) |
| :--- | :--- | :--- |
| **Pipeline CPU** | `#pipeline/theory/A` · `#pipeline/theory/B` · `#pipeline/theory/C` | `#pipeline/lab/A` · `#pipeline/lab/B` · `#pipeline/lab/C` |
| **Cache & CPI** | `#cache/theory/A` · `#cache/theory/B` · `#cache/theory/C` | `#cache/lab/A` · `#cache/lab/B` · `#cache/lab/C` |
| **Context Window** | `#context/theory/A` · `#context/theory/B` · `#context/theory/C` | `#context/lab/A` · `#context/lab/B` · `#context/lab/C` |

### 2.2 URL nên dùng khi test

**Khuyến nghị:** `#pipeline/theory/A` — đúng bài P07 đang học, có đủ 7 dấu vết, và có **2 ảnh chụp không có số slide/phút** nên nhìn thấy rõ khác biệt giữa 3 option.

Nếu muốn khuếch đại điểm khác biệt về cờ "chưa hiểu" và độ chắc chắn: `#context/theory/C` (3 cờ, mức chắc chắn 88% / 55% / 33%).
Nếu muốn xem bản rộng nhất về xác nhận ảnh: `#cache/theory/B` (3 slide, 2 ảnh chụp).

---

## 3. THANH PROTOTYPE BAR (chỉ phục vụ demo & test)

Thanh này **không thuộc sản phẩm**, chỉ để facilitator chuyển nhanh giữa các option và lấy log:

- Nút **chủ đề** / **chế độ** / **Option A|B|C** → đổi URL, **tự reset phiên đang chạy**.
- **Làm lại** → reset phiên hiện tại (giữ nguyên chủ đề/chế độ/option).
- **Facilitator log** → mở drawer bên phải, ghi lại **mọi thao tác kèm giây thứ tự**. Có **Copy dạng CSV** và **Tải file .csv**.
- Phím **Esc** → đóng drawer.

> Chuyển option = bắt đầu phiên mới. Đây là chủ ý: ba option phải được xem như ba phiên độc lập để so sánh được.

---

## 4. OUTCOME TASK — nói nguyên văn cho tester

Đọc đúng, không thêm bớt, **không chỉ tay vào nút nào**:

> *"Trên màn hình này là một bài học bạn vừa học xong tối qua, kèm 7 dấu vết bạn đã để lại: mấy đoạn highlight, 2 chỗ bạn đánh dấu 'Chưa hiểu', câu hỏi bạn gõ, ghi chú bạn gõ trên điện thoại, và 2 ảnh chụp màn hình mà không có số slide.*
>
> *Mai bạn định giải lại 5 bài tập cuối chương. Nhiệm vụ của bạn là tạo ra một bản ghi chú mà mai mở ra là dùng được, không phải xem lại cả video 35 phút.*
>
> *Có ba cách khác nhau để làm việc đó. Bạn thử từng cách một, đừng lo làm hỏng gì — mình sẽ bảo bạn làm lại bất cứ lúc nào. Cứ thao tác tự nhiên và nói to suy nghĩ của bạn nhé."*

Sau khi người học trả lời câu kiểm tra ở cuối slide:

> *"Sáng mai, khi bạn mở bản ghi chú này lên, bạn có cần mở video không? Vì sao?"*

Câu cuối này là câu đo trực tiếp **Hypothesis B** từ Day 17 — xem [`three-option-design-sheet.md` §1.2](three-option-design-sheet.md).

---

## 5. BỐI CẢNH DỮ LIỆU

Toàn bộ nội dung trong prototype lấy từ **practice interview P07** (Day 17, [`three-option-design-sheet.md` §1.1](three-option-design-sheet.md)):

| Yếu tố trong prototype | Căn cứ trong evidence Day 17 |
| :--- | :--- |
| Bài **"Pipeline CPU"**, tối 21h, định giải 5 bài tập cuối chương | Nguyên văn notes.md |
| 2 ảnh chụp **không có số slide/phút** | *"Chụp xong slide thì cũng không biết nó ở phút nào của video"* |
| Ghi chú điện thoại kiểu **"1 CPI sau khi đầy"**, **"reserve dành cho output"** | P07 tự mô tả note của mình là *"đống chữ lộn xộn"* |
| **"Chưa hiểu"** ở đúng chỗ | P07 từng bỏ ghi chú 2 tuần rồi quay lại vì sắp thi |
| Checkpoint Pipeline: đáp án nhiễu 25 (công thức của bài 21 lệnh) | *"ai dè lộn công thức tính CPI"* |
| Lab 7 `avg_cpi()` thiếu hệ số `miss rate`; đáp án nhiễu `hit rate × hit time` | Quiz cache miss hỏng chính vì lộn công thức |
| Checkpoint Context Window: đáp án nhiễu 9000 (cộng nhầm thay vì trừ) | *"forwarding lấy dữ liệu từ tầng nào?"* — câu hỏi nhẫn nhất về `reserve` |

**Tất cả phản hồi AI trong prototype là canned output** do tôi viết tay. Không có API nào được gọi. Điều này được khai báo trong [`ai-support-log.md`](ai-support-log.md).

---

## 6. FACILITATOR LOG — CÁCH LẤY DỮ LIỆU

1. Bấm **Facilitator log** (hoặc vào `#log`).
2. Sau khi test xong: **Copy dạng CSV** → dán vào mục `OBSERVED` trong [`prototype-feedback-note.md`](prototype-feedback-note.md).
3. Nếu clipboard bị chặn: dùng **Tải file .csv** (tên file tự chứa chủ đề + chế độ + option).

**Định dạng CSV:**

```csv
time,option,t_sec,event,detail
23:04:33,A,1,a-start,AI đọc 7 dấu vết
23:04:35,A,2,a-built,"AI tự chọn lọc và nhóm: 4 mục"
```

**Sự kiện được ghi lại:**

| Nhóm | Event | Ý nghĩa |
| :--- | :--- | :--- |
| Bắt đầu | `start` · `reset` | Mở phiên mới · bấm "Làm lại" |
| Option A | `a-start` · `a-built` | Bấm nút soạn · AI trả ghi chú về |
| Option B | `b-q1` · `b-q2` · `b-q3` · `b-assign` · `b-next` · `b-built` · `b-skip` · `b-redo` | 3 câu hỏi, gán slide ảnh, soạn, bỏ qua, làm lại |
| Option C | `c-nudge` · `c-ack` · `c-fix` · `c-off` · `c-on` · `c-built` · `c-escalate-open` · `c-escalate-to` · `c-escalate-send` · `c-escalate-cancel` | Tự nhắc, duyệt, bác, tắt, bật, leo thang |
| Ghi chú | `note-edit` · `note-add` · `note-del` · `note-move` · `note-save` · `note-undo` · `anchor-check` | Sửa tay, thêm, xoá, đổi thứ tự, lưu, hoàn tác, kiểm tra neo vị trí |
| Khác | `quiz` · `log-cleared` · `csv-export` | Làm câu kiểm tra · xoá log · xuất CSV |

`event` + `t_sec` cho phép đo trực tiếp: **thời gian từ hành động đầu tiên đến lúc lưu ghi chú**, **số giây chờ thẻ tự nhắc của Option C**, **số giây người học dừng lại ở từng mục**.

---

## 7. ĐÃ KIỂM CHỨNG

Prototype đã được chạy tự động qua **85 assertion** trên jsdom và chụp màn hình ở 11 trạng thái bằng Chromium — không có lỗi JS. Script nằm trong repo nên chạy lại được:

```bash
# kiểm tra chức năng (85 assertion)
cd prototype/tests
npm i jsdom
node run-checks.js "D:\AITHUCCHIEN\Lab\Lab18\Track1_Day18_2A202602744_NguyenVanSon"

# chụp 11 ảnh màn hình vào prototype/tests/shots/
npm i playwright && npx playwright install chromium
node capture-screenshots.js "D:\AITHUCCHIEN\Lab\Lab18\Track1_Day18_2A202602744_NguyenVanSon"
```

Kết quả **85/85 pass**, cụ thể:

- đủ **18/18** tổ hợp chủ đề × chế độ × option render được nội dung lẫn panel;
- Option A: dựng ghi chú 4 mục / 7 mục, gắn neo ảnh chụp, sửa–xoá–undo–lưu đều ghi đúng vào state;
- Option B: 3 bước hỏi chạy đúng; **3 mục đích ôn sinh ra 3 thứ tự mục khác nhau** — *làm bài* → Điểm chính trên cùng; *hiểu lại* → Chỗ chưa hiểu lên cùng; *thi* → Ảnh đã lưu đứng trước Câu hỏi còn treo; xác nhận ảnh đổi badge từ *"AI gắn tạm"* sang *"bạn xác nhận"*; làm lại 3 câu reset đúng;
- Option C: đủ 3 đường kích hoạt (bấm tay / 12 giây / làm sai checkpoint), thang chắc chắn đúng % trong dữ liệu, bác cờ làm trống hẳn phần "Chỗ chưa hiểu", leo thang gửi đúng nội dung;
- CSV sinh đủ 16 loại event và escape dấu phẩy trong `detail` đúng;
- URL sai rơi về mặc định; `Esc` đóng drawer.

Kịch bản test 20 phút và danh sách câu hỏi không dẫn dắt: [`docs/TEST-KIT.md`](docs/TEST-KIT.md).