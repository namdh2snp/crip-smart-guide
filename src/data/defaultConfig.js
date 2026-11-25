/**
 * CRIP Smart Guide - Seed Configuration Data
 * Cảng Quốc tế Cam Ranh (Cam Ranh International Port)
 * 100% CMS-Driven data schema
 */

export const defaultConfig = {
  // 1. Ship & Voyage Status
  ship: {
    name: "Spectrum of the Seas",
    berth: "Cầu Bến 01 - Cảng Quốc tế Cam Ranh",
    weather: {
      temp: "29°C",
      condition: {
        vi: "Trời trong, gió nhẹ, biển êm",
        en: "Clear sky, gentle breeze, calm sea",
        zh: "晴朗，微风，海面平稳",
        kr: "맑음, 산들바람, 파도 잔잔함"
      },
      icon: "Sun"
    },
    arrivalDate: "2026-11-24",
    arrivalTime: "07:00",
    allAboardTime: "17:30", // All aboard cutoff time (HH:mm)
    departureTime: "18:00"
  },

  // Emergency Broadcast Banner
  emergencyAlert: {
    enabled: false,
    message: {
      vi: "Tất cả hành khách lưu ý: Xe Shuttle chuyến cuối cùng về cảng lúc 16:30.",
      en: "Notice: The final shuttle bus back to the terminal departs at 16:30.",
      zh: "重要通知：返回码头航站楼的末班穿梭巴士将于 16:30 发车。",
      kr: "중요 안내: 터미널로 돌아가는 마지막 셔틀버스는 16:30에 출발합니다."
    }
  },

  // Terminal Wi-Fi
  wifi: {
    ssid: "CRIP_FREE_WIFI",
    password: "WelcomeToCamRanh"
  },

  // 2. Logistics & Transport
  logistics: {
    tourBusArea: {
      title: {
        vi: "Khu vực Xe Buýt Đoàn Du lịch (Ship Excursion)",
        en: "Ship Excursion Tour Bus Area",
        zh: "邮轮岸上游大巴集结区",
        kr: "기항지 관광 투어 버스 구역"
      },
      description: {
        vi: "Du khách đi tour của hãng tàu vui lòng di chuyển theo lối đi có mái che tới Bãi đỗ xe số 1 & 2. Tìm xe theo số hiệu ghi trên vé tour.",
        en: "Passengers on ship-organized tours should follow the covered walkway to Bus Parking Areas 1 & 2. Locate your bus by your tour group number.",
        zh: "请参加游轮岸上游的游客沿风雨连廊前往1号及2号大巴停车场。请根据游轮团票上的编号乘车。",
        kr: "선사 주최 단체 관광 승객은 지붕이 있는 보도를 따라 1, 2번 주차장으로 이동하여 티켓 번호의 버스에 탑승하세요."
      }
    },
    shuttleBus: {
      title: {
        vi: "Xe Trung chuyển Miễn phí ra Cổng (Free Shuttle)",
        en: "Free Shuttle Bus to Main Port Gate",
        zh: "免费港口穿梭巴士",
        kr: "항구 정문 무료 셔틀버스"
      },
      intervalMinutes: 15,
      operatingHours: "07:30 - 16:30",
      route: {
        vi: "Cầu tàu ➔ Nhà ga Cảng ➔ Cổng kiểm soát số 2 (Đón Taxi)",
        en: "Cruise Berth ➔ Passenger Terminal ➔ Security Gate 2 (Taxi Stand)",
        zh: "码头泊位 ➔ 旅客航站楼 ➔ 2号安检门（出租车接驳点）",
        kr: "선석 ➔ 여객 터미널 ➔ 제2검문소 (택시 승차장)"
      }
    }
  },

  // Listed Taxi Fares
  taxiFares: [
    {
      id: "mai-linh",
      company: "Taxi Mai Linh (Màu Xanh Lá)",
      hotline: "1055",
      openPrice: "11,000 VND",
      pricePerKm: "15,000 VND/km",
      fixedNhaTrang: "450,000 VND / chuyến (~45km)",
      fixedCamRanhCity: "250,000 VND / chuyến (~20km)",
      note: {
        vi: "Đã bao gồm phí qua cổng cảng. Yêu cầu bật đồng hồ tính cước.",
        en: "Port entry fee included. Please ensure meter is running.",
        zh: "包含港口通行费。请务必提醒司机打表计费。",
        kr: "항만 통행료 포함. 미터기 작동을 확인하세요."
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
        en: "Drivers have basic English communication skills.",
        zh: "司机具备基础英语交流能力。",
        kr: "기사가 기본적인 영어 소통이 가능합니다."
      }
    }
  ],

  // 3. Interactive Terminal POIs (Relative % coordinates)
  mapPois: [
    {
      id: "poi-1",
      category: "currency",
      icon: "BadgeDollarSign",
      x: 43,
      y: 38,
      name: {
        vi: "Quầy Đổi Ngoại Tệ & ATM",
        en: "Currency Exchange & ATM",
        zh: "货币兑换与自动取款机",
        kr: "환전소 및 ATM"
      },
      description: {
        vi: "Nhận đổi USD, EUR, CNY, KRW sang VND. Rút tiền mặt thẻ Visa/Mastercard.",
        en: "Exchange USD, EUR, CNY, KRW to VND. Cash withdrawal for Visa/Mastercard.",
        zh: "支持美元、欧元、人民币、韩元兑换越南盾，支持国际信用卡取现。",
        kr: "USD, EUR, CNY, KRW 환전. 비자/마스터카드 현금 인출."
      }
    },
    {
      id: "poi-2",
      category: "sim",
      icon: "Smartphone",
      x: 52,
      y: 38,
      name: {
        vi: "Quầy SIM 4G & Viễn Thông",
        en: "4G Tourist SIM & Telecom",
        zh: "4G旅游流量卡专柜",
        kr: "4G 관광용 SIM 카드 카운터"
      },
      description: {
        vi: "Gói cước du lịch Viettel / Vinaphone tốc độ cao trong ngày, kích hoạt ngay lập tức.",
        en: "High-speed Viettel / Vinaphone tourist data SIM, instantly activated.",
        zh: "越南Viettel/Vinaphone高速流量卡，即买即通，畅游无阻。",
        kr: "즉시 개통되는 비엣텔/비나폰 고속 관광용 유심 패키지."
      }
    },
    {
      id: "poi-3",
      category: "medical",
      icon: "HeartPulse",
      x: 72,
      y: 38,
      name: {
        vi: "Phòng Y Tế & Sơ Cấp Cứu Cảng",
        en: "Port Medical & First Aid",
        zh: "港口急救医疗站",
        kr: "항구 응급 의료소"
      },
      description: {
        vi: "Bác sĩ trực 24/7, thuốc chống say sóng, băng bó vết thương miễn phí.",
        en: "24/7 medical staff, seasickness tablets, complimentary first-aid care.",
        zh: "24小时值班医护，常备防晕船药及免费包扎应急处理。",
        kr: "24시간 의료진 상주, 멀미약 구비 및 무료 응급 처치."
      }
    },
    {
      id: "poi-4",
      category: "dutyfree",
      icon: "ShoppingBag",
      x: 51,
      y: 60,
      name: {
        vi: "Cửa Hàng Miễn Thuế & Đặc Sản",
        en: "Duty Free & Local Souvenirs",
        zh: "免税店与当地特产",
        kr: "면세점 및 지역 특산품"
      },
      description: {
        vi: "Trầm hương Khánh Hòa, Yến sào Cam Ranh, Cà phê Robusta cao cấp.",
        en: "Agarwood incense, Cam Ranh bird's nest, premium Vietnamese coffee.",
        zh: "庆和省天然沉香、金兰燕窝、精品越南罗布斯塔咖啡。",
        kr: "카인호아 침향, 깜라인 제비집, 프리미엄 베트남 커피."
      }
    },
    {
      id: "poi-5",
      category: "wc",
      icon: "Sparkles",
      x: 73,
      y: 60,
      name: {
        vi: "Khu Vệ Sinh Trung Tâm (WC)",
        en: "Restrooms (WC)",
        zh: "中央卫生间 (WC)",
        kr: "중앙 화장실 (WC)"
      },
      description: {
        vi: "WC Nam / Nữ, phòng vệ sinh riêng cho người khuyết tật và phòng thay tã em bé.",
        en: "Men/Women restrooms, accessible cabin and baby-care room.",
        zh: "男/女洗手间，配备残障人士专用洗手间及母婴护理室。",
        kr: "남녀 화장실, 장애인 전용 칸 및 유아 휴게실 구비."
      }
    },
    {
      id: "poi-6",
      category: "shuttle",
      icon: "Bus",
      x: 48,
      y: 84,
      name: {
        vi: "Điểm Đón Xe Shuttle Bus Ra Cổng",
        en: "Shuttle Bus Pick-up Station",
        zh: "穿梭巴士乘车点",
        kr: "셔틀버스 승차장"
      },
      description: {
        vi: "Xe chạy liên tục mỗi 15 phút đưa khách ra Cổng kiểm soát số 2 để đón taxi.",
        en: "Departs every 15 mins to outer Security Gate 2 for taxi connection.",
        zh: "每15分钟循环发车，送旅客至2号门搭乘出租车。",
        kr: "15분 간격 운행, 택시 탑승이 가능한 외부 정문까지 이동."
      }
    }
  ],

  // 4. Discovery Itineraries (4h, 6h, 8h)
  itineraries: [
    {
      id: "itinerary-4h",
      duration: "4h",
      title: {
        vi: "4 Giờ: Thư Giãn Biển Bãi Dài & Chùa Từ Vân (Cam Ranh)",
        en: "4 Hours: Bai Dai Beach & Tu Van Seashell Pagoda (Cam Ranh)",
        zh: "4小时：白戴海滩漫步与慈云螺塔寺（金兰）",
        kr: "4시간: 바이 다이 비치 휴식 & 뜨반 사원 (깜라인)"
      },
      safeReturnNotice: {
        vi: "Nên bắt đầu quay lại cảng trước 15:30.",
        en: "Must start returning to the port before 15:30.",
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
            vi: "Bãi biển cát trắng hoang sơ, thưởng thức dừa xiêm tươi mát ngắm vịnh.",
            en: "Pristine white sandy coast, relax with fresh coconut water.",
            zh: "原生态的细腻白沙滩，品尝新鲜椰青，享受海湾美景。",
            kr: "깨끗한 백사장과 신선한 코코넛 워터로 즐기는 여유."
          }
        },
        {
          name: {
            vi: "Chùa Từ Vân (Chùa Ốc)",
            en: "Tu Van Pagoda (Seashell Temple)",
            zh: "慈云寺（海螺与珊瑚塔）",
            kr: "뜨반 조개 사원"
          },
          time: "1.0h",
          desc: {
            vi: "Tháp Bảo Tích và đường hầm 18 tầng địa ngục dựng thủ công từ hàng triệu vỏ ốc, san hô.",
            en: "Tower built entirely of intricate seashells and coral reefs.",
            zh: "由数百万枚贝壳和天然珊瑚纯手工筑成的神奇宝积塔。",
            kr: "수백만 개의 조개껍질과 산호로만 손수 쌓아 올린 보적탑."
          }
        }
      ]
    },
    {
      id: "itinerary-6h",
      duration: "6h",
      title: {
        vi: "6 Giờ: Di Sản Nha Trang (Tháp Bà Ponagar & Chợ Đầm)",
        en: "6 Hours: Nha Trang Heritage (Ponagar Cham Towers & Dam Market)",
        zh: "6小时：芽庄古韵风情（占婆塔与婆那加市场）",
        kr: "6시간: 냐짱 문화 유적 (포나가르 참탑 & 담 재래시장)"
      },
      safeReturnNotice: {
        vi: "Nên xuất phát rời trung tâm Nha Trang về cảng trước 15:00.",
        en: "Depart downtown Nha Trang before 15:00 to avoid traffic.",
        zh: "请务必于 15:00 前离开芽庄市区返回港口。",
        kr: "교통 정체를 감안하여 15:00 이전에는 냐짱 시내를 출발하세요."
      },
      stops: [
        {
          name: {
            vi: "Quần thể Tháp Bà Ponagar",
            en: "Ponagar Cham Towers",
            zh: "婆那加占婆塔",
            kr: "포나가르 참탑 사원"
          },
          time: "1.5h",
          desc: {
            vi: "Kiến trúc Vương quốc Champa cổ kính trên đồi Cù Lao nhìn ra dòng sông Cái.",
            en: "Ancient 8th-century Hindu Champa sanctuary on Cu Lao hill.",
            zh: "建于8世纪的古印度教占婆王国神庙，鸟瞰美丽丐河。",
            kr: "8세기 참파 왕국의 힌두교 유적지로 강 하구를 내려다보는 전망."
          }
        },
        {
          name: {
            vi: "Chợ Đầm & Thưởng thức Nem nướng Ninh Hòa",
            en: "Dam Market & Ninh Hoa Grilled Pork Skewers",
            zh: "达姆圆形市场与宁和烤肉卷品尝",
            kr: "담 원형 시장 & 닌호아식 넴느엉 맛보기"
          },
          time: "1.5h",
          desc: {
            vi: "Khu chợ tròn biểu tượng của Nha Trang, mua quà lưu niệm và nếm nem nướng truyền thống.",
            en: "Iconic lotus-shaped market for souvenirs, crafts and street food.",
            zh: "芽庄标志性的圆形集市，选购手工艺品并品尝正宗越南小吃。",
            kr: "냐짱의 랜드마크 시장에서 기념품 쇼핑과 로컬 푸드 체험."
          }
        }
      ]
    },
    {
      id: "itinerary-8h",
      duration: "8h",
      title: {
        vi: "8 Giờ: Suối Khoáng Bùn Nóng I-Resort & Chùa Long Sơn",
        en: "8 Hours: I-Resort Mineral Mud Bath & Long Son Giant Buddha",
        zh: "8小时：I-Resort 矿物泥浆水疗与隆山寺大白佛",
        kr: "8시간: I-Resort 미네랄 머드 온천 & 롱선사 대불상"
      },
      safeReturnNotice: {
        vi: "Khoảng cách Cam Ranh - Nha Trang là 50km. Bắt buộc lên xe về cảng trước 14:30.",
        en: "Distance is 50km. Strictly required to board return taxi by 14:30.",
        zh: "距港口约50公里，车程约1小时。务必于 14:30 前乘车返航。",
        kr: "항구까지 50km 거리입니다. 14:30 이전에는 반드시 복귀 차량에 탑승하세요."
      },
      stops: [
        {
          name: {
            vi: "Khu Tắm Bùn Khoáng I-Resort Nha Trang",
            en: "I-Resort Mineral Springs & Mud Bath",
            zh: "I-Resort 矿物泥浆温泉度假区",
            kr: "I-Resort 천연 머드 온천 리조트"
          },
          time: "2.5h",
          desc: {
            vi: "Thư giãn ngâm bùn khoáng nóng tự nhiên giúp tái tạo năng lượng sau chuỗi ngày đi biển.",
            en: "Rejuvenate in natural therapeutic warm mineral mud pools.",
            zh: "在群山环抱的热带园林中体验温热天然矿泥浴，舒缓航海疲惫。",
            kr: "자연 속에서 즐기는 따뜻한 미네랄 머드 스파로 피로 회복."
          }
        },
        {
          name: {
            vi: "Chùa Long Sơn & Tượng Kim Thân Phật Tổ",
            en: "Long Son Pagoda & White Giant Buddha",
            zh: "隆山寺与大白佛像",
            kr: "롱선사 & 거대 백불상"
          },
          time: "1.0h",
          desc: {
            vi: "Ngôi chùa cổ kính hơn 100 năm tuổi với pho tượng Phật trắng khổng lồ nhìn ra toàn cảnh Nha Trang.",
            en: "Century-old Buddhist pagoda with a panoramic view of Nha Trang city.",
            zh: "拥有百年历史的禅寺，登上山顶眺望整个海滨城市的壮阔全景。",
            kr: "100년 역사의 고찰로 정상에서 냐짱 시내 전경을 한눈에 감상."
          }
        }
      ]
    }
  ],

  // 5. Large Communication Phrase Cards
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
        en: "How much does this cost?",
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
        zh: "请不要放辣椒",
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
  ],

  // 6. Offline Currency Exchange Rates
  currencyRates: {
    USD: 25400,
    CNY: 3500,
    KRW: 18.2
  },

  // 7. SOS Hotline Directory & Return Port Card
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
      id: "sec",
      role: {
        vi: "Trực ban An ninh Cảng (24/7)",
        en: "Port Security Duty Desk (24/7)",
        zh: "港口安全值班室 (24小时)",
        kr: "항구 보안 종합상황실 (24시간)"
      },
      phone: "+84 258 3858 888"
    },
    {
      id: "med",
      role: {
        vi: "Cấp cứu Y tế Cảng",
        en: "Port Medical Emergency",
        zh: "港口医疗急救",
        kr: "항구 응급 의료"
      },
      phone: "115"
    },
    {
      id: "agent",
      role: {
        vi: "Đại lý Hàng hải Hãng tàu (Port Agent)",
        en: "Cruise Ship Port Agent",
        zh: "游轮港口代理",
        kr: "선사 항만 대리점"
      },
      phone: "+84 905 123 456"
    },
    {
      id: "police",
      role: {
        vi: "Cảnh sát Du lịch Khánh Hòa",
        en: "Khanh Hoa Tourist Police",
        zh: "旅游警察热线",
        kr: "관광 경찰 핫라인"
      },
      phone: "+84 258 3528 000"
    }
  ],

  // 7b. Safety Incident Reports (Photo + GPS) synced via Supabase
  safetyReports: [],

  // 8. Multilingual Dictionary (VI, EN, ZH, KR)
  dictionary: {
    appTitle: {
      vi: "CẨM NANG THÔNG MINH CRIP",
      en: "CRIP SMART GUIDE",
      zh: "金兰国际港智能向导",
      kr: "깜라인 국제항 스마트 가이드"
    },
    shipStatusTitle: {
      vi: "TRẠNG THÁI CHUYẾN TÀU",
      en: "VOYAGE STATUS",
      zh: "游轮动态信息",
      kr: "크루즈 운항 정보"
    },
    allAboard: {
      vi: "GIỜ TẤT CẢ VỀ TÀU (ALL ABOARD)",
      en: "ALL ABOARD TIME",
      zh: "登船截止时间 (ALL ABOARD)",
      kr: "승선 마감 시간 (ALL ABOARD)"
    },
    countdownHours: {
      vi: "giờ",
      en: "hrs",
      zh: "小时",
      kr: "시간"
    },
    countdownMins: {
      vi: "phút",
      en: "mins",
      zh: "分钟",
      kr: "분"
    },
    countdownSecs: {
      vi: "giây",
      en: "secs",
      zh: "秒",
      kr: "초"
    },
    remind60Min: {
      vi: "Nhắc tôi trước 60 phút",
      en: "Remind 60m before",
      zh: "提前60分钟提醒",
      kr: "60분 전 알림 설정"
    },
    remindedText: {
      vi: "Đã bật nhắc nhở",
      en: "Reminder set",
      zh: "已设置提醒",
      kr: "알림 설정 완료"
    },
    tabTour: {
      vi: "Đi Theo Tour Hãng Tàu",
      en: "Ship Excursion Tour",
      zh: "参加游轮岸上团",
      kr: "선사 주최 단체 관광"
    },
    tabFree: {
      vi: "Đi Tự Túc (Shuttle & Taxi)",
      en: "Independent (Shuttle & Taxi)",
      zh: "自由行（穿梭车与出租车）",
      kr: "개별 자유 여행 (셔틀 & 택시)"
    },
    terminalMapTitle: {
      vi: "BẢN ĐỒ NHÀ GA CẢNG TƯƠNG TÁC",
      en: "INTERACTIVE TERMINAL MAP",
      zh: "港口航站楼全景导览图",
      kr: "인터랙티브 여객 터미널 안내도"
    },
    filterAll: {
      vi: "Tất cả",
      en: "All",
      zh: "全部",
      kr: "전체"
    },
    filterCurrency: {
      vi: "ATM / Đổi tiền",
      en: "ATM / Currency",
      zh: "取款/兑换",
      kr: "ATM / 환전"
    },
    filterSim: {
      vi: "SIM 4G",
      en: "4G SIM",
      zh: "流量卡",
      kr: "4G 유심"
    },
    filterMedical: {
      vi: "Y tế",
      en: "Medical",
      zh: "医疗急救",
      kr: "의료실"
    },
    filterDutyfree: {
      vi: "Miễn thuế",
      en: "Duty Free",
      zh: "免税特产",
      kr: "면세점"
    },
    filterWc: {
      vi: "Nhà vệ sinh",
      en: "Restrooms",
      zh: "洗手间",
      kr: "화장실"
    },
    filterShuttle: {
      vi: "Shuttle Bus",
      en: "Shuttle",
      zh: "穿梭车",
      kr: "셔틀버스"
    },
    itinerariesTitle: {
      vi: "GỢI Ý LỊCH TRÌNH KHÁM PHÁ THEO GIỜ",
      en: "EXPLORATION ITINERARIES BY TIME",
      zh: "按可用时间推荐行程",
      kr: "시간대별 추천 관광 일정"
    },
    phrasesTitle: {
      vi: "THẺ GIAO TIẾP TIẾNG VIỆT HÀNH TRÌNH",
      en: "VIETNAMESE TRAVEL PHRASES",
      zh: "常用越南语沟通实用卡片",
      kr: "베트남어 서바이벌 대화 카드"
    },
    speakButton: {
      vi: "Phát âm tiếng Việt",
      en: "Speak Vietnamese",
      zh: "越南语朗读",
      kr: "베트남어 발음 듣기"
    },
    currencyTitle: {
      vi: "MÁY TÍNH ĐỔI TIỀN NGOẠI TUYẾN",
      en: "OFFLINE CURRENCY CONVERTER",
      zh: "离线货币快捷计算器",
      kr: "오프라인 환율 계산기"
    },
    wifiCopySuccess: {
      vi: "Đã sao chép mật khẩu Wi-Fi!",
      en: "Wi-Fi password copied!",
      zh: "Wi-Fi密码已复制！",
      kr: "와이파이 비밀번호가 복사되었습니다!"
    },
    surveyTitle: {
      vi: "KHẢO SÁT TRẢI NGHIỆM 30 GIÂY",
      en: "30-SECOND EXPERIENCE SURVEY",
      zh: "30秒快速体验满意度评价",
      kr: "30초 간편 만족도 설문조사"
    },
    submitFeedback: {
      vi: "Gửi Đánh Giá",
      en: "Submit Feedback",
      zh: "提交评价",
      kr: "평가 제출"
    },
    sosButton: {
      vi: "SOS KHẨN CẤP",
      en: "EMERGENCY SOS",
      zh: "紧急救援 SOS",
      kr: "긴급 구조 SOS"
    },
    takeMeBackBtn: {
      vi: "ĐƯA TÔI VỀ CẢNG",
      en: "TAKE ME BACK TO PORT",
      zh: "带我回码头",
      kr: "항구로 데려다주세요"
    },
    adminLink: {
      vi: "Quản trị viên Cảng",
      en: "Port Admin Center",
      zh: "港口管理中心",
      kr: "항만 관리자 센터"
    },
    navShip: {
      vi: "Tàu & Wi-Fi",
      en: "Ship & Wi-Fi",
      zh: "游轮与Wi-Fi",
      kr: "선박·Wi-Fi"
    },
    navLogistics: {
      vi: "Di chuyển",
      en: "Transport",
      zh: "交通出行",
      kr: "교통·택시"
    },
    navMap: {
      vi: "Bản đồ",
      en: "Port Map",
      zh: "港口地图",
      kr: "터미널 지도"
    },
    navItinerary: {
      vi: "Lịch trình",
      en: "Itineraries",
      zh: "推荐行程",
      kr: "추천 일정"
    },
    navPhrases: {
      vi: "Thẻ nói",
      en: "Phrases",
      zh: "常用语",
      kr: "회화 카드"
    },
    navCurrency: {
      vi: "Đổi tiền",
      en: "Currency",
      zh: "汇率换算",
      kr: "환율 계산"
    },
    navFeedback: {
      vi: "Khảo sát",
      en: "Survey",
      zh: "评价反馈",
      kr: "설문조사"
    },
    navSafety: {
      vi: "An toàn & SOS",
      en: "Safety & SOS",
      zh: "安全与求救",
      kr: "안전 · SOS"
    },
    sosBoardTitle: {
      vi: "BẢNG GỌI KHẨN CẤP SOS 24/7",
      en: "24/7 EMERGENCY SOS CALL BOARD",
      zh: "24/7 紧急救援一键呼叫板",
      kr: "24시간 긴급 SOS 직통 전화"
    },
    sosCallNow: {
      vi: "Gọi ngay",
      en: "Call Now",
      zh: "立即拨打",
      kr: "바로 전화"
    },
    safetyReportTitle: {
      vi: "BÁO CÁO AN TOÀN (ẢNH + GPS)",
      en: "SAFETY REPORT (PHOTO + GPS)",
      zh: "安全隐患上报（照片 + GPS）",
      kr: "안전 신고 (사진 + GPS)"
    },
    safetyTakePhoto: {
      vi: "Chụp ảnh hiện trường",
      en: "Take Photo",
      zh: "现场拍照",
      kr: "현장 사진 촬영"
    },
    safetyChoosePhoto: {
      vi: "Chọn từ thư viện",
      en: "Choose Photo",
      zh: "从相册选择",
      kr: "앨범에서 선택"
    },
    safetyGetGps: {
      vi: "Lấy tọa độ GPS hiện tại",
      en: "Get Current GPS Location",
      zh: "获取当前 GPS 定位",
      kr: "현재 GPS 위치 가져오기"
    },
    safetySubmitBtn: {
      vi: "Gửi Báo Cáo An Toàn",
      en: "Submit Safety Report",
      zh: "提交安全报告",
      kr: "안전 신고 제출"
    },
    safetySubmitSuccess: {
      vi: "Đã gửi báo cáo an toàn tới Ban Điều hành Cảng!",
      en: "Safety report sent to Port Operations!",
      zh: "安全报告已发送至港口运营中心！",
      kr: "항만 운영센터에 안전 신고가 접수되었습니다!"
    }
  }
};
