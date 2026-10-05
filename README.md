# LAB DAY 18 — TỪ PROTOTYPE ĐẾN USER TESTING

> **Case B — AI Notes: Personal Learning Notes**
> Học viên: **Nguyễn Văn Sơn — 2A202602744** · Nhóm: **Ca Khô**

---

## 1. THÔNG TIN CÁ NHÂN VÀ NHÓM

| | |
| :--- | :--- |
| **Họ và tên** | Nguyễn Văn Sơn |
| **Mã học viên** | 2A202602744 |
| **Tên nhóm** | Ca Khô |
| **Thành viên nhóm** | 1. **Nguyễn Văn Sơn** — 2A202602744 · 2. **Ninh Quang Minh** — 2A202602432 |
| **Phân công Day 18** | Sơn: thiết kế + xây Option A và B, soạn design sheet, viết test kit, facilitate phiên của mình.<br>Minh: thiết kế + xây **Option C** (AI tự can thiệp, leo thang), điều phối nội dung ảnh chụp và cơ chế leo thang sang người thật.<br>Cả hai: **dùng chung một bộ dữ liệu nội dung** để 18 tổ hợp URL so sánh được. |
| **Case đã chọn** | Case B — AI Notes: Personal Learning Notes *(tiếp tục từ Day 17)* |
| **Evidence Day 17** | 1 practice interview — P07, bạn học cùng lớp, consent ghi âm có.<br>Repo Day 17: `D:\AITHUCCHIEN\Lab\Lab17-track1\Track1_Day17_MHV_HoVaTen` |

---

## 2. HYPOTHESIS PROBLEM

**Phát biểu (giữ nguyên từ Day 17, không tìm problem mới):**

> **Khi vừa học xong một bài, học viên ghi lại các điểm chính và chỗ chưa hiểu bằng nhiều công cụ rời rạc (highlight trong app, ảnh chụp màn hình, ghi chú trên điện thoại). Những dấu vết đó không mang theo vị trí của nó trong bài. Khi ôn lại vài ngày sau, người học không xác định được mỗi dấu vết thuộc đoạn nào, phải mở lại toàn bộ video 35 phút để định vị, hoặc bỏ ôn và hỏi lại ChatGPT — nên ghi chú tồn tại nhưng chưa bao giờ là công cụ ôn thật.**

**Bằng chứng trực tiếp từ P07 (nguyên văn, Day 17):**

- Tối 21h học bài *"Pipeline CPU"*, định hôm sau giải 5 bài tập cuối chương. Ghi bằng **3 cách cùng lúc**: highlight 4 đoạn, chụp 3 ảnh màn hình, gõ ~2 dòng note điện thoại.
- *"Chắc là chuyển qua chuyển lại. VLearn một bên, note một bên, video đang chạy mà phải pause liên tục. Chụp xong slide thì cũng không biết nó ở phút nào của video."*
- *"Sáng nay định ôn từ note luôn, mở ra coi thì chịu, mấy tấm ảnh không biết thuộc khúc nào. Cuối cùng phải mở video tua lại."* → **xem lại cả video 35 phút**
- *"Không ghi thì hôm sau quên hết, mà ghi xong cũng chẳng mở lại được."*
- *"Bỏ ghi chú 2 tuần rồi, tuần trước mới ghi lại vì sắp tới thi."*
- *"Tuần trước quiz nhỏ về cache miss với pipeline, mình cứ tưởng mình nhớ, ai dè lộn công thức tính CPI."*

**Tương tác trọng yếu mà ba option xoay quanh:**

> Cuối buổi học, người học đang có **7 dấu vết rời rạc** và cần một bản ghi chú gộp lại được, **nhưng chưa biết mình muốn ưu tiên cái gì** và **không chắc ảnh chụp nào thuộc slide nào**.

**Hai Pain Hypothesis cạnh tranh — nhóm giữ cả hai:**

| | Nội dung | Ảnh hưởng đến Day 18 |
| :--- | :--- | :--- |
| **A** | Ghi chú rời rạc, không nối được với nội dung gốc, nên khi ôn không dùng được ngay. | Ba option giải quyết trực tiếp. |
| **B** | Học viên **vốn không ôn bằng note** mà xem lại video → *"note có cấu trúc"* không giải quyết barrier thật. | **Không option nào giải quyết.** Đây là câu hỏi lớn nhất mà Day 18 phải đo. |

---

## 3. BA SOLUTION OPTIONS TRONG PROTOTYPE

**Mở prototype:** [`prototype/index.html`](prototype/index.html) — hướng dẫn đầy đủ ở [`prototype-link.md`](prototype-link.md).

> **Điểm 3 option khác nhau — không phải layout, không phải màu sắc:** cả ba đều trả về **cùng một artifact** (ghi chú 4 mục, mỗi mục có neo vị trí trong bài), nhưng **ai quyết định vị trí của 2 ảnh chụp không có số slide/phút** thì khác nhau. Đó là pain rõ nhất trong evidence Day 17.

### Option A — AI tự chọn lọc dấu vết · *Sơn phụ trách*
**Agency: Don't act** — Người học bấm một nút, AI đọc hết 7 dấu vết, tự nhóm thành ghi chú 4 mục, **tự gắn neo `Slide X` cho cả 2 ảnh chụp** và đánh dấu badge **"AI gắn tạm"**. Người học sửa tay, xoá, đổi thứ tự, thêm mục rồi lưu.
*Đánh đổi:* nhanh nhất (~1s) nhưng người học **không có tiếng nói trong cách chọn lọc**, và vị trí ảnh chỉ là phỏng đoán của AI.

### Option B — AI hỏi 3 câu trước khi soạn · *Sơn phụ trách*
**Agency: Ask** — AI hỏi 3 câu 1-chạm: **mục đích ôn** (thi / làm bài / hiểu lại) → **thứ quan trọng nhất** → **tự gán slide cho từng ảnh chụp** (có lựa chọn *"Không nhớ"*). Câu 1 **thay đổi thứ tự 4 mục**; câu 2 đánh dấu mục ưu tiên; câu 3 là nơi **duy nhất người học quyết định vị trí ảnh** → badge **"bạn xác nhận"**.
*Đánh đổi:* đúng ý định ôn và chắc chắn nhất, nhưng tốn 40–60 giây và **phụ thuộc trí nhớ** về chính bài vừa học.

### Option C — AI tự can thiệp khi nghi bạn kẹt · *Minh phụ trách*
**Agency: Act** — Người học **không bấm gì**. Sau 12 giây không thao tác, hoặc ngay khi trả lời sai checkpoint, thẻ đỏ tự trượt ra với tín hiệu hành vi thật (*"Bạn đã đọc lại Slide 4 lần thứ 3"*, *"7/10 học viên dừng lâu ở đây"*), **thang độ chắc chắn 0–100%** và mục *"Vì sao AI nghĩ vậy"*. Người học duyệt hoặc bác cờ; nếu bác toàn bộ thì ghi chú **mất hẳn phần "Chỗ chưa hiểu"**. Có đường leo thang soạn sẵn câu hỏi gửi đồng nhóm / bạn học.
*Đánh đổi:* không tốn thao tác, nhưng **dễ đoán sai, dễ làm mất tập trung**, và phải dọn cờ rác.

### Bối cảnh dùng chung

- **3 chủ đề:** Pipeline CPU · Cache & CPI · Context Window — đều lấy từ bài P07 đang học.
- **2 chế độ:** Lý thuyết (Slide) · Thực hành (Lab).
- Tổng cộng **18 tổ hợp URL** `#<chủ đề>/<chế độ>/<option>`.
- **7 dấu vết học tập** mỗi bài: highlight · "Chưa hiểu" · câu hỏi · ghi chú điện thoại · **2 ảnh chụp không có số slide/phút**.
- **Logger đo thời gian thực** với nút *Copy dạng CSV*, ghi 16 loại sự kiện.

**Tài liệu phân tích đầy đủ:** [`three-option-design-sheet.md`](three-option-design-sheet.md) — Evidence Snapshot, Hypothesis, Shared Core 70%, Comparison Contract, Distance Check, Human–AI Decision Table, và phần *"đối chiếu cái gì đã xử lý / còn nợ"*.

---

## 4. ĐÓNG GÓP CỦA TÔI TRONG NHÓM

*(Chi tiết về phần của Ninh Quang Minh nằm trong repo cá nhân của bạn ấy.)*

### Chặng 1 — Tổng hợp evidence và chốt Hypothesis
- Tổng hợp Day 17 của nhóm thành bảng **Fact (nguyên văn P07) vs Interpretation (của nhóm)** gồm 11 dòng, và đánh dấu rõ chỗ nào là fact, chỗ nào là suy đoán.
- Chốt giữ **cả hai** Pain Hypothesis A và B thay vì chỉ giữ A, vì evidence cho thấy B có tín hiệu (*"Chứ note của mình giờ chưa phải thứ để ôn"*).
- Xác định **tương tác trọng yếu** và công thức ra câu hỏi cần đo cho Day 18.

### Chặng 2 & 3 — Chọn 3 option và Human–AI Design pass
- **Tự tìm trục so sánh** thay vì dùng trục mặc định "AI chủ động tăng dần": chọn **"ai quyết định vị trí ảnh chụp"** — trục bám thẳng vào pain Day 17 và khiến ba option khác nhau về bản chất.
- Viết **Comparison Contract** (9 tiêu chí), **Distance Check** và **Human–AI Decision Table** theo 4 nguyên lý.
- Thiết kế cơ chế **badge phân biệt mức độ tin cậy**: *"có số phút"* / *"AI gắn tạm"* / *"bạn xác nhận"* / *"AI gắn · n%"*.
- Thiết kế cơ chế **leo thang** của Option C: AI soạn sẵn câu hỏi kèm bối cảnh để gửi đồng nhóm / bạn học.

### Chặng 4 — Xây micro-prototype
- Xây dựng toàn bộ **3 option × 3 chủ đề × 2 chế độ** trong 5 file HTML/CSS/JS thuần, mở trực tiếp bằng `file://`, không framework, không build.
- Tự viết **nội dung fixture** cho 3 chủ đề: 5 slide/lab, 3 câu kiểm tra kèm **đáp án nhiễu lấy từ lỗi sai có thật** của học viên, 7 dấu vết mỗi bài, ghi chú mẫu, tín hiệu hành vi, thang độ chắc chắn và câu hỏi leo thang.
- **Tự tính lại bằng tay mọi công thức** trong prototype sau khi AI sinh ra và sai.
- Tự quyết định **thang màu VLearn, cấm gradient tím** để tránh dấu hiệu AI-generated trong bản đem đi test.
- Thiết kế và xây **Facilitator logger** đo thời gian thực, xuất CSV 5 cột, 16 loại event.

### Chặng 5 — Chuẩn bị test
- Viết [`docs/TEST-KIT.md`](docs/TEST-KIT.md): kịch bản 20 phút, Outcome Task nguyên văn, **câu hỏi tiêu chí tuyển**, 3 câu hỏi so sánh, bảng phân biệt hành vi với sự ý, và danh sách lỗi facilitate phải tránh.
- Chọn câu hỏi cuối phiên đo trực tiếp **Hypothesis B**: *"Sáng mai, khi bạn mở bản ghi chú này lên, bạn có cần mở lại video không?"*

### Chặng 6 & 7 — Test và tổng hợp
- **Đã hoàn thành phần chuẩn bị.** Phiên test và bảng tổng hợp để trống có chủ ý — không điền sẵn quote hoặc observation.
- ⬜ *(Còn lại: điền `prototype-feedback-note.md`, họp 15 phút với Minh, chốt 1 Group Next Change trong `group-feedback-synthesis.md`.)*

### Kiểm thử chất lượng prototype
- Xây bộ kiểm thử tự động **85 assertion** trên jsdom mô phỏng thao tác của tester trên cả 18 tổ hợp URL, cộng 11 ảnh chụp màn hình bằng Chromium.
- Bộ kiểm thử phát hiện **2 lỗi thật** mà đọc code không thấy: nút *"Soạn ghi chú"* của Option B không tạo được ghi chú, và mục đích ôn *"thi"* không đổi thứ tự ghi chú. Cả hai đều sẽ khiến nhóm kết luận sai về Option B nếu đem đi test nguyên trạng.

---

## 5. PROTOTYPE FEEDBACK & GROUP SYNTHESIS

| Tài liệu | Nội dung | Trạng thái |
| :--- | :--- | :--- |
| [`prototype-feedback-note.md`](prototype-feedback-note.md) | Bản ghi chép phiên của Nguyễn Văn Sơn: bảng hành vi, log CSV, 4 lớp OBSERVED / INTERPRETED / DECIDED / STILL UNPROVEN | ⬜ **Chờ test** |
| [`group-feedback-synthesis.md`](group-feedback-synthesis.md) | Ma trận 2 phiên, đối chiếu định lượng từ log, **1 Group Next Change**, Still Unproven | ⬜ **Chờ họp** |
| [`docs/TEST-KIT.md`](docs/TEST-KIT.md) | Kịch bản facilitate 20 phút + câu hỏi không dẫn dắt | ✅ Sẵn sàng |

**Group Next Change:** ⬜ *(chốt sau Chặng 6)*

**Những điều Still Unproven — đã biết trước, không đợi test mới biết:**

1. **Có thật sự thay được việc xem lại video không?** (Hypothesis B từ Day 17) — cả 3 option đều chỉ cải thiện *ghi chú*, không cải thiện *lý do người học chọn xem lại video*.
2. **Ghi chú có bắt được lỗi "lộn công thức" không?** — cờ của Option C suy ra từ *hành vi đọc*, không phải từ *sai sót kiến thức*.
3. **Có kéo được hành vi ghi chú trở lại không?** (P07 đã bỏ ghi chú 2 tuần) — prototype chỉ chạy trong một buổi.
4. **Ảnh chụp cũ ngoài bài** (~40 ảnh lẫn ảnh đời thường, không phân thư mục) — ngoài scope.
5. **Tồn đọng giữa các buổi** — mọi option kết thúc ở "lưu ghi chú", không có gì xử lý lần mở ghi chú tuần sau.
6. **Chất lượng khi AI thật** — toàn bộ phản hồi trong prototype là canned output.

> Ba phiên test **không** được coi là validated. Ba feedback tạo input cho vòng lặp tiếp theo, không chứng minh giá trị sản phẩm.

---

## 6. AI SUPPORT LOG

Nhật ký đầy đủ: [`ai-support-log.md`](ai-support-log.md).

**Tóm tắt:** AI (OpenCode) được dùng cho **dựng khung tài liệu, sinh nội dung fixture, viết boilerplate và viết bộ kiểm thử**. Những gì **không** giao cho AI: quyết định trục so sánh của ba option, kiểm lại bằng tay mọi công thức trong prototype, và **toàn bộ quote, observation, feedback**. Bộ kiểm thử do AI viết đã phát hiện 2 lỗi thật trong prototype — cả hai đều thuộc loại chỉ lộ ra khi người thật bấm vào.

---

## CẤU TRÚC REPO

```
Track1_Day18_2A202602744_NguyenVanSon/
├── README.md                        ← file này
├── three-option-design-sheet.md     ← Evidence, Hypothesis, 3 option, Comparison Contract, Human–AI Decision Table
├── prototype-link.md                ← URL 18 tổ hợp, Outcome Task, hướng dẫn lấy CSV
├── prototype-feedback-note.md       ← bản ghi chép phiên cá nhân  ⬜ chờ test
├── group-feedback-synthesis.md      ← ma trận + 1 Group Next Change  ⬜ chờ họp
├── ai-support-log.md                ← khai báo sử dụng AI
├── docs/
│   └── TEST-KIT.md                  ← kịch bản facilitate 20 phút
└── prototype/
    ├── index.html                   ← mở trực tiếp bằng file://
    ├── assets/  base.css · data.js · options.js · app.js
    └── tests/   run-checks.js (85 assertion) · capture-screenshots.js
```

## KIỂM TRA TRƯỚC KHI NỘP

- [x] Repo đúng tên `Track1_Day18_2A202602744_NguyenVanSon`
- [x] README đủ sáu phần
- [x] `three-option-design-sheet.md` đủ 5 phần, có Distance Check và Still Unproven
- [x] `prototype-link.md` liệt kê đủ 18 URL và cách lấy CSV
- [x] `ai-support-log.md` khai báo đầy đủ, có phần đánh giá phản biện
- [x] Prototype mở được bằng `file://`, không lỗi JS, **85/85 assertion pass**
- [x] **Không có** quote, observation hay feedback nào do AI tạo ra
- [x] **Không dùng** từ "validated" / "chứng minh được" ở bất kỳ đâu
- [ ] `prototype-feedback-note.md` đã điền từ 1 phiên test thật
- [ ] `group-feedback-synthesis.md` đã chốt 1 Group Next Change
- [ ] Đã hẹn và đã test với 2 tester ngoài nhóm (Sơn 1 người, Minh 1 người)