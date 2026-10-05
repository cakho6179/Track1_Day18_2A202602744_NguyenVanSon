# THREE-OPTION DESIGN SHEET — LAB DAY 18

> **Học viên phụ trách repo này:** Nguyễn Văn Sơn — 2A202602744
> **Nhóm:** Ca Khô (Nguyễn Văn Sơn 2A202602744 · Ninh Quang Minh 2A202602432)
> **Case:** Case B — **AI Notes: Personal Learning Notes** (tiếp tục từ Day 17)
> **Tài liệu Day 17:** [`../Lab17-track1/Track1_Day17_MHV_HoVaTen`](https://) — bản gốc nằm ở `D:\AITHUCCHIEN\Lab\Lab17-track1\Track1_Day17_MHV_HoVaTen`
> **Prototype thực thi:** [`prototype/index.html`](prototype/index.html)

---

## PHẦN 1 · EVIDENCE SNAPSHOT & CHỐT HYPOTHESIS PROBLEM (CHẶNG 1)

### 1.1 Bảng đối chiếu Fact vs. Interpretation

Nguồn duy nhất: 1 practice interview, **P07** (bạn học cùng lớp), interviewer Nguyễn Văn Sơn, consent ghi âm có, bản ghi `interview/recording.mp4`, notes `interview/notes.md`.

| Người học thực sự làm / nói gì? (RAW FACT — nguyên văn từ bản ghi) | Nhóm diễn giải (INTERPRETATION — tách riêng, không trộn vào fact) |
| :--- | :--- |
| Tối khoảng 21h, ngồi ở phòng, học bài **"Pipeline CPU"** trên VLearn bằng laptop; định hôm sau giải lại **5 bài tập cuối chương**. | Học sinh học **về tối một mình**, và việc ghi chú sinh ra từ một *kế hoạch ôn cụ thể có thời hạn ngày mai* — không phải thói quen. Đây là điều kiện lý tưởng để test nhưng cũng là điều kiện đặc biệt thuận lợi. |
| Ghi bằng **3 cách cùng lúc**: highlight 4 đoạn trong app, chụp **3 ảnh màn hình** slide sơ đồ pipeline, gõ ~2 dộng vào app ghi chú trên **điện thoại** kiểu *"data hazard cần forwarding"*. | Đa công cụ không phải do lười chọn mà do **mỗi công cụ chỉ giải quyết được một phần** và không nối được sang phần còn lại. Không có một chỗ nào gánh hết. |
| *"VLearn không cho export highlight; ảnh chụp không gắn số slide/số phút nên không biết thuộc đoạn nào; alt-tab giữa 2 màn hình dễ quên vị trí đang xem."* | Pain nằm ở **mất liên kết giữa dấu vết và vị trí gốc trong bài**, không nằm ở "note chưa đủ đẹp" hay "note chưa đủ nhiều". Ảnh chụp là dấu vết mất liên kết nặng nhất vì nó **không mang theo địa chỉ nào cả**. |
| *"Chắc là chuyển qua chuyển lại. VLearn một bên, note một bên, video đang chạy mà phải pause liên tục. Chụp xong slide thì cũng không biết nó ở phút nào của video."* | Chi phí lớn nhất là **chi phí chuyển ngữ cảnh (context switching)**, không phải chi phí gõ. Người học sẵn sàng chịu gõ nhiều hơn nếu không phải alt-tab. |
| *"Sáng nay định ôn từ note luôn, mở ra coi thì chịu, mấy tấm ảnh không biết thuộc khúc nào. Cuối cùng phải mở video tua lại."* → **xem lại cả video 35 phút**. | Hậu quả đo được là **mất 35 phút**, lớn hơn nhiều so với thời gian tạo note. Nghĩa là nút thắt nằm ở **chi phí dùng lại**, không phải chi phí tạo ra. |
| *"Cũng lâu rồi... chắc tuần trước lướt qua cho biết thôi, chứ ôn thật thì không."* (hỏi: lần gần nhất mở lại note là khi nào) | Note **đang tồn tại nhưng chưa bao giờ là công cụ ôn**. Đây là tín hiệu mạnh cho Pain Hypothesis A nhưng đồng thời cho thấy chỉ tống hợp lại note là **chưa đủ** — phải làm nó dùng lại được. |
| *"Không ghi thì hôm sau quên hết, mà ghi xong cũng chẳng mở lại được."* | Người học đã tự nhận ra nghịch lý: **chi phí ghi ≈ chi phí bỏ**. Chính vì vậy solution nào làm tăng thời gian ghi sẽ bị bỏ. |
| *"Bỏ ghi chú 2 tuần rồi, tuần trước mới ghi lại vì sắp tới thi."* | Tín hiệu **falsify mạnh nhất buổi phỏng vấn**: hành vi ghi chú không bền. Họ chỉ quay lại khi có đe doạ cụ thể. Giải pháp phải rẻ hơn hành vi hiện tại, không được đắt hơn. |
| *"Xem lại video, hoặc hỏi ChatGPT giải thích lại khái niệm. Chứ note của mình giờ chưa phải thứ để ôn."* | **Hypothesis B có tín hiệu đúng một phần.** Barrier thật có thể là "video dài, khó tìm đúng đoạn" chứ không phải "note chưa có cấu trúc". Đây là rủi ro lớn nhất của case B và là câu hỏi Day 18 phải soi. |
| *"Tuần trước quiz nhỏ về cache miss với pipeline, mình cứ tưởng mình nhớ, ai dè lộn công thức tính CPI. Lúc đó mới thấy note mình ghi cũng chả có ích gì cho việc ôn."* | Note **không bắt được cái sai**. Người học nhớ nhầm một công thức và note hiện tại không có cơ chế nào chặn được điều đó. Đây là tiêu chí để đánh giá 3 option ở Day 18. |
| Observation không hỏi trực tiếp: màn hình điện thoại có **~40 ảnh chụp màn hình lẫn ảnh đời thường, không phân thư mục**; note app tự mô tả là *"đống chữ lộn xộn"*, không dọn từ tuần trước. | Vấn đề **tồn đọng** ngang với vấn đề **thiếu cấu trúc**. Một bản note đẹp thêm cũng không cứu được một thư mục 40 ảnh không phân loại. |

### 1.2 Hai Pain Hypothesis cạnh tranh từ Day 17 — nhóm giữ nguyên cả hai

| | Pain Hypothesis A (nhóm chọn làm việc) | Pain Hypothesis B (giữ lại làm đối chứng) |
| :--- | :--- | :--- |
| **Phát biểu** | Ghi chú rời rạc, không nối được với nội dung gốc, nên khi ôn không dùng được ngay. | Học viên không ôn bằng note mà xem lại video, nên "note có cấu trúc" không giải quyết barrier thật. |
| **Evidence ủng hộ** | 35 phút xem lại video; mở note "không biết ảnh thuộc khúc nào"; highlight không export được. | *"Chứ note của mình giờ chưa phải thứ để ôn"*; đã bỏ ghi chú 2 tuần; khi bế tắc thì hỏi ChatGPT chứ không mở note. |
| **Điều Day 18 phải test** | Ghi chú có neo vị trí (slide + phút) thì người học **thật sự dùng lại** nó sáng hôm sau thay vì xem lại video? | Nếu có ghi chú hoàn hảo, người học có **vẫn chọn xem lại video** không? |

### 1.3 Chốt Problem Hypothesis của nhóm (không đổi)

> **Khi vừa học xong một bài, học viên ghi lại các điểm chính và chỗ chưa hiểu bằng nhiều công cụ rời rạc (highlight trong app, ảnh chụp màn hình, ghi chú trên điện thoại). Những dấu vết đó không mang theo vị trí của nó trong bài. Khi ôn lại vài ngày sau, người học không xác định được mỗi dấu vết thuộc đoạn nào, phải mở lại toàn bộ video 35 phút để định vị, hoặc bỏ ôn và hỏi lại ChatGPT — nên ghi chú tồn tại nhưng chưa bao giờ là công cụ ôn thật.**

**Tương tác trọng yếu (critical interaction) mà 3 option sẽ xoay quanh:**

> Cuối buổi học, người học đang có **7 dấu vết rời rạc** trong tay và cần một bản ghi chú gộp lại được, **nhưng chưa biết chính xác mình muốn ưu tiên cái gì** và **không chắc ảnh chụp nào thuộc slide nào**.

**Điều Day 18 cần đo (chưa biết, phải test):** liệu việc AI gắn được neo vị trí vào từng mục ghi chú có đủ để biến ghi chú thành công cụ ôn, hay người học vẫn chọn xem lại video / hỏi ChatGPT.

---

## PHẦN 2 · BA SOLUTION OPTIONS (CHẶNG 2)

### 2.1 Shared Core — 70% bắt buộc giữ nguyên

| Hạng mục | Nội dung dùng chung cho cả A, B, C |
| :--- | :--- |
| **Target user** | Học viên CNTT trên VLearn, đang học một chương lý thuyết + làm Lab ngay sau đó, thường học **buổi tối một mình**. |
| **Situation** | Vừa học xong ~1 bài. Đã để lại 5–7 dấu vết (highlight, "Chưa hiểu", câu hỏi, ghi chú điện thoại, ảnh chụp màn hình). Chuẩn bị đi ngủ, định ôn lại ngày mai. |
| **Artifact** | **Một bản ghi chú có cấu trúc 4 mục**: *Điểm chính · Chỗ chưa hiểu · Câu hỏi còn treo · Ảnh đã lưu* — mỗi mục có **neo vị trí trong bài** (Slide + phút) và **1 nút sửa tay tại chỗ**. |
| **Điều không được đổi** | Nội dung slide/lab, danh sách dấu vết, 4 mục ghi chú, trình bày neo vị trí, nút sửa / xoá / thêm / đổi thứ tự, nút lưu. Cùng một checkpoint ở cuối mỗi bài. |
| **Điểm cốt lõi của case** | **Ảnh chụp màn hình không có số slide và không có số phút.** Đây là dấu vết mất liên kết nặng nhất trong evidence Day 17, nên nó là chỗ 3 option bắt buộc phải khác nhau. |
| **Desired outcome** | Ngày mai mở bản ghi chú lên, **không cần mở video**, biết ngay chỗ nào còn chưa hiểu và nhảy thẳng được tới đúng đoạn. |

### 2.2 Ba chủ đề nội dung dùng làm fixture

| # | Chủ đề | Slide / Lab | Vì sao chọn |
| :--- | :--- | :--- | :--- |
| 1 | **Pipeline CPU** | Slide 4 (5 tầng, `n + k − 1`) · Slide 6 (RAW, forwarding, load-use hazard) · Lab 4 Bài 2 (đếm stall) | Chính xác bài P07 đang học. Chứa câu hỏi mà P07 nói là đã **lộn công thức tính CPI**. |
| 2 | **Cache & CPI** | Slide 9 (tag/index/offset) · Slide 11 (AMAT, CPI trung bình) · Slide 12 (đánh đổi) · Lab 7 Bài 1 (`avg_cpi()` thiếu hệ số) | Chứa đúng lỗi "lộn công thức CPI" trong evidence. Lab cho một lỗi runtime rất cụ thể. |
| 3 | **Context Window** | Slide 12 (cửa sổ bối cảnh) · Slide 14 (`trim_history`) · Lab 9 Bài 3 (lệch 1 token) | Nội dung AI đúng chương đang học; cũng là chủ đề nhóm khác trong lớp đang dùng. |

Mỗi chủ đề có **2 chế độ**: `theory` (Slide + câu hỏi kiểm tra) và `lab` (đề Lab + lỗi + câu hỏi kiểm tra). Tổng cộng **3 × 2 × 3 = 18 tổ hợp URL**.

### 2.3 Ba Solution Options

#### **Option A — AI tự chọn lọc dấu vết**
*Không hỏi. AI đọc hết dấu vết, tự nhóm thành ghi chú, tự gắn neo vị trí (kể cả ảnh chụp), người học sửa sau.*

| | |
| :--- | :--- |
| **Trigger** | Người học bấm 1 nút ở cuối bài. |
| **User làm gì** | Bấm nút → đọc ghi chú → sửa / xoá / đổi thứ tự / thêm mục → bấm *"Sửa xong · lưu ghi chú"*. |
| **AI làm gì** | Chọn lọc 7 dấu vết, gom vào 4 mục, **gắn neo `Slide X · phút` cho từng mục, kể cả 2 ảnh chụp vốn không có số phút** → gắn theo phỏng đoán và đánh dấu badge *"AI gắn tạm"*. |
| **Quyền ai giữ** | AI đề xuất toàn bộ, người học toàn quyền bác bỏ — nhưng **không có cơ hội can thiệp trước khi AI chọn lọc**. |
| **Trade-off** | Nhanh nhất (~1 giây chờ, không câu hỏi nào) và **giải quyết đúng cả ảnh chụp**. Đánh đổi: người học không có tiếng nói trong thứ tự ưu tiên; nếu AI xếp sai thì phải sửa tay; và 2 ảnh vẫn là **phỏng đoán của AI**, không phải sự thật. |

#### **Option B — AI hỏi trước khi soạn**
*AI hỏi 3 câu 1-chạm (mục đích ôn · thứ quan trọng nhất · xác nhận ảnh chụp thuộc slide nào), rồi mới soạn.*

| | |
| :--- | :--- |
| **Trigger** | Người học bấm nút, sau đó đi qua 3 câu hỏi. |
| **User làm gì** | Chọn mục đích ôn (thi / làm bài / hiểu lại) → chọn 1 dấu vết quan trọng nhất → **tự gán slide cho từng ảnh chụp** → đọc, sửa, lưu. |
| **AI làm gì** | Dùng câu 1 để **xếp lại thứ tự 4 mục** theo mục đích ôn (thi → định nghĩa/công thức trước; hiểu lại → chỗ chưa hiểu lên đầu; làm bài → quy trình và lỗi trước). Dùng câu 2 để đánh dấu *"quan trọng nhất"*. Không đoán slide ảnh — chờ người học xác nhận. |
| **Quyền ai giữ** | **Cùng quyết định.** Người học nắm quyền về thứ tự, ưu tiên, và là người duy nhất xác nhận vị trí ảnh. |
| **Trade-off** | Ghi chú **đúng với ý định ôn** và **neo ảnh là do người học xác nhận, không phải AI đoán** → không còn badge "AI gắn tạm". Đánh đổi: tốn thêm 40–60 giây và **phụ thuộc trí nhớ người học về chính bài vừa học** — người học lười ghi chú có thể không nhớ để xác nhận. |

#### **Option C — AI tự can thiệp khi nghi bạn kẹt**
*Không cần bấm gì cả. AI theo dõi hành vi đọc, tự nhắc chỗ nghi kẹt kèm mức độ chắc chắn, tự gắn cờ vào ghi chú, và leo thang hỏi người thật.*

| | |
| :--- | :--- |
| **Trigger** | **System-initiated.** AI tự nhắc sau **12 giây** không thao tác, hoặc **ngay khi người học trả lời sai checkpoint**. |
| **User làm gì** | Không bấm gì để bắt đầu. Đọc thẻ nhắc → *"Đúng chỗ, để AI soạn đi"* hoặc *"Không phải chỗ này, tôi tự chọn"* hoặc *"Tắt tự nhắc trong buổi này"*. Sau đó sửa ghi chú như bình thường. Nếu vẫn chưa hiểu → bấm *"Vẫn chưa hiểu · hỏi người thật"*. |
| **AI làm gì** | Liệt kê tín hiệu hành vi thật (*"Bạn đã đọc lại Slide 4 lần thứ 3"*, *"7/10 học viên dừng lâu ở đúng đoạn này"*), gắn **thang độ chắc chắn 0–100%** kèm mục *"Vì sao AI nghĩ vậy"*, gắn cờ 2–3 mục trong ghi chú kèm badge *"AI tự gắn cờ"*, và soạn sẵn câu hỏi để gửi bạn học/đồng nhóm. |
| **Quyền ai giữ** | AI hành động trước; người học **duyệt hoặc bác bỏ từng cờ**. Bác toàn bộ → ghi chú **mất hẳn phần "Chỗ chưa hiểu"** do AI suy đoán. |
| **Trade-off** | Người học tốn **0 thao tác khai báo**, kể cả khi bị kẹt lúc đang đọc dở. Đánh đổi: AI có thể **đoán sai và làm mất tập trung**; thẻ tự nhắc có thể chạy đúng lúc người học đang đọc tốt; và cờ AI gắn sai thì người học phải dọn. |

### 2.4 Comparison Contract — 3 option phải thỏa cùng một hợp đồng

| Tiêu chí | **A — AI tự chọn lọc** | **B — AI hỏi 3 câu** | **C — AI tự can thiệp** |
| :--- | :--- | :--- | :--- |
| **Cơ chế** | Bấm *"Soạn ghi chú từ 7 dấu vết"* → 1s → ghi chú 4 mục xuất hiện, **gồm cả 2 ảnh chụp đã được gắn `Slide X`** | Bấm *"Soạn ghi chú"* → **3 câu hỏi 1-chạm** (mục đích ôn → thứ quan trọng nhất → **gán slide cho 2 ảnh chụp**) → ghi chú xuất hiện | **Không bấm gì.** Sau 12s hoặc khi làm sai checkpoint, thẻ đỏ tự trượt ra → người học duyệt/bác → ghi chú tự sinh |
| **User làm gì** | Bấm nút → sửa / xoá / đổi thứ tự / thêm mục → lưu | Trả lời 3 câu → sửa / xoá / đổi thứ tự / thêm mục → lưu | Đọc thẻ nhắc → duyệt hoặc bác → sửa / xoá / đổi thứ tự / thêm mục → lưu → (nếu cần) hỏi người thật |
| **AI làm gì** | Chọn lọc, gom nhóm, **tự gắn neo vị trí cho ảnh chụp** | Hỏi trước, rồi **xếp lại thứ tự theo mục đích ôn** và đánh dấu ưu tiên. **Không đoán vị trí ảnh** | Theo dõi hành vi, **tự nhắc kèm độ chắc chắn và lý do**, **tự gắn cờ lên ghi chú**, soạn sẵn câu hỏi cho người thật |
| **Agency** | **Don't act** (AI đề xuất, user quyết định) | **Ask** (AI hỏi, user trả lời, cùng quyết định) | **Act** (AI hành động trước, user duyệt/bác) |
| **Vị trí ảnh chụp do ai quyết** | AI phỏng đoán — badge **"AI gắn tạm"** | **Người học** — badge **"bạn xác nhận"** | AI phỏng đoán — badge **"AI gắn · n%"** kèm độ chắc chắn |
| **Chi phí thời gian** | ~1 giây, 0 câu hỏi | ~40–60 giây, 3 câu hỏi | 0 giây khai báo, nhưng phải chờ AI nhắc (12s) hoặc làm sai checkpoint mới thấy |
| **Trade-off chính** | Nhanh nhưng **người học không có tiếng nói trong chọn lọc**; ảnh là phỏng đoán | Đúng ý định nhất và **ảnh chắc chắn nhất**, nhưng tốn thời gian và **phụ thuộc trí nhớ** | Không tốn thao tác, nhưng **dễ đoán sai / làm mất tập trung**, và phải dọn cờ rác |
| **Cách lấy lại quyền kiểm soát** | *"Bỏ hết chỉnh sửa của tôi"* (trả về bản AI vừa soạn) · sửa tay · xoá mục · thêm mục · đổi thứ tự | *"Làm lại 3 câu"* · *"Bỏ phần hỏi, soạn lại không cần ý kiến tôi"* · *"Không nhớ"* cho ảnh | *"Không phải chỗ này, tôi tự chọn"* (bác toàn bộ cờ) · *"Tắt tự nhắc trong buổi này"* (bật lại được) · *"Tự giải quyết, không hỏi"* khi leo thang |

### 2.5 Distance Check — đảm bảo đây là 3 giải pháp, không phải 3 giao diện

- **A ≠ B:** A để AI **tự suy ra** ý định ôn và thứ tự từ dấu vết có sẵn rồi mới hỏi. B **hỏi trước** để biết ý định ôn và bắt người học tự gán vị trí ảnh — với A, người học không bao giờ được hỏi về ảnh.
- **B ≠ C:** B là **user-initiated** (người học phải bấm và phải trả lời). C là **system-initiated** (người học không cần bấm gì, AI tự nhắc dựa trên hành vi đọc thật, và kích hoạt cả khi người học làm sai checkpoint).
- **A ≠ C:** Cả hai đều để AI tự hành động, nhưng A **chỉ chạy khi người học bấm nút** và suy ra từ **dấu vết tĩnh** đã để lại; C chạy **ngay cả khi người học chưa làm gì** và suy ra từ **hành vi thời gian thực**, rồi **chủ động gắn cờ vào ghi chú** thay vì chỉ nhắc.
- **Có thực sự là 3 solution khác, hay 3 phiên bản layout?** Khác nhau ở **cơ chế Human–AI**, không phải ở màu sắc hay bố cục: cùng một artifact (ghi chú 4 mục có neo vị trí), cùng một slide, cùng một checkpoint, cùng một bộ nút chỉnh sửa — nhưng **ai làm gì và khi nào** thì khác hoàn toàn.

---

## PHẦN 3 · HUMAN–AI DESIGN PASS (CHẶNG 3)

### 3.1 Human–AI Decision Table — 4 nguyên lý

| Nguyên lý | **A — AI tự chọn lọc** | **B — AI hỏi 3 câu** | **C — AI tự can thiệp** |
| :--- | :--- | :--- | :--- |
| **1. Role & Agency** | **User:** bấm nút, sửa, lưu.<br>**AI:** chọn lọc + gắn neo.<br>➔ **Don't act.** AI đề xuất, user ký. | **User:** trả lời 3 câu, tự gán slide ảnh, sửa, lưu.<br>**AI:** hỏi, xếp thứ tự, đánh dấu ưu tiên.<br>➔ **Ask.** Cùng quyết định. | **User:** duyệt / bác cờ, sửa, lưu, quyết định có hỏi người thật không.<br>**AI:** tự phát hiện, tự nhắc, tự gắn cờ.<br>➔ **Act.** User review/dismiss. |
| **2. Expectation** | Nói rõ **trước**: *"AI đọc 7 dấu vết và tự nhóm. Bạn không chọn được cách nhóm — nếu AI xếp sai thì bạn sửa sau."* Kèm cảnh báo: *"2 ảnh chụp không có số slide/phút. AI đã tự gán — đây là phỏng đoán của AI, bấm vào neo để kiểm tra."* | Nói rõ **trước**: *"3 câu, khoảng 40–60 giây. Không chấm điểm, không lưu vào hồ sơ học tập."* Với từng câu ghi rõ hậu quả: Câu 1 → *"AI sẽ xếp lại thứ tự các mục theo câu trả lời này"*; Câu 2 → *"Mục bạn chọn sẽ được đánh dấu và đẩy lên đầu"*; Câu 3 → *"AI không đoán hộ bạn ở bước này vì đoán sai slide thì cả ảnh và cả ghi chú đều vô nghĩa."* | Nói rõ **trước**: *"Bạn không cần bấm gì. Nếu AI thấy bạn bị kẹt, nó sẽ tự nhắc trước."* + *"AI sẽ tự nhắc sau 12 giây nếu bạn không làm gì."* Thẻ nhắc ghi rõ: *"AI NGHĨ BẠN KẸT Ở ĐÂY"* và trong *"Vì sao AI nghĩ vậy"*: **"AI không hỏi bạn câu nào — nó suy ra hoàn toàn từ hành vi của bạn."** |
| **3. Evidence & Uncertainty** | Cảnh báo cam kết chắc chắn: **badge "AI gắn tạm"** (hổ phách) trên mọi mục ảnh chụp. Có `<details>` để mở danh sách 7 dấu vết AI đã dùng → ai cũng kiểm chứng lại được bằng mắt. Bấm vào neo vị trí → hệ thống hiện toast *"…nhưng bạn vẫn chưa biết phút nào — đây là điểm yếu còn lại"*. | Không có suy đoán nào để phải cảnh báo: badge **"bạn xác nhận"** (xanh) vì người học là người xác nhận. Có nút **"Không nhớ"** — hệ thống chấp nhận ảnh không có vị trí thay vì ép đoán. Câu trả lời đầy đủ được ghi lại ở đầu panel để đối chiếu với kết quả. | Thang **độ chắc chắn 0–100%** (Cao / Trung bình / Thấp) cho từng cờ + mục **"Vì sao AI nghĩ vậy"** liệt kê đúng các tín hiệu đã dùng: hành vi cá nhân (*"Bạn đã đọc lại Slide 4 lần thứ 3"*) **và** tín hiệu đồng đoàn (*"7/10 học viên dừng lâu ở đúng đoạn này"*). |
| **4. Control & Recovery** | *"Bỏ hết chỉnh sửa của tôi"* → trả về đúng bản AI vừa soạn, tức thì. Sửa tay từng mục (giữ nguyên khi blur). Xoá mục. Thêm mục. Đổi thứ tự. Thanh *"Làm lại"* trên prototype bar. | *"Làm lại 3 câu"* → trả về cả 3 câu về trạng thái ban đầu. *"Bỏ phần hỏi, soạn lại không cần ý kiến tôi"* → lùi về hành vi của A mà vẫn giữ được giao diện. *"Không nhớ"* → ảnh được giữ nhưng gắn nhãn là không có vị trí. | *"Không phải chỗ này, tôi tự chọn"* → bác toàn bộ cờ AI, ghi chú **mất hẳn phần "Chỗ chưa hiểu"** — đây là cách lấy lại quyền mạnh nhất vì nó làm giảm chất lượng ghi chú. *"Tắt tự nhắc trong buổi này"* (có nút **"Bật lại tự nhắc"**). *"Tự giải quyết, không hỏi"* khi leo thang. |

### 3.2 Nguyên lý áp dụng cụ thể đã đưa vào prototype

| Nguyên lý | Thể hiện trong prototype | Vì sao chọn cách này |
| :--- | :--- |
| **Expectation phải trả lời được "AI có làm thay tôi không?"** | Cả 3 option đều in ra giới hạn của chính mình *trước khi* người học bấm: A nói rõ không được chọn cách nhóm; B nói rõ mỗi câu ảnh hưởng gì; C nói rõ suy ra hoàn toàn từ hành vi. | Người học đã từng bỏ ghi chú 2 tuần vì *"ghi xong chẳng mở lại được"*. Một AI làm thay quá nhiều mà nói trước là cách duy nhất giữ được lòng tin. |
| **Evidence phải kiểm chứng được, không chỉ khẳng định** | Badge phân biệt 3 mức: *"có số phút"* (dữ liệu thật) / *"AI gắn tạm"* / *"bạn xác nhận"* / *"AI gắn · n%"*. Người học nhìn là biết mục nào đáng tin. | Pain Day 17 là **mất liên kết với vị trí gốc**. Badge là thứ biến "AI gắn" thành thông tin có thể kiểm chứng. |
| **Recovery phải có nút, không chỉ có Esc** | Mỗi option có ít nhất 2 đường lấy lại quyền kiểm soát *không phải* chỉ đóng: A → undo toàn bộ chỉnh sửa; B → làm lại 3 câu / bỏ phần hỏi; C → bác cờ / tắt tự nhắc / tự giải quyết. | Evidence Day 17 cho thấy vấn đề không phải thiếu thông tin mà là **không nắm được vì trí của thông tin đó**. Nút khôi phục phải trả lại *vị trí*, không chỉ trả lại *nội dung*. |
| **Ưu tiên học viên bận rộn** | A: 1 giây. B: 40–60 giây. C: 0 giây nhưng phải chờ. Cái giá được nói rõ ngay trên panel. | "Mình định dọn note ngay nhưng mệt nên để mai" — người học đã cho thấy họ sẵn sàng để việc tổng hợp sang ngày mai. |

---

## PHẦN 4 · ĐỐI CHIẾU VỚI EVIDENCE DAY 17 — CÁI GÌ ĐÃ ĐƯỢC XỬ LÝ, CÁI GÌ CÒN NỢ

| Evidence Day 17 | Ba option này xử lý thế nào | Trạng thái |
| :--- | :--- | :--- |
| Ảnh chụp không gắn số slide/phút | Cả 3 option đều gắn neo `Slide X` cho ảnh — nhưng **khác nguồn**: A đoán, B hỏi, C đoán kèm độ chắc chắn. Đây là chỗ 3 option khác nhau rõ nhất. | ✅ Đưa vào test |
| VLearn không cho export highlight | Ghi chú bám trong bài bằng neo vị trí, không phải file export. | ✅ Đưa vào test |
| Ghi bằng 3 công cụ cùng lúc | Mọi 5 loại dấu vết (highlight, Chưa hiểu, câu hỏi, ghi chú, ảnh chụp) được gộp vào 1 artifact. | ✅ Đưa vào test |
| *"Ghi xong chẳng mở lại được"* | Neo vị trí bấm được → từ ghi chú nhảy thẳng về đúng slide. | ✅ Đưa vào test |
| *"Lộn công thức tính CPI"* | Checkpoint của Cache & CPI và Lab 7 cố tình đặt đúng bẫy đó; phương án nhiễu `hit rate × hit time` có trong bài. | ✅ Đưa vào test |
| *"Bỏ ghi chú 2 tuần"* | Option C theo dõi hành vi đọc — gần nhất với việc thôi gọi thay vì thủ công. | ⚠️ Mới chỉ giả lập, chưa biết có đủ để kéo hành vi ghi chú trở lại không |
| *"Chứ note của mình chưa phải thứ để ôn"* — **Hypothesis B** | 3 option đều cải thiện *tính dùng lại*; nhưng chưa option nào trả lời được câu hỏi lớn nhất: **người học có dùng ghi chú thay video không?** | ❌ **Chưa giải quyết — đây là câu hỏi chính của Day 18** |
| Màn hình điện thoại có ~40 ảnh lẫn ảnh đời thường, không phân thư mục | Không nằm trong scope critical interaction của bài này. | ❌ Nợ — ghi vào Still Unproven |
| Note "đống chữ lộn xộn", không dọn từ tuần trước | Không có cơ chế nào xử lý tồn đọng giữa các buổi. | ❌ Nợ — ghi vào Still Unproven |

---

## PHẦN 5 · VÒNG LẶP KẾ — CHỖ SẼ CHỐT SAU KHI TEST

> *Phần này **chốt sau khi có dữ liệu 3 phiên thật**. Xem [`group-feedback-synthesis.md`](group-feedback-synthesis.md).*

**Group Next Change (chốt sau Chặng 6 — chỗ trống để điền):**

> **GHI Ở ĐÂY SAU KHI CÓ 3 PHIÊN TEST.** Phải trả lời bằng bằng chứng quan sát được, không bình bầu theo cảm tính. Gợi ý format:
> 1. Cơ chế nào được giữ lại làm lõi — và bằng chứng nào ủng hộ.
> 2. Cơ chế nào bị loại — và bằng chứng nào đủ để loại.
> 3. Một thay đổi cụ thể cho vòng lặp tới, chỉ **một**.

**Still Unproven (những gì 3 option này không giải quyết, bất kể test ra sao):**

1. **Có thật sự thay được video không?** Đây là giả thuyết B từ Day 17. Cả 3 option đều chỉ cải thiện ghi chú, không cải thiện lý do người học chọn xem lại video. Nếu sau test người học vẫn mở video, thì cả Case B lẫn 3 option này đều chưa chạm đúng chỗ.
2. **Có bắt được lỗi "lộn công thức" không?** Ghi chú có thể giữ lại đúng công thức, nhưng không có gì trong prototype này chủ động **phát hiện** học viên đang nhớ sai. Cờ của Option C là suy ra từ *hành vi đọc*, không phải từ *sai sót kiến thức*.
3. **Quy mô.** 1 prototype interview (P07) làm evidence Day 17; Day 18 dự kiến 3 phiên test. Không đại diện cho học viên học theo học kỳ khác, học ngoài giờ một mình đêm khuya, hoặc học viên học kém hơn.
4. **Ảnh chụp ngoài bài.** P07 có ~40 ảnh chụp màn hình lẫn ảnh đời thường trong thư viện điện thoại, không phân thư mục. Prototype chỉ xử lý ảnh chụp **đã nằm trong bài**. Việc dọn ảnh cũ hoàn toàn nằm ngoài scope.
5. **Tồn đọng giữa các buổi.** Mọi option trong bài này kết thúc ở "lưu ghi chú". Không có gì xử lý lần mở ghi chú tuần sau — đúng cái khoảnh khắc P07 nói là không bao giờ xảy ra.
6. **Không có AI thật.** Toàn bộ phản hồi AI trong prototype là **canned output** do tôi viết tay theo evidence Day 17. Chưa đo được chất lượng khi AI thật sai, chậm, hoặc từ chối trả lời.