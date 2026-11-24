import { useMemo } from 'react';
import { useI18n, type Locale } from '../../../i18n/I18nContext';
import type { Theme } from '../content/themes';

/**
 * i18n cho giao diện Ô ăn quan xanh V2 (BR-T042). Dùng ngôn ngữ chung của Brainroot (`useI18n`),
 * không tự lưu ngôn ngữ riêng. Chỉ dịch GIAO DIỆN; nội dung thẻ giữ nguyên bản tiếng Việt gốc
 * (không dịch, không ghi đè dữ liệu gốc). Nếu sau này dịch thẻ, bản dịch phải lưu riêng và chưa được coi là đã duyệt.
 *
 * Thông điệp trong state (nhật ký, thông báo, toast) lưu dạng hàm `Lazy` để chuyển ngôn ngữ giữa ván
 * vẫn hiển thị đúng ngôn ngữ mới mà không đụng tới tiến độ ván chơi.
 */
export type Params = Readonly<Record<string, string | number>>;

const VI = {
  // chung
  'common.close': 'Đóng', 'common.homeLink': '← Về trang chủ', 'common.back': 'Quay lại',
  'common.player1': 'Người chơi 1', 'common.player2': 'Người chơi 2',
  'common.seeds': 'hạt', 'common.points': 'điểm', 'common.seedsN': '{n} hạt',
  'chip.rules': 'Luật bản thử · PLAYTEST V1',
  'deck.demo': 'Thẻ DEMO', 'deck.internal': 'Thẻ nội bộ · DEV', 'deck.full': 'Bộ 100 thẻ',
  'deck.demoLower': 'thẻ DEMO', 'deck.internalLower': 'thẻ nội bộ', 'deck.fullLower': 'bộ 100 thẻ',
  'deck.tagDemo': 'THẺ DEMO', 'deck.tagInternal': 'THẺ NỘI BỘ · DEV', 'deck.tagFull': 'THẺ',
  'deck.noteDemo': 'Thẻ trong bản này là thẻ DEMO tự viết, không phải bộ thẻ chính thức.',
  'deck.noteInternal': 'Thẻ trong bản này là bộ thẻ nội bộ chỉ để phát triển và kiểm thử, chưa được công bố.',
  'deck.noteFull': 'Nội dung thẻ là bản tiếng Việt gốc của Brainroot.',
  'deck.cardsViNote': 'Nội dung thẻ hiển thị bằng tiếng Việt gốc.',
  'devbar.long': 'BẢN XEM TRƯỚC CHỈ CHẠY Ở MÔI TRƯỜNG DEV · luật bản thử PLAYTEST V1 · {deck} · không phải bản phát hành',
  'devbar.short': 'DEV · PLAYTEST V1 · {deck} · chưa phát hành',
  'skip': 'Bỏ qua tới nội dung chính',
  'sound.on': 'Âm thanh', 'sound.off': 'Tắt tiếng',
  'sound.onLabel': 'Âm thanh: bật. Bấm để tắt', 'sound.offLabel': 'Âm thanh: tắt. Bấm để bật',
  // màn bắt đầu
  'start.eyebrow': 'BRAINROOT · GREEN PLAY · BẢN CHƠI THỬ', 'start.titleA': 'Ô ăn quan', 'start.titleB': 'xanh',
  'start.lead': 'Rải quân, ăn quân, và chứng minh bạn biết cách giữ gìn tài nguyên.',
  'start.play': 'Chơi 2 người', 'start.rules': 'Xem luật tóm tắt',
  'start.steps': 'Cách chơi trong 3 bước', 'start.step1': 'Chọn ô và hướng rải hạt',
  'start.step2': 'Ăn quân, trả lời thẻ thử thách xanh', 'start.step3': 'Thu hoạch hạt vào kho bảo tồn',
  'start.themes': '5 chủ đề',
  // thiết lập
  'setup.title': 'Thiết lập ván', 'setup.players': 'Người chơi',
  'setup.p1': 'Người chơi 1 · hàng dưới (D1–D5)', 'setup.p2': 'Người chơi 2 · hàng trên (T1–T5)',
  'setup.nameNote': 'Tên chỉ dùng trên máy này, không lưu lên máy chủ.',
  'setup.first': 'Ai đi trước', 'setup.random': 'Ngẫu nhiên', 'setup.timer': 'Thời gian trả lời',
  'setup.timerStd': 'Chuẩn', 'setup.timerStdHint': 'Theo thời gian ghi trên thẻ',
  'setup.timerExt': '+50%', 'setup.timerExtHint': 'Thêm một nửa thời gian',
  'setup.timerOff': 'Không bấm giờ', 'setup.timerOffHint': 'Không giới hạn thời gian, trả lời xong thì chọn kết quả',
  'setup.note': 'Hai người chơi chung một máy. Trắc nghiệm tự chấm, câu hỏi mở thì đối thủ chấm nhanh ngay trên thẻ.',
  'setup.start': 'Bắt đầu ván',
  // bàn chơi
  'game.brand': 'Ô ăn quan xanh', 'game.rules': 'Luật', 'game.log': 'Nhật ký', 'game.quit': 'Rời ván',
  'game.quitConfirm': 'Rời ván? Ván hiện tại sẽ không được lưu.',
  'game.steps': 'Các bước của lượt', 'game.step.pick': 'Chọn ô', 'game.step.dir': 'Chọn chiều', 'game.step.sow': 'Rải', 'game.step.card': 'Thẻ',
  'game.dirGroup': 'Hướng rải', 'game.changePit': 'Đổi ô', 'game.skip': 'Bỏ qua ›', 'game.speed': 'Tốc độ hoạt ảnh',
  'game.logTitle': 'Nhật ký ván', 'game.logEmpty': 'Chưa có nước đi.',
  'dir.left': 'Sang trái', 'dir.right': 'Sang phải', 'dir.up': 'Lên trên', 'dir.down': 'Xuống dưới',
  'dir.label': 'Rải {dir}',
  'plate.aria': '{name}: {points} điểm', 'plate.ariaTurn': '{name}: {points} điểm, đang đi',
  'plate.bottom': 'Hàng dưới', 'plate.top': 'Hàng trên', 'plate.turn': ' · ĐANG ĐI', 'plate.quan': '+ {n} Quan', 'plate.debt': 'nợ {n}',
  'coach.chance': 'Cơ hội ăn!', 'coach.harvest': 'Thu hoạch!', 'coach.keep': 'Lần sau nhé!', 'coach.over': 'Hết ván!', 'coach.restock': 'Đặt lại hàng',
  // thông báo
  'msg.yourTurn': 'Lượt của {name}: chọn một Ô Dân có hạt ở hàng của mình.',
  'msg.chosen': 'Đã chọn {pit} ({n} hạt). Chọn hướng rải: {dirs}.',
  'msg.dirsH': '← hoặc →', 'msg.dirsV': '↑ hoặc ↓',
  'msg.answer': '{lead} {pit}: {name} trả lời thẻ.',
  'msg.leadChain': 'Ăn liên hoàn', 'msg.leadChance': 'Cơ hội ăn',
  'msg.leadChainBang': 'Ăn liên hoàn!', 'msg.leadChanceBang': 'Cơ hội ăn!',
  'msg.noQuanPick': 'Không được bốc Ô Quan để rải.', 'msg.emptyPit': 'Ô {pit} không có hạt.', 'msg.enemyPit': 'Ô {pit} là ô của đối thủ.',
  'msg.pickRelay': 'Rải tiếp! Bốc {n} hạt ở {pit}.', 'msg.pick': '{name} bốc {n} hạt ở {pit}.',
  'msg.dropQuan': 'Thả 1 hạt vào {pit} · còn {n} hạt trong tay.', 'msg.drop': 'Thả 1 hạt vào {pit} · còn {n} hạt trong tay.',
  'msg.capture': '{lead} {pit} · thẻ Cấp {level}. {name} trả lời.',
  'msg.harvest': '{name} thu hoạch {n} hạt!', 'msg.harvestQuan': '{name} thu hoạch {n} hạt và quân Quan!',
  'msg.keep': 'Chưa đạt: hạt vẫn ở ô này.',
  'msg.restock': 'Hàng của {name} trống: đặt lại mỗi ô 1 hạt ({own} từ kho mình).',
  'msg.restockBorrow': 'Hàng của {name} trống: đặt lại mỗi ô 1 hạt ({own} từ kho mình, mượn {b} hạt của đối thủ).',
  'msg.turn': 'Đến lượt {name}.', 'toast.turn': 'Đến lượt {name}', 'toast.over': 'Ván kết thúc!',
  'msg.overQuan': 'Cả hai quân Quan đã được thu hoạch: ván kết thúc.', 'msg.overSeeds': 'Không đủ hạt để đặt lại hàng: ván kết thúc sớm.',
  'sowEnd.occupiedQuan': 'Ô sau hạt cuối là Ô Quan còn quân hoặc còn hạt: dừng, hết lượt.',
  'sowEnd.twoEmpty': 'Gặp hai ô trống liên tiếp: hết lượt, không ăn.',
  'sowEnd.capture': 'Ô sau hạt cuối trống, ô kế tiếp có quân: có cơ hội ăn!',
  'sowEnd.dropLimit': 'Rải quá nhiều vòng: dừng lượt theo chốt an toàn.',
  'chainEnd.gapNotEmpty': 'Sau ô vừa ăn không phải ô trống: hết chuỗi ăn.',
  'chainEnd.twoEmpty': 'Sau ô vừa ăn là hai ô trống: hết chuỗi ăn.',
  // nhật ký
  'log.relay': '↪ Rải tiếp: bốc {n} hạt ở {pit}.',
  'log.pickCw': '{name} bốc {n} hạt ở {pit}, rải ↻ theo chiều kim đồng hồ.', 'log.pickCcw': '{name} bốc {n} hạt ở {pit}, rải ↺ ngược chiều kim đồng hồ.',
  'log.sowEnd': 'Hạt cuối ở {pit}{relays}{drops}. {why}',
  'log.relays': ' ({n} lần rải tiếp)', 'log.drops': ', {n} hạt rơi vào Ô Quan',
  'log.capture': '{lead} {pit} · thẻ Cấp {level}.',
  'log.pass': 'Đạt: {name} thu hoạch {n} hạt ở {pit}.', 'log.passQuan': 'Đạt: {name} thu hoạch {n} hạt và 1 quân Quan ở {pit}.',
  'log.fail': 'Chưa đạt: hạt giữ nguyên ở {pit}.',
  'log.restock': 'Hàng của {name} trống: đặt lại 5 hạt ({own} từ kho mình).',
  'log.restockBorrow': 'Hàng của {name} trống: đặt lại 5 hạt ({own} từ kho mình, mượn {b} của đối thủ).',
  'log.turn': '— Lượt {n}: {name} —',
  'log.overQuan': 'Cả hai quân Quan đã được thu hoạch: ván kết thúc.', 'log.overSeeds': 'Không đủ 5 hạt để đặt lại hàng trống: ván kết thúc sớm.',
  // ô
  'pit.quan': 'Ô Quan {theme}', 'pit.dan': 'Ô {theme} ({label})',
  'pit.aria.quanHere': 'Ô Quan {theme}: còn quân Quan, {n} hạt Dân', 'pit.aria.quanGone': 'Ô Quan {theme}: quân Quan đã được thu hoạch, {n} hạt Dân',
  'pit.aria.dan': 'Ô {label} · {theme} · hàng của {owner} · {n} hạt', 'pit.aria.legal': ' · chọn được', 'pit.aria.illegal': ' · không chọn được',
  'pit.gone': 'Quan đã thu hoạch', 'pit.quanCount': 'Quan + {n} hạt', 'pit.count': '{n} hạt', 'pit.empty': 'Trống', 'pit.last': 'Hạt cuối', 'pit.harvested': 'Đã thu hoạch',
  'chip.eat': 'Ăn {n} hạt · Cấp {level}', 'chip.eatQuan': 'Ăn {n} + Quan · Cấp {level}',
  'chip.eatNext': 'Ăn tiếp {n} hạt · Cấp {level}', 'chip.eatNextQuan': 'Ăn tiếp {n} + Quan · Cấp {level}',
  // thẻ
  'card.level1': 'Nhận biết', 'card.level2': 'Ra quyết định', 'card.level3': 'Giải quyết vấn đề', 'card.levelN': 'Cấp {n} · {name}',
  'card.chain': 'Ăn liên hoàn · thẻ thứ {n}', 'card.sec': '{n} giây', 'card.noTimer': 'Không bấm giờ', 'card.timeUp': 'Hết giờ',
  'card.answerer': '{theme} · {name} trả lời', 'card.challenge': 'Thử thách', 'card.pickOne': 'Chọn một đáp án',
  'card.showAnswer': 'Xem đáp án mẫu', 'card.hideAnswer': 'Ẩn đáp án mẫu', 'card.criteria': 'Tiêu chí đánh giá:', 'card.sample': 'Đáp án mẫu:',
  'card.refNote': 'Tiêu chí tham khảo, {name} tự quyết.', 'card.judge': '{name} đánh giá câu trả lời', 'card.judgeLine': '{opp} đánh giá câu trả lời của {who}.',
  'card.pass': 'Đạt', 'card.fail': 'Chưa đạt', 'card.right': 'Chính xác!', 'card.wrong': 'Chưa đúng.', 'card.passBang': 'Đạt!', 'card.failDot': 'Chưa đạt.', 'card.timeUpDot': 'Hết giờ.',
  // luật
  'rules.title': 'Luật bản thử (PLAYTEST V1)',
  'rules.intro': 'Cấu hình thử nghiệm do Product Owner duyệt để chơi thử: rải và ăn theo luật Cơ bản truyền thống, kèm thẻ thử thách của Brainroot. Chưa phải luật chính thức của dự án.',
  'rules.r1': 'Mỗi Ô Dân có 5 hạt; hai Ô Quan mỗi ô có 1 quân Quan (10 điểm).',
  'rules.r2': 'Đến lượt: chọn một Ô Dân có hạt ở hàng của mình, chọn chiều rải.',
  'rules.r3': 'Bốc hết hạt, rải mỗi ô một hạt, <b>kể cả Ô Quan</b> (quân Quan nằm yên).',
  'rules.r4': '<b>Rải tiếp:</b> ô ngay sau hạt cuối là Ô Dân có hạt thì bốc hết ô đó, rải tiếp cùng chiều.',
  'rules.r5': '<b>Dừng:</b> ô ngay sau hạt cuối là Ô Quan còn quân hoặc còn hạt, hoặc gặp hai ô trống liên tiếp.',
  'rules.r6': '<b>Cơ hội ăn:</b> ô ngay sau hạt cuối trống và ô kế tiếp có quân (kể cả Ô Quan). Sau mỗi lần ăn, nếu lại gặp ô trống rồi ô có quân thì được ăn tiếp (ăn liên hoàn).',
  'rules.r7': 'Mỗi lần ăn mở một thẻ: Ô Dân 1–3 hạt Cấp 1; từ 4 hạt Cấp 2; Ô Quan Cấp 3. Người đang đi trả lời. Trắc nghiệm được tự chấm; câu hỏi mở thì đối thủ bấm Đạt hoặc Chưa đạt ngay trên thẻ.',
  'rules.r8': '<b>Đạt</b>: thu hoạch ô đó và xét tiếp chuỗi (có thể mở thẻ tiếp theo). <b>Chưa đạt</b>: ô giữ nguyên, hết lượt. Kết quả ghi một lần, không hoàn tác.',
  'rules.r9': 'Hàng mình trống: lấy 5 hạt từ kho mình (thiếu thì mượn đối thủ, ghi nợ). Cả hai kho không đủ 5 hạt: ván kết thúc.',
  'rules.r10': 'Ván kết thúc khi hai quân Quan đã được thu hoạch. Hạt còn trên hàng ai thì về người đó; hạt còn trong Ô Quan và Quan chưa ăn không tính cho ai.',
  'rules.r11': 'Điểm = số hạt + 10 điểm mỗi quân Quan, trừ hạt đã mượn. Bằng điểm là hòa.',
  // kết thúc
  'end.ambassador': 'Đại sứ Môi trường', 'end.titleWin': 'Đại sứ Môi trường: {name}', 'end.titleDraw': 'Hòa — cả hai là Đại sứ Môi trường',
  'end.overQuan': 'Cả hai quân Quan đã được thu hoạch.', 'end.overSeeds': 'Không còn đủ hạt để đặt lại hàng trống, ván kết thúc sớm.',
  'end.leftover': ' {n} hạt còn trong Ô Quan không tính cho ai.', 'end.thanks': 'Cảm ơn hai bạn đã cùng thu hoạch.',
  'end.jar': '{n} hạt trong kho', 'end.jarQuan': ' · {n} quân Quan', 'end.detail': 'Bảng điểm chi tiết', 'end.caption': 'Bảng điểm cuối ván', 'end.item': 'Mục',
  'end.rowStore': 'Hạt trong kho (gồm hạt còn trên hàng)', 'end.rowQuan': 'Quân Quan thu hoạch', 'end.rowDebt': 'Hạt đã mượn (trừ)', 'end.rowLent': 'Hạt cho mượn (cộng)', 'end.total': 'Tổng điểm',
  'end.lessons': 'Bài học đáng nhớ', 'end.logSummary': 'Xem nhật ký ván ({n} dòng)', 'end.replay': 'Chơi lại', 'end.newGame': 'Thiết lập ván mới',
  'page.title': 'Ô ăn quan xanh · bản chơi thử | Brainroot',
  // chủ đề
  'theme.green': 'Không gian xanh', 'theme.green.short': 'Xanh', 'theme.green.full': 'Không gian xanh',
  'theme.energy': 'Năng lượng', 'theme.energy.short': 'Năng lượng', 'theme.energy.full': 'Năng lượng',
  'theme.waste': 'Rác thải', 'theme.waste.short': 'Rác thải', 'theme.waste.full': 'Rác thải',
  'theme.water': 'Nước', 'theme.water.short': 'Nước', 'theme.water.full': 'Nước',
  'theme.consume': 'Tiêu dùng', 'theme.consume.short': 'Tiêu dùng', 'theme.consume.full': 'Tiêu dùng',
  'theme.climate': 'Biến đổi khí hậu', 'theme.climate.short': 'Khí hậu', 'theme.climate.full': 'Biến đổi khí hậu & Chuyển đổi sinh thái',
  'theme.biodiversity': 'Đa dạng sinh học', 'theme.biodiversity.short': 'Đa dạng', 'theme.biodiversity.full': 'Bảo tồn đa dạng sinh học & Rừng nguyên sinh',
} as const;

export type Key = keyof typeof VI;

const EN: Record<Key, string> = {
  'common.close': 'Close', 'common.homeLink': '← Back to home', 'common.back': 'Back',
  'common.player1': 'Player 1', 'common.player2': 'Player 2',
  'common.seeds': 'seeds', 'common.points': 'pts', 'common.seedsN': '{n} seeds',
  'chip.rules': 'Playtest rules · PLAYTEST V1',
  'deck.demo': 'DEMO cards', 'deck.internal': 'Internal cards · DEV', 'deck.full': '100-card deck',
  'deck.demoLower': 'DEMO cards', 'deck.internalLower': 'internal cards', 'deck.fullLower': '100-card deck',
  'deck.tagDemo': 'DEMO CARD', 'deck.tagInternal': 'INTERNAL CARD · DEV', 'deck.tagFull': 'CARD',
  'deck.noteDemo': 'The cards in this build are self-written DEMO cards, not the official deck.',
  'deck.noteInternal': 'The cards in this build are an internal deck for development and testing only, not published.',
  'deck.noteFull': 'Card content is Brainroot’s original Vietnamese text.',
  'deck.cardsViNote': 'Card content is shown in its original Vietnamese.',
  'devbar.long': 'PREVIEW RUNS IN DEV ONLY · PLAYTEST V1 rules · {deck} · not a release build',
  'devbar.short': 'DEV · PLAYTEST V1 · {deck} · unreleased',
  'skip': 'Skip to main content',
  'sound.on': 'Sound', 'sound.off': 'Muted',
  'sound.onLabel': 'Sound: on. Press to mute', 'sound.offLabel': 'Sound: off. Press to unmute',
  'start.eyebrow': 'BRAINROOT · GREEN PLAY · PLAYTEST', 'start.titleA': 'Green', 'start.titleB': 'Ô Ăn Quan',
  'start.lead': 'Sow seeds, capture, and show you know how to look after our resources.',
  'start.play': 'Play (2 players)', 'start.rules': 'Quick rules',
  'start.steps': 'How to play in 3 steps', 'start.step1': 'Pick a pit and a sowing direction',
  'start.step2': 'Capture and answer a green challenge card', 'start.step3': 'Harvest seeds into your conservation jar',
  'start.themes': '5 themes',
  'setup.title': 'Game setup', 'setup.players': 'Players',
  'setup.p1': 'Player 1 · bottom row (D1–D5)', 'setup.p2': 'Player 2 · top row (T1–T5)',
  'setup.nameNote': 'Names stay on this device and are not sent to a server.',
  'setup.first': 'Who goes first', 'setup.random': 'Random', 'setup.timer': 'Answer time',
  'setup.timerStd': 'Standard', 'setup.timerStdHint': 'Time printed on the card',
  'setup.timerExt': '+50%', 'setup.timerExtHint': 'Half again as long',
  'setup.timerOff': 'No timer', 'setup.timerOffHint': 'No time limit; pick the result when done',
  'setup.note': 'Two players share one device. Multiple-choice cards are graded automatically; for open questions the opponent judges on the card.',
  'setup.start': 'Start game',
  'game.brand': 'Green Ô Ăn Quan', 'game.rules': 'Rules', 'game.log': 'Log', 'game.quit': 'Leave game',
  'game.quitConfirm': 'Leave the game? The current game will not be saved.',
  'game.steps': 'Turn steps', 'game.step.pick': 'Pick pit', 'game.step.dir': 'Direction', 'game.step.sow': 'Sow', 'game.step.card': 'Card',
  'game.dirGroup': 'Sowing direction', 'game.changePit': 'Change pit', 'game.skip': 'Skip ›', 'game.speed': 'Animation speed',
  'game.logTitle': 'Game log', 'game.logEmpty': 'No moves yet.',
  'dir.left': 'Left', 'dir.right': 'Right', 'dir.up': 'Up', 'dir.down': 'Down',
  'dir.label': 'Sow {dir}',
  'plate.aria': '{name}: {points} points', 'plate.ariaTurn': '{name}: {points} points, to move',
  'plate.bottom': 'Bottom row', 'plate.top': 'Top row', 'plate.turn': ' · TO MOVE', 'plate.quan': '+ {n} Quan', 'plate.debt': 'debt {n}',
  'coach.chance': 'Capture chance!', 'coach.harvest': 'Harvest!', 'coach.keep': 'Next time!', 'coach.over': 'Game over!', 'coach.restock': 'Refill row',
  'msg.yourTurn': '{name}’s turn: pick a Dân pit with seeds on your row.',
  'msg.chosen': 'Selected {pit} ({n} seeds). Choose a direction: {dirs}.',
  'msg.dirsH': '← or →', 'msg.dirsV': '↑ or ↓',
  'msg.answer': '{lead} {pit}: {name} answers the card.',
  'msg.leadChain': 'Chain capture', 'msg.leadChance': 'Capture chance',
  'msg.leadChainBang': 'Chain capture!', 'msg.leadChanceBang': 'Capture chance!',
  'msg.noQuanPick': 'You cannot pick up from a Quan pit.', 'msg.emptyPit': 'Pit {pit} has no seeds.', 'msg.enemyPit': 'Pit {pit} belongs to your opponent.',
  'msg.pickRelay': 'Keep sowing! Picked up {n} seeds from {pit}.', 'msg.pick': '{name} picks up {n} seeds from {pit}.',
  'msg.dropQuan': 'Dropped 1 seed into {pit} · {n} left in hand.', 'msg.drop': 'Dropped 1 seed into {pit} · {n} left in hand.',
  'msg.capture': '{lead} {pit} · Level {level} card. {name} answers.',
  'msg.harvest': '{name} harvests {n} seeds!', 'msg.harvestQuan': '{name} harvests {n} seeds and the Quan piece!',
  'msg.keep': 'Not passed: the seeds stay in this pit.',
  'msg.restock': '{name}’s row is empty: 1 seed per pit ({own} from their own store).',
  'msg.restockBorrow': '{name}’s row is empty: 1 seed per pit ({own} from their own store, {b} borrowed from the opponent).',
  'msg.turn': 'It is {name}’s turn.', 'toast.turn': '{name}’s turn', 'toast.over': 'Game over!',
  'msg.overQuan': 'Both Quan pieces have been harvested: game over.', 'msg.overSeeds': 'Not enough seeds to refill the row: the game ends early.',
  'sowEnd.occupiedQuan': 'The pit after the last seed is a Quan pit that still has its piece or seeds: stop, turn over.',
  'sowEnd.twoEmpty': 'Two empty pits in a row: turn over, no capture.',
  'sowEnd.capture': 'The pit after the last seed is empty and the next one has a piece: capture chance!',
  'sowEnd.dropLimit': 'Too many laps: the turn stops at the safety limit.',
  'chainEnd.gapNotEmpty': 'The pit after the captured one is not empty: chain over.',
  'chainEnd.twoEmpty': 'Two empty pits after the captured one: chain over.',
  'log.relay': '↪ Keep sowing: picks up {n} seeds from {pit}.',
  'log.pickCw': '{name} picks up {n} seeds from {pit} and sows ↻ clockwise.', 'log.pickCcw': '{name} picks up {n} seeds from {pit} and sows ↺ counter-clockwise.',
  'log.sowEnd': 'Last seed in {pit}{relays}{drops}. {why}',
  'log.relays': ' ({n} relays)', 'log.drops': ', {n} seeds dropped into Quan pits',
  'log.capture': '{lead} {pit} · Level {level} card.',
  'log.pass': 'Passed: {name} harvests {n} seeds from {pit}.', 'log.passQuan': 'Passed: {name} harvests {n} seeds and 1 Quan piece from {pit}.',
  'log.fail': 'Not passed: the seeds stay in {pit}.',
  'log.restock': '{name}’s row is empty: refills 5 seeds ({own} from their own store).',
  'log.restockBorrow': '{name}’s row is empty: refills 5 seeds ({own} from their own store, {b} borrowed from the opponent).',
  'log.turn': '— Turn {n}: {name} —',
  'log.overQuan': 'Both Quan pieces have been harvested: game over.', 'log.overSeeds': 'Not enough seeds (5) to refill an empty row: the game ends early.',
  'pit.quan': '{theme} Quan pit', 'pit.dan': '{theme} pit ({label})',
  'pit.aria.quanHere': '{theme} Quan pit: Quan piece present, {n} Dân seeds', 'pit.aria.quanGone': '{theme} Quan pit: Quan piece harvested, {n} Dân seeds',
  'pit.aria.dan': 'Pit {label} · {theme} · {owner}’s row · {n} seeds', 'pit.aria.legal': ' · selectable', 'pit.aria.illegal': ' · not selectable',
  'pit.gone': 'Quan harvested', 'pit.quanCount': 'Quan + {n} seeds', 'pit.count': '{n} seeds', 'pit.empty': 'Empty', 'pit.last': 'Last seed', 'pit.harvested': 'Harvested',
  'chip.eat': 'Capture {n} seeds · Level {level}', 'chip.eatQuan': 'Capture {n} + Quan · Level {level}',
  'chip.eatNext': 'Capture {n} more · Level {level}', 'chip.eatNextQuan': 'Capture {n} + Quan · Level {level}',
  'card.level1': 'Recognition', 'card.level2': 'Decision-making', 'card.level3': 'Problem-solving', 'card.levelN': 'Level {n} · {name}',
  'card.chain': 'Chain capture · card {n}', 'card.sec': '{n} s', 'card.noTimer': 'No timer', 'card.timeUp': 'Time is up',
  'card.answerer': '{theme} · {name} answers', 'card.challenge': 'Challenge', 'card.pickOne': 'Choose one answer',
  'card.showAnswer': 'Show sample answer', 'card.hideAnswer': 'Hide sample answer', 'card.criteria': 'Assessment criteria:', 'card.sample': 'Sample answer:',
  'card.refNote': 'Reference only — {name} decides.', 'card.judge': '{name} judges the answer', 'card.judgeLine': '{opp} judges {who}’s answer.',
  'card.pass': 'Passed', 'card.fail': 'Not passed', 'card.right': 'Correct!', 'card.wrong': 'Not quite.', 'card.passBang': 'Passed!', 'card.failDot': 'Not passed.', 'card.timeUpDot': 'Time is up.',
  'rules.title': 'Playtest rules (PLAYTEST V1)',
  'rules.intro': 'A trial configuration approved by the Product Owner for playtesting: sow and capture under traditional Basic rules, with Brainroot challenge cards. Not yet the project’s official rules.',
  'rules.r1': 'Each Dân pit holds 5 seeds; each of the two Quan pits holds 1 Quan piece (10 points).',
  'rules.r2': 'On your turn: pick a Dân pit with seeds on your row and choose a sowing direction.',
  'rules.r3': 'Pick up all its seeds and drop one per pit, <b>Quan pits included</b> (the Quan piece stays put).',
  'rules.r4': '<b>Keep sowing:</b> if the pit right after the last seed is a Dân pit with seeds, pick them all up and keep sowing the same way.',
  'rules.r5': '<b>Stop:</b> the pit after the last seed is a Quan pit that still has its piece or seeds, or you meet two empty pits in a row.',
  'rules.r6': '<b>Capture chance:</b> the pit after the last seed is empty and the next one holds a piece (Quan pits too). After a capture, if an empty pit is followed by a pit with a piece you capture again (chain capture).',
  'rules.r7': 'Every capture opens a card: Dân pits with 1–3 seeds are Level 1; 4 or more seeds Level 2; Quan pits Level 3. The player on the move answers. Multiple-choice cards are graded automatically; for open questions the opponent taps Passed or Not passed on the card.',
  'rules.r8': '<b>Passed</b>: harvest that pit and check for a chain (another card may open). <b>Not passed</b>: the pit stays as is and the turn ends. The result is recorded once and cannot be undone.',
  'rules.r9': 'Your row is empty: take 5 seeds from your store (borrow from your opponent if short, recorded as debt). If both stores lack 5 seeds the game ends.',
  'rules.r10': 'The game ends when both Quan pieces are harvested. Seeds on a row go to its owner; seeds left in Quan pits and unharvested Quan count for nobody.',
  'rules.r11': 'Score = seeds + 10 points per Quan piece, minus borrowed seeds. Equal scores are a draw.',
  'end.ambassador': 'Environmental Ambassador', 'end.titleWin': 'Environmental Ambassador: {name}', 'end.titleDraw': 'Draw — you are both Environmental Ambassadors',
  'end.overQuan': 'Both Quan pieces have been harvested.', 'end.overSeeds': 'Not enough seeds to refill an empty row, so the game ended early.',
  'end.leftover': ' {n} seeds left in Quan pits count for nobody.', 'end.thanks': 'Thank you both for harvesting together.',
  'end.jar': '{n} seeds in jar', 'end.jarQuan': ' · {n} Quan pieces', 'end.detail': 'Score details', 'end.caption': 'Final scores', 'end.item': 'Item',
  'end.rowStore': 'Seeds in store (incl. seeds left on the row)', 'end.rowQuan': 'Quan pieces harvested', 'end.rowDebt': 'Seeds borrowed (minus)', 'end.rowLent': 'Seeds lent (plus)', 'end.total': 'Total',
  'end.lessons': 'Things to remember', 'end.logSummary': 'View game log ({n} lines)', 'end.replay': 'Play again', 'end.newGame': 'New game setup',
  'page.title': 'Green Ô Ăn Quan · playtest | Brainroot',
  'theme.green': 'Green space', 'theme.green.short': 'Green', 'theme.green.full': 'Green space',
  'theme.energy': 'Energy', 'theme.energy.short': 'Energy', 'theme.energy.full': 'Energy',
  'theme.waste': 'Waste', 'theme.waste.short': 'Waste', 'theme.waste.full': 'Waste',
  'theme.water': 'Water', 'theme.water.short': 'Water', 'theme.water.full': 'Water',
  'theme.consume': 'Consumption', 'theme.consume.short': 'Consumption', 'theme.consume.full': 'Consumption',
  'theme.climate': 'Climate change', 'theme.climate.short': 'Climate', 'theme.climate.full': 'Climate change & ecological transition',
  'theme.biodiversity': 'Biodiversity', 'theme.biodiversity.short': 'Biodiversity', 'theme.biodiversity.full': 'Biodiversity conservation & primary forest',
};

const DICT: Record<Locale, Record<Key, string>> = { vi: VI, en: EN };

export interface Tr {
  readonly locale: Locale;
  (key: Key, p?: Params): string;
  theme(theme: Theme, kind?: 'name' | 'short' | 'full'): string;
}
/** Thông điệp lưu trong state: dịch lúc hiển thị để đổi ngôn ngữ giữa ván không cần dựng lại. */
export type Lazy = (t: Tr) => string;

export function makeTr(locale: Locale): Tr {
  const dict = DICT[locale];
  const fn = ((key: Key, p?: Params) => {
    const s = dict[key] ?? VI[key] ?? key;
    return p ? s.replace(/\{(\w+)\}/g, (_, k: string) => String(p[k] ?? `{${k}}`)) : s;
  }) as { (key: Key, p?: Params): string; locale: Locale; theme: Tr['theme'] };
  fn.locale = locale;
  fn.theme = (theme, kind = 'name') => dict[(kind === 'name' ? `theme.${theme}` : `theme.${theme}.${kind}`) as Key];
  return fn as Tr;
}

export function useTr(): Tr {
  const { locale } = useI18n();
  return useMemo(() => makeTr(locale), [locale]);
}
