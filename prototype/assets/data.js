/* Lab 18 — Nguyễn Văn Sơn (2A202602744) — nhóm Ca Khô
   CASE B — AI Notes: Personal Learning Notes
   ---------------------------------------------------------------
   Dữ liệu nội dung dùng chung cho cả 3 options (Shared Core ~70%).
   Nội dung bám theo evidence Day 17: P07 học "Pipeline CPU", lỗn
   công thức CPI, data hazard / forwarding, và ảnh chụp không gắn
   được vị trí trong bài.
   --------------------------------------------------------------- */

window.LAB = (function () {

  var OPTIONS = [
    {
      id: 'A',
      name: 'AI tự chọn lọc dấu vết',
      short: 'AI tự soạn',
      agency: "Agency: Don't act — AI đề xuất, người học quyết định (sửa / xoá / lưu)",
      lead: 'Nguyễn Văn Sơn (2A202602744)',
      color: '#2563eb',
      summary: 'Bấm một nút, AI đọc toàn bộ highlight / "Chưa hiểu" / câu hỏi / ảnh chụp rồi tự nhóm thành ghi chú có neo vị trí. Người học chỉ sửa và xác nhận.',
      tradeoff: 'Nhanh nhất, nhưng người học không có tiếng nói trong cách chọn lọc và nhóm; nếu AI xếp sai thì phải tự sửa.'
    },
    {
      id: 'B',
      name: 'AI hỏi 3 câu trước khi soạn',
      short: 'AI hỏi 3 câu',
      agency: 'Agency: Ask — AI hỏi, người học trả lời, cùng quyết định',
      lead: 'Nguyễn Văn Sơn (2A202602744)',
      color: '#7c3aed',
      summary: 'AI hỏi 3 câu 1-chạm về mục đích ôn, thứ quan trọng nhất và chỗ còn chưa hiểu, rồi mới soạn ghi chú theo câu trả lời.',
      tradeoff: 'Đúng ý định ôn hơn, nhưng tốn thêm 40–60 giây và phụ thuộc trí nhớ người học về chính bài vừa học.'
    },
    {
      id: 'C',
      name: 'AI tự can thiệp khi nghi bị kẹt',
      short: 'AI tự nhắc',
      agency: 'Agency: Act — AI tự phát hiện, người học duyệt hoặc từ chối',
      lead: 'Nguyễn Văn Sơn (2A202602744)',
      color: '#dc2626',
      summary: 'AI theo dõi hành vi đọc, tự gắn cờ "nghi bạn chưa nắm" kèm mức độ chắc chắn và lý do, tự soạn ghi chú, leo thang hỏi bạn học khi bị kẹt lặp lại.',
      tradeoff: 'Không tốn thao tác, nhưng AI có thể đoán sai và làm mất tập trung; người học phải dọn lại phần AI gắn cờ nhầm.'
    }
  ];

  var MODES = [
    { id: 'theory', label: 'Lý thuyết (Slide)' },
    { id: 'lab', label: 'Thực hành (Lab)' }
  ];

  /* ---------- các mục đích ôn cho Option B ---------- */
  var GOALS = [
    { id: 'thi', label: 'Ôn trước kỳ thi', hint: 'ưu tiên công thức và định nghĩa phải nhớ' },
    { id: 'baitap', label: 'Làm bài tập', hint: 'ưu tiên quy trình, ví dụ và lỗi thường gặp' },
    { id: 'hieu', label: 'Hiểu lại bài', hint: 'ưu tiên phần còn chưa hiểu và nối ý' }
  ];

  var ESCALATE_TO = [
    { id: 'minh', name: 'Ninh Quang Minh', code: '2A202602432', rel: 'đồng nhóm Ca Khô' },
    { id: 'ban', name: 'Bạn học lớp K4-L3B', code: '', rel: 'người hỏi khi không ai rảnh' }
  ];

  /* ---------- 3 chủ đề nội dung ---------- */
  var TOPICS = {

    /* ============================================================
       CHỦ ĐỀ 1 — PIPELINE CPU
       ============================================================ */
    pipeline: {
      id: 'pipeline',
      name: 'Pipeline CPU',
      unit: 'Chương 4 · Kiến trúc máy tính',
      modes: {

        theory: {
          label: 'Lý thuyết (Slide)',
          outcome: 'Sau khi học xong slide này bạn phải trả lời được câu hỏi kiểm tra ở cuối mà không cần mở lại video bài giảng.',
          slides: [
            {
              n: 4,
              title: 'Pipeline 5 tầng và công thức số chu kỳ',
              time: '12:40',
              blocks: [
                { id: 'p4-1', kind: 'p', text: 'Một lệnh máy đi qua lần lượt 5 tầng: IF (Instruction Fetch), ID (Decode), EX (Execute), MEM (Memory), WB (Write Back). Các tầng chạy song song trên những lệnh khác nhau.' },
                { id: 'p4-2', kind: 'code', text: 'Tầng:    IF    ID    EX    MEM   WB\nLệnh 1:  IF    ID    EX    MEM   WB\nLệnh 2:        IF    ID    EX    MEM   WB\nLệnh 3:              IF    ID    EX    MEM   WB\nLệnh 4:                    IF    ID    EX    MEM   WB\n\n→ Sau khi pipeline đầy, mỗi chu kỳ có đúng 1 lệnh mới đi ra.' },
                { id: 'p4-3', kind: 'p', text: 'Vì mỗi tầng chỉ cần 1 chu kỳ, lệnh đầu tiên mất 5 chu kỳ để đi hết pipeline; các lệnh sau chỉ mất 1 chu kỳ nữa.' },
                { id: 'p4-4', kind: 'eq', text: 'Tổng số chu kỳ = n + k − 1        (k = số tầng pipeline)' },
                { id: 'p4-5', kind: 'eq', text: 'CPI lý tưởng = (n + k − 1) / n' },
                { id: 'p4-6', kind: 'li', text: 'Tốc độ tăng tối = CPI không pipeline / CPI có pipeline; lý tưởng tối đa bằng k.' }
              ]
            },
            {
              n: 6,
              title: 'Data hazard và đường forwarding',
              time: '15:20',
              blocks: [
                { id: 'p6-1', kind: 'p', text: 'Data hazard xảy ra khi một lệnh đọc một thanh ghi mà lệnh trước chưa kịp ghi. Trường hợp phổ biến nhất là RAW — Read After Write.' },
                { id: 'p6-2', kind: 'code', text: 'add  $t0, $s1, $s2      # kết quả sẽ nằm ở $t0\nsub  $s3, $t0, $s4      # đọc $t0 ở lệnh ngay sau' },
                { id: 'p6-3', kind: 'p', text: 'Kết quả của add chỉ được ghi xong khi đi qua tầng MEM. Lệnh sub cần nó ở tầng EX ngay lập tức → không thể chờ, phải có đường forwarding từ tầng MEM quay về tầng EX.' },
                { id: 'p6-4', kind: 'eq', text: 'forwarding:  EX(chu kỳ 2)  ←  MEM(chu kỳ 3)' },
                { id: 'p6-5', kind: 'code', text: 'add  $t0, $s1, $s2\nsub  $s3, $t0, $s4    # OK vì có forwarding\n\nlw   $t1, 0($s0)\nadd  $t2, $t1, $s1    # load-use hazard: giá trị chỉ có sau WB' },
                { id: 'p6-6', kind: 'p', text: 'Forwarding giải quyết được phần lớn RAW, nhưng không cứu được load-use hazard: dữ liệu vừa load từ bộ nhớ chỉ có ở cuối tầng MEM, nên lệnh kế tiếp phải chờ.' },
                { id: 'p6-7', kind: 'note', text: 'Ghi nhớ: forwarding giải quyết RAW trong ALU; stall 1 chu kỳ là hậu quả của load-use hazard.' }
              ]
            }
          ],
          quiz: {
            q: 'Một pipeline 5 tầng chạy 20 lệnh liên tiếp, không có stall. Hỏi tổng số chu kỳ để chạy hết là bao nhiêu?',
            options: [
              { id: 'a', text: '20 chu kỳ' },
              { id: 'b', text: '24 chu kỳ' },
              { id: 'c', text: '25 chu kỳ' },
              { id: 'd', text: '100 chu kỳ' }
            ],
            answer: 'b',
            explain: 'Tổng chu kỳ = n + k − 1 = 20 + 5 − 1 = 24. Đáp án 25 là kết quả của bài 21 lệnh (21 + 5 − 1 = 25) — dễ ra nhầm nhất.'
          },
          traces: [
            { id: 't1', type: 'hl', slide: 4, time: '12:40', text: 'IF → ID → EX → MEM → WB' },
            { id: 't2', type: 'note', slide: 4, time: '12:52', text: 'điện thoại: "1 CPI sau khi đầy → nhanh tối đa 5×"' },
            { id: 't3', type: 'shot', slide: 4, time: null, text: 'ảnh chụp sơ đồ pipeline 5 tầng (không ghi số slide)' },
            { id: 't4', type: 'gap', slide: 4, time: '13:10', text: 'Chưa hiểu', text2: 'vì sao 5 tầng chạy song song vẫn không xung đột với nhau' },
            { id: 't5', type: 'hl', slide: 6, time: '15:20', text: 'RAW — Read After Write' },
            { id: 't6', type: 'q', slide: 6, time: '15:28', text: 'Forwarding lấy dữ liệu từ tầng nào? Nếu lệnh ngay sau lệnh load thì sao?' },
            { id: 't7', type: 'shot', slide: 6, time: null, text: 'ảnh chụp 2 sơ đồ đường forwarding' }
          ],
          note: {
            main: [
              { text: 'Pipeline 5 tầng chạy song song trên 5 lệnh khác nhau; sau khi đầy, mỗi chu kỳ có đúng 1 lệnh đi ra.', src: 't1', slide: 4, time: '12:40' },
              { text: 'Tổng chu kỳ = n + k − 1; CPI lý tưởng = (n + k − 1)/n; tốc độ tăng tối tối đa bằng số tầng.', src: 't2', slide: 4, time: '12:52' }
            ],
            gap: [
              { text: 'Chưa hiểu vì sao 5 tầng chạy song song được mà không xung đột với nhau.', src: 't4', slide: 4, time: '13:10' },
              { text: 'Chưa phân biệt được forwarding (giải quyết RAW) với load-use hazard (vẫn phải stall).', src: 't6', slide: 6, time: '15:28' }
            ],
            q: [
              { text: 'Forwarding lấy dữ liệu từ tầng nào?', src: 't6', slide: 6, time: '15:28' }
            ],
            shot: [
              { text: 'Sơ đồ pipeline 5 tầng', src: 't3', slide: 4, time: null },
              { text: 'Hai sơ đồ đường forwarding', src: 't7', slide: 6, time: null }
            ]
          },
          cSignals: [
            'Bạn đã đọc lại Slide 4 lần thứ 3 trong vòng 2 phút',
            'Bạn dừng ở khối công thức "n + k − 1" suốt 14 giây',
            'Bạn đánh dấu "Chưa hiểu" ở đây rồi lại bỏ dấu đó đi',
            '7/10 học viên dừng lâu ở đúng đoạn này trong buổi này'
          ],
          cGaps: [
            { item: 'main:1', conf: 0.35, confLabel: 'Thấp', why: ['Bạn cuộn qua khối này nhanh, không dừng lại đọc', 'Không có hành vi sai trong checkpoint liên quan tới công thức này'] },
            { item: 'gap:0', conf: 0.82, confLabel: 'Cao', why: ['Bạn tự đánh dấu "Chưa hiểu" ở đúng đoạn này', 'Bạn đọc lại đoạn này 3 lần', '7/10 học viên dừng ở đây'] },
            { item: 'gap:1', conf: 0.64, confLabel: 'Trung bình', why: ['Câu hỏi bạn gõ có nhắc tới load-use hazard nhưng chưa tự trả lời', 'Bạn bỏ qua phần giải thích load-use ở cuối Slide 6'] }
          ],
          cEscalate: 'Tôi đang ở Lab 4, Task 2 (đếm stall của pipeline 5 tầng). Câu hỏi kiểm tra yêu cầu tính CPI có stall, nhưng mình không chắc stall do load-use hazard tính là 1 hay 2 chu kỳ. Ai đó giải thích giúp mình với.'
        },

        lab: {
          label: 'Thực hành (Lab)',
          outcome: 'Bạn phải làm đúng nhiệm vụ Lab dưới đây rồi trả lời câu hỏi kiểm tra cuối bài mà không cần mở lại đề Lab.',
          task: {
            title: 'Lab 4 · Bài 2 — Đếm stall và tính CPI thật',
            body: 'Cho trước 4 lệnh, hãy điền phần đếm stall do load-use hazard rồi tính CPI thật.'
          },
          slides: [
            {
              n: 'Lab 4',
              title: 'Bài 2 — đếm stall trong vòng lặp',
              time: '10:05',
              blocks: [
                { id: 'l4-1', kind: 'code', text: '# lab4_bai2.py\nINSTS = [\n    "lw   t1, 0(s0)",\n    "add  t2, t1, s1",   # dùng ngay t1  -> load-use\n    "lw   t3, 8(s0)",\n    "and  t4, t3, s1",   # dùng ngay t3  -> load-use\n]\n\ndef count_stall(insts):\n    stall = 0\n    for i in range(1, len(insts)):\n        # TODO: còn thiếu 1 trường hợp nữa mới đúng\n        if insts[i].split()[0] in ("add", "sub", "and") and insts[i-1].startswith("lw"):\n            stall += 1\n    return stall\n\nprint("stall =", count_stall(INSTS))' },
                { id: 'l4-2', kind: 'p', text: 'Với 4 lệnh trên và k = 5 tầng, hãy tính CPI thật biết rằng mỗi load-use hazard tốn 1 chu kỳ stall.' },
                { id: 'l4-3', kind: 'note', text: 'Gợi ý trên lớp: đừng chỉ đếm trong vòng lặp — còn 1 chu kỳ nữa do đường ống dẫn khi nối liệt kê.' }
              ]
            }
          ],
          out: 'stall = 2',
          errorNote: 'Test lab4_bai2 chạy ra 2 nhưng đề yêu cầu 3 → bài nộp bị trả lại.',
          quiz: {
            q: 'Pipeline 5 tầng, 4 lệnh, 2 load-use hazard (mỗi cái 1 chu kỳ stall). CPI thật bằng bao nhiêu?',
            options: [
              { id: 'a', text: '1,25' },
              { id: 'b', text: '2,00' },
              { id: 'c', text: '2,50' },
              { id: 'd', text: '5,00' }
            ],
            answer: 'c',
            explain: 'Tổng chu kỳ = n + k − 1 + tổng stall = 4 + 5 − 1 + 2 = 10, nên CPI = 10 / 4 = 2,5. Đáp án 2,00 là của bài không có stall: (4 + 5 − 1) / 4 = 2. Đáp án 1,25 là khi tính đúng tổng chu kỳ nhưng quên chia cho số lệnh.'
          },
          traces: [
            { id: 'l1', type: 'hl', slide: 'Lab 4', time: '10:05', text: 'n + k − 1 + stall' },
            { id: 'l2', type: 'shot', slide: 'Lab 4', time: null, text: 'ảnh chụp lỗi test trên VLab (không ghi số dòng)' },
            { id: 'l3', type: 'gap', slide: 'Lab 4', time: '10:18', text: 'Chưa hiểu', text2: 'stall tính ở bước nào trong vòng for' },
            { id: 'l4', type: 'q', slide: 'Lab 4', time: '10:22', text: 'Nếu 2 lệnh load liên tiếp rồi mới dùng thì còn stall không?' },
            { id: 'l5', type: 'note', slide: 'Lab 4', time: '10:25', text: 'điện thoại: "1 hay 2 chu kỳ cho 1 load-use?"' }
          ],
          note: {
            main: [
              { text: 'CPI thật = (n + k − 1 + tổng stall) / n', src: 'l1', slide: 'Lab 4', time: '10:05' }
            ],
            gap: [
              { text: 'Chưa hiểu stall được cộng ở bước nào trong vòng lặp `for`.', src: 'l3', slide: 'Lab 4', time: '10:18' }
            ],
            q: [
              { text: 'Nếu 2 lệnh load liên tiếp rồi mới dùng thì còn stall không?', src: 'l4', slide: 'Lab 4', time: '10:22' }
            ],
            shot: [
              { text: 'Lỗi test lab4_bai2 trên VLab', src: 'l2', slide: 'Lab 4', time: null }
            ]
          },
          cSignals: [
            'Bạn đã chạy lại test lab4_bai2 3 lần trong 6 phút',
            'Bạn dừng ở dòng "còn thiếu 1 trường hợp nữa" suốt 21 giây',
            'Bạn đánh dấu "Chưa hiểu" ở khối này rồi lại xoá dấu',
            '6/10 học viên dừng lâu ở đoạn đếm stall'
          ],
          cGaps: [
            { item: 'gap:0', conf: 0.79, confLabel: 'Cao', why: ['Bạn tự đánh dấu "Chưa hiểu" ở đúng khối này', 'Bạn chạy lại test 3 lần mà kết quả không đổi', 'Bạn dừng đọc 21 giây ngay trên dòng TODO'] },
            { item: 'q:0', conf: 0.57, confLabel: 'Trung bình', why: ['Bạn gõ câu hỏi này nhưng chưa mở lại phần trả lời', '4/10 học viên hỏi đúng câu này ở Lab 4'] }
          ],
          cEscalate: 'Tôi đang làm Lab 4 Bài 2 (đếm stall cho pipeline 5 tầng). Hàm của mình cho stall = 2 nhưng đề yêu cầu 3. Mình nghi còn 1 chu kỳ do đường ống dẫn khi nối liệt kê nhưng không chắc chỗ nào trong code. Ai đó xem giúp mình với.'
        }
      }
    },

    /* ============================================================
       CHỦ ĐỀ 2 — CACHE & CPI
       ============================================================ */
    cache: {
      id: 'cache',
      name: 'Cache & CPI',
      unit: 'Chương 4 · Hệ thống bộ nhớ',
      modes: {

        theory: {
          label: 'Lý thuyết (Slide)',
          outcome: 'Sau khi học xong slide này bạn phải tính được AMAT và trả lời đúng câu hỏi kiểm tra ở cuối.',
          slides: [
            {
              n: 9,
              title: 'Cache direct-mapped: đường dẫn địa chỉ',
              time: '20:05',
              blocks: [
                { id: 'c9-1', kind: 'p', text: 'Bộ nhớ đệm (cache) nằm giữa CPU và bộ nhớ chính. Nó chia bộ nhớ chính thành các block và giữ lại những block vừa được truy cập.' },
                { id: 'c9-2', kind: 'code', text: 'Ví dụ: cache 32 KiB, block 4 byte, địa chỉ 32 bit\n\n  số dòng cache = 32 KiB / 4 byte = 8192 dòng = 2^13\n  offset bit  = log2(4)          = 2\n  index bit   = log2(8192)       = 13\n  tag bit     = 32 - 13 - 2      = 17\n\nĐịa chỉ 32-bit:  [ tag 17 bit | index 13 bit | offset 2 bit ]' },
                { id: 'c9-3', kind: 'p', text: 'Cache direct-mapped: mỗi block trong bộ nhớ chính chỉ được ánh xạ tới đúng một dòng cache, xác định bởi index.' },
                { id: 'c9-4', kind: 'code', text: 'index = (địa chỉ >> 2) & 0x1FFF      # 0x1FFF = 2^13 − 1' },
                { id: 'c9-5', kind: 'note', text: 'Ghi chú: 2 block khác nhau có cùng index sẽ đè lên nhau — đây là nguyên nhân chính của conflict miss.' }
              ]
            },
            {
              n: 11,
              title: 'CPI trung bình và AMAT',
              time: '21:30',
              blocks: [
                { id: 'c11-1', kind: 'p', text: 'Khi trượt cache, CPU phải chờ thêm. Chi phí đó gọi là miss penalty, tính bằng số chu kỳ phải chờ.' },
                { id: 'c11-2', kind: 'eq', text: 'AMAT = hit time + miss rate × miss penalty' },
                { id: 'c11-3', kind: 'eq', text: 'CPI trung bình (lệnh đọc bộ nhớ) = hit time + miss rate × miss penalty' },
                { id: 'c11-4', kind: 'p', text: 'Hai công thức trên giống nhau, chỉ khác cách gọi. Sai lầm phổ biến là viết thành hit rate × hit time.' },
                { id: 'c11-5', kind: 'code', text: 'hit time = 1 chu kỳ, miss rate = 2%, miss penalty = 200 chu kỳ\nAMAT = 1 + 0.02 × 200 = 1 + 4 = 5 chu kỳ\nCPI trung bình = 5' }
              ]
            },
            {
              n: 12,
              title: 'Đánh đổi miss rate và hit time',
              time: '22:40',
              blocks: [
                { id: 'c12-1', kind: 'p', text: 'Cache nhỏ thì tỉ lệ trượt cao. Cache lớn thì đường dẫn địa chỉ dài hơn, so sánh tag mất nhiều chu kỳ hơn nên hit time tăng.' },
                { id: 'c12-2', kind: 'eq', text: 'Cache lớn  →  miss rate ↓  nhưng  hit time ↑' },
                { id: 'c12-3', kind: 'p', text: 'Đây là đánh đổi cơ bản: không thể tối ưu cả hai cùng lúc bằng cách chỉ tăng dung lượng.' }
              ]
            }
          ],
          quiz: {
            q: 'CPU có hit time 1 chu kỳ, miss rate 2%, miss penalty 200 chu kỳ. AMAT là bao nhiêu?',
            options: [
              { id: 'a', text: '2 chu kỳ' },
              { id: 'b', text: '4 chu kỳ' },
              { id: 'c', text: '5 chu kỳ' },
              { id: 'd', text: '200 chu kỳ' }
            ],
            answer: 'c',
            explain: 'AMAT = 1 + 0,02 × 200 = 5 chu kỳ. Đáp án 2 là khi tính nhầm penalty chỉ bằng 1; đáp án 4 là khi quên cộng hit time.'
          },
          traces: [
            { id: 'q1', type: 'hl', slide: 9, time: '20:05', text: 'tag | index | offset' },
            { id: 'q2', type: 'shot', slide: 9, time: null, text: 'ảnh chụp sơ đồ đường dẫn địa chỉ (không ghi số slide)' },
            { id: 'q3', type: 'gap', slide: 9, time: '20:18', text: 'Chưa hiểu', text2: 'vì sao index lại đúng 13 bit' },
            { id: 'q4', type: 'note', slide: 9, time: '20:20', text: 'điện thoại: "index = địa chỉ >> 2 & 0x1FFF ?" (chưa chắc)' },
            { id: 'q5', type: 'hl', slide: 11, time: '21:35', text: 'AMAT = hit time + miss rate × miss penalty' },
            { id: 'q6', type: 'q', slide: 11, time: '21:30', text: 'CPI trung bình khác AMAT ở chỗ nào?' },
            { id: 'q7', type: 'shot', slide: 11, time: null, text: 'ảnh chụp bảng số liệu hit/miss' }
          ],
          note: {
            main: [
              { text: 'Địa chỉ 32-bit tách thành tag | index | offset; cache 32 KiB block 4 byte cho index 13 bit, offset 2 bit, còn 17 bit tag.', src: 'q1', slide: 9, time: '20:05' },
              { text: 'AMAT = hit time + miss rate × miss penalty, và cùng giá trị đó là CPI trung bình khi lệnh đọc bộ nhớ mỗi lệnh.', src: 'q5', slide: 11, time: '21:35' }
            ],
            gap: [
              { text: 'Chưa hiểu vì sao phép tính ra đúng 13 bit index từ 32 KiB và block 4 byte.', src: 'q3', slide: 9, time: '20:18' },
              { text: 'Chưa phân biệt CPI trung bình với AMAT — dễ viết nhầm thành hit rate × hit time.', src: 'q6', slide: 11, time: '21:30' }
            ],
            q: [
              { text: 'CPI trung bình khác AMAT ở chỗ nào?', src: 'q6', slide: 11, time: '21:30' }
            ],
            shot: [
              { text: 'Sơ đồ đường dẫn địa chỉ', src: 'q2', slide: 9, time: null },
              { text: 'Bảng số liệu hit / miss', src: 'q7', slide: 11, time: null }
            ]
          },
          cSignals: [
            'Bạn đã đọc lại Slide 9 lần thứ 3 trong 3 phút',
            'Bạn dừng ở khối "0x1FFF = 2^13 − 1" suốt 16 giây',
            'Bạn ghi lên điện thoại xong lại xoá dòng ghi đó',
            '8/10 học viên dừng lâu ở đoạn tính số bit'
          ],
          cGaps: [
            { item: 'main:0', conf: 0.41, confLabel: 'Thấp', why: ['Bạn cuộn qua khối này nhanh rồi xuống checkpoint', 'Không ghi chú nào ở đoạn tính số bit'] },
            { item: 'gap:0', conf: 0.85, confLabel: 'Cao', why: ['Bạn tự đánh dấu "Chưa hiểu" ngay tại đoạn này', 'Bạn đọc lại Slide 9 ba lần', '8/10 học viên dừng ở đây'] },
            { item: 'gap:1', conf: 0.68, confLabel: 'Trung bình', why: ['Bạn hỏi "CPI trung bình khác AMAT ở chỗ nào?" nhưng chưa đánh dấu đoạn nào', 'Checkpoint Slide 11 có phương án nhiễu hit rate × hit time — đúng lỗi bạn từng sai'] }
          ],
          cEscalate: 'Tôi học chương bộ nhớ, đang ở Slide 11 (CPI trung bình và AMAT). Tôi hay nhầm công thức AMAT. Cho tôi hỏi: AMAT = hit time + miss rate × miss penalty phải không, và vì sao nhiều khi vẫn phải stall thêm 1 chu kỳ nữa?'
        },

        lab: {
          label: 'Thực hành (Lab)',
          outcome: 'Bạn phải chạy đúng Lab dưới đây, hiểu vì sao kết quả sai và trả lời câu hỏi kiểm tra cuối bài.',
          task: {
            title: 'Lab 7 · Bài 1 — Tính AMAT và CPI trung bình',
            body: 'Hàm amat() đã đúng; hàm avg_cpi() cho kết quả sai. Hãy tìm và sửa.'
          },
          slides: [
            {
              n: 'Lab 7',
              title: 'Bài 1 — công thức bị thiếu hệ số',
              time: '14:05',
              blocks: [
                { id: 'll7-1', kind: 'code', text: '# lab7_bai1.py\nHIT_TIME      = 1\nMISS_RATE     = 0.02\nMISS_PENALTY  = 200\n\ndef amat():\n    return HIT_TIME + MISS_RATE * MISS_PENALTY        # 5.0\n\ndef avg_cpi():\n    return HIT_TIME * (1 - MISS_RATE) + MISS_PENALTY  # 200.98\n\nprint("AMAT     =", amat())      # AMAT     = 5.0\nprint("Avg CPI  =", avg_cpi())   # Avg CPI  = 200.98' },
                { id: 'll7-2', kind: 'p', text: 'Giá trị nhập vào đều đúng. Vậy sai ở công thức chứ không phải ở số liệu.' },
                { id: 'll7-3', kind: 'eq', text: 'AMAT = hit time + miss rate × miss penalty' }
              ]
            }
          ],
          out: 'AMAT = 5.0\nAvg CPI = 200.98',
          errorNote: 'Test lab7_bai1 kỳ vọng Avg CPI = 5.0 nhưng nhận 200.98 → bài nộp bị trả lại.',
          quiz: {
            q: 'Theo đoạn code trên, hàm avg_cpi() trả về giá trị nào?',
            options: [
              { id: 'a', text: '1,02' },
              { id: 'b', text: '5,00' },
              { id: 'c', text: '200,98' },
              { id: 'd', text: '3,98' }
            ],
            answer: 'c',
            explain: 'avg_cpi() cộng thẳng MISS_PENALTY mà không nhân MISS_RATE: 1 × 0,98 + 200 = 200,98. Công thức đúng là HIT_TIME + MISS_RATE × MISS_PENALTY = 5,0 — đây đúng là lỗi "lộn công thức CPI".'
          },
          traces: [
            { id: 'm1', type: 'hl', slide: 'Lab 7', time: '14:05', text: 'HIT_TIME + MISS_RATE * MISS_PENALTY' },
            { id: 'm2', type: 'shot', slide: 'Lab 7', time: null, text: 'ảnh chụp kết quả 200.98 trong console VLab' },
            { id: 'm3', type: 'gap', slide: 'Lab 7', time: '14:15', text: 'Chưa hiểu', text2: 'tại sao lỗi nằm ở công thức chứ không phải ở input' },
            { id: 'm4', type: 'q', slide: 'Lab 7', time: '14:18', text: 'Làm sao biết công thức nào là công thức gốc từ slide?' },
            { id: 'm5', type: 'note', slide: 'Lab 7', time: '14:22', text: 'điện thoại: "miss penalty tính bằng gì vậy"' }
          ],
          note: {
            main: [
              { text: 'AMAT = hit time + miss rate × miss penalty; cùng công thức đó là CPI trung bình khi lệnh đọc bộ nhớ mỗi lệnh.', src: 'm1', slide: 'Lab 7', time: '14:05' }
            ],
            gap: [
              { text: 'Chưa hiểu vì sao lỗi nằm ở thiếu hệ số miss rate chứ không phải ở giá trị đầu vào.', src: 'm3', slide: 'Lab 7', time: '14:15' }
            ],
            q: [
              { text: 'Làm sao biết trong note này công thức nào là công thức gốc từ slide?', src: 'm4', slide: 'Lab 7', time: '14:18' }
            ],
            shot: [
              { text: 'Kết quả console 200.98 trên VLab', src: 'm2', slide: 'Lab 7', time: null }
            ]
          },
          cSignals: [
            'Bạn đã chạy lại test lab7_bai1 4 lần trong 8 phút',
            'Bạn dừng ở dòng "sai ở công thức chứ không phải ở số liệu" suốt 18 giây',
            'Bạn đánh dấu "Chưa hiểu" ở đây rồi lại bỏ dấu',
            '7/10 học viên dừng lâu ở đúng hàm avg_cpi()'
          ],
          cGaps: [
            { item: 'gap:0', conf: 0.81, confLabel: 'Cao', why: ['Bạn tự đánh dấu "Chưa hiểu" tại đây', 'Bạn chạy lại test 4 lần mà kết quả không đổi', 'Bạn dừng đọc 18 giây ngay trên dòng gợi ý công thức'] },
            { item: 'q:0', conf: 0.49, confLabel: 'Thấp', why: ['Bạn gõ câu hỏi này lúc đang làm rộng, không phải ngay tại đoạn kẹt'] }
          ],
          cEscalate: 'Tôi làm Lab 7 Bài 1 (tính AMAT và CPI trung bình). Hàm amat() cho 5.0 đúng, nhưng avg_cpi() cho 200.98 trong khi đề yêu cầu 5.0. Tôi nghi thiếu nhân MISS_RATE nhưng không chắc chỗ nào trong biểu thức. Ai đó chỉ giúp mình với.'
        }
      }
    },

    /* ============================================================
       CHỦ ĐỀ 3 — CONTEXT WINDOW
       ============================================================ */
    context: {
      id: 'context',
      name: 'Context Window',
      unit: 'Chương 3 · Ứng dụng LLM',
      modes: {

        theory: {
          label: 'Lý thuyết (Slide)',
          outcome: 'Sau khi học xong slide này bạn phải giải thích được vì sao chat dài thì model quên lệnh ở đầu, và trả lời đúng câu hỏi kiểm tra ở cuối.',
          slides: [
            {
              n: 12,
              title: 'Context window là giới hạn cứng của LLM',
              time: '19:20',
              blocks: [
                { id: 'k12-1', kind: 'p', text: 'Mỗi lượt chat, toàn bộ lịch sử trò chuyện đều được gửi lại model. Tất cả nằm trong một cửa sổ có số token cố định, chia làm token đầu vào và token đầu ra.' },
                { id: 'k12-2', kind: 'eq', text: 'context window  ≥  token input  +  token output' },
                { id: 'k12-3', kind: 'p', text: 'Hệ quả trực tiếp: khi hội thoại đủ dài, những lệnh dặn nằm ở đầu system prompt bị đẩy ra khỏi cửa sổ. Model không "quên ngẫu nhiên" — nó không còn nhìn thấy chỗ đó nữa.' },
                { id: 'k12-4', kind: 'code', text: 'max_tokens = 8000\nreserve    = 1000      # phần dành riêng cho token output\n→ ngân sách cho token input = 7000' },
                { id: 'k12-5', kind: 'note', text: 'Câu hỏi hay gặp trên lớp: vì sao trong một hội thoại dài, các lệnh dặn ở đầu lại biến mất trước khi cuộc trò chuyện kết thúc?' }
              ]
            },
            {
              n: 14,
              title: 'Cắt bối cảnh: trim_history',
              time: '20:40',
              blocks: [
                { id: 'k14-1', kind: 'p', text: 'Khi lịch sử chat vượt ngân sách, phải cắt bớt trước khi gửi. Cách phổ biến: giữ system prompt, tóm tắt các lượt ở giữa, giữ nguyên vài lượt gần nhất.' },
                { id: 'k14-2', kind: 'code', text: 'def trim_history(messages, max_tokens=8000, reserve=1000):\n    budget = max_tokens - reserve        # 7000\n    out = [messages[0]]                  # luôn giữ system\n    for m in reversed(messages[1:]):\n        if used + count_tokens(m) > budget:\n            break\n        out.insert(1, m)\n    return out' },
                { id: 'k14-3', kind: 'p', text: 'Rủi ro chính nằm ở chỗ "tóm tắt các lượt ở giữa": người dùng đã nói một chi tiết ở giữa hội thoại có thể bị mất.' },
                { id: 'k14-4', kind: 'li', text: 'Giữ nguyên: system prompt, vài lượt gần nhất.' },
                { id: 'k14-5', kind: 'li', text: 'Cắt/tóm tắt: các lượt ở giữa, theo thứ tự cũ nhất trước.' },
                { id: 'k14-6', kind: 'li', text: 'Dành riêng một phần ngân sách cho output, nếu không sẽ không bao giờ sinh được câu trả lời dài.' }
              ]
            }
          ],
          quiz: {
            q: 'max_tokens = 8000 và reserve = 1000. Ngân sách cho token input là bao nhiêu?',
            options: [
              { id: 'a', text: '1000 token' },
              { id: 'b', text: '7000 token' },
              { id: 'c', text: '8000 token' },
              { id: 'd', text: '9000 token' }
            ],
            answer: 'b',
            explain: '8000 − 1000 = 7000 token. reserve là phần dành riêng cho token output; đáp án 9000 là khi cộng nhầm thay vì trừ.'
          },
          traces: [
            { id: 'n1', type: 'hl', slide: 12, time: '19:20', text: 'context window ≥ token input + token output' },
            { id: 'n2', type: 'gap', slide: 12, time: '19:25', text: 'Chưa hiểu', text2: 'vì sao chat dài thì model quên lệnh dặn ở đầu' },
            { id: 'n3', type: 'hl', slide: 14, time: '20:36', text: 'budget = max_tokens - reserve' },
            { id: 'n4', type: 'q', slide: 14, time: '20:40', text: 'Cắt bớt token thì nên cắt lượt nào trước?' },
            { id: 'n5', type: 'note', slide: 14, time: '20:45', text: 'điện thoại: "reserve dành cho output"' },
            { id: 'n6', type: 'shot', slide: 14, time: null, text: 'ảnh chụp bảng đếm token của một hội thoại dài' }
          ],
          note: {
            main: [
              { text: 'Context window có số token cố định, chia thành token input và token output.', src: 'n1', slide: 12, time: '19:20' },
              { text: 'Ngân sách token input = max_tokens − reserve (8000 − 1000 = 7000); reserve dành riêng cho output.', src: 'n5', slide: 14, time: '20:45' }
            ],
            gap: [
              { text: 'Chưa hiểu cơ chế đẩy system prompt ra khỏi cửa sổ khi hội thoại đủ dài.', src: 'n2', slide: 12, time: '19:25' },
              { text: 'Chưa biết khi hết ngân sách thì nên cắt lượt nào trước.', src: 'n4', slide: 14, time: '20:40' }
            ],
            q: [
              { text: 'Cắt bớt token thì nên cắt lượt nào trước?', src: 'n4', slide: 14, time: '20:40' }
            ],
            shot: [
              { text: 'Bảng đếm token của một hội thoại dài', src: 'n6', slide: 14, time: null }
            ]
          },
          cSignals: [
            'Bạn đã đọc lại Slide 12 lần thứ 3 trong 2 phút',
            'Bạn dừng ở khối "token input + token output" suốt 19 giây',
            'Bạn đánh dấu "Chưa hiểu" ở đây rồi lại bỏ dấu',
            '9/10 học viên dừng lâu ở đúng khối đó'
          ],
          cGaps: [
            { item: 'gap:0', conf: 0.88, confLabel: 'Cao', why: ['Bạn tự đánh dấu "Chưa hiểu" ở đúng chỗ này', 'Bạn đọc lại Slide 12 ba lần', '9/10 học viên dừng ở đây'] },
            { item: 'gap:1', conf: 0.55, confLabel: 'Trung bình', why: ['Câu hỏi bạn gõ có liên quan nhưng bạn đã lướt qua phần "giữ / cắt" ở Slide 14', 'Bạn chưa mở lại đoạn giải thích rủi ro ở giữa'] },
            { item: 'main:1', conf: 0.33, confLabel: 'Thấp', why: ['Bạn chỉ ghi chú nhanh dòng này rồi cuộn đi', 'Đây là phép tính 1 trừ 1, ít khả năng là chỗ kẹt'] }
          ],
          cEscalate: 'Tôi học Slide 12 và 14 về context window. Tôi hiểu công thức context window ≥ token input + token output nhưng không hiểu tại sao trong hội thoại dài thì các lệnh dặn ở đầu lại bị mất. Ai giải thích giúp mình với.'
        },

        lab: {
          label: 'Thực hành (Lab)',
          outcome: 'Bạn phải tìm ra lỗi trong hàm trim_history, sửa được và trả lời câu hỏi kiểm tra cuối bài.',
          task: {
            title: 'Lab 9 · Bài 3 — Viết trim_history theo đúng ngân sách',
            body: 'Test báo lệch 1 token. Hãy tìm và sửa.'
          },
          slides: [
            {
              n: 'Lab 9',
              title: 'Bài 3 — ngân sách bị lệch 1 token',
              time: '16:05',
              blocks: [
                { id: 'lk9-1', kind: 'code', text: '# lab9_bai3.py\nMAX_TOKENS = 8000\nRESERVE    = 1000\n\ndef trim_history(messages, max_tokens=MAX_TOKENS, reserve=RESERVE):\n    budget = max_tokens - reserve + 1     # TODO: thừa 1 ở đây\n    out = [messages[0]]\n    used = count_tokens(messages[0])\n    for m in reversed(messages[1:]):\n        c = count_tokens(m)\n        if used + c > budget:\n            break\n        out.insert(1, m)\n        used += c\n    return out' },
                { id: 'lk9-2', kind: 'p', text: 'Test kỳ vọng budget = 7000 nhưng đo được 7001.' },
                { id: 'lk9-3', kind: 'note', text: 'Gợi ý từ slide: reserve dành cho output, nên ngân sách input là hiệu số trừ chứ không phải tổng.' }
              ]
            }
          ],
          out: "budget = 7001\nexpected 7000\nAssertionError",
          errorNote: 'Test lab9_bai3 dừng ở AssertionError (7001 != 7000) → bài nộp bị trả lại.',
          quiz: {
            q: 'Với max_tokens = 8000 và reserve = 1000, hàm trim_history() tính ngân sách ra bao nhiêu?',
            options: [
              { id: 'a', text: '7000' },
              { id: 'b', text: '7001' },
              { id: 'c', text: '8000' },
              { id: 'd', text: '9000' }
            ],
            answer: 'b',
            explain: 'budget = 8000 − 1000 + 1 = 7001. Dấu "+ 1" là lỗi thừa; bỏ đi thì còn đúng 7000. Chính Slide 14 nói budget là hiệu số trừ max_tokens − reserve.'
          },
          traces: [
            { id: 'g1', type: 'hl', slide: 'Lab 9', time: '16:05', text: 'budget = max_tokens - reserve' },
            { id: 'g2', type: 'shot', slide: 'Lab 9', time: null, text: 'ảnh chụp AssertionError 7001 != 7000 trên VLab' },
            { id: 'g3', type: 'gap', slide: 'Lab 9', time: '16:14', text: 'Chưa hiểu', text2: 'reserve dành cho cái gì và vì sao trừ riêng' },
            { id: 'g4', type: 'q', slide: 'Lab 9', time: '16:18', text: 'Nếu 1 token là 1 ký tự thì tiếng Việt có còn đúng không?' },
            { id: 'g5', type: 'note', slide: 'Lab 9', time: '16:20', text: 'điện thoại: "token khác word đúng không"' }
          ],
          note: {
            main: [
              { text: 'Ngân sách token input = max_tokens − reserve, trong đó reserve dành riêng cho token output.', src: 'g1', slide: 'Lab 9', time: '16:05' }
            ],
            gap: [
              { text: 'Chưa hiểu reserve dành cho phần nào và vì sao phải trừ riêng thay vì chia đều.', src: 'g3', slide: 'Lab 9', time: '16:14' }
            ],
            q: [
              { text: 'Nếu 1 token là 1 ký tự thì tiếng Việt có còn đúng không?', src: 'g4', slide: 'Lab 9', time: '16:18' }
            ],
            shot: [
              { text: 'AssertionError 7001 != 7000 trên VLab', src: 'g2', slide: 'Lab 9', time: null }
            ]
          },
          cSignals: [
            'Bạn đã chạy lại test lab9_bai3 3 lần trong 5 phút',
            'Bạn dừng ở dòng "thừa 1 ở đây" suốt 15 giây',
            'Bạn đánh dấu "Chưa hiểu" ở đây rồi lại bỏ dấu',
            '6/10 học viên dừng lâu ở đoạn tính ngân sách'
          ],
          cGaps: [
            { item: 'gap:0', conf: 0.83, confLabel: 'Cao', why: ['Bạn tự đánh dấu "Chưa hiểu" tại đây', 'Bạn chạy lại test 3 lần không đổi kết quả', 'Bạn dừng đọc 15 giây ngay trên dòng TODO'] },
            { item: 'q:0', conf: 0.44, confLabel: 'Thấp', why: ['Bạn gõ câu hỏi này lúc đang rảnh, không phải khi kẹt'] }
          ],
          cEscalate: 'Tôi làm Lab 9 Bài 3 (trim_history). Test báo 7001 != 7000. Tôi thấy dòng budget = max_tokens - reserve + 1 nghĩ là thừa 1 nhưng không dám sửa vì sợ sai ý slide. Ai giải thích giúp mình với.'
        }
      }
    }
  };

  /* ---------- nhãn & icon cho 5 loại dấu vết ---------- */
  var TRACE = {
    hl: { icon: '▌', label: 'Highlight' },
    gap: { icon: '?', label: 'Chưa hiểu' },
    q: { icon: '❓', label: 'Câu hỏi' },
    note: { icon: '✎', label: 'Ghi chú' },
    shot: { icon: '⊞', label: 'Ảnh chụp màn hình' }
  };

  var SECTIONS = [
    { key: 'main', title: 'Điểm chính' },
    { key: 'gap', title: 'Chỗ chưa hiểu' },
    { key: 'q', title: 'Câu hỏi còn treo' },
    { key: 'shot', title: 'Ảnh đã lưu' }
  ];

  return {
    student: { name: 'Nguyễn Văn Sơn', code: '2A202602744', team: 'Ca Khô', team2: 'Ninh Quang Minh (2A202602432)' },
    caseName: 'Case B — AI Notes: Personal Learning Notes',
    options: OPTIONS,
    modes: MODES,
    goals: GOALS,
    escalateTo: ESCALATE_TO,
    topics: TOPICS,
    trace: TRACE,
    sections: SECTIONS,
    topicOrder: ['pipeline', 'cache', 'context']
  };
})();