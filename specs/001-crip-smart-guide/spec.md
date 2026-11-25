# Feature Specification: CRIP Smart Guide - Cẩm nang Thông minh Cảng Quốc tế Cam Ranh

**Feature Branch**: `001-crip-smart-guide`

**Created**: 2026-11-24

**Status**: Draft

**Input**: User description: "Tạo bản đặc tả chi tiết cho 'CRIP Smart Guide' dành riêng cho hành khách tàu du lịch quốc tế tại Cảng Quốc tế Cam Ranh, gồm 2 giao diện tách biệt: Giao diện Hành khách (/) và Giao diện Quản trị toàn phần (/admin)."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Giám sát giờ tàu, hồi cảng khẩn cấp & danh bạ SOS (Priority: P1)

Hành khách tàu du lịch quốc tế vừa cập cảng muốn biết ngay tên tàu, vị trí cầu bến của mình, đồng hồ đếm ngược giờ tàu rời cảng (All Aboard), và có thể ngay lập tức kích hoạt thẻ hướng dẫn "Đưa tôi về Cảng Quốc tế Cam Ranh" hoặc liên hệ cứu trợ SOS khi đi lạc hoặc gặp sự cố y tế/an ninh ngoài cảng.

**Why this priority**: An toàn của du khách và tránh nguy cơ lỡ tàu (missed ship departure) là rủi ro nghiêm trọng nhất trong du lịch du thuyền quốc tế. Tính năng này mang lại giá trị cốt lõi sống còn cho du khách.

**Independent Test**: Hành khách mở ứng dụng ngay trên cầu cảng, xem đồng hồ đếm ngược All Aboard, bật nhắc nhở 60 phút, và nhấn 1 chạm vào nút "Đưa tôi về Cảng" / SOS để hiển thị thẻ hướng dẫn tài xế toàn màn hình mà không cần bất kỳ tính năng nào khác.

**Acceptance Scenarios**:

1. **Given** hành khách mở trang chủ ứng dụng, **When** quan sát phần trên cùng, **Then** hệ thống hiển thị thẻ trạng thái động gồm Tên tàu, số hiệu Cầu bến, tình hình thời tiết Cam Ranh và đồng hồ đếm ngược thời gian thực đến mốc giờ "All Aboard".
2. **Given** đồng hồ đếm ngược đang chạy, **When** người dùng nhấn nút "Nhắc tôi trước 60 phút", **Then** hệ thống lưu mốc kích hoạt và thông báo xác nhận nhắc nhở an toàn.
3. **Given** hành khách đang ở bất kỳ vị trí nào trên ứng dụng (hoặc bên ngoài thành phố), **When** bấm vào nút nổi khẩn cấp "Đưa tôi về Cảng" ở chân màn hình, **Then** một thẻ toàn màn hình khổ lớn xuất hiện với thông điệp tiếng Việt "LÀM ƠN ĐƯA TÔI VỀ CẢNG QUỐC TẾ CAM RANH", kèm địa chỉ chính xác của cổng cảng, số điện thoại trực ban an ninh cảng và tọa độ bản đồ để lái xe taxi có thể đọc rõ ràng từ khoảng cách xa.
4. **Given** hành khách gặp sự cố khẩn cấp, **When** nhấn nút SOS trên thanh Header cố định, **Then** danh bạ khẩn cấp hiển thị đầy đủ số hotline Cảnh sát/An ninh Cảng, Cấp cứu Y tế, Ban Điều hành Cảng và Đại diện Đại lý Hàng hải của hãng tàu.

---

### User Story 2 - Phân luồng di chuyển & Bản đồ tương tác Nhà ga Cảng (Priority: P1)

Hành khách sau khi rời cầu tàu bước vào nhà ga cần xác định ngay phương thức di chuyển tiếp theo: đi theo tour trọn gói của hãng tàu hay tự do khám phá độc lập; đồng thời tra cứu nhanh vị trí các quầy dịch vụ thiết yếu (đổi ngoại tệ, mua SIM 4G, nhà vệ sinh, xe trung chuyển).

**Why this priority**: Giảm tải tắc nghẽn cục bộ tại sảnh nhà ga cảng khi một tàu du lịch lớn đồng loạt đổ bộ hàng nghìn khách trong vòng 30 phút, đồng thời ngăn chặn tình trạng taxi dù và giá cước chặt chém.

**Independent Test**: Hành khách chuyển đổi giữa 2 tab "Đi theo Tour hãng tàu" và "Đi tự túc", xem sơ đồ đỗ xe bus đoàn hoặc lịch trình xe Shuttle miễn phí cùng bảng giá Taxi niêm yết chính hãng; tương tác lọc các điểm POI trên bản đồ nhà ga cảng.

**Acceptance Scenarios**:

1. **Given** hành khách lựa chọn tab "Đi theo Tour hãng tàu", **When** xem nội dung, **Then** hệ thống hiển thị vị trí bãi đỗ xe bus của các đoàn tour lữ hành, sơ đồ hướng dẫn cửa ra và số xe tương ứng của từng công ty du lịch.
2. **Given** hành khách chọn tab "Đi tự túc", **When** quan sát thông tin, **Then** hiển thị giờ chạy chi tiết của các chuyến xe trung chuyển (Shuttle Bus) miễn phí từ cầu tàu ra cổng ngoài cảng, kèm bảng giá cước Taxi niêm yết chính hãng (theo km và trọn gói đi Nha Trang / Cam Ranh) và hotline tổng đài taxi uy tín.
3. **Given** bản đồ mặt bằng nhà ga cảng hiển thị trên màn hình, **When** hành khách chọn một danh mục lọc (ATM / Đổi tiền, SIM 4G, Nhà vệ sinh - WC, Cửa hàng Miễn thuế, Phòng Y tế, Trạm Shuttle Bus), **Then** các điểm tiện ích tương ứng được làm nổi bật trên bản đồ; khi chạm vào một điểm, cửa sổ nhỏ hiển thị tên điểm, mô tả dịch vụ và chỉ dẫn lối đi ngắn nhất.

---

### User Story 3 - Lịch trình khám phá theo quỹ thời gian, Thẻ giao tiếp & Đổi tiền ngoại tuyến (Priority: P2)

Du khách tự túc muốn khám phá Cam Ranh và Nha Trang nhưng bị giới hạn nghiêm ngặt về thời gian cập cảng; đồng thời gặp rào cản bất đồng ngôn ngữ và tiền tệ khi mua sắm, gọi món hay thương lượng cước xe.

**Why this priority**: Tối ưu hóa trải nghiệm du lịch bờ, giúp du khách an tâm khám phá đúng giờ về tàu, thanh toán minh bạch và giao tiếp tự tin dù không biết tiếng Việt.

**Independent Test**: Chọn mốc thời gian 4h, 6h hoặc 8h để xem gợi ý lộ trình du lịch thực tế; mở thẻ giao tiếp tiếng Việt phát âm giọng đọc mẫu và sử dụng máy tính đổi tiền VND sang USD/CNY/KRW không cần internet.

**Acceptance Scenarios**:

1. **Given** hành khách có quỹ thời gian tự do, **When** chọn các tab "4 Giờ", "6 Giờ" hoặc "8 Giờ", **Then** hệ thống hiển thị lịch trình tour tự túc gợi ý phù hợp (ví dụ: 4h khám phá Bãi Dài Cam Ranh / Chùa Ốc Từ Vân; 6h-8h tham quan Tháp Bà Ponagar, Chợ Đầm Nha Trang), bao gồm thời gian di chuyển dự tính và mốc giờ bắt buộc phải bắt đầu quay về cảng.
2. **Given** hành khách cần giao dịch tại quán ăn hoặc tài xế, **When** mở danh mục "Thẻ giao tiếp", **Then** các thẻ chữ khổ lớn hiển thị câu tiếng Việt phổ biến ("Bao nhiêu tiền?", "Không cay", "Tôi bị dị ứng hải sản", "Làm ơn bật đồng hồ tính cước taxi", "Cho tôi hóa đơn") kèm phiên âm và nghĩa tiếng Anh/Trung/Hàn.
3. **Given** một thẻ giao tiếp đang hiển thị, **When** người dùng nhấn nút "Phát âm" (Loa), **Then** thiết bị tự động phát âm thanh chuẩn tiếng Việt của câu đó bằng công nghệ tổng hợp giọng nói trực tiếp trên trình duyệt thiết bị.
4. **Given** hành khách không có kết nối internet, **When** nhập số tiền Việt Nam Đồng (VND) hoặc ngoại tệ vào máy tính quy đổi, **Then** hệ thống tức thời tính ra số tiền quy đổi tương đương theo tỷ giá mặc định hoặc tỷ giá mới nhất đã lưu trữ cục bộ sang USD, CNY và KRW.

---

### User Story 4 - Đa ngôn ngữ tức thì, Wi-Fi 1 chạm & Khảo sát trải nghiệm (Priority: P2)

Du khách quốc tế đến từ nhiều quốc gia (Âu - Mỹ, Trung Quốc, Đài Loan, Hàn Quốc) cần sử dụng cẩm nang bằng ngôn ngữ mẹ đẻ, kết nối nhanh mạng Wi-Fi miễn phí của nhà ga cảng và gửi đánh giá đóng góp ý kiến về chất lượng phục vụ của Cảng Quốc tế Cam Ranh.

**Why this priority**: Nâng cao chỉ số hài lòng khách hàng quốc tế, xóa bỏ rào cản thông tin và tạo kênh phản hồi trực tiếp giúp ban điều hành cảng nâng cấp dịch vụ.

**Independent Test**: Nhấn chuyển đổi nhanh giữa 4 cờ/mã ngôn ngữ (VI, EN, ZH, KR) thấy toàn bộ giao diện thay đổi tức thì; nhấn nút Wi-Fi để sao chép mật khẩu vào clipboard; gửi khảo sát đánh giá với 3 tiêu chí mặt cười và nhận thông báo cảm ơn.

**Acceptance Scenarios**:

1. **Given** hành khách đang ở bất kỳ màn hình nào, **When** chọn một trong 4 ngôn ngữ (VI - Tiếng Việt, EN - English, ZH - 中文, KR - 한국어), **Then** toàn bộ nhãn giao diện, thông tin thẻ trạng thái, chỉ dẫn và danh mục tự động hiển thị bằng ngôn ngữ đã chọn trong vòng dưới 200ms mà không reload trang.
2. **Given** thông tin mạng Wi-Fi nhà ga cảng hiển thị trên giao diện, **When** du khách nhấn nút "Sao chép mật khẩu Wi-Fi", **Then** mật khẩu được sao chép vào bộ nhớ đệm (clipboard) kèm thông báo xác nhận trực quan.
3. **Given** du khách chuẩn bị rời cảng hoặc kết thúc chuyến đi bờ, **When** mở phần "Khảo sát 30 giây", **Then** người dùng có thể chọn nhanh biểu tượng mặt cười (Tuyệt vời / Hài lòng / Cần cải thiện) cho 3 tiêu chí: (1) Cơ sở vật chất nhà ga, (2) Thái độ phục vụ & hướng dẫn, (3) An ninh trật tự & xe đưa đón, kèm ô nhập phản hồi ngắn và nút gửi lưu trữ an toàn.

---

### User Story 5 - Quản trị toàn phần hệ thống qua giao diện Admin trực quan (Priority: P3)

Ban điều hành Cảng Quốc tế Cam Ranh và đội ngũ quản lý ca trực cập cảng cần giao diện quản trị trực quan tại `/admin` để cập nhật thông tin chuyến tàu thực tế trong ngày, điều chỉnh bảng giá taxi, biên tập điểm tiện ích bản đồ, sửa đổi tỷ giá, xem phản hồi của hành khách và sao lưu/khôi phục dữ liệu mà không cần can thiệp vào mã nguồn.

**Why this priority**: Đảm bảo nguyên tắc 100% CMS-Driven của Hiến pháp dự án: mọi thông tin đều sống động, thích ứng với từng chuyến tàu cập cảng mỗi ngày mà nhân viên vận hành cảng có thể tự thao tác dễ dàng.

**Independent Test**: Nhân viên quản trị truy cập `/admin`, chuyển đổi qua 8 tab chức năng, chỉnh sửa tên tàu và giờ All Aboard ở Tab 1, sau đó mở trang khách `/` để thấy thông tin cập nhật tức thì; thực hiện xuất và nhập file cấu hình JSON sao lưu thành công.

**Acceptance Scenarios**:

1. **Given** người quản trị vào `/admin` tại Tab 1 (Thông tin tàu & Thông báo), **When** cập nhật Tên tàu, Cầu bến, Giờ All Aboard, Tên/Pass Wi-Fi hoặc kích hoạt biểu ngữ "Thông báo khẩn", **Then** dữ liệu được lưu vào kho lưu trữ trung tâm và hiển thị ngay trên giao diện khách.
2. **Given** quản trị viên tại Tab 2 (Luồng di chuyển & Bảng giá Taxi), **When** thêm/sửa/xóa các hãng taxi, giá mở cửa, giá theo km, cước trọn gói hoặc giờ chạy xe shuttle, **Then** bảng tra cứu cước trên giao diện khách phản ánh chính xác.
3. **Given** quản trị viên tại Tab 3 (Bản đồ & Tiện ích POI), **When** nhấp chuột trực tiếp lên vị trí mong muốn trên ảnh sơ đồ mặt bằng nhà ga cảng, **Then** hệ thống tự động ghi nhận tọa độ phần trăm X% và Y%, cho phép chọn loại icon, nhập tên và mô tả bằng 4 thứ tiếng rồi lưu lại.
4. **Given** quản trị viên tại Tab 4 & Tab 5 & Tab 6, **When** cập nhật các chặng lịch trình 4h/6h/8h, các cụm từ giao tiếp, tỷ giá hối đoái ngoại tệ, danh bạ đường dây nóng SOS hoặc thông tin trên thẻ "Đưa tôi về Cảng", **Then** các thay đổi có hiệu lực ngay lập tức.
5. **Given** quản trị viên tại Tab 7 (Từ điển đa ngôn ngữ), **When** biên tập hoặc bổ sung bản dịch cho các khóa ngôn ngữ (key-value dictionary) của 4 ngôn ngữ VI/EN/ZH/KR, **Then** các chuỗi văn bản trên ứng dụng được cập nhật đồng bộ.
6. **Given** quản trị viên tại Tab 8 (Phản hồi & Dữ liệu), **When** truy cập, **Then** hiển thị danh sách các lượt đánh giá khảo sát của khách hàng; đồng thời cung cấp nút "Xuất file cấu hình JSON" để sao lưu máy tính, "Nhập file JSON" để phục hồi dữ liệu, và "Khôi phục mặc định ban đầu" khi muốn thiết lập lại dữ liệu gốc của cảng.

---

### Edge Cases

- **Khi thiết bị du khách mất hoàn toàn kết nối mạng**: Ứng dụng PWA vẫn khởi động bình thường từ bộ nhớ đệm ngoại tuyến; toàn bộ dữ liệu cẩm nang, bản đồ sơ đồ cảng, thẻ tiếng Việt và máy tính đổi tiền tiếp tục hoạt động đầy đủ.
- **Khi giờ All Aboard đã trôi qua (quá giờ)**: Đồng hồ đếm ngược chuyển sang cảnh báo đỏ nổi bật với thông điệp khẩn cấp: "Giờ All Aboard đã kết thúc! Vui lòng liên hệ ngay với Trực ban An ninh Cảng qua nút SOS hoặc quầy điều hành cảng".
- **Khi trình duyệt của du khách không hỗ trợ Web Speech API cho tiếng Việt**: Nút phát âm âm thanh tự động ẩn hoặc hiển thị thông báo nhẹ "Trình duyệt không hỗ trợ đọc âm thanh tự động", nhưng văn bản tiếng Việt khổ lớn vẫn hiển thị sắc nét để đưa cho người bản xứ đọc.
- **Khi người quản trị nhập file JSON sao lưu bị lỗi cấu trúc hoặc sai định dạng**: Hệ thống từ chối áp dụng, giữ nguyên dữ liệu hiện hành và hiển thị cảnh báo lỗi chi tiết mà không gây sập ứng dụng.
- **Khi du khách nhập số tiền âm hoặc ký tự chữ vào máy tính đổi tiền**: Bộ tính toán tự động chặn hoặc đưa về giá trị 0 hợp lệ, đảm bảo không sinh lỗi số liệu.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Hệ thống PHẢI cung cấp giao diện Hành khách tại đường dẫn gốc (`/`) với bố cục Mobile-First, tối ưu hóa cho màn hình cảm ứng di động và co giãn thích ứng với màn hình máy tính bảng/máy tính để bàn.
- **FR-002**: Thanh Header PHẢI được cố định (sticky) trên cùng, chứa Logo Cảng Quốc tế Cam Ranh, cụm nút chuyển đổi tức thì 4 ngôn ngữ (VI, EN, ZH, KR) và nút truy cập nhanh chế độ khẩn cấp SOS.
- **FR-003**: Hệ thống PHẢI hiển thị Thẻ trạng thái chuyến tàu động, liên tục tính toán và hiển thị đồng hồ đếm ngược (giờ, phút, giây) đến thời điểm "All Aboard" do ban quản trị thiết lập, kèm tính năng đăng ký thông báo nhắc nhở trước 60 phút.
- **FR-004**: Hệ thống PHẢI cung cấp phân luồng di chuyển thông minh gồm 2 tab độc lập: Tab "Đi theo Tour hãng tàu" (hướng dẫn vị trí tập kết và xe bus đoàn) và Tab "Đi tự túc" (lịch trình xe Shuttle miễn phí và bảng niêm yết cước taxi chính hãng).
- **FR-005**: Hệ thống PHẢI tích hợp Bản đồ nhà ga cảng có khả năng phóng to/thu nhỏ tương tác, hiển thị các điểm tiện ích POI (ATM/Đổi tiền, SIM 4G, WC, Cửa hàng Miễn thuế, Y tế, Shuttle Bus) theo bộ lọc danh mục và hỗ trợ mở hộp thông tin chỉ đường chi tiết khi chạm vào điểm POI.
- **FR-006**: Hệ thống PHẢI cung cấp danh mục Lịch trình tham quan tự do phân loại theo 3 mốc thời gian: 4 Giờ, 6 Giờ, và 8 Giờ với các điểm dừng chân tiêu biểu tại Cam Ranh và Nha Trang kèm cảnh báo thời gian bắt buộc quay về cảng.
- **FR-007**: Hệ thống PHẢI cung cấp bộ Thẻ giao tiếp tiếng Việt khổ lớn kèm phiên âm và hỗ trợ tính năng phát âm giọng nói tiếng Việt mẫu sử dụng Web Speech API trực tiếp trên thiết bị của du khách.
- **FR-008**: Hệ thống PHẢI cung cấp Máy tính chuyển đổi tỷ giá ngoại tệ hai chiều giữa VND và 3 đồng tiền (USD, CNY, KRW) hoạt động hoàn toàn ngoại tuyến không phụ thuộc API bên thứ ba.
- **FR-009**: Hệ thống PHẢI hỗ trợ tính năng 1 chạm để sao chép thông tin/mật khẩu mạng Wi-Fi miễn phí của nhà ga cảng vào clipboard của thiết bị.
- **FR-010**: Hệ thống PHẢI tích hợp biểu mẫu Khảo sát chất lượng dịch vụ 30 giây với đánh giá trực quan qua biểu tượng cảm xúc cho 3 tiêu chí và lưu trữ cục bộ các phản hồi nhận được.
- **FR-011**: Hệ thống PHẢI duy trì một thanh điều hướng nổi cố định ở chân màn hình (Persistent Bottom Bar), chứa nút kích hoạt nhanh Thẻ "Đưa tôi về Cảng" toàn màn hình và Danh bạ liên hệ SOS khẩn cấp.
- **FR-012**: Hệ thống PHẢI cung cấp giao diện Quản trị toàn phần tại đường dẫn `/admin` cho phép Ban quản lý cập nhật 100% dữ liệu hiển thị của ứng dụng mà không cần thay đổi mã nguồn.
- **FR-013**: Giao diện Quản trị PHẢI được tổ chức trực quan thành 8 tab chức năng riêng biệt:
  - Tab 1: Thông tin chuyến tàu, giờ All Aboard, cấu hình Wi-Fi và Thông báo khẩn cấp.
  - Tab 2: Luồng di chuyển hành khách & Bảng giá cước Taxi niêm yết.
  - Tab 3: Sơ đồ mặt bằng Nhà ga & Quản lý điểm tiện ích POI với tính năng chấm tọa độ trực tiếp X%, Y% bằng thao tác nhấp chuột trên hình ảnh bản đồ.
  - Tab 4: Quản lý lịch trình khám phá 4h, 6h, 8h.
  - Tab 5: Quản lý Thẻ giao tiếp bản địa & Tỷ giá tiền tệ quy đổi.
  - Tab 6: Quản lý Danh bạ liên lạc cứu hộ SOS & Nội dung thẻ khổ lớn "Đưa tôi về Cảng".
  - Tab 7: Quản lý Từ điển chuỗi đa ngôn ngữ cho 4 ngôn ngữ (VI, EN, ZH, KR).
  - Tab 8: Xem danh sách phản hồi khảo sát của du khách, sao lưu dữ liệu bằng cách xuất file JSON, nạp khôi phục từ file JSON và nút khôi phục về cấu hình mẫu mặc định.
- **FR-014**: Mọi hoạt động đọc và ghi dữ liệu PHẢI thông qua lớp trừu tượng lưu trữ trung tâm (`src/data/defaultConfig.js` và `src/utils/storage.js` với LocalStorage), bảo đảm toàn bộ nội dung được lưu giữ bền vững trên thiết bị và có cấu trúc tương thích để nâng cấp lên cơ sở dữ liệu từ xa khi cần.
- **FR-015**: Giao diện PHẢI tuân thủ bộ màu nhận diện thương hiệu quy định trong Hiến pháp: Xanh Hải Quân (`#0A2540`), Xanh Ngọc Cam Ranh (`#00A896`), Nền sáng chống chói (`#F8FAFC`), Đỏ Cam Khẩn cấp (`#E63946`) và phông chữ nội dung tối thiểu 16px.

---

### Key Entities *(include if feature involves data)*

- **ShipStatus**: Thực thể lưu trữ trạng thái chuyến tàu trong ngày (Tên tàu, Số hiệu Cầu bến, Thời tiết hiện tại, Thời điểm cập cảng, Thời điểm All Aboard, Thời điểm tàu rời cảng, Trạng thái cảnh báo khẩn cấp).
- **TerminalPOI**: Điểm tiện ích trên sơ đồ nhà ga (ID, Danh mục phân loại: ATM/SIM/WC/DutyFree/Medical/Bus, Tọa độ X%, Tọa độ Y%, Tên điểm và Mô tả chi tiết bằng 4 ngôn ngữ, Hướng dẫn tiếp cận).
- **TravelLogistics**: Cấu hình phân luồng (Thông tin bãi đỗ xe bus tour hãng tàu; Lịch trình xe Shuttle miễn phí; Danh sách các hãng taxi được cấp phép, bảng giá theo km và giá trọn gói Nha Trang/Cam Ranh).
- **TourItinerary**: Lịch trình khám phá theo thời lượng (Mốc thời gian: 4h/6h/8h, Danh sách các điểm tham quan, Thời gian di chuyển dự kiến, Hoạt động trải nghiệm, Giờ giới hạn bắt buộc quay về cảng, Ghi chú an toàn).
- **PhraseCard**: Thẻ giao tiếp bản địa (Danh mục: Di chuyển/Mua sắm/Ăn uống/Khẩn cấp, Câu tiếng Việt, Phiên âm quốc tế, Bản dịch tiếng Anh/Trung/Hàn, Dữ liệu phát âm giọng nói).
- **CurrencyRate**: Tỷ giá quy đổi (Mã ngoại tệ: USD, CNY, KRW, Tỷ giá tương ứng với VND, Thời điểm cập nhật).
- **CustomerFeedback**: Dữ liệu phản hồi du khách (ID, Thời gian gửi, Điểm đánh giá cơ sở vật chất, Điểm đánh giá phục vụ, Điểm đánh giá an ninh/di chuyển, Nội dung góp ý văn bản, Quốc tịch/Ngôn ngữ sử dụng).
- **AppDictionary**: Bộ từ điển nhãn giao diện đa ngôn ngữ (Key văn bản, Bản dịch tương ứng cho 4 ngôn ngữ: VI, EN, ZH, KR).

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Hành khách có thể kích hoạt thẻ hiển thị "Đưa tôi về Cảng Quốc tế Cam Ranh" hoặc số gọi SOS từ bất kỳ vị trí nào trên ứng dụng trong vòng tối đa **1 lần chạm** và dưới **1 giây**.
- **SC-002**: Việc chuyển đổi giữa 4 ngôn ngữ (VI, EN, ZH, KR) hoàn thành trong vòng dưới **200 mili-giây** trên thiết bị di động mà không tải lại trang hay gián đoạn trạng thái ứng dụng.
- **SC-003**: 100% các chức năng cốt lõi (xem thông tin tàu, đồng hồ đếm ngược, phân luồng taxi, sơ đồ nhà ga, lịch trình tour, thẻ phát âm tiếng Việt và đổi ngoại tệ) hoạt động trơn tru khi thiết bị ở chế độ máy bay hoặc mất hoàn toàn kết nối Internet.
- **SC-004**: Thời gian hoàn thành biểu mẫu khảo sát chất lượng dịch vụ của du khách không vượt quá **30 giây** đối với người dùng lần đầu.
- **SC-005**: Người quản trị tại `/admin` có thể hoàn thành việc cập nhật thông tin chuyến tàu mới (Tên tàu, Cầu bến, Giờ All Aboard) trong vòng dưới **60 giây**.
- **SC-006**: Thao tác chấm tọa độ điểm tiện ích POI trên bản đồ nhà ga tại `/admin` hoàn tất trong vòng **1 click chuột** trực tiếp lên vị trí ảnh bản đồ với độ chính xác tọa độ X%, Y% hiển thị trực quan.
- **SC-007**: 100% dữ liệu cẩm nang có thể được xuất ra file JSON sao lưu và khôi phục nguyên vẹn trên bất kỳ trình duyệt nào mà không xảy ra sai lệch dữ liệu.

---

## Assumptions

- **Môi trường thiết bị hành khách**: Đa số du khách sử dụng điện thoại thông minh hiện đại (iOS Safari hoặc Android Chrome) có hỗ trợ LocalStorage và Web Speech API (tổng hợp giọng nói); nếu Web Speech API không khả dụng trên một số dòng máy cũ, hệ thống vẫn hiển thị thẻ văn bản rõ nét cho tài xế/người bản xứ đọc.
- **Quyền truy cập Admin**: Giao diện `/admin` được bảo vệ bằng **Mã PIN quản trị** (lưu dạng băm SHA-256 có salt trong `adminAuth` đồng bộ Supabase Cloud, phiên đăng nhập 8 giờ trong `LocalStorage`, nút Khóa nhanh, tạm khóa 30 giây sau 5 lần nhập sai liên tiếp, và cho phép đổi mã PIN 4–8 chữ số trong Tab 8). Cấu trúc xác thực được tách riêng tại `src/utils/adminAuth.js` và `src/components/admin/AdminPinGate.jsx`.
- **Độ chính xác giờ All Aboard**: Giờ All Aboard do nhân viên quản trị cảng thiết lập theo thông báo chính thức từ thuyền trưởng hoặc đại lý hàng hải của từng chuyến tàu cụ thể.
- **Tính khả chuyển của hình ảnh bản đồ**: Bản đồ nhà ga sử dụng sơ đồ đồ họa định dạng SVG/PNG được lưu trữ cục bộ trong thư mục tài nguyên ứng dụng, đảm bảo hiển thị sắc nét ở mọi độ phân giải màn hình mà không cần nạp từ dịch vụ bản đồ trực tuyến bên ngoài.
