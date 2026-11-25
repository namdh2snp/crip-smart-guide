# Data Model & Schema Specification: CRIP Smart Guide

**Feature**: `specs/001-crip-smart-guide`
**Created**: 2026-11-24

Tài liệu này định nghĩa cấu trúc dữ liệu toàn diện của `defaultConfig.js` và đối tượng cấu hình đồng bộ qua **Supabase Cloud (`public.app_config`, `id = 1`, cột `data`)** kèm cache `LocalStorage` (khóa lưu trữ: `CRIP_CONFIG_V1`).

## 1. Cấu trúc Tổng thể Cấu hình (Root Config Object)

```javascript
{
  adminAuth: { ... },         // Bảo mật mã PIN /admin (pinHash SHA-256, pinLength, updatedAt)
  ship: { ... },              // Thông tin chuyến tàu & All Aboard
  emergencyAlert: { ... },    // Biểu ngữ cảnh báo khẩn cấp (nếu có)
  wifi: { ... },              // Cấu hình Wi-Fi nhà ga cảng
  logistics: { ... },         // Phân luồng Tour xe buýt & Shuttle
  taxiFares: [ ... ],         // Bảng giá taxi niêm yết
  mapPois: [ ... ],           // Danh sách điểm tiện ích bản đồ nhà ga
  itineraries: [ ... ],       // Lịch trình khám phá 4h, 6h, 8h
  phraseCards: [ ... ],       // Thẻ giao tiếp tiếng Việt khổ lớn
  currencyRates: { ... },     // Tỷ giá quy đổi ngoại tệ
  emergencyContacts: [ ... ], // Danh bạ SOS
  returnPortCard: { ... },    // Thẻ khổ lớn "Đưa tôi về Cảng"
  safetyReports: [ ... ],     // Báo cáo an toàn hiện trường (Ảnh + GPS) đồng bộ Realtime
  feedbacks: [ ... ],         // Khảo sát trải nghiệm hành khách đồng bộ Realtime
  dictionary: { ... }         // Từ điển nhãn giao diện (VI, EN, ZH, KR)
}
```

---

## 2. Chi tiết Từng Thực thể Dữ liệu

### 2.1 Thông tin Tàu & Cảnh báo (`ship` & `emergencyAlert`)
```javascript
ship: {
  name: "Spectrum of the Seas",
  berth: "Cầu Bến 01 - Cảng Quốc tế Cam Ranh",
  weather: {
    temp: "29°C",
    condition: "Nắng nhẹ, gió biển mát",
    icon: "Sun" // Lucide icon
  },
  arrivalDate: "2026-11-24",
  arrivalTime: "07:00",
  allAboardTime: "17:30", // Mốc giờ bắt buộc du khách phải có mặt trên tàu
  departureTime: "18:00"
},
emergencyAlert: {
  enabled: false,
  message: {
    vi: "Tất cả hành khách lưu ý: Xe Shuttle chuyến cuối cùng về cảng lúc 16:30.",
    en: "Important notice: The final shuttle bus back to port departs at 16:30.",
    zh: "重要通知：返回港口的末班穿梭巴士将于 16:30 发车。",
    kr: "중요 안내: 항구로 돌아가는 마지막 셔틀버스는 16:30에 출발합니다."
  }
},
wifi: {
  ssid: "CRIP_FREE_WIFI",
  password: "WelcomeToCamRanh"
}
```

### 2.2 Phân luồng Di chuyển & Bảng giá Taxi (`logistics` & `taxiFares`)
```javascript
logistics: {
  tourBusArea: {
    title: {
      vi: "Khu vực Xe Buýt Đoàn Du lịch (Ship Excursion)",
      en: "Ship Excursion Tour Bus Zone",
      zh: "邮轮岸上游大巴集结区",
      kr: "기항지 관광 투어 버스 구역"
    },
    description: {
      vi: "Vui lòng di chuyển theo lối đi có mái che đến Bãi đỗ xe số 1 & số 2. Tìm xe theo số hiệu ghi trên vé tour của bạn.",
      en: "Follow the covered walkway to Bus Parking Area 1 & 2. Find your bus by the group number on your tour ticket.",
      zh: "请沿有遮阳棚的步道前往1号及2号大巴停车场。请根据游轮团票上的编号寻找车辆。",
      kr: "지붕이 있는 보도를 따라 1, 2번 버스 주차장으로 이동하세요. 투어 티켓의 번호로 버스를 확인하세요."
    }
  },
  shuttleBus: {
    title: {
      vi: "Xe Trung chuyển Miễn phí (Free Port Shuttle)",
      en: "Complimentary Port Shuttle Bus",
      zh: "港口免费穿梭巴士",
      kr: "항구 무료 셔틀버스"
    },
    intervalMinutes: 15,
    operatingHours: "07:30 - 16:30",
    route: {
      vi: "Cầu tàu → Nhà ga hành khách → Cổng kiểm soát số 2",
      en: "Cruise Berth → Passenger Terminal → Security Gate 2",
      zh: "游轮码头 → 旅客航站楼 → 2号安检门",
      kr: "크루즈 선석 → 여객 터미널 → 제2검문소"
    }
  }
},
taxiFares: [
  {
    id: "mai-linh",
    company: "Taxi Mai Linh (Màu xanh lá)",
    hotline: "1055",
    openPrice: "11,000 VND",
    pricePerKm: "15,000 VND/km",
    fixedNhaTrang: "450,000 VND / chuyến (~45km)",
    fixedCamRanhCity: "250,000 VND / chuyến (~20km)",
    note: {
      vi: "Đã bao gồm phí qua cổng cảng. Yêu cầu bật đồng hồ tính cước.",
      en: "Port entry fee included. Please ensure meter is running.",
      zh: "包含港口通行费。请要求司机打表计费。",
      kr: "항만 진입료 포함. 미터기 작동을 요청하세요."
    }
  },
  {
    id: "quoc-te",
    company: "Taxi Quốc Tế Cam Ranh",
    hotline: "0258 3 52 52 52",
    openPrice: "10,000 VND",
    pricePerKm: "14,500 VND/km",
    fixedNhaTrang: "420,000 VND / chuyến (~45km)",
    fixedCamRanhCity: "230,000 VND / chuyến (~20km)",
    note: {
      vi: "Tài xế có thể giao tiếp tiếng Anh cơ bản.",
      en: "Drivers can communicate in basic English.",
      zh: "司机具备基础英语沟通能力。",
      kr: "기사가 기본 영어를 구사합니다."
    }
  }
]
```

### 2.3 Sơ đồ Nhà ga & Điểm Tiện ích POI (`mapPois`)
```javascript
mapPois: [
  {
    id: "poi-1",
    category: "currency", // currency, sim, wc, dutyfree, medical, shuttle
    icon: "BadgeDollarSign",
    x: 28, // Tọa độ X% trên sơ đồ
    y: 42, // Tọa độ Y% trên sơ đồ
    name: {
      vi: "Quầy Đổi Ngoại tệ & ATM",
      en: "Currency Exchange & ATM",
      zh: "货币兑换与自动取款机",
      kr: "환전소 및 ATM"
    },
    description: {
      vi: "Nhận đổi USD, EUR, CNY, KRW sang VND. Chấp nhận thẻ Visa/Mastercard.",
      en: "Exchange USD, EUR, CNY, KRW to VND. Visa & Mastercard accepted.",
      zh: "支持美元、欧元、人民币、韩元兑换越南盾。接受维萨及万事达卡。",
      kr: "USD, EUR, CNY, KRW를 VND로 환전. 비자/마스터카드 이용 가능."
    }
  },
  {
    id: "poi-2",
    category: "sim",
    icon: "Smartphone",
    x: 35,
    y: 42,
    name: {
      vi: "Quầy SIM 4G & Dịch vụ Viễn thông",
      en: "4G SIM & Tourist Data Counter",
      zh: "4G流量卡与通信服务柜台",
      kr: "4G 관광용 SIM 카드 카운터"
    },
    description: {
      vi: "Gói cước du lịch Viettel / Vinaphone tốc độ cao trong 1 ngày hoặc 7 ngày.",
      en: "High-speed tourist data packages for Viettel & Vinaphone networks.",
      zh: "Viettel与Vinaphone高速旅游流量套餐（1天/7天）。",
      kr: "Viettel 및 Vinaphone 1일/7일 고속 관광용 데이터 패키지."
    }
  },
  {
    id: "poi-3",
    category: "medical",
    icon: "HeartPulse",
    x: 62,
    y: 30,
    name: {
      vi: "Phòng Sơ cấp cứu Y tế Cảng",
      en: "Port Medical & First Aid Station",
      zh: "港口急救与医疗站",
      kr: "항구 응급 의료실"
    },
    description: {
      vi: "Bác sĩ trực 24/7, thuốc chống say sóng, băng bó và sơ cấp cứu miễn phí.",
      en: "On-duty doctors 24/7, seasickness medicine, first-aid assistance.",
      zh: "24小时医生值班，备有晕船药、包扎及免费急救服务。",
      kr: "24시간 의사 상주, 멀미약, 붕대 처치 및 무료 응급 지원."
    }
  },
  {
    id: "poi-4",
    category: "wc",
    icon: "Sparkles",
    x: 75,
    y: 55,
    name: {
      vi: "Khu Vệ sinh Trung tâm (WC)",
      en: "Restrooms (WC)",
      zh: "中央卫生间 (WC)",
      kr: "중앙 화장실 (WC)"
    },
    description: {
      vi: "Sạch sẽ, có nhà vệ sinh riêng cho người khuyết tật và phòng thay đồ em bé.",
      en: "Clean facilities with accessible cabin and baby-care room.",
      zh: "设施洁净，配备无障碍洗手间及母婴护理台。",
      kr: "장애인용 화장실 및 유아 휴게실 구비."
    }
  },
  {
    id: "poi-5",
    category: "shuttle",
    icon: "Bus",
    x: 18,
    y: 78,
    name: {
      vi: "Điểm đón Xe Shuttle Bus ra Cổng",
      en: "Shuttle Bus Pick-up Station",
      zh: "免费穿梭巴士上客点",
      kr: "셔틀버스 탑승장"
    },
    description: {
      vi: "Xe chạy liên tục mỗi 15 phút đưa khách ra cổng kiểm soát để đón taxi.",
      en: "Departs every 15 mins to outer gate for taxi connection.",
      zh: "每15分钟一班，接驳旅客至港口外门打车。",
      kr: "15분 간격 운행, 택시 탑승이 가능한 외부 정문까지 이동."
    }
  }
]
```

### 2.4 Lịch trình Khám phá (`itineraries`)
```javascript
itineraries: [
  {
    id: "itinerary-4h",
    duration: "4h",
    title: {
      vi: "4 Giờ: Thư giãn Biển Bãi Dài & Chùa Từ Vân (Cam Ranh)",
      en: "4 Hours: Bai Dai Beach & Tu Van Seashell Pagoda (Cam Ranh)",
      zh: "4小时：白戴海滩休闲与慈云螺塔寺（金兰）",
      kr: "4시간: 바이 다이 비치 휴양 & 뜨반 조개 사원 (깜라인)"
    },
    safeReturnNotice: {
      vi: "Nên bắt đầu quay lại cảng trước 15:30.",
      en: "Must start heading back to port before 15:30.",
      zh: "建议在 15:30 之前启程返回港口。",
      kr: "15:30 이전에는 항구로 복귀를 시작해야 합니다."
    },
    stops: [
      {
        name: {
          vi: "Bãi Dài Cam Ranh",
          en: "Bai Dai Beach Cam Ranh",
          zh: "金兰白戴海滩",
          kr: "깜라인 바이 다이 해변"
        },
        time: "1.5h",
        desc: {
          vi: "Bãi biển hoang sơ, cát trắng mịn, thưởng thức nước dừa tươi.",
          en: "Pristine white sand beach, relax with fresh coconut water.",
          zh: "原始纯净的白沙滩，享用新鲜椰子水。",
          kr: "깨끗한 백사장과 신선한 코코넛 주스."
        }
      },
      {
        name: {
          vi: "Chùa Từ Vân (Chùa Ốc)",
          en: "Tu Van Pagoda (Seashell Pagoda)",
          zh: "慈云寺（海螺宝塔）",
          kr: "뜨반 사원 (조개껍질 탑)"
        },
        time: "1h",
        desc: {
          vi: "Tháp Bảo Tích và đường hầm 18 tầng địa ngục xây hoàn toàn từ vỏ ốc, san hô.",
          en: "Unique Bao Tich tower built entirely of seashells and coral.",
          zh: "由贝壳和珊瑚精心筑造的独一无二的宝积塔。",
          kr: "조개껍질과 산호로만 지어진 독특한 사찰 탑."
        }
      }
    ]
  },
  {
    id: "itinerary-6h",
    duration: "6h",
    title: {
      vi: "6 Giờ: Tinh hoa Văn hóa Nha Trang (Tháp Bà Ponagar & Chợ Đầm)",
      en: "6 Hours: Nha Trang Cultural Highlights (Ponagar Tower & Dam Market)",
      zh: "6小时：芽庄文化精萃（占婆塔与婆那加市场）",
      kr: "6시간: 냐짱 문화 탐방 (포나가르 사원 & 담 시장)"
    },
    safeReturnNotice: {
      vi: "Nên rời trung tâm Nha Trang trước 15:00 để tránh kẹt xe.",
      en: "Depart downtown Nha Trang by 15:00 to avoid traffic.",
      zh: "请于 15:00 前离开芽庄市区以避开拥堵。",
      kr: "교통 체증을 피하기 위해 15:00 전에 냐짱 시내를 출발하세요."
    },
    stops: [
      {
        name: {
          vi: "Tháp Bà Ponagar Nha Trang",
          en: "Ponagar Cham Towers",
          zh: "婆那加占婆塔",
          kr: "포나가르 참탑"
        },
        time: "1.5h",
        desc: {
          vi: "Quần thể kiến trúc Champa cổ kính nhìn ra cửa sông Cái.",
          en: "Ancient Champa architecture overlooking Cai River estuary.",
          zh: "俯瞰丐河入海口的古老占婆建筑群落。",
          kr: "까이강 하구를 내려다보는 고대 참파 유적지."
        }
      },
      {
        name: {
          vi: "Chợ Đầm Nha Trang & Thưởng thức Nem nướng",
          en: "Dam Market & Grilled Pork Rolls",
          zh: "达姆市场与芽庄烤肉卷品尝",
          kr: "담 시장 쇼핑 & 냐짱식 넴느엉 맛보기"
        },
        time: "1.5h",
        desc: {
          vi: "Mua sắm quà lưu niệm thủ công, đặc sản trầm hương và nếm thử nem nướng.",
          en: "Shop local handicrafts, agarwood souvenirs and taste local food.",
          zh: "采购手工艺纪念品、沉香特产并品尝当地美食。",
          kr: "수공예 기념품 및 침향 쇼핑, 현지 음식 체험."
        }
      }
    ]
  },
  {
    id: "itinerary-8h",
    duration: "8h",
    title: {
      vi: "8 Giờ: Trọn vẹn Vịnh Nha Trang & Tắm bùn Khoáng Nóng I-Resort",
      en: "8 Hours: Full Nha Trang Experience & I-Resort Mineral Mud Bath",
      zh: "8小时：畅游芽庄湾与 I-Resort 矿物泥浆浴",
      kr: "8시간: 냐짱 완전 정복 & I-Resort 미네랄 머드 온천"
    },
    safeReturnNotice: {
      vi: "Khoảng cách Cam Ranh - Nha Trang là 50km. Bắt buộc lên xe về cảng trước 14:30.",
      en: "Distance is 50km. Strictly required to board taxi back by 14:30.",
      zh: "距离金兰约50公里。务必在 14:30 前乘车返程。",
      kr: "깜라인까지 약 50km. 반드시 14:30까지 복귀 차량에 탑승하세요."
    },
    stops: [
      {
        name: {
          vi: "Suối khoáng nóng I-Resort Nha Trang",
          en: "I-Resort Mineral Hot Spring & Mud Bath",
          zh: "I-Resort 矿泥温泉水疗",
          kr: "I-Resort 온천 및 머드 스파"
        },
        time: "2.5h",
        desc: {
          vi: "Ngâm bùn khoáng thiên nhiên giải độc và thư giãn sau hành trình lênh đênh trên biển.",
          en: "Natural mineral mud bath to rejuvenate after days at sea.",
          zh: "在海上航行后享受天然矿物泥浴，舒缓身心。",
          kr: "바다 항해 후 천연 미네랄 머드탕에서 즐기는 힐링."
        }
      },
      {
        name: {
          vi: "Chùa Long Sơn & Tượng Phật Trắng",
          en: "Long Son Pagoda & Giant White Buddha",
          zh: "隆山寺与大白佛像",
          kr: "롱선사 및 거대 백불상"
        },
        time: "1h",
        desc: {
          vi: "Chiêm bái tượng Phật Kim Thân Phật Tổ ngắm toàn cảnh thành phố biển.",
          en: "Panoramic view of Nha Trang from the white Buddha sanctuary.",
          zh: "在白佛净地鸟瞰芽庄海滨城市全景。",
          kr: "거대 백불상이 있는 곳에서 내려다보는 냐짱 전경."
        }
      }
    ]
  }
]
```

### 2.5 Thẻ Giao tiếp Khổ lớn & Phát âm Tiếng Việt (`phraseCards`)
Bao gồm 6 câu giao tiếp thực chiến cốt lõi:
```javascript
phraseCards: [
  {
    id: "p1",
    vietnamese: "LÀM ƠN ĐƯA TÔI VỀ CẢNG QUỐC TẾ CAM RANH",
    phonetic: "Lam un dua toy veh Cang Quoc Teh Cam Ranh",
    meaning: {
      en: "Please take me back to Cam Ranh International Port",
      zh: "请带我回金兰国际港",
      kr: "깜라인 국제 항구로 데려다주세요"
    },
    speechText: "Làm ơn đưa tôi về Cảng Quốc tế Cam Ranh",
    category: "urgent"
  },
  {
    id: "p2",
    vietnamese: "BAO NHIÊU TIỀN?",
    phonetic: "Bow nyew tyen?",
    meaning: {
      en: "How much is this?",
      zh: "这个多少钱？",
      kr: "얼마인가요?"
    },
    speechText: "Bao nhiêu tiền?",
    category: "shopping"
  },
  {
    id: "p3",
    vietnamese: "LÀM ƠN BẬT ĐỒNG HỒ TAXI",
    phonetic: "Lam un but dong ho taxi",
    meaning: {
      en: "Please turn on the taxi meter",
      zh: "请打表（打表计价）",
      kr: "택시 미터기를 켜주세요"
    },
    speechText: "Làm ơn bật đồng hồ taxi",
    category: "transport"
  },
  {
    id: "p4",
    vietnamese: "TÔI KHÔNG ĂN CAY ĐƯỢC",
    phonetic: "Toy khom an cay duoc",
    meaning: {
      en: "No spicy food, please",
      zh: "请不要放辣",
      kr: "맵지 않게 해주세요"
    },
    speechText: "Tôi không ăn cay được",
    category: "dining"
  },
  {
    id: "p5",
    vietnamese: "TÔI BỊ DỊ ỨNG HẢI SẢN",
    phonetic: "Toy bee zee oong high san",
    meaning: {
      en: "I am allergic to seafood",
      zh: "我对海鲜过敏",
      kr: "해산물 알레르기가 있습니다"
    },
    speechText: "Tôi bị dị ứng hải sản",
    category: "dining"
  },
  {
    id: "p6",
    vietnamese: "CẢM ƠN VÀ TẠM BIỆT!",
    phonetic: "Cam un va tam byet!",
    meaning: {
      en: "Thank you and goodbye!",
      zh: "谢谢，再见！",
      kr: "감사합니다, 안녕히 계세요!"
    },
    speechText: "Cảm ơn và tạm biệt!",
    category: "general"
  }
]
```

### 2.6 Tỷ giá Ngoại tệ Quy đổi Cục bộ (`currencyRates`)
```javascript
currencyRates: {
  USD: 25400, // 1 USD = 25,400 VND
  CNY: 3500,  // 1 CNY = 3,500 VND
  KRW: 18.2   // 1 KRW = 18.2 VND (10,000 KRW = 182,000 VND)
}
```

### 2.7 Danh bạ SOS & Thẻ "Đưa tôi về Cảng" (`emergencyContacts` & `returnPortCard`)
```javascript
returnPortCard: {
  title: "LÀM ƠN ĐƯA TÔI VỀ CẢNG QUỐC TẾ CAM RANH",
  portNameEn: "CAM RANH INTERNATIONAL PORT (CRIP)",
  address: "Thôn Bình Lập, Xã Cam Lập, TP. Cam Ranh, Tỉnh Khánh Hòa",
  driverNotice: "Tài xế taxi lưu ý: Đi vào khu Quân cảng Cam Ranh, hướng Cảng Quốc tế",
  contactPhone: "+84 258 3858 888",
  securityPhone: "+84 912 345 678"
},
emergencyContacts: [
  {
    role: {
      vi: "Trực ban An ninh Cảng (24/7)",
      en: "Port Security Duty Desk (24/7)",
      zh: "港口安全值班室 (24小时)",
      kr: "항구 보안 종합상황실 (24시간)"
    },
    phone: "+84 258 3858 888"
  },
  {
    role: {
      vi: "Cấp cứu Y tế Cảng",
      en: "Port Medical Emergency",
      zh: "港口医疗急救",
      kr: "항구 응급 의료"
    },
    phone: "115"
  },
  {
    role: {
      vi: "Đại lý Hàng hải Hãng tàu (Port Agent)",
      en: "Cruise Ship Port Agent",
      zh: "游轮港口代理",
      kr: "선사 항만 대리점"
    },
    phone: "+84 905 123 456"
  },
  {
    role: {
      vi: "Cảnh sát Du lịch Khánh Hòa",
      en: "Tourist Police Hotline",
      zh: "旅游警察热线",
      kr: "관광 경찰 핫라인"
    },
    phone: "+84 258 3528 000"
  }
]
```

### 2.8 Từ điển Nhãn Giao diện Đa ngôn ngữ (`dictionary`)
Gồm hơn 30 cặp key-value tương ứng cho 4 ngôn ngữ (VI, EN, ZH, KR) hỗ trợ hiển thị toàn bộ tiêu đề tab, nhãn nút bấm, cảnh báo và thông điệp.

### 2.9 Xác thực Mã PIN Quản trị (`adminAuth`)
Không lưu mã PIN dạng chữ rõ; chỉ lưu chuỗi băm SHA-256 có salt (`CRIP_ADMIN_PIN_V1::<pin>`) và độ dài PIN (4–8 chữ số):
```javascript
adminAuth: {
  pinHash: "<sha256-hex-digest>", // Đồng bộ qua Supabase app_config (id = 1)
  pinLength: 6,                   // Số chữ số hiển thị trên màn hình khóa AdminPinGate
  updatedAt: null                 // ISO timestamp lần đổi PIN gần nhất
}
```
- Phiên đăng nhập thiết bị được lưu cục bộ tại `LocalStorage` (`CRIP_ADMIN_SESSION_V1`, hiệu lực **8 giờ**, gắn kèm `pinHash` để tự thu hồi khi đổi PIN từ thiết bị khác).
- Trạng thái chống dò mã lưu tại `LocalStorage` (`CRIP_ADMIN_LOCKOUT_V1`, tạm khóa **30 giây** sau **5 lần** nhập sai liên tiếp).
