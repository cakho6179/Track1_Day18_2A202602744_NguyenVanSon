# AI SUPPORT LOG — NHẬT KÝ SỬ DỤNG AI CÁ NHÂN

> **Học viên:** Nguyễn Văn Sơn — 2A202602744 · nhóm **Ca Khô**
> **Bài:** Lab Day 18 — Từ prototype đến user testing · Case B — AI Notes: Personal Learning Notes

## Cam kết

Theo luật của bài lab: *"Không được dùng AI để tạo quote, observation hay feedback không tồn tại; làm sạch evidence đến mức không còn phân biệt lời user với diễn giải; hoặc viết thay phần đóng góp và reflection cá nhân."*

Tôi cam đoan:

1. **Không một câu trích dẫn nào** trong Day 17 hay trong `prototype-feedback-note.md` do AI sinh ra.
2. **Không một quan sát nào** trong `prototype-feedback-note.md` do AI sinh ra — vì tôi **chưa tổ chức phiên test nào**, nên phần đó để trống có chủ ý.
3. **Phần diễn giải (INTERPRETED), đóng góp nhóm và reflection** là của tôi.
4. Mọi cách dùng AI đều được khai báo dưới đây.

---

## 1. CÔNG CỤ ĐÃ DÙNG

- [ ] ChatGPT (OpenAI)
- [ ] Claude (Anthropic)
- [ ] Google Gemini
- [x] **OpenCode** (`opencode`, model `space-bunny-free`) — dùng như trợ lý dòng lệnh: đọc tài liệu, thiết kế, viết và kiểm thử mã
- [ ] Khác: không có

> AI ở đây không phải công cụ "tra cứu trả lời câu hỏi". Nó là **công cụ gõ code và rà soát** — vai trò giống một lập trình viên junior làm boilerplate, còn quyền quyết định thuộc về tôi.

---

## 2. PHẠM VI ĐÃ DÙNG AI

### A. Khung lý thuyết và cấu trúc tài liệu

**AI hỗ trợ gì:** dựng khung ba phần của `three-option-design-sheet.md` theo chuỗi **Evidence → Hypothesis → Solution Options → Human–AI Design**; gợi ý bốn nguyên lý Human–AI cần đưa vào Decision Table (Expectation, Role & Agency, Evidence & Uncertainty, Control & Recovery); gợi ý format bảng Comparison Contract.

**Tôi tự làm gì:** **viết lại toàn bộ.** Khung AI đưa ra dùng để suy ra evidence cho Case B (ghi chú) cụ thể hơn hẳn — nhóm thường làm về AI Tutor / kẹt lý thuyết. Tôi tự chốt lại: tổng hợp evidence Day 17 thành bảng **Fact (nguyên văn từ P07) vs Interpretation (của nhóm)**; tự xác định **tương tác trọng yếu**; tự viết Distance Check; tự nối §4 với từng mục "còn nợ" trong evidence.

**Chỗ AI sai và tôi tự sửa:**

- AI gợi ý ba option theo trục **mức độ AI chủ động tăng dần** — hợp lý nhưng quá dễ biến thành ba phiên bản của một ý tưởng. Tôi phải tìm một trục khác: **ai quyết định vị trí của ảnh chụp** (AI đoán / người học xác nhận / AI đoán kèm độ chắc chắn). Trục này bám thẳng vào pain Day 17 — ảnh chụp không có số slide/phút — nên ba option khác nhau ở **bản chất**, không ở độ mạnh.
- AI đề xuất thêm một option thứ tư kiểu "nhắc lại bằng spaced repetition". Tôi **loại bỏ** vì đề bài Day 18 yêu cầu đúng ba option, và option đó trả lời một câu hỏi khác hẳn.

### B. Sinh dữ liệu mẫu và canned output

**AI hỗ trợ gì:** viết nội dung fixture cho 3 chủ đề × 2 chế độ, gồm: nội dung slide, đoạn code Lab có lỗi cố ý, câu hỏi kiểm tra kèm đáp án nhiễu, 7 dấu vết học tập cho mỗi bài, ghi chú mẫu 4 mục, tín hiệu hành vi và thang độ chắc chắn cho Option C, câu hỏi leo thang.

**Tôi tự quyết định những gì — đây là phần quan trọng nhất:**

| Nội dung | AI gợi ý | Quyết định của tôi |
| :--- | :--- | :--- |
| Chủ đề bài học | Thường gợi ý chủ đề AI dễ nhận diện (Context Window, ReAct, Gradient Descent) | **Dùng Pipeline CPU / Cache & CPI / Context Window** — vì Day 17 evidence của nhóm nằm ở đó, và chúng tôi chỉ có 1 interview note |
| Lỗi trong Lab | Lỗi ngẫu nhiên, ví dụ thiếu dấu `;` | **Lỗi công thức thiếu hệ số `miss rate`** trong `avg_cpi()` — đúng cái lỗi P07 đã nói là mình từng làm |
| Đáp án nhiễu | Nhiễu ngẫu nhiên | **Nhiễu lấy từ lỗi sai thật**: `hit rate × hit time`, cộng nhầm thay vì trừ `reserve`, công thức của bài 21 lệnh |
| Ảnh chụp trong dữ liệu | Có đủ số slide và phút cho mọi dấu vết | **2 ảnh chụp cố tình để không có số phút** — vì đó chính là hiện trạng P07 mô tả |
| Thang độ chắc chắn Option C | Giá trị tròn đẹp 90/70/50 | Giá trị **không tròn** (88%, 82%, 79%, 68%, 64%, 57%, 55%, 49%, 44%, 41%, 35%, 33%) để trông như ước lượng thật chứ không phải con số trưng bày |

**Tôi phải tự sửa nhiều nhất ở đâu:**

- AI viết phần `explain` cho câu hỏi Lab 4 sai đến mức tự mâu thuẫn trong chính câu giải thích. Tôi đếm lại tay: `n=4, k=5, stall=2` → `4+5-1+2 = 10` chu kỳ → `10/4 = 2,5`. Viết lại cả 4 đáp án nhiễu cho đến khi mỗi nhiễu là một lỗi tính **có thật**.
- **Mọi công thức trong prototype tôi đều kiểm lại bằng tay:** `n+k−1`, `CPI=(n+k−1)/n`, `offset/index/tag` cho cache 32 KiB block 4 byte, `AMAT = hit time + miss rate × miss penalty`, `context window ≥ token input + token output`. AI đã từng đặc biệt sai ở chỗ tính số bit trong đường dẫn địa chỉ bộ nhớ.

### C. Viết mã prototype

**AI hỗ trợ gì:** viết `index.html`, `base.css`, `data.js`, `options.js`, `app.js` — HTML/CSS/JS thuần, không framework, không build step, mở được trực tiếp bằng `file://`.

**Tôi tự quyết định:**

- **Bảng màu:** navy `#0f172a` + xanh AI `#2563eb`, cảnh báo hổ phách, đỏ cho cờ của Option C. Tôi **cấm gradient tím** — đây là dấu hiệu AI-generated mà tôi không muốn prototype của mình mang vào khi đem đi test.
- Không dùng `contenteditable` mặc định của trình duyệt mà tự quản lý text để giữ định dạng tiếng Việt.
- Chia nhỏ thành 5 file thay vì một file 100 KB: `data.js` (nội dung) tách khỏi `options.js` (logic) để khi phát hiện sai lỗi nội dung thì sửa được mà không đụng logic.
- **Logger CSV là quyết định của tôi**, không phải của AI: tôi cần dữ liệu định lượng để phiên test không chỉ dựa vào trí nhớ.

### D. Kiểm thử và tìm lỗi

Đây là chỗ AI giúp nhiều nhất, và cũng là chỗ tôi **không** giao quyền quyết định.

**AI hỗ trợ gì:** viết và chạy một bộ kiểm thử tự động trên jsdom — **85 assertion** mô phỏng đúng các thao tác của tester trên cả 18 tổ hợp URL; viết và chạy 11 ảnh chụp màn hình bằng Chromium để kiểm tra bố cục thật. Script nằm trong `prototype/tests/`.

**Hai lỗi thật do bộ kiểm thử phát hiện, không phải do tôi đọc code ra:**

1. **Option B không tạo được ghi chú.** Nút ở câu 3 có nhãn *"Soạn ghi chú"* nhưng dùng chung handler với nút *"Tiếp"*, nên bấm vào chỉ làm tăng biến đếm bước — mà biến đã ở giá trị cuối. Người học sẽ bấm đến chán cũng không ra gì.
2. **Mục đích ôn "thi" không đổi thứ tự ghi chú.** Điều kiện sắp xếp tôi viết là `if (order[0] !== 'main' || order[1] !== 'gap')` — đúng với hai mục đích kia và **sai với "thi"**, vì "thi" chỉ đảo hai mục cuối. Người học chọn "ôn trước kỳ thi" sẽ thấy y hệt trạng thái mặc định và không có gì chứng minh AI đã nghe.

> Cả hai lỗi đều là loại **chỉ lộ ra khi người thật bấm vào** — đọc lại code không thấy. Nếu tôi đưa prototype đi test như hiện tại thì sẽ kết luận sai về Option B.

**AI đã làm gì khi tôi nhờ rà soát kịch bản test:**

- Nó **gợi ý thêm câu hỏi có tính dẫn dắt** vào `docs/TEST-KIT.md`. Ví dụ câu nó thích hợp với: *"Bạn có thấy cách AI gắn vị trí cho ảnh chụp nhanh hơn không?"* — câu này vừa mớm sẵn tính *"nhanh hơn"*, vừa gợi ý đáp án.
- Tôi **không lấy** các câu đó. Ba câu so sánh cuối phiên đều hỏi về **hành vi và sự đánh đổi**, không hỏi về **đánh giá**:
  - *"…cách nào giúp bạn có được bản ghi chú mà mai bạn thật sự dùng nhất? Vì sao?"*
  - *"…bạn chấp nhận đánh đổi điều gì để đổi lấy?"*
  - ⭐ *"Sáng mai, khi bạn mở bản ghi chú này lên, bạn có cần mở lại video không? Vì sao?"*
- Tôi cũng thêm mục **"NHỮNG LỖI FACILITATE PHẢN TRÁNH"** vào TEST-KIT — phần này viết từ chính lần đó mà tôi suýt dính.

### E. Rà soát bằng chứng trung thực

**AI hỗ trợ gì:** đối chiếu bảng Fact vs. Interpretation trong `three-option-design-sheet.md` để phát hiện chỗ tôi đã trộn diễn giải vào cột fact.

**Kết quả rà soát:** AI chỉ ra 2 chỗ cần sửa, tôi đã sửa:

- Câu *"định dọn note ngay nhưng mệt nên để mai"* — tôi đã gộp nhầm vào một ô diễn giải. Đã tách thành **fact** (họ định dọn, để mai) và **interpretation** (người học sẵn sàng dời việc tổng hợp sang ngày mai → đây là lý do Option B có rủi ro).
- Ba mục "đã xử lý" trong §4 ban đầu ghi quá tự tin, ví dụ "giải quyết đúng cả ảnh chụp". Đã đổi thành "**Đưa vào test**" và chuyển các mục còn nợ sang §5 Still Unproven.

---

## 3. ĐÁNH GIÁ PHẢN BIỆN — AI SAI Ở ĐÂU

Ba điểm yếu lặp đi lặp lại trong suốt bài:

### 3.1 Happy-path bias — nguyên nhân gây ra cả hai lỗi ở §D

AI viết code theo giả định người dùng bấm đúng nút, mỗi bước đúng thứ tự. Nó không dự đoán được rằng người học thật sẽ bấm nút *"Soạn ghi chú"* ở câu 3 chỉ vì nhãn trên nút khác, cũng không đoán được rằng một phép so sánh chuỗi có thể đúng với hai trường hợp và sai với một trường hợp.

> **Bài học:** lỗi trong prototype AI viết thường nằm ở **đường biên** — nơi hai hành vi trông giống nhau nhưng tạo ra kết quả khác nhau. Chỗ đáng kiểm thử nhất cũng là chỗ AI hay bỏ sót nhất.

### 3.2 Sẵn sàng với độ trễ và chi phí nhận thức

AI mặc định người dùng sẵn sàng đọc và làm theo. Trong bài này, evidence Day 17 nói rõ: người học dùng **3 công cụ song song**, **pause video liên tục**, và **đã bỏ ghi chú hẳn 2 tuần**. AI vẫn đề xuất các flow nhiều bước. Vì vậy tôi cố tình làm Option B chỉ còn 3 câu 1-chạm và cho phép **"Không nhớ"** — một đường thoát dễ hơn là giữ AI lại hỏi hoài.

### 3.3 Văn phong có xoa dịu khách sáo

Câu thoại AI tạo ra cho thẻ hướng dẫn dài dòng và đầy từ nhẹ. Tôi cắt bỏ khoảng **60%** số từ, đổi mọi câu xuống gạch đầu dòng, và **in giới hạn của AI ra trước khi người học hành động**:

- A: *"Bạn không được hỏi ý kiến AI trước khi nó soạn."*
- B: *"AI không đoán hộ bạn ở bước này vì đoán sai slide thì cả ảnh và cả ghi chú đều vô nghĩa."*
- C: *"AI không hỏi bạn câu nào — nó suy ra hoàn toàn từ hành vi của bạn."*

> Lý do: nếu người học sau này nói *"AI nó toàn đoán bừa"* thì đó là **hành vi đã được cảnh báo trước**, không phải là bug.

---

## 4. BÀI HỌC

AI là một **gia tốc ghi kịch bản** rất giỏi: dựng khung tài liệu, sinh nội dung fixture, viết phần boilerplate — ba việc này tiết kiệm phần lớn thời gian và cho phép dành thời gian cho việc đáng làm hơn là **thiết kế xem ba option khác nhau ở chỗ nào**.

Nhưng ba thứ phải 100% thuộc về tôi, không thuộc về AI:

1. **Quyết định trục so sánh.** AI gợi ý ba option theo mức độ AI chủ động tăng dần; tôi phải tự nghĩ ra trục *"ai quyết định vị trí ảnh chụp"* mới có ba option thật sự khác nhau và bám được vào evidence.
2. **Tính trung thực của dữ liệu.** Mọi công thức tôi đều tính tay lại. Mọi câu trích dẫn đều lấy nguyên văn từ bản ghi P07. **Bảng `prototype-feedback-note.md` để trống có chủ ý** — điền sẵn bằng AI sẽ biến bài lab này thành một bài diễn tập về viết lời.
3. **Phán đoán sản phẩm.** Gắn neo vị trí cho ảnh chụp có đủ để biến ghi chú thành công cụ ôn, hay người học vẫn sẽ mở video — **câu hỏi này AI không trả lời được, và đó mới là câu hỏi bài Lab này muốn đặt ra.**